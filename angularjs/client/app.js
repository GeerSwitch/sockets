angular
  .module('sockets', [])
  .controller('MainController', MainController)
  .service('socketService', SocketService);

MainController.$inject = ['$http', 'socketService'];
function MainController($http, socketService) {
  // Repeated in the view, populated by our socket.
  this.songs = [];

  // Bound to ng-model in the form
  this.model = {};
  
  socketService.on('song-added', data => {
    this.songs.push(data)
  });

  this.addSong = function() {
    $http.post('/api/add-song', this.model)
  }
}

SocketService.$inject = ['$rootScope'];
function SocketService($rootScope) {
  this.socket_ = io('http://localhost:3000/songs');
  
  // Since socket events live outside of Angulars digest phase,
  // we need to wrap the callbacks inside of an $apply call.
  return {
    /**
     * @param {!string} event Name of the socket event
     * @param {!Function} callback
     */
    on: (event, callback) => {
      this.socket_.on(event, args => {
        $rootScope.$apply(() => {
          return callback.apply(this.socket_, [args]);
        });
      });
      return this;
    },
    /**
     * @param {!string} event Name of the socket event
     * @param {!data} data Socket payload
     * @param {!Function} callback
     */
    emit: (event, data, callback) => {
      this.socket_.emit(event, data, () => {
        $rootScope.$apply(
          function() {
            callback.apply(this.socket_, arguments);
          }.bind(this)
        );
      });
    }
  };
}


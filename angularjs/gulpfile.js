const gulp = require('gulp')
const concat = require('gulp-concat');

const jsSources = [
  './node_modules/angular/angular.min.js',
  './node_modules/socket.io-client/dist/socket.io.js',
  './client/app.js'
];

gulp.task('scripts', () => {
  return gulp.src(jsSources)
  .pipe(concat('build.js'))
  .pipe(gulp.dest('./client/dist'));
});

gulp.task('watch', () => {
  return gulp.watch(jsSources, ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);

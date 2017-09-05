# Basic socket implementation

In addition to wrapping Socket.IO in AngularJS, this example shows how to integrate POST requests into the pipeline.  After starting, open a REST tool like `curl` and execute adding a new song.

>Note: AngularJS by default sets the `Content-Type` header to `application/json` for its `$http` requests, so that's what this server is configured for.

```
curl -H "Content-Type: application/json" -X POST -d '{"artist": "Drake", "title": "In the morning", "duration": "3:21"}' http://localhost:8888/api/add-song
```

## Up and running

- `npm install`
- `npm start`
- `npm run server`

Open a browser to `http://localhost:8888/client`.
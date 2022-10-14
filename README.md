# Google / playground-elements / Vite

Configuration to allow working with the [playground-elements](https://github.com/google/playground-elements) using Vite.

From the docs, we need to add a new url for `sandboxBaseUrl` and also copy some files:
- https://github.com/google/playground-elements#other
- https://github.com/google/playground-elements#sandbox-security

This repo will create a `/sandbox/` context for development and will copy `playground-elements/playground-service-worker.js` and `playground-elements/playground-service-worker-proxy.html` to `/sandbox/` folder for production build.

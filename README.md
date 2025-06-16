# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone -b dev https://github.com/Duude92/nodejs2025Q2-service.git
```

## Setting ENV

Copy .env.example and rename to .env <br>
You can change .env settings

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Running containerized service

```npm run compose:up```
To run service <br>
```npm run compose:down```
To stop services <br>
```npm run compose:up:dev```
To run service in dev mode with source directory sync and app rebuild on changes

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Additional resources

- Docker image is published and can be downloaded publicly via [DockerHub](https://hub.docker.com/r/link12155437/nodejs2025q2-service)
- Project uses tool for vulnerability scanning, to run scn use: ```npm run docker:vulnerabilities```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

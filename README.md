
# Pariahs Fans

This is the source code documentation for the Pariah project. Pariah is a platform for fans to share their favorite items with others. It's built with Next.js and Firebase. The live application ca be found here:

* [Pariah](https://pariahs.fans/)

## Documentation

Documentation for the architecture of this project is released in a dedicated document and will be released and linked here once the project is finished and the documentation is completed. You can find a quickstart for the user documentation in the [USER.md](./USER.md) file.

## Contributions

Pariah is Open Source with [Apache 2 license](./LICENSE) and any contribution is welcome. Read more about how to contribute in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## How to run

This project is built with Firebase and uses Firestore as a database. To get started, you need to have a Firebase project set up and the Firebase CLI installed on your computer. See the following instructions to set up your development environment. Install the required dependencies with:

```shell
npm install
```

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/download/)
- Firebase CLI: `npm install -g firebase-tools firebase`

If you have never worked with firebase, here's some good starting points: 

- [Get started with Firebase](https://firebase.google.com/docs/web/setup)
- [React Tutorial](https://blog.logrocket.com/firebase-cloud-storage-firebase-v9-react/)

### Firebase Emulators

To run with firebase emulators, first setup the firebase project. When setting up hosting on firebase, you get the relevant information to create a `.env.local` file in the root of the repository (it's part of `.gitignore`, don't worry about commiting it). 

Set up [Authentication with Google](https://firebase.google.com/docs/auth/web/google-signin) and find the relevant SDK secrets.

Your `.env.local` should look something like this:

```bash
GOOGLE_CLIENT_ID=<env-from-authentication>
GOOGLE_CLIENT_SECRET=<env-from-authentication>

// Relevant for QR Code generation
NEXT_PUBLIC_BASE_URL=http://localhost:5003


NEXT_PUBLIC_FIREBASE_API_KEY=<env-from-hosting>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<env-from-hosting>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<env-from-hosting>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<env-from-hosting>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<env-from-hosting>
NEXT_PUBLIC_FIREBASE_APP_ID="<env-from-hosting>"
```

Additional you need to specify these environment varibales in the `.env.local` file. They ensure the services are colling the correct emulator-backends.

```
NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
```


YOu can start up the emulator suite by running the following command:

```bash
firebase emulators:start
```

This will start up the Firestore emulator and other relevant services which are required for this project. You can find the port on which the emulator is exposed in the output of the command:

```bash
...
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/
...
```

You will need to add this to `next.config.js` (To Read images from the emulated firestorage):

```
const nextConfig = {
  images: {
    remotePatterns: [
...
      // Firebase Local (Dev Only)
      { protocol: "http", hostname: "127.0.0.1", port: "9199" },
    ]
  }
};
```

If you see older versions of the emulator, you can clear the cash. The only implication of this, is that deployments are slower (because this directory is used to cache the emulator images). But it's safe to remove:

```bash
rm -rf .firebase
```

### Node Version

If you have newer or older Node.js Versions locally, you can use [`n`](https://www.npmjs.com/package/n) to switch between versions. Install it with:

```shell
npm install -g n
```

Use the given version:

```shell
n run node/20.12.2


Welcome to Node.js v20.12.2.
Type ".help" for more information.
```

A known version to work (also supported by firebase-cli) is `v20.12.2`

## Testing

There's different testing components which can be used for this repository.


### Linting

To lint the code, you can use the following command:

```shell
npm run lint
```

### EsDocs

Update the Code-Documentation with esdoc:

```shell
./node_modules/.bin/esdoc
```

### Unit-Testing

Unit-Tests are written with [Jest](https://jestjs.io/). To run the tests, you need to have the following software installed on your computer. This requires the firebase emulator to be running (Or at least the firebase-tools to be installed)

```shell
npm run unit-test
```

Without the emulators:

```shell
jest --coverage
```

Coverage is generated in the `coverage/` directory and can be viewed with a browser.

### E2E-Testing

E2E-Tests are written with [Playwright](https://playwright.dev/). To run the tests, you need to have the following software installed on your computer:

```shell
npx playwright test
```

New tests can be added under [e2e/](./e2e/)


### Load-Testing

To execute the load tests, you need to have the following software installed on your computer:

```shell
brew install k6
```

Then execute a test (you need to replace * with any actual number):

```shell
k6 run k6/q*-test.js
```

If you want to upload the results to the cloud, you can use the following command:

```shell
k6 run k6/q*-test.js --out cloud
```

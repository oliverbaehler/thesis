
# Pariahs Fans





## Documentation

Documentation for the architecture of this project is released in a dedicated document and will be released and linked here once the project is finished and the documentation is completed.

## Contributions

Pariah is Open Source with Apache 2 license and any contribution is welcome. Read more about how to contribute in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## How to run

This project is built with Firebase and uses Firestore as a database. To get started, you need to have a Firebase project set up and the Firebase CLI installed on your computer. See the following instructions to set up your development environment.

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/download/)
- Firebase CLI: `npm install -g firebase-tools firebase`

If you have never worked with firebase, here's some good starting points: 

- [Get started with Firebase](https://firebase.google.com/docs/web/setup)
- [React Tutorial](https://blog.logrocket.com/firebase-cloud-storage-firebase-v9-react/)

### Firebase Emulators

To run with firebase emulators, first setup the firebase project. When setting up hosting on firebase, you get the relevant information to create a `.env.local` file in the root of the repository (it's part of `.gitignore`, don't worry about commiting it). 

Set up [Authentication with Google]() and find the relevant SDK secrets.

Your `.env.local` should look something like this:

```
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

### Structure


## `.github/`

Contains relevant Github metadata and workflow configurations

## `/docs`


## Tools

Additional Tools which help with the development of this project.

### Esdoc

To generate documentation for the project, you can use `esdoc`. Install it with:

```shell
npm install -g esdoc
```

And run it with:

```shell
esdoc
```

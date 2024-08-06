
# Pariahs Fans





## Documentation

Documentation for the architecture of this project is released in a dedicated document and will be released and linked here once the project is finished and the documentation is completed.

## Contributions

Pariah is Open Source with Apache 2 license and any contribution is welcome. Read more about how to contribute in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Development

This project is built with Firebase and uses Firestore as a database. To get started, you need to have a Firebase project set up and the Firebase CLI installed on your computer. See the following instructions to set up your development environment.

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/download/)
- Firebase CLI: `npm install -g firebase-tools firebase`

### Firebase Emulators

Before running the emulators, we need to render the function config:

firebase functions:config:get > functions/.runtimeconfig.json

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

### Structure


## `.github/`

Contains relevant Github metadata and workflow configurations

## `/docs`

Masterthesis FS 2024
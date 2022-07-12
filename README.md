# NgLogin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

This is a full stack application running with a Node server for backend, Mongodb DB to store data and a local server for the frontend side.

## Follow these steps in order to install all what we need. For MacOS:

- Install the Xcode command-line tools by running the following command in your macOS Terminal:

  `xcode-select --install`

- Install Homebrew:

  `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

- Installing MongoDB 5.0 Community Edition:

  `brew tap mongodb/brew`
  `brew update`
  `brew install mongodb-community@5.0`

  To run/stop MongoDB as a MacOS service:

  `brew services start mongodb-community@5.0`
  `brew services stop mongodb-community@5.0`

## Node server for backend

All code about backend, the server, controllers, models, etc are located in a folder called "auth".
Before starting, go to that folder and install all package.json dependencies:

`cd auth`
`npm install`

I use Nodemon to monitor any changes in the source and automatically restart the server, so, although we installed it locally, it is recommended to install it globally to use it in the command console:

`npm i -g nodemon`

This server will run on port 5000

## Install front dependencies:

Go to the root of the application and type:

`npm install`

in order to install all libraries

## How to run the application

- 1º From the terminal start mongodb: brew services start mongodb-community@5.0
- 2º Go to auth folder `cd auth` and run nodemon server: nodemon server
- 3º Go to the root folder and run the dev server for the application: npm start
- 4º Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
- 5º Enjoy!! :D

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

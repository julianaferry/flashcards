# Flash Cards Project
---
Native Mobile application (Android) that allows users to study collections of flashcards. The app allows users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.


## Start Developing
---
To get started developing right away:

* Install and start the API server
    - `yarn install`
    - `yarn start`


## Available Scripts
---
If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

#### `yarn test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests..

#### `yarn run android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools.


## Frontend File Structure
---
- `/actions` - Actions 
- `/components` - React Components (includes styles and navigation)
- `/reducers` - Redux Reducers
- `/utils` - Notification and API functions
- `App.js` - Main App Components which includes Routes


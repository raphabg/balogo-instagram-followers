# balogo-instagram-followers

The project consists of an web app that you can use to see who unfollowed you on instagram, who doesn't follow you back and also easily search through these lists.

Front end was developed using technologies such as [React](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), Typescript and [Material UI](https://mui.com/).

Back end is a simple [Express.js](https://expressjs.com/) serverless APi that connects to a [Mongo DB](https://www.mongodb.com/) database (database is needed to store user sessions and followers from the past to be able to keep track of who unfollows the user).
Application is made to be deployed on [Vercel](https://vercel.com/) but can easily be converted in standalone node.js api and react app. If you want to test the live version you can acess the web app through: [https://balogo-instagram-followers.vercel.app/](https://balogo-instagram-followers.vercel.app/)

* <b>This is a personal project and i have no goal of using anyone's personal data, although in order to to make the application work, sensitive instagram user data will be kept on database if you use the deployed app url provided above</b>. 

* If you want test the application without sharing sensitive data, store user data on your own db and clone the project changing the connection strings. You can run it locally or deploy it in a service of your wish.

* Instagram API used for this project is not the official one provided by Facebook due to it's limitations. I've used the [instagram-private-api](https://github.com/dilame/instagram-private-api) created by [dilame](https://github.com/dilame) instead.

<hr>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

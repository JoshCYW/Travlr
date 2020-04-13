# Unified Travlr Application with React Frontend/Node backend & Solidity Contracts
This application is split into 3 layers; backend (.sol code), node (node.js with mongoDB) and frontend (react.js).


## Demo Sequence 
1. Login with Travelr (With account[0])
2. Create Government entitiy
3. Login with Government 
4. Create Hotel/ Immigration entity
5. Create 2 Passports (Take Note of Contract Addresses of the 2 Passports)
6. Login with Immigration
7. Arrival of both Passports
8. Login with Hotel
9. Check-in both Passports, Check-out 1
10. Get Travel History for all (Should display 3 results)
11. Get Travel History for Checked out Passport (Should display 2 results)
12. Login with Immigration 
13. Departure of Checked out Passport
14. Login with Government
15. Demonstrate Health Flagging
16. Verify travel History of both Passports

## 1. backend 

run ganache using the GUI on localhost:8545

run truffle migrate 
``cd <backend folder>``
``truffle migrate``

you will need `Travlr's contract address` that outputs from the migration for the frontend code later on

#### Developer's Note: Steps to deploy contracts
1. Deploy `Travlr` using acc[0]
2. Call assignGovernment(acc[1], ctry) in `Travlr`, get Govt Address in output
3. Deploy `Government` using Govt Address output from step 2
4. Call createEthPassport(acc[2]) in `Government`, get Eth Passport Address in output
5. Deploy `EthPassport` using Eth Passport Address output from step 4
6. Call assignHotel(acc[3]) in `Government`, get Hotel Address in output
7. Deploy `Hotel` using Hotel Address output from step 6
8. Call assignImmigration(acc[4]) in `Government`, get Immigration Address in output
9. Call other functions :)


## 2. node
node connects to a centralised mongo database which stores an immigration and a hotel's travel history

### if first time
``cd <node folder>``
``npm install``

### then
``npm run server``


## 3. frontend

Paste `Travlr's contract address` obtained from the backend truffle migrate at frontend/src/config.js `TRAVLR_ADDRESS` field

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### if first time
``cd <backend folder>``
``npm install``

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

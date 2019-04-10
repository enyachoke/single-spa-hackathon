# Single-spa hackathon app
A simple app that demonstrates the use of the [single-spa](https://single-spa.js.org) framework to build coexisting microfrontends.

## Instructions

After cloning the repo, run the following commands in a terminal from inside of the cloned project
```sh
cd navbar
npm install
ng build

cd ../patientsearch
npm install
ng build

cd ../patientdashboard
npm install
ng build

cd ..
npx light-server -s . --historyindex '/index.html' -o
```

If you want set up a watcher so that you don't have to wait for an entire rebuild everytime you make a code change, run `ng build --watch`
in whichever application(s) that you are working on.
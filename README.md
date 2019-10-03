# Web structure project
## Goal
The goal of this project is to provide à High-level and customizable structure of React app.
Here are the main principles bootstraped :
* Base configuration (deployment, dev/acceptance/prod, hosting)
* Component structure
* Redux structure and configuration
* Routing structure
* UI base kit configured
* Remote service configuration (http)

## Table of content

- [Web structure project](#web-structure-project)
  - [Goal](#goal)
  - [Table of content](#table-of-content)
  - [Libraries](#libraries)
  - [Base files structure](#base-files-structure)
  - [Installation](#installation)
  - [Base configuration](#base-configuration)
  - [Components structure](#components-structure)
  - [Redux structure and configuration](#redux-structure-and-configuration)
  - [Routing structure](#routing-structure)
  - [UI base kit configured](#ui-base-kit-configured)
  - [Remote service configuration](#remote-service-configuration)

## Libraries
First of all, thanks to all of those libraries that this project is using :
* **react** (base library)
* **react-router-dom** (routing)
* **core-js** and **react-app-polyfill** (polyfills)
* **prop-types** (type checking)
* **redux** and **react-redux** (redux setup)
* **axios** (http requests)
* **@material-ui/core** and **@material-ui/styles** and **@material-ui/theme** (ui base kit)

## Base files structure
```
* root
    * public
        - index.html (entry point)
        - web.config (configuration file for IIS hosting)
        - robot.txt
        - ...png (favicon.ico, ... project base icons)
    * src
        * assets (folder for static assets)
        * components (folder for React components)
            * ui-kit (base directory for the ui-kit of the application)
        * router (folder for routing logic)
            - routes.js (constant file with all the routes)
            - index.js (base router using all routes)
        * service (folder for remote service)
            - service.js (ES6 class that contains the base service declaration)
            - ...Service.js (file containing promises to CRUD data from remote)
        * tore (folder containing redux's store)
            * actions
                - constants.js (constant file for all actions)
                - ...Actions.js (Redux's action file)
            * reducers
                - reducer.js (main reducer containing all the reducers)
                - ...Reducer.js (Redux's reducer file)
            - index.js (redux entry point)
        * theme
            - theme.js (base theme file used to set the base colors)
    - package.json
```
## Installation
```
    git clone https://github.com/Maexwel/web-structure.git <-destination-name->
    git remote set-url origin <-you-git-remote-url->
    npm i
```

## Base configuration


## Components structure
The component structure is really simple : 

```
* components
    * ui-kit
```

The goal is to create all base ui-kit components inside the ui-kit folder.
For example, if you create a Button component, this button should be in **/components/ui-kit/Button**.
Like this you can have reusable ui components easily configured.
Be aware, those ui components should only be there for ui, they should'nt contain the logic of the app inside.

## Redux structure and configuration
The redux structure and configuration is this one :
```
* store
    * actions
        - constants.js
        - ...Actions.js
    * reducers
        - reducer.js
        - ...Reducer.js
    - index.js
```

If you want to create a new Reducer, here are the steps :
1. Create the constants for you reducer in **/store/actions/constants.js**
2. Create an action file in **/store/actions** containing the actions
3. Create the reducer in **/store/reducers** using a switch for you created actions's constants
4. Include your reducer inside the **/store/reducers/reducer.js** file
5. Here you are, you can now use you redux store everywhere in your components by connecting theme !

## Routing structure

## UI base kit configured

## Remote service configuration
Closely all web application are making HTTP calls to web APIs (such as REST calls, SOAP calls, GraphQL calls).
It is important to build an efficient an reusable way to make those call.

The remote service structure is the following :
```
* service (folder for remote service)
    - service.js
    - ...Service.js
```

The goal is to provide a base Service class ([Javascript ES6 classes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)) (**/service/service.js**) that should be extendend by all new Services.
This is an implementation of the Service Design Pattern.
```
export default class ExampleService extends Service {
    constructor(){
        super('https://someurl.com/example'); // Define the uri
    }

    fetch(){
        return new Promise(async (resolve, reject) => {
            try{
                const {data} = await axios.get(this.uri, {headers: { Authorization : this.getToken() }});
                resolve(data);
            }catch(err){
                reject(err);
            }
        });
    }

    create(){
        // AXIOS PROMISE
    }

    udpdate(){
        // AXIOS PROMISE
    }
    
    delete(){
        // AXIOS PROMISE
    }
}
```

Service class : 

Properties | Type | Description
--- | --- | ---
`uri` | *string* | Should be given in the constructor. The uri is the endpoint for all the API calls.
`token` | *Function* | Is used to access the authToken for the remote calls.

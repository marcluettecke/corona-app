# WeathADatA

## What does the project do?
Simply said: the project represents a single-page weather App. It derives data via the [OpenWeatherApi](https://openweathermap.org/api) for a small sample of 11 cities, which the user can get basic current weather Data for. The app includes a customized sign-in and log-in logic, which is handled via [Firebase](https://firebase.google.com/) behind the scenes. Once logged in, the user can choose cities to add to her overview, for which an interactive CSS card displays the common weather app information.

## Disclaimer!
Please refrain from using the API calls exessively. OpenWeatherApi's free plan stops at a pre-defined number of calls per hour, after which it just throws errors for the queries. Thanks in advance for acting responsively.

## Why build another weather App?
This toy project is a practice project to combine building Material themed Apps in Angular with a conclusive backend integration. It builds on most of the frameworks core features, such as (nested) Components, rxjs-based Subscriptions, State management via Services, and http request to a Firebase backend via Services. Basic authentification is provided via an Auth Service.

## What if I want to build on this code?
To work on this App yourself, you just need to get your own (free) API key from [OpenWeatherApi](https://home.openweathermap.org/users/sign_up). This key then needs to be inserted in an Angular environment.ts file under: src/environments/environment.ts and accessed (as in the code) via 'environment.api'. For question, do not hesitate to contact me here.

## Technical Angular Details
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

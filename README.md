# usa-weather

An Angular based USA weather application. This application uses two free APIs to retrieve USA based address geocode information and to retrieve weather information for the acquired USA address geocode. The free APIs are USA government provided APIs that don't require a user account or an API key to use. The geocode information is retrieved using the [USA Census Geocoder](https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html) API while the weather information is retrieved using the [National Weather Service](https://www.weather.gov/documentation/services-web-api#) API.

## Background

This application was created with [Angular Material](https://material.angular.dev/) components and uses the [Tailwind CSS](https://tailwindcss.com/) library for application layout and CSS styling. After cloning the project, ensure both [Node.js&reg; and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are installed. To pull in the project's dependencies, from a terminal window in the project's root folder, run

```bash
npm install
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Running the application

To start a local development server, from a terminal window in the project's root folder, run:

```bash
ng serve
```

or

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

<img width="1366" height="670" alt="Main Window" src="https://github.com/user-attachments/assets/b0bef989-94bc-410d-82f3-dcb75d119b67" />

All three fields are required to generate a weather forecast. Enter the USA based address information which will enable the **Submit** button. Click on the **Submit** button to generate a weather forecast.

<img width="1366" height="670" alt="Weather Forecast" src="https://github.com/user-attachments/assets/98585953-f182-4916-bb3e-e28a66dd04cb" />

A scrollable forecast list will display for the next seven days. To clear the results click on the **Clear** button.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

- [Angular Signals: Complete Guide](https://blog.angular-university.io/angular-signals/)
- [Angular @if: Complete Guide](https://blog.angular-university.io/angular-if/)
- [Angular @for: Complete Guide](https://blog.angular-university.io/angular-for/)
- [Angular Standalone Components: Complete Guide](https://blog.angular-university.io/angular-standalone-components/)

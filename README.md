#Front-End-Hostfully
## Overview
Front-End-Hostfully is a multi-tenancy front-end project designed for managing bookings and property information. This project uses a stub repository approach to simulate API requests and store data in arrays, focusing on bookings and property info.

## Key Features
*Multi-Tenancy Theme*: Ability to select themes using Commander and Inquirer.
*Commit Standards*: Integration of Commitizen and Commit-lint to ensure clean and standardized commits.
*Stub Repository*: Simulated API requests with data storage for bookings and property info.

## Architecture
*Clean Architecture*: Organized codebase for scalability and maintainability.
*TDD (Test Driven Development)*: Ensuring reliability and robustness of the code.
*DDD (Domain-Driven Design)*: Focusing on domain logic and complexity.

## Technologies
*React (Ejected Project)*: For a flexible and customizable UI.
*TypeScript*: For strong typing and enhanced code quality.
*Other Libraries*:
- ChakraUI
- Jest
- Husky (for pre commits and pre push)
- Commitzen (for standard commits)
- Commander and Inquirer (to run custom themes (debug or default))

## Getting Started
```yarn```
To run it locally: ```yarn dev```
To run unit tests: ```yarn test:watch```
To run integration tests: ```yarn test:integration```
To run coverage: ```yarn test:ci```
To run production: ```yarn build && yarn start```
To make a commit with commitzen: ```git add && git commit -m```
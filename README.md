# Front-End-Hostfully


[https://hostfully-thiago.vercel.app/](https://hostfully-thiago.vercel.app/)
## Overview
Front-End-Hostfully is a multi-tenancy front-end project designed for managing bookings and property information. This project uses a stub repository approach to simulate API requests and store data in arrays, focusing on bookings and property info.

## Key Features
*Multi-Tenancy Theme*: Ability to select themes using Commander and Inquirer.
*Commit Standards*: Integration of Commitizen and Commit-lint to ensure clean and standardized commits.
*Stub Repository*: Simulated API requests with data storage for bookings and property info.

## Architecture
This React project is structured following Clean Architecture principles, ensuring a clear separation of concerns and adherence to SOLID principles, TDD, KISS, YAGNI and DRY. The architecture is divided into several layers, each with a specific role and responsibility. This structure facilitates easier testing, maintenance, and scalability.

## ![Architecture Diagram](https://github.com/thiagobutignon/front-end-hostfully/blob/main/docs/architecture.png)

### Domain
- **Purpose**: Contains the core business logic and entities. It is the innermost layer and should not depend on any other layer.
- **Contents**: Business models (e.g., entities or domain models) and interfaces for repositories and services that are defined by the application's core business logic.

### Data
- **Purpose**: Implements interfaces defined in the Domain layer. This layer is responsible for data manipulation and storage, acting as a data access layer.
- **Contents**: Repositories implementation, data sources (APIs, databases, etc.), and data transfer objects (DTOs).

### Presentation
- **Purpose**: Handles the UI and presentation logic. It communicates with the Domain layer to retrieve the data, which it then presents to the user.
- **Contents**: React components, pages, hooks, and view models.

### Validation
- **Purpose**: Provides validation logic across the application. It ensures that data inputs meet certain criteria before they are processed by the application.
- **Contents**: Validation rules, validators, and custom validation logic.

### Infra
- **Purpose**: Supports the application with technical capabilities that do not belong to the core business logic, such as external service integrations, database connections, or file storage.
- **Contents**: Infrastructure implementations like database clients, external libraries, external APIs integration, logging, and configuration management.

### Integration
- **Purpose**: Contains integration tests that verify the interactions between Domain, Data, Infra and Application.
- **Contents**: Integration tests scripts and utilities for setting up and tearing down test environments.

### Application
 **Purpose**: Acts as a draft for API interactions, simulating the behavior of external APIs that do not yet exist. This layer helps in developing and testing the Presentation and Data layers without the need for an actual backend service. Also, the arrays are acting as in-emory database.
- **Contents**: Stub API requests, mock data implementations, and interfaces to simulate external API behavior, facilitating front-end development and testing in isolation from backend dependencies.


### Main
- **Purpose**: The entry point of the application. It wires up all the layers, configuring dependencies, and setting up middleware and routes.
- **Contents**: Dependency injection setup, application initialization code, and main configuration.

## Testing Strategy
Each layer has its own testing strategy, focusing on unit tests for the Domain and Data layers, integration tests for the Integration layer, and end-to-end tests for the Presentation layer.

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
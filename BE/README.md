# Backend (BE) - LMS

The Backend (BE) folder contains the processing layer for LMS This component handles server-side logic, API endpoints, and communication with the database.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)

## Folder Structure

The BE folder is organized as follows:

- `src/`: Contains the source code for the backend application.
  - `main/`: The main application code.
    - `java/`: Contains Java packages and classes.
- `pom.xml`: The Maven Project Object Model file that specifies project dependencies and configuration.

## Getting Started

To run the backend locally, follow these steps:

1. Clone the repository: `git clone https://github.com/shrististha/LMS.git`
2. Navigate to the `BE/` directory: `cd BE/`
3. Build the project: `mvn clean install`
4. Run the application: `java -jar target/lms-0.0.1-SNAPSHOT.jar`

The backend application should now be running at `http://localhost:8080`.


## Dependencies

- Java 17
- Spring Boot REST: A REST framework for building RESTful applciation
- Spring Data JPA: Simplifies database access with Hibernate.
- Maven: A build tool for managing project dependencies and building Java projects.

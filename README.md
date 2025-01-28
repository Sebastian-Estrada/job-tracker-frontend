# Job Tracker Frontend

## Problem Description

Job hunting can be a tedious and overwhelming process. Keeping track of job applications, follow-ups, and responses from potential employers can quickly become unmanageable. This project aims to simplify and streamline the job application process by providing a centralized platform to track and manage job applications.

## Project Description

The Job Tracker is a web application designed to help users manage their job applications efficiently. Users can add new job applications, update the status of their applications, and set reminders for follow-ups. The application provides a user-friendly interface to view and manage all job-related activities in one place.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the frontend, follow these steps:

1. Clone the repository:
  ```bash
  git clone https://github.com/Sebastian-Estrada/job-tracker-frontend.git
  ```
2. Navigate to the project directory:
  ```bash
  cd job-tracker-frontend
  ```
  3. Create a `.env` file in the root directory and add the following line:
    ```bash
    VITE_BACKEND_URL=http://localhost:8000
    ```
4. Install the dependencies:
  ```bash
  npm install
  ```

## Usage

To start the development server, run:
```bash
npm run dev
```
This will launch the application in your default web browser. The development server will automatically reload if you make changes to the code.

## Docker Usage

To run the application using Docker, follow these steps:

1. Build the Docker image:
  ```bash
  docker build -t job-tracker-frontend .
  ```

2. Run the Docker container:
  ```bash
  docker run -p 80:80 job-tracker-frontend
  ```

This will start the application and make it accessible at `http://localhost`.

For development purposes, you can use the development stage of the Dockerfile:

1. Build the Docker image for development:
  ```bash
  docker build -t job-tracker-frontend-dev --target development .
  ```

2. Run the Docker container for development:
  ```bash
  docker run -p 5173:5173 job-tracker-frontend-dev
  ```

This will start the Vite development server and make it accessible at `http://localhost:5173`.

## Docker Compose Usage

To run the application using Docker Compose, follow these steps:

1. Use the `docker-compose.yaml` file in the Docker directory.

2. Start the services:
  ```bash
  docker-compose -f Docker/docker-compose.yaml up
  ```

This will start both the backend and frontend services and make the application accessible at `http://localhost:8000`.

## Features

- Track job applications
- Add, edit, and delete job entries
- Filter and search job listings
- Responsive design

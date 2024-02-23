# JavaScript Ide

## Description

This project consists of a React frontend and a Django backend with PostgreSQL as the database. Follow the instructions below to set up and run the project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Git
- Node.js and npm (npm comes with Node.js)
- Python
- pip (Python package installer)
- Docker

## Setup and Run the React App

1. **Clone the Repository**

   ```
   git clone
   ```

2. **Navigate to the Frontend Directory**

   ```
   cd frontend
   ```

3. **Install Dependencies**

   If you haven't installed pnpm, install it globally using npm:

   ```
   npm install -g pnpm
   ```

   Then, install the project dependencies:

   ```
   pnpm install
   ```

4. **Run the Development Server**

   ```
   pnpm run dev
   ```

   The React app should now be running on [http://localhost:5173](http://localhost:5173).

## Setup and Run the Django Project

1. **Navigate to the Django Project Directory**

   ```
   cd algoIde
   ```

2. **Setup a Python Virtual Environment (Optional but Recommended)**

   For Unix/macOS:

   ```
   python3 -m venv env
   source env/bin/activate
   ```

   For Windows:

   ```
   python -m venv env
   .\env\Scripts\activate
   ```

3. **Install Python Dependencies**

   ```
   pip install -r requirements.txt
   ```

4. **Install Docker**

   Ensure Docker is installed and running on your machine. Refer to the [Docker documentation](https://docs.docker.com/get-docker/) for installation instructions.

5. **Run PostgreSQL Container**

   ```
   sudo docker run -d --name postgres-algo -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres postgres:latest
   ```

6. **Run the Django Development Server**

   ```
   python manage.py runserver
   ```

   The Django server should now be running on [http://localhost:8000](http://localhost:8000).

## Notes

- Ensure Docker is running before you start the Django project.
- Adjust `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` environment variables as necessary to match your PostgreSQL configuration.

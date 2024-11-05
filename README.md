# Personal Finance Manager

## 1. Project Overview

### Purpose of the Project

This is a simple web application designed to help users manage and visualize their financial gains and expenses. It provides an intuitive interface for tracking income and spending, allowing users to see their current balance, gain, and spend over time.

### Features

- Create and view financial operations, which can be classified as either income or expenditure.
- Display live updates of the user's current balance, total gains, and total spending.
- Visualize financial data categorized by type using pie charts and tables for clear insights.

### Technologies Used

- **Frontend**: React
- **Backend**: Django
- **HTTP Client**: Axios
- **Styling**: CSS ,Bootstrap

## 2. Project Setup

### Prerequisites

- Ensure you have **Python 3.11** installed on your system. You can download it from [Python's official website](https://www.python.org/downloads/).

### Environment Variables

Set up your environment variables based on the configuration found in the GitHub repository: [nutri_test](https://github.com/waleedlh10/nutri_test). Create a `.env` file in your project root and add the necessary variables as described in the repository.

### Installation Instructions

#### Backend Setup

1. Navigate to the backend directory (if applicable):
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up the database:

   - Apply migrations to create the necessary database schema:
     ```bash
     python manage.py migrate
     ```

4. (Optional) Seed initial data:
   - To seed the database with initial operations, run the seed script:
     ```bash
     python manage.py seed_operations
     ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Configure the frontend to connect to the backend:
   - Update any API URLs in the code to point to your backend server.

### Running the Project

To start the application, run the following commands in separate terminal windows:

1. For the backend (Django):

   ```bash
   python manage.py runserver
   ```

2. For the frontend (React):
   ```bash
   npm start
   ```

## 5. API Documentation

- The API documentation is accessible through Swagger, which is pre-set in the backend. Use Swagger to view and test the available API endpoints.
- You can access the Swagger UI at: `http://localhost:8000/swagger/`

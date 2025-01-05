# Product Management System

A full-stack application built with .NET 8 and Angular 18.2.0 for managing products.

## Technologies Used

### Backend
- .NET 8 Web API (Minimal API)
- Entity Framework Core 9.0.0
- SQL Server
- FluentValidation (v11.11.0)
- NLog for logging
- Swashbuckle.AspNetCore (Swagger UI) v7.2.0

### Frontend
- Angular 18.2.0
- PrimeNG 18.1.0
- TailwindCSS
- PrimeFlex 3.3.1

## Prerequisites

- .NET 8 SDK
- Node.js v20.11.1 and npm 10.2.4
- SQL Server 19.2
- Angular CLI 18.2.0

## Getting Started

### Database Setup

1. Open SQL Server Management Studio
2. Connect to your database server
3. Run the script from `database/init.sql`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Update the connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=ProductDB;Trusted_Connection=True;;TrustServerCertificate=True;"
  }
}
```

3. Run the application:
```bash
dotnet restore
dotnet run
```

The API will be available at: `https://localhost:44370`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd urwave-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in the environment files if necessary:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44370/api'
};
```

4. Run the application:
```bash
ng serve
```

The application will be available at: `http://localhost:4200`

## Features

Implemented Features

Products List Page:

- Products are displayed using PrimeNG DataTable
- Columns include ID, Name, Description, Price, and Created Date
- Search functionality is implemented to filter products by Name
- Sorting is enabled for all columns

Create Product:

- Includes a form with fields for Name, Description, and Price, all with appropriate validations
- Displays validation error messages for incorrect inputs
- Shows a success notification upon successful product creation

Edit Product:

- Pre-filled form allows updating existing product data
- Applies the same validations as the create form
- Displays success or error notifications based on the operation outcome

Delete Product:

- Includes a confirmation dialog to confirm product deletion
- Displays success or error notifications after the operation

Bonus Features:

- Loading indicators are displayed during API calls
- Basic error logging is implemented using NLog
- Added support for a product image URL field and display
- A price range filter is available for enhanced search functionality
## Project Structure

### Backend

Controllers: Organize API endpoints for CRUD operations.

DTOs: Request/Response DTOs with FluentValidation.

Logging: NLog for application-level logging.

Error Handling: Middleware for centralized exception handling.

Database: Entity Framework Core with code-first migrations.

### Frontend

Components: Standalone Angular components for each feature.

Services: Centralized services for API communication and Loading indicator.

State Management: Use observables for reactive programming.

Styling: TailwindCSS and PrimeNG for UI design.

## Additional Notes

Swagger is enabled at https://localhost:44370/swagger for API documentation.

For any issues, refer to the setup instructions or contact at saadsohail98@gmail.com

Ensure Angular, Node.js and npm versions match the prerequisites for a smooth setup.
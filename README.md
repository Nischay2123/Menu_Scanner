# backend/backend/README.md

# Backend Project

This is a Node.js backend project built using Express. It serves as the server-side application for handling requests and managing data.

## Project Structure

- **src/**: Contains the source code for the application.
  - **app.js**: Entry point of the application, sets up middleware and routes.
  - **controllers/**: Contains controllers that handle the logic for different routes.
    - **index.js**: Exports the IndexController class.
  - **routes/**: Defines the routes for the application.
    - **index.js**: Exports a function to set up application routes.
  - **models/**: Contains data models that define the structure of the data.
    - **index.js**: Exports the data models.

- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **.env**: Contains environment variables for the application.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```

Make sure to set up your environment variables in the `.env` file before starting the application.

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes.


<!-- db migrations -->

use menu_scanner_db;

Create database menu_scanner_db;

CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(100),
    location VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE restaurants
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    halfPrice DECIMAL(10, 2) ,
    fullPrice DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    isVeg boolean NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE qrs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    qr_code_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

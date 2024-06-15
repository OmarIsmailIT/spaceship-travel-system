### Spaceship Travel System 

---

#### Introduction:
The Spaceship Travel System is a web application designed to manage a fleet of spaceships, their crew members, and missions to destinations like the Moon, Mars, and Jupiter. Built with modern web technologies, the system provides an intuitive interface for users to perform CRUD (Create, Read, Update, Delete) operations on spaceships, crew members, and missions.


---
## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  
---
## Features

- Spaceships Management: View, add, update, and remove spaceships. Each spaceship includes details like its name, capacity, launch date, and current status.
- Crew Members: Manage crew members who are assigned to spaceships. Add new crew members, update their information, and remove them from missions.
- Missions: Plan and manage missions to different destinations. Each mission can be viewed individually with details about its crew, spaceship, and destination.
- Authentication: Secure user authentication system for accessing administrative functionalities.

- 
---

#### Technologies Used:
- **Backend**: Node.js with Express.js for API development.
- **Frontend**: React.js with Vite for a fast development environment.
- **Database**: MySQL for storing spaceship, crew member, and mission data.
- **Styling**: Bootstrap for responsive and mobile-first design.


---

#### Getting Started
To initiate the project, ensure you have MySQL installed and run the provided SQL script to set up the database schema. The application requires Node.js and npm (or yarn) for both backend and frontend development.

- **Database Setup**: Run the SQL script (spaceship_travel_system_db.sql) provided in the database folder to create the necessary tables and initial data.
- **Backend Setup**: Clone this repository, install dependencies using npm install, and start the backend server using npm start.
- **Frontend Setup**: Navigate to the frontend directory, install dependencies, and start the development server with npm run dev.

Refer to the specific README files in the backend and frontend directories for detailed instructions on setting up each component.

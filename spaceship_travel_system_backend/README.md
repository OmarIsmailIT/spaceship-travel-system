### Spaceship Travel System API

---

#### Introduction:

Welcome to the Spaceship Travel System API! This API is designed to manage the operations of a spaceship travel system, facilitating the booking of missions to destinations like Moon, Mars, and Jupiter. This README provides instructions on how to run the API locally and interact with its endpoints.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Additional Notes](#additional-notes)

---

## Features

- Create, read, update, and delete spaceships
- Manage crew members and assign them to spaceships
- Schedule and monitor missions to various destinations
- Session management for user authentication

---

#### Technologies Used:

- Node.js
- Express.js
- MySQL
- Postman (for API testing)

---

#### Installation:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/OmarIsmailIT/spaceship-travel-system.git

   ```

2. **Install Dependencies:**

   ```bash
   cd spaceship-travel-system
   cd spaceship-travel-system-api
   npm install

   ```

3. **Database Setup:**

- Make sure you have MySQL installed and running on your local machine.
- Import the database schema from the `spaceship travel system SQL script.sql` file.
- Run the script file to create the database and the tables.

4. **Environment Variables:**

- Open the `.env` file in the root directory.
- Replace the values with your own credentials:
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_password
  DB_DATABASE=spaceship_travel_system
  ```

5. **Start the Server:**

   ```bash
   npm start

   ```

6. **Accessing the API:**

- The API server will start running on `http://localhost:3000`.
- You can now send requests to the API endpoints using tools like Postman or directly from your application.

---

#### API Endpoints:

- **Spaceships:**
- `GET /spaceships`: Retrieve a list of all spaceships.
- `POST /spaceships`: Add a new spaceship.
- `GET /spaceships/:id`: Retrieve a single spaceship by ID.
- `PUT /spaceships/:id`: Update a spaceship's information.
- `PATCH /spaceships/:id`: Partially update a spaceship's information.
- `DELETE /spaceships/:id`: Delete a spaceship.

- **Crew Members:**
- `GET /crewmembers`: Retrieve a list of all crew members.
- `POST /crewmembers`: Add a new crew member.
- `GET /crewmembers/:id`: Retrieve a single crew member by ID.
- `PUT /crewmembers/:id`: Update a crew member's information.
- `PATCH /crewmembers/:id`: Partially update a crew member's information.
- `DELETE /crewmembers/:id`: Delete a crew member.

- **Missions:**
- `GET /missions`: Retrieve a list of all missions.
- `POST /missions`: Add a new mission.
- `GET /missions/:id`: Retrieve a single mission by ID.
- `PUT /missions/:id`: Update a mission.
- `PATCH /missions/:id`: Partially update a mission.
- `DELETE /missions/:id`: Delete a mission.

---

#### Examples:

1.**Adding a New Spaceship:**

    ```json
    POST /api/v1/spaceships
    Content-Type: application/json

    {
        "name": "Apollo 11",
        "capacity": 6,
        "launch_date": "2025-07-20T14:00:00.000Z",
        "status": "Active"
    }

2.**Retrieving All Crew Members:**

    ```json
    GET /api/v1/crewmembers

3.**Creating a New Mission:**

    ```json
    POST /api/v1/missions
    Content-Type: application/json

    {
        "spaceship_id": 1,
        "destination": "Mars",
        "launch_date": "2026-04-15T10:30:00.000Z",
        "duration": 720
    }

---

#### Database Schema:

[Database Schema On Diagrams](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=spaceship%20travel%20system.png#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22qv5i45yFEz2y2h3L0Bzh%22%3E7V1bd9o4EP41nLP7kByMsZM8ckmbniXdNklvTzkKFqBWWK4tAvTXr2RLxo4MsQkYFukpaCzLYuab%2BeTRoDTs3nTxPgTB5JZ4EDdaTW%2FRsPuNVstqtlvsD5csE4lj24lgHCJPdFoJ7tEfKO8U0hnyYJTrSAnBFAV54ZD4PhzSnAyEIZnnu40Izj81AGOoCO6HAKvSb8ijk0R66TRX8huIxhP5ZKsprkyB7CwE0QR4ZJ4R2dcNuxcSQpNP00UPYq48qZfkvndrrqYTC6FPy9zQvrpwz%2B4%2Bd35%2FbT33fn379%2BamNTi7EOaJ6FJ%2BY%2BgxBYgmCemEjIkP8PVK2g3JzPcgH7bJWqs%2BA0ICJrSY8CekdCmsCWaUMNGETrG4ymYcLr%2BL%2B%2BPGD944d2Szv8he7C9Fi6kw4CNi5P9iTVUDQikRmYVDuOFrSySBcAzphn5tN%2BnIdZJ5glDwe0imkM2PdQghBhQ950EDBPbGab%2BVedgHYaEq1rpIBn4GeCYe1Wi5mH2D7ogwHWTt6P6eEXnhLIot0WEdLCdYxKqT19mnMf%2FL5ty8laOx2SUDJtcKMTIAT8zXc3YFGI199nnIDAJDJniGIUXMmTriwhR5XgIhyKYEnuLxuGUDgnwaq8vpNpx%2BoXE3Apg%2FCS4aBSFBPCXndTnbibua5%2B22fZXcKoKVGLu0ccXYn%2FiXyXQho1HEYPbS%2BukUtgeEpeAhCsAQRhMUKDaTziMU0o0Y%2BqlwUZvbgOmLAuRzw8XWHBKMQRChRH%2BxZIKwNwBLMqNyINnqjtACendJvLXiIDEfsMEiYWAOJxlVCqESI4INF1HRI4OrtY6uWH2tdS0ZhoVp26I5XwV160rIJpmAnnbcuTO3FNttNtkdJ4%2FuhIToDzcUljExY8a4PUdTDHzGSsB7IeoST0bSEcK4RzDhtvaJDxVz805eSIIHGSJVL%2B0yzfR40Gb%2B2uqxtrVqxy4cMGroET%2BiIUCx4SCz7hxyC3dpTBV8UAxHcvxQ6J1%2FfiKUkulaAGx0h9dRIVBgl0SBvS8Q2AoIPv2zFgbs%2B1ME8B0Pav4YJ0bLxrg1li3Udarfl4p%2F6amEqXOE45XLhIVvyLy2O58gCu95qGHSOVv5veavGz3gdXNl7GNXNI8YbKW0yqMBzCKUDyjzH7buifYRx9sKDHj3zoePDwcGgwzTSd8uZxfkjwfJne4LtDhHgpbFeud2d4qeUsPVAB%2FHUEkpKmnukUrcQ1OJWx4E9cQO6CE53n55xCltq1PnEfX90AdT%2Fub3tXPXu%2Bnc%2FfXl44fP138fO6kcA1S0I5FLQyIHJ5GrQ5PIlbYkclnaVqdOIjL1ngHBEPAYTZf%2Fj3eSYwCJdvRhqblIwx9180ea5TwYgVgV0ponxiBWeXOdPIWoeU0MZv5w8uix5zIWefhwe33%2F0Ln9pC%2BXVICLdmTSVpcghkxqJxPn0GTSrrCmODEyST3AkIksIcruclNAZ2wGneuPX271pZAKINGPQiqkMgyF7ItCLg9NIU6FlcSpUchVaXOdOoU46kJiGEL2SK9DzdtIRbBoRyVOhZyGoZI9UUlaEX44KlGTGrpQSeoBhkoctVZrFniGSrYCi3ZUYqnoYQuR%2BeMUTp9gGG2mlYZuRduOXL2vr7FqNQsMu7%2BibcuU2pVbClRJhLdL42J92XYhDva3y6UW22lUt22ZgrtUFWrFnancfgNeNiwILna7ICgzXB1pygovFYZQ9kUoZRcW%2B9vpUteF7%2FQhlNQJDKG01QVm%2BpPOR3anIZXqmNGOVCxTy737hGVlUiko5q75LUXfam7LlHOnv5tUd0DzPwo6dk45CpRoxyGtCrVXhkP2xSFFBd31kog0u4YkUiFhffIkoqYpQoINiVRDiX4koqY1DInUTyIFhdw1k0iFbbNTI5Hy5jp5ElF3zeAigCGC%2FhA%2BYvjMz5MzhFIBMdoRimP234%2BBUArKuuslFEfj027M7nuqCnX33ZR1bwsW%2FbjE7JIcAZcU1XXXzCX6bpM4ZpskPT5P3SYxdd3bgkU7LmmpK5EpiiJE%2FM2U0tCtpNuWfiZLeS8KMHJZYNQ9HsRt1gE7L8FL%2FeFNR3EX4WB%2FOUp1GaBRTXfLrATSM9nVlYCp6X4DXjYsBpzdLgbKDFdHDWeF5JQhlH0RStGB3LUSSltdE%2BpU0%2B2WNtipE0pbXWDy0C1Lug2zbAsc7ZjFNkV5O09ZVmeWolO6a2UWu1UeBieWsbRNTV6qCrUmz2N%2BgthTed7JVFJUAYt%2BVGJK846ASgoP7K6XS%2FQtzbNNaV6qCjVlYQ7s3h4u%2BrFJ0X8mNmxSN5sUndhdL5tU2Es7NTYpb66TZxN1K60%2FC81rSXWkaEckrslwHQORFJ3bXSuRuPqmuFyT4kpVoaa4TIH3tmDRj0tMiusIuKTw4O56uUTfFJdrUlypKtQUlynw3hYs%2BnHJlYIL6I2hLIlgYXhCxsQH%2BHol7YZ8OlByxKrPgMSQ4Kb5CSldCm4BM0ryhmP2CpffZdDgjR%2B8ce7IZn%2BRvdiX3CMhi5H%2Fq9D%2BYtUQkVk4hJvCfdKPSopa10%2Bexsd1shE4IcSAomeYm8ZaWHTCECwzHQQ7rkb%2BxAUrPLYlMgT3XDpZLLza3bKdF9hJJrBTJF0UVQe6mDs7L7LJYcz9PSPywlkUo6TDOlhOsIjNKq%2BzT2P%2Bl%2BnTBVPu%2Ff5TFCQXcNLhXTJ40k%2BKPfT8puftbOK3r0yUieO5SmmBKw7AEz8%2FIOs%2Byo8beGRDQ4A74sKUBdDEU%2FmvHjJhPL8M61eIoev%2Bj06rmScLJmtujK1nzfNm087hU%2F7XlGpOpMD%2BxQ1kNIqYc1cKmqwZEm7BVXfGOpNb4nEbXP8H%3C%2Fdiagram%3E%3C%2Fmxfile%3E)

---

#### API Documentation:

[API Documentation In Postman](https://speeding-capsule-4673.postman.co/workspace/spaceship-travel-system~8b5586ca-b582-48c0-a707-acfd90349d90/collection/29726783-6d90a496-bb16-4fdf-97b8-52a69c88d179?action=share&creator=29726783)

---

#### Additional Notes:

- Make sure to replace `your_password` in the `.env` file with your actual MySQL password.
- Error handling is implemented to handle various scenarios such as invalid requests, database errors, etc.

---

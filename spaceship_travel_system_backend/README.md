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
   git clone https://github.com/your-username/spaceship-travel-system-api.git

   ```

2. **Install Dependencies:**

   ```bash
   cd spaceship-travel-system-api
   npm install

   ```

3. **Database Setup:**

- Make sure you have MySQL installed and running on your local machine.
- Create a new database named `spaceship_travel_system`.
- Import the database schema from the `database/schema.sql` file.

4. **Environment Variables:**

- Create a `.env` file in the root directory.
- Add the following environment variables:
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

[Database Schema On Diagrams](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=spaceship%20travel%20system.png#R7Z3fV%2BI4FMf%2FGs6ZfdBDKUV9BHRWz6I7o86vJ0%2BkATKGhmmDwPz1e9MmUEjLtCqVJfFFkqZpyP3e%2BwnppdTc7nj%2Bd4gmo2vmY1pr1P15zT2vNRpOvdmAf6JmkdR4rpdUDEPiy0arijvyG6szZe2U%2BDhaa8gZo5xM1iv7LAhwn6%2FVoTBks%2FVmA0bXrzpBQ6xV3PUR1Wu%2FEZ%2BPktpTr76qv8RkOFJXduryyCPqPw1DNg3k9WoNdxD%2FJYfHSPUl20cj5LNZqsq9qLndkDGevBrPu5iKuVXTlpz3MefoctwhDniRE5pnJ62j28%2FtX18bz92nb%2F9eXjZ6RyfSehFfqAnBPsyPLLKQj9iQBYherGo78ZvGots6lFZteoxNoNKByp%2BY84U0NppyBlUjPqbyKIw4XHyX58eFH6Jw7Kni%2BTx98HwhSzCFE9EjJcETFJOhi%2FHmTomsitg07OMt86CUh8Ih5lvaNVtLy4FHYDbGMD44McQUcfK8PhAkpTlctluZB15IC5Wx1knS8TOiU6xU16Iw4M6AwVtO27H1a8rUgaMotkQbGjjeZB5PnToOr4biP4y5fq16g9ElHSbHMjXSQ48QCtbsiigZBvC6D%2FOPQ6h4xiEn4GtteWBMfD%2BREIYhoce4P2HZCSMBj6fL69S88%2BU1RQd4XssIBPLklX%2Blzb5F67rtZPf142bTPUv6krFMOkdh48q%2BP4k3k2rCBoMIVLVp%2FeUQXi4IR9NDNEF9HI3IRLOZch45c50IxM6li7rCBjCxHJFAGC62Zp9RiiYRSSY6rhkR6vfQgk256kiVOgMyx%2F5tEo6dOEjMetBZJA0s5KSiSqZUYkVAdxGXLVK6ytWC5uq51nWUTKRpm7I4W8V850zWjVLxftnwzZ25keHL20x2K%2BDRGbGQ%2FBaGoiompswYl2dkTFEA0EL%2BRlWH%2BSqSDgilXUaZsHXAAqyZWzTyQza5VxFR99IOzExXBG3w10YXys6qHLvwBNDQZUHEQ0RiK2Gw7gwLC3d4jArRKcUD1X8o5128fmScs3EZAeR7iK4KqQK3oArcXYnA1UTw6Z9cGcCb5QTRWxH9giFNjJYOhjmWzZzr5fxuTvympzKY9gGNVy4jCN8YvLYzGxGO70SogdoZLAxf4K%2F5TqGbK2Uft6R5ZGerSSvdG6IQoQLEwX9g3RPtIo43NRmI5u2rm%2Ft3FoMK00nbjqALCYa95MzWhlq8PVHLPN%2B5W2%2BqnkLdVSAfz6KkEErqO0RJ671R0iougmpiB%2FaJ6q9yjnhmckT%2FfBigsfjk97V9271s3374cnP1%2BeKvfYfKPkjFOIicWoi8O0TO3hsiZxYiGx5hHkTUznxKBH0kYjRf%2FD8%2Bk%2ByDSIzDh6PvRVp%2BVM2P5S7nuwHEKbGtefgEcXLMdfAI0fc1KZoG%2FdGDD9cFitxfXV%2Fc3bevP1mWFJCLcTBp6ksQC5PKYeK9N0yaJdYUhw%2BTZj3bXIcOE5VhlL7LzRGfwgjaFzdfri1CCojEPISU2MqwCNkVQk7fGyFeiZWEAQg5MxMhnr6Q6IcYLum3uf00UlIsxqHEK7GnYVGyI5QsE8bfDyX6pobBKEmcwkCU6Lla04lvUfIisRiHEkdXDyxEZg9jPH7EYbQdKzXTkrY9tXrPz7Fq1DMMu7ukbcem2hVbCrxyI7y5dS2QES8ydbC7u1x6sp3ZeduOoQl3jp5xZzO3X6GXLQuCk7ddEBTproptyhIfKixQdgWUoguL3d3p0teFH40GSuIX5gGlqS8wl1%2FpfIAzLVTKa8Y4qDg2l7uSDcvtUMlI5q74U4rN5tacwjyiqJTQ3C8F7TtT9kIlxjGkUSL3yjJkVwzJSuiuFiLK7BYiK68wECL6NkXIhAlsBl5RiZhHEH1PwxKkeoJkZHFXTJAS98wMIEiOuQ6eIPotMzyf4JDgoI8fKH4WD5OzNCkqF%2BNo4tk77%2FtAk4yE7mpp4tnn3GheYR5NPP2%2Bu03ofqlYzGOJvT%2ByByzJyuiumCX2BonmFeaxRCV%2F2IzuNxCLcSxp6CuRMYkiwoLtSKmZlsztKj9TSbwnGRo5zTDqDh%2FBbdcBVSTfJS5SJps7Uwe726DUlwFmZ3M3DF0JuPpKwGZzv0IvWxYD3tsuBop0V0X2ZonNKQuUXQEl61HclQKlqa8JzQZK3s8mHTpQmvoCU4RulcxtyfJS4RhHFtem41WxZfkHsmQ9n7tSsriN4jI4%2FB1L19BsPFfPxvPBTwhcVew72czuMmIxDyU2L28PUJL5qO5qWWLz8jSvMJAl%2BpaFfVT3y%2BViHk2yfpPY0qRqmmQ9q7tampS4l2YATXLMdfA00W%2Bl%2BdNQfSy5urn%2FMCbBlOPI%2FgZdEbkYR5OW3ebaB5pkPba7Upq07D6X5hXm0aSl73PZLO%2BXisU8lth9rj1gSeZzu6tlid3n0rzCQJbo%2B1w2y%2FulYjGPJWeaLrA%2FxCovAsLwiA1ZgOjFqrYTiuFgxYhVmx6LJSFM8xNzvpBsQVPO1g0HxgkX31XQEIUfonDsqeL5PH3wXLFHSZaS4GlpfzHeXOvLqohNwz7eFuyTdlwxK69d3qP4QkwRJ8%2FrA8mVRTsM0SLVQNJx1fMnUbHSY1MpQ7Ln1Etr4Y%2FNHdfb0E4ygDdV0klWimCLCmcXmTZrGmv9mjJ14CiKVdKGBo43mcdmVcfh1VD8h%2FlsobHw%2FuAxmiQHaNLgY9J50k5V%2B%2BT5Vdd7s4Ff%2F2GgUB2PVdVmuGIPPYonCKTdR%2FuGgwiBpI9oWx4YQwBNPFV89SEVxteXYefbYug6A6CuXjS2bv95naP6cb3urunzSF6ynBNpst84gQ0GEfhyqaAJxZAJC66aA3VG18wXNrj4Dw%3D%3D)

---

#### API Documentation:

[API Documentation In Postman](https://speeding-capsule-4673.postman.co/workspace/spaceship-travel-system~8b5586ca-b582-48c0-a707-acfd90349d90/collection/29726783-6d90a496-bb16-4fdf-97b8-52a69c88d179?action=share&creator=29726783)

---

#### Additional Notes:

- Make sure to replace `your_password` in the `.env` file with your actual MySQL password.
- Error handling is implemented to handle various scenarios such as invalid requests, database errors, etc.

---

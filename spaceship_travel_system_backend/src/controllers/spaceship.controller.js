import db from "../config/db.js";
import { validationResult } from "express-validator";
import util from "util";

console.log("spaceship controllers file");

export const getAllSpaceships = async (req, res) => {
  console.log("get in getAllSpaceships controller");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const queryAsync = util.promisify(db.query).bind(db);

    const result = await queryAsync(
      `SELECT * FROM spaceship LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    if (result.length === 0) {
      console.log("No spaceships found");
      return res.status(404).json({
        message: "No spaceships found",
        spaceships_list: result,
        currentPage: page,
        totalPages: Math.ceil(result.length / limit),
      });
    }

    const countResult = await queryAsync(
      "SELECT COUNT(*) AS count FROM spaceship"
    );
    const totalCount = countResult[0].count;

    res.status(200).json({
      spaceships_list: result,
      total: totalCount, // Ensure this is the total count
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", details: error });
  }
};

export const getSpaceshipById = async (req, res) => {
  console.log("get in the getSpaceshipById controller");
  try {
    const spaceship_id = req.params.id;
    console.log(spaceship_id);

    if (!/^\d+$/.test(spaceship_id)) {
      console.log("no id provided");
      return res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
    }

    const queryAsync = util.promisify(db.query).bind(db);
    const result = await queryAsync("SELECT * FROM spaceship WHERE id = ?", [
      spaceship_id,
    ]);

    if (result.length === 0) {
      console.log("no spaceship found");
      return res.status(404).json({ message: "no spaceship found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", details: error });
  }
};

export const addNewSpaceship = async (req, res) => {
  console.log("get in the addNewSpaceship controller");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    let { name, capacity, launch_date, status } = req.body;

    const queryAsync = util.promisify(db.query).bind(db);
    const existingSpaceship = await queryAsync(
      `SELECT * FROM spaceship WHERE name = ?`,
      [name]
    );

    if (existingSpaceship && existingSpaceship.length > 0) {
      return res.status(409).json({ message: "Spaceship name already exists" });
    }

    const result = await queryAsync(
      `INSERT INTO spaceship (name, capacity, launch_date, status) VALUES (?, ?, ?, ?)`,
      [name, capacity, launch_date, status]
    );

    return res.status(201).json({
      message: "Spaceship added successfully",
      spaceshipId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSpaceshipInfo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    const spaceship_id = req.params.id;
    console.log(spaceship_id);

    if (!/^\d+$/.test(spaceship_id)) {
      console.log("no id provided");
      res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
      return;
    }

    // Check if spaceship with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const spaceships = await queryAsync(
      "SELECT * FROM spaceship WHERE id = ?",
      [spaceship_id]
    );
    if (spaceships.length === 0) {
      console.log("No spaceship found for this ID:", spaceship_id);
      return res
        .status(404)
        .json({ message: "No spaceship found for this ID: " + spaceship_id });
    }

    // Update spaceship information
    const { name, capacity, launch_date, status } = req.body;
    await queryAsync(
      "UPDATE spaceship SET name = ?, capacity = ?, launch_date = ?, status = ? WHERE id = ?",
      [name, capacity, launch_date, status, spaceship_id]
    );
    return res
      .status(200)
      .json({ message: "Spaceship information updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSpaceshipPartialInfo = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    // Extract spaceship ID from request parameters
    const spaceship_id = req.params.id;

    if (!/^\d+$/.test(spaceship_id)) {
      console.log("no id provided");
      res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
      return;
    }

    // Check if spaceship with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const spaceships = await queryAsync(
      "SELECT * FROM spaceship WHERE id = ?",
      [spaceship_id]
    );
    if (spaceships.length === 0) {
      return res
        .status(404)
        .json({ message: "No spaceship found for the provided ID" });
    }

    // Prepare SQL update query based on provided fields in request body
    let updateQuery = "UPDATE spaceship SET ";
    const queryParams = [];
    const { name, capacity, launch_date, status } = req.body;

    if (name !== undefined) {
      updateQuery += "name = ?, ";
      queryParams.push(name);
    }
    if (capacity !== undefined) {
      updateQuery += "capacity = ?, ";
      queryParams.push(capacity);
    }
    if (launch_date !== undefined) {
      updateQuery += "launch_date = ?, ";
      queryParams.push(launch_date);
    }
    if (status !== undefined) {
      updateQuery += "status = ?, ";
      queryParams.push(status);
    }

    // Remove trailing comma and space from the query
    updateQuery = updateQuery.slice(0, -2);

    // Add WHERE clause for the specific spaceship ID
    updateQuery += " WHERE id = ?";
    queryParams.push(spaceship_id);

    // Execute the update query
    await queryAsync(updateQuery, queryParams);

    return res
      .status(200)
      .json({ message: "Spaceship information updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkReferences = async (req, res) => {
  const spaceshipId = req.params.id;
  try {
    const queryAsync = util.promisify(db.query).bind(db);

    const missionCount = await queryAsync(
      "SELECT COUNT(*) AS count FROM mission WHERE spaceship_id = ?",
      [spaceshipId]
    );
    const crewMemberCount = await queryAsync(
      "SELECT COUNT(*) AS count FROM crew_members WHERE spaceship_id = ?",
      [spaceshipId]
    );

    const hasReferences =
      missionCount[0].count > 0 || crewMemberCount[0].count > 0;

    res.status(200).json(hasReferences);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", details: error });
  }
};

export const deleteSpaceship = async (req, res) => {
  try {
    // Extract spaceship ID from request parameters
    const spaceship_id = req.params.id;

    // Check if spaceship ID is valid
    if (!/^\d+$/.test(spaceship_id)) {
      return res.status(400).json({ message: "Invalid spaceship ID" });
    }

    // Check if spaceship with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const spaceships = await queryAsync(
      "SELECT * FROM spaceship WHERE id = ?",
      [spaceship_id]
    );

    if (spaceships.length === 0) {
      return res
        .status(404)
        .json({ message: "No spaceship found for the provided ID" });
    }

    // Delete the spaceship
    await queryAsync("DELETE FROM spaceship WHERE id = ?", [spaceship_id]);

    return res.status(200).json({ message: "Spaceship deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

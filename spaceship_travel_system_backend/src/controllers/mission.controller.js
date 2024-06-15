import db from "../config/db.js";
import { validationResult } from "express-validator";
import util from "util";

console.log("mission controllers file");

export const getAllMissions = async (req, res) => {
  console.log("get in getAllMissions controller");

  // Pagination parameters
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default limit to 5 missions per page

  // Calculate offset based on page and limit
  const offset = (page - 1) * limit;

  try {
    const queryAsync = util.promisify(db.query).bind(db);

    // Query to fetch missions with pagination
    const result = await queryAsync(`SELECT * FROM mission LIMIT ?, ?`, [
      offset,
      limit,
    ]);

    if (result.length === 0) {
      console.log("No missions found");
      return res.status(404).json({
        message: "No missions found",
        missions_list: result,
        currentPage: page,
        totalPages: Math.ceil(result.length / limit),
      });
    }

    // Count total number of missions for pagination metadata
    const countResult = await queryAsync(
      "SELECT COUNT(*) AS count FROM mission"
    );
    const totalCount = countResult[0].count;

    res.status(200).json({
      missions_list: result,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", details: error });
  }
};

export const getMissionById = async (req, res) => {
  console.log("get in the getMissionById controller");
  try {
    const mission_id = req.params.id;
    console.log(mission_id);

    if (!/^\d+$/.test(mission_id)) {
      console.log("no id provided");
      return res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
    }

    const queryAsync = util.promisify(db.query).bind(db);
    const result = await queryAsync("SELECT * FROM mission WHERE id = ?", [
      mission_id,
    ]);

    if (result.length === 0) {
      console.log("no mission found");
      return res.status(404).json({ message: "no mission found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", details: error });
  }
};

export const addNewMission = async (req, res) => {
  console.log("Entered the addNewMission controller");
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    const { spaceship_id, destination, launch_date, duration } = req.body;

    const queryAsync = util.promisify(db.query).bind(db);

    // Check for overlapping missions
    const overlappingMissions = await queryAsync(
      `SELECT * FROM mission WHERE spaceship_id = ? AND launch_date = ?`,
      [spaceship_id, launch_date]
    );

    if (overlappingMissions.length > 0) {
      return res.status(409).json({
        message:
          "A mission is already scheduled for this spaceship at the given launch date",
      });
    }

    // Insert the new mission
    const result = await queryAsync(
      `INSERT INTO mission (spaceship_id, destination, launch_date, duration) VALUES (?, ?, ?, ?)`,
      [spaceship_id, destination, launch_date, duration]
    );

    return res.status(201).json({
      message: "Mission added successfully",
      missionId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMissionInfo = async (req, res) => {
  console.log("get in the updateMissionInfo controller");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    const mission_id = req.params.id;
    console.log(mission_id);

    if (!/^\d+$/.test(mission_id)) {
      console.log("no id provided");
      res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
      return;
    }

    // Check if mission with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const crewMember = await queryAsync("SELECT * FROM mission WHERE id = ?", [
      mission_id,
    ]);
    if (crewMember.length === 0) {
      console.log("No mission found for this ID:", mission_id);
      return res
        .status(404)
        .json({ message: "No mission found for this ID: " + mission_id });
    }

    // Update mission information
    const { spaceship_id, destination, launch_date, duration } = req.body;
    await queryAsync(
      "UPDATE mission SET spaceship_id = ?, destination = ?, launch_date = ?, duration = ? WHERE id = ?",
      [spaceship_id, destination, launch_date, duration, mission_id]
    );
    return res
      .status(200)
      .json({ message: "mission information updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMissionPartialInfo = async (req, res) => {
  console.log("get in the updateMissionPartialInfo controller");
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    // Extract mission ID from request parameters
    const mission_id = req.params.id;

    if (!/^\d+$/.test(mission_id)) {
      console.log("no id provided");
      res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
      return;
    }

    // Check if mission with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const mission = await queryAsync("SELECT * FROM mission WHERE id = ?", [
      mission_id,
    ]);
    if (mission.length === 0) {
      return res
        .status(404)
        .json({ message: "No mission found for the provided ID" });
    }

    // Prepare SQL update query based on provided fields in request body
    let updateQuery = "UPDATE mission SET ";
    const queryParams = [];
    const { spaceship_id, destination, launch_date, duration } = req.body;

    if (spaceship_id !== undefined) {
      updateQuery += "spaceship_id = ?, ";
      queryParams.push(spaceship_id);
    }
    if (destination !== undefined) {
      updateQuery += "destination = ?, ";
      queryParams.push(destination);
    }
    if (launch_date !== undefined) {
      updateQuery += "launch_date = ?, ";
      queryParams.push(launch_date);
    }
    if (duration !== undefined) {
      updateQuery += "duration = ?, ";
      queryParams.push(duration);
    }

    // Remove trailing comma and space from the query
    updateQuery = updateQuery.slice(0, -2);

    // Add WHERE clause for the specific mission ID
    updateQuery += " WHERE id = ?";
    queryParams.push(mission_id);

    // Execute the update query
    await queryAsync(updateQuery, queryParams);

    return res
      .status(200)
      .json({ message: "mission information updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMission = async (req, res) => {
  console.log("get in the deleteMission controller");
  try {
    // Extract mission ID from request parameters
    const mission_id = req.params.id;

    // Check if mission  ID is valid
    if (!/^\d+$/.test(mission_id)) {
      return res.status(400).json({ message: "Invalid mission ID" });
    }

    // Check if mission with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const crewMember = await queryAsync("SELECT * FROM mission WHERE id = ?", [
      mission_id,
    ]);

    if (crewMember.length === 0) {
      return res
        .status(404)
        .json({ message: "No mission found for the provided ID" });
    }

    // Delete the spaceship
    await queryAsync("DELETE FROM mission WHERE id = ?", [mission_id]);

    return res.status(200).json({ message: "mission deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

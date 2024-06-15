import db from "../config/db.js";
import { validationResult } from "express-validator";
import util from "util";

console.log("crew members controllers file");

export const getAllCrewMembers = async (req, res) => {
  console.log("get in getAllCrewMembers controller");

  // Pagination parameters
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default limit to 5 crew members per page

  // Calculate offset based on page and limit
  const offset = (page - 1) * limit;

  try {
    const queryAsync = util.promisify(db.query).bind(db);

    // Query to fetch crew members with pagination
    const result = await queryAsync(`SELECT * FROM crew_members LIMIT ?, ?`, [
      offset,
      limit,
    ]);

    if (result.length === 0) {
      console.log("No crew members found");
      return res.status(404).json({
        message: "No crew members found",
        crewMembers_list: result,
        currentPage: page,
        totalPages: Math.ceil(result.length / limit),
      });
    }

    // Count total number of crew members for pagination metadata
    const countResult = await queryAsync(
      "SELECT COUNT(*) AS count FROM crew_members"
    );
    const totalCount = countResult[0].count;

    res.status(200).json({
      crewMembers_list: result,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", details: error });
  }
};

export const getCrewMemberById = async (req, res) => {
  console.log("get in the getCrewMemberById controller");
  try {
    const crewMember_id = req.params.id;
    console.log(crewMember_id);

    if (!/^\d+$/.test(crewMember_id)) {
      console.log("no id provided");
      return res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
    }

    const queryAsync = util.promisify(db.query).bind(db);
    const result = await queryAsync("SELECT * FROM crew_members WHERE id = ?", [
      crewMember_id,
    ]);

    if (result.length === 0) {
      console.log("no crew member found");
      return res.status(404).json({ message: "no crew member found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", details: error });
  }
};

export const addNewCrewMember = async (req, res) => {
  console.log("get in the addNewCrewMember controller");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    const { spaceship_id, name, role, experience_level } = req.body;

    const queryAsync = util.promisify(db.query).bind(db);
    const existingCrewMember = await queryAsync(
      "SELECT * FROM crew_members WHERE name = ? AND spaceship_id = ?",
      [name, spaceship_id]
    );

    if (existingCrewMember.length > 0) {
      return res
        .status(409)
        .json({ message: "Crew member name already exists on this spaceship" });
    }

    const result = await queryAsync(
      "INSERT INTO crew_members (spaceship_id, name, role, experience_level) VALUES (?, ?, ?, ?)",
      [spaceship_id, name, role, experience_level]
    );

    return res.status(201).json({
      message: "Crew member added successfully",
      crewMemberId: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCrewMemberInfo = async (req, res) => {
  console.log("get in the updateCrewMemberInfo controller");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    const crewMember_id = req.params.id;
    console.log(crewMember_id);

    if (!/^\d+$/.test(crewMember_id)) {
      console.log("no id provided");
      res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
      return;
    }

    // Check if crew_member with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const crewMember = await queryAsync(
      "SELECT * FROM crew_members WHERE id = ?",
      [crewMember_id]
    );
    if (crewMember.length === 0) {
      console.log("No Crew Member found for this ID:", crewMember_id);
      return res
        .status(404)
        .json({
          message: "No Crew Member found for this ID: " + crewMember_id,
        });
    }

    // Update crew member information
    const { spaceship_id, name, role, experience_level } = req.body;
    await queryAsync(
      "UPDATE crew_members SET spaceship_id = ?, name = ?, role = ?, experience_level = ? WHERE id = ?",
      [spaceship_id, name, role, experience_level, crewMember_id]
    );
    return res
      .status(200)
      .json({ message: "Crew member information updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCrewMemberPartialInfo = async (req, res) => {
  console.log("get in the updateCrewMemberPartialInfo controller");
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ error: errorMessages });
    }

    // Extract crew member  ID from request parameters
    const crewMember_id = req.params.id;

    if (!/^\d+$/.test(crewMember_id)) {
      console.log("no id provided");
      res
        .status(400)
        .json({ message: "no id provided check the id if correct or not " });
      return;
    }

    // Check if crew member with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const crewMember = await queryAsync(
      "SELECT * FROM crew_members WHERE id = ?",
      [crewMember_id]
    );
    if (crewMember.length === 0) {
      return res
        .status(404)
        .json({ message: "No crew member found for the provided ID" });
    }

    // Prepare SQL update query based on provided fields in request body
    let updateQuery = "UPDATE crew_members SET ";
    const queryParams = [];
    const { spaceship_id, name, role, experience_level } = req.body;

    if (spaceship_id !== undefined) {
      updateQuery += "spaceship_id = ?, ";
      queryParams.push(spaceship_id);
    }
    if (name !== undefined) {
      updateQuery += "name = ?, ";
      queryParams.push(name);
    }
    if (role !== undefined) {
      updateQuery += "role = ?, ";
      queryParams.push(role);
    }
    if (experience_level !== undefined) {
      updateQuery += "experience_level = ?, ";
      queryParams.push(experience_level);
    }

    // Remove trailing comma and space from the query
    updateQuery = updateQuery.slice(0, -2);

    // Add WHERE clause for the specific crew member ID
    updateQuery += " WHERE id = ?";
    queryParams.push(crewMember_id);

    // Execute the update query
    await queryAsync(updateQuery, queryParams);

    return res
      .status(200)
      .json({ message: "Crew member information updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCrewMember = async (req, res) => {
  console.log("get in the deleteCrewMember controller");
  try {
    // Extract crew member ID from request parameters
    const crewMember_id = req.params.id;

    // Check if crew member  ID is valid
    if (!/^\d+$/.test(crewMember_id)) {
      return res.status(400).json({ message: "Invalid crew member ID" });
    }

    // Check if crew member with provided ID exists
    const queryAsync = util.promisify(db.query).bind(db);
    const crewMember = await queryAsync(
      "SELECT * FROM crew_members WHERE id = ?",
      [crewMember_id]
    );

    if (crewMember.length === 0) {
      return res
        .status(404)
        .json({ message: "No crew member found for the provided ID" });
    }

    // Delete the spaceship
    await queryAsync("DELETE FROM crew_members WHERE id = ?", [crewMember_id]);

    return res
      .status(200)
      .json({ message: "crew member deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

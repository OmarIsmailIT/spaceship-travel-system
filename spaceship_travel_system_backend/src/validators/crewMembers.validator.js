import { body, param } from "express-validator";
import util from "util";
import db from "../config/db.js";
export const validateCrewMemberInput = [
  body("spaceship_id")
    .notEmpty()
    .withMessage("Spaceship ID is required")
    .isInt()
    .withMessage("Spaceship ID must be an integer")
    .custom(async (value) => {
      const queryAsync = util.promisify(db.query).bind(db);
      const spaceship = await queryAsync(
        "SELECT id FROM spaceship WHERE id = ?",
        [value]
      );
      if (spaceship.length === 0) {
        throw new Error("Spaceship ID does not exist");
      }
      return true;
    }),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 255 })
    .withMessage("Name must be at most 255 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn([
      "Captain",
      "First Officer",
      "Engineer",
      "Pilot",
      "Scientist",
      "Medical Officer",
      "Technician",
      "Navigator",
      "Communications Officer",
      "Security Officer",
    ])
    .withMessage(
      "Role must be one of: Captain, First Officer, Engineer, Pilot, Scientist, Medical Officer, Technician, Navigator, Communications Officer, Security Officer"
    ),
  body("experience_level")
    .notEmpty()
    .withMessage("Experience level is required")
    .isIn(["Novice", "Skilled", "Expert"])
    .withMessage("Experience level must be one of: Novice, Skilled, Expert"),
];

export const validateCrewMemberPartialUpdate = [
  body("spaceship_id")
    .optional()
    .isInt()
    .withMessage("Spaceship ID must be an integer")
    .custom(async (value) => {
      const queryAsync = util.promisify(db.query).bind(db);
      const spaceship = await queryAsync(
        "SELECT id FROM spaceship WHERE id = ?",
        [value]
      );
      if (spaceship.length === 0) {
        throw new Error("Spaceship ID does not exist");
      }
      return true;
    }),
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 255 })
    .withMessage("Name must be at most 255 characters long"),
  body("role")
    .optional()
    .isIn([
      "Captain",
      "First Officer",
      "Engineer",
      "Pilot",
      "Scientist",
      "Medical Officer",
      "Technician",
      "Navigator",
      "Communications Officer",
      "Security Officer",
    ])
    .withMessage(
      "Role must be one of: Captain, First Officer, Engineer, Pilot, Scientist, Medical Officer, Technician, Navigator, Communications Officer, Security Officer"
    ),
  body("experience_level")
    .optional()
    .isIn(["Novice", "Skilled", "Expert"])
    .withMessage("Experience level must be one of: Novice, Skilled, Expert"),
];

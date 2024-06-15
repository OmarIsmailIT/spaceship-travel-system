import { body, param } from "express-validator";
import util from "util";
import db from "../config/db.js";

export const validateMissionInput = [
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
  body("destination")
    .notEmpty()
    .withMessage("Destination is required")
    .isString()
    .withMessage("Destination must be a string")
    .isLength({ max: 255 })
    .withMessage("Destination must be at most 255 characters long"),
  body("launch_date")
    .notEmpty()
    .withMessage("Launch date is required")
    .isISO8601()
    .withMessage(
      "Launch date must be a valid date-time format like this YYYY-MM-DD HH:MM:SS"
    ),
  body("duration")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer if provided"),
];

export const validateMissionPartialUpdate = [
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
  body("destination")
    .optional()
    .isString()
    .withMessage("Destination must be a string")
    .isLength({ max: 255 })
    .withMessage("Destination must be at most 255 characters long"),
  body("launch_date")
    .optional()
    .isISO8601()
    .withMessage(
      "Launch date must be a valid date-time format like this YYYY-MM-DD HH:MM:SS"
    ),
  body("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer if provided"),
];

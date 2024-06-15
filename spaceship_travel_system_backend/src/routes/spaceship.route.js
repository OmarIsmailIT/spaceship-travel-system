import express from "express";
const router = express.Router();
import * as spaceshipController from "../controllers/spaceship.controller.js";
import * as spaceshipValidators from "../validators/spaceship.validator.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


console.log("spaceship router");
router.get("/" ,spaceshipController.getAllSpaceships);// remember to back isAuthenticated
router.get("/:id" ,spaceshipController.getSpaceshipById);
router.post("/add_spaceship" ,spaceshipValidators.validateSpaceshipInput, spaceshipController.addNewSpaceship);
router.put("/:id",spaceshipValidators.validateSpaceshipInput,spaceshipController.updateSpaceshipInfo);
router.patch("/:id",isAuthenticated,spaceshipValidators.validateSpaceshipPartialUpdate,spaceshipController.updateSpaceshipPartialInfo);
router.get("/:id/check-references",spaceshipController.checkReferences)
router.delete("/:id",spaceshipController.deleteSpaceship);

export default router;

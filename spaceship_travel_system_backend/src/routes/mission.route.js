import express from "express";
const router = express.Router();
import * as missionController from "../controllers/mission.controller.js";
import * as missionValidator from "../validators/mission.validator.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

console.log("mission router");
router.get("/",missionController.getAllMissions);
router.get("/:id", missionController.getMissionById);
router.post("/add_mission", missionValidator.validateMissionInput, missionController.addNewMission);
router.put("/:id",missionValidator.validateMissionInput,missionController.updateMissionInfo);
router.patch("/:id",isAuthenticated,missionValidator.validateMissionPartialUpdate,missionController.updateMissionPartialInfo);
router.delete("/:id",missionController.deleteMission);

export default router;

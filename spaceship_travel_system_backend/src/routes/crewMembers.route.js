import express from "express";
const router = express.Router();
import * as crewMemberController from "../controllers/crewMembers.controller.js";
import * as crewMemberValidator from "../validators/crewMembers.validator.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

console.log("crew member router");
router.get("/" ,crewMemberController.getAllCrewMembers);
router.get("/:id" ,crewMemberController.getCrewMemberById);
router.post("/add_crewMember" ,crewMemberValidator.validateCrewMemberInput, crewMemberController.addNewCrewMember);
router.put("/:id",crewMemberValidator.validateCrewMemberInput,crewMemberController.updateCrewMemberInfo);
router.patch("/:id",isAuthenticated,crewMemberValidator.validateCrewMemberPartialUpdate,crewMemberController.updateCrewMemberPartialInfo);
router.delete("/:id",crewMemberController.deleteCrewMember);

export default router;

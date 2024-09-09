import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import spaceshipsRouter from "./src/routes/spaceship.route.js";
import crewMembersRouter from "./src/routes/crewMembers.route.js";
import missionRouter from "./src/routes/mission.route.js";
import authRouter from "./src/routes/auth.routs.js";

import { sessionConfig } from "./src/config/session.config.js";
import session from "express-session";

const app = express();

app.use(session(sessionConfig));
app.use(cors());      
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/spaceships", spaceshipsRouter);
app.use("/api/v1/crewmembers", crewMembersRouter);
app.use("/api/v1/missions", missionRouter);
app.use("/api/v1/auth", authRouter);

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});

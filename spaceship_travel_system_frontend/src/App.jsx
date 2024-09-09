import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./NavbarComponent/Navbar";
import Spaceship from "./SpaceshipComponents/Spaceship";
import CreateSpaceship from "./SpaceshipComponents/CreateSpaceship";
import UpdateSpaceship from "./SpaceshipComponents/UpdateSpaceship";
import CrewMembers from "./CrewMemberComponents/CrewMember";
import CreateCrewMember from "./CrewMemberComponents/CreateCrewMember";
import UpdateCrewMember from "./CrewMemberComponents/UpdateCrewMember";
import Missions from "./MissionsComponents/Missions";
import CreateMission from "./MissionsComponents/CreateMission";
import UpdateMission from "./MissionsComponents/UpdateMission";
import SpaceshipTravelSystem from "./SpaceshipTravelSystemCompnents/SpaceshipTravelSystem";
import "./App.css"; 


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Spaceship Travel System */}
            <Route path="/" element={<SpaceshipTravelSystem />} />
            {/* Spaceships */}
            <Route path="/show-spaceship" element={<Spaceship />} />
            <Route path="/add-spaceship" element={<CreateSpaceship />} />
            <Route path="/show-spaceship/update-spaceship/:id" element={<UpdateSpaceship />} />

            {/* Crew Members */}
            <Route path="/show-crew-members" element={<CrewMembers />} />
            <Route path="/add-crew-member" element={<CreateCrewMember />} />
            <Route path="show-crew-members/update-crew-member/:id" element={<UpdateCrewMember />} />

            {/* Missions */}
            <Route path="/show-missions" element={<Missions />} />
            <Route path="/add-mission" element={<CreateMission />} />
            <Route path="show-missions/update-mission/:id" element={<UpdateMission />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

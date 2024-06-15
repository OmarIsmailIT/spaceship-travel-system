import axios from "axios";
import { useState } from "react";
import { useNavigate , useParams } from "react-router-dom";

function CreateCrewMember() {
  const [spaceshipId, setNameSpaceshipId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  function handleSpaceshipId(event) {
    setNameSpaceshipId(event.target.value);
  }
  function handleOnChangeName(event) {
    setName(event.target.value);
  }

  function handleOnChangeRole(event) {
    setRole(event.target.value);
  }

  function handleOnChangeExperienceLevel(event) {
    setExperienceLevel(event.target.value);
  }

  function validateInputs() {
    const errors = {};

    if (!spaceshipId.trim()) {
      errors.spaceshipId = "Spaceship ID is required";
    } else if (!Number.isInteger(Number(spaceshipId))) {
      errors.spaceshipId = "Spaceship ID must be an integer";
    }

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (typeof name !== "string") {
      errors.name = "Name must be a string";
    } else if (name.length > 255) {
      errors.name = "Name must be less than or equal to 255 characters";
    }

    if (!role) {
      errors.role = "Role is required";
    }
    if (!experienceLevel) {
      errors.experienceLevel = "Experience Level is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validateInputs()) {
      axios
        .put("http://localhost:3000/api/v1/crewmembers/"+id, {
          spaceship_id: parseInt(spaceshipId),
          name,
          role,
          experience_level: experienceLevel,
        })
        .then((res) => {
          console.log(res);
          navigate("/show-crew-members");
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            const apiErrors = err.response.data.error.reduce((acc, curr) => {
              const key = curr.param;
              if (!acc[key]) {
                acc[key] = curr.msg;
              }
              return acc;
            }, {});
            setErrors(apiErrors);
          } else {
            console.log(err);
          }
        });
    }
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 h-100vh h-md-auto m-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-dark mb-4">Update Crew Member</h2>
          <div className="mb-2">
            <label htmlFor="spaceshipId">Spaceship ID</label>
            <input
              type="text"
              id="spaceshipId"
              placeholder="Enter Spaceship ID"
              className={`form-control ${
                errors.spaceshipId ? "is-invalid" : ""
              }`}
              value={spaceshipId}
              onChange={handleSpaceshipId}
            />
            <div className="invalid-feedback">{errors.spaceshipId}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={handleOnChangeName}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className={`form-select ${errors.role ? "is-invalid" : ""}`}
              value={role}
              onChange={handleOnChangeRole}
            >
              <option value="">Select Role</option>
              {[
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
              ].map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.role}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="experienceLevel">Experience Level</label>
            <select
              id="experienceLevel"
              className={`form-select ${
                errors.experienceLevel ? "is-invalid" : ""
              }`}
              value={experienceLevel}
              onChange={handleOnChangeExperienceLevel}
            >
              <option value="">Select Experience Level</option>
              {["Novice", "Skilled", "Expert"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.experienceLevel}</div>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCrewMember;

import axios from "axios";
import { useState } from "react";
import { useNavigate , useParams } from "react-router-dom";

function CreateMission() {
  const [spaceshipId, setSpaceshipId] = useState("");
  const [destination, setDestination] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [duration, setDuration] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();


  function handleSpaceshipId(event) {
    setSpaceshipId(event.target.value);
  }
  function handleOnChangeDestination(event) {
    setDestination(event.target.value);
  }
  function handelOnChangeLaunchDate(event) {
    setLaunchDate(event.target.value);
  }
  function handleOnChangeDuration(event) {
    setDuration(event.target.value);
  }

  function validateInputs() {
    const errors = {};

    if (!spaceshipId.trim()) {
      errors.spaceshipId = "Spaceship ID is required";
    } else if (!Number.isInteger(Number(spaceshipId))) {
      errors.spaceshipId = "Spaceship ID must be an integer";
    }

    if (!destination.trim()) {
      errors.destination = "Destination is required";
    } else if (typeof destination !== "string") {
      errors.destination = "Destination must be a string";
    } else if (destination.length > 255) {
      errors.destination =
        "Destination must be less than or equal to 255 characters";
    }
    if (!launchDate.trim()) {
      errors.launchDate = "Launch Date is required";
    }
    if (!duration) {
      errors.role = "duration is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formattedLaunchDate = launchDate
      ? new Date(launchDate).toISOString().slice(0, 19).replace("T", " ")
      : null;

    if (validateInputs()) {
      axios
        .put("http://localhost:3000/api/v1/missions/"+id, {
          spaceship_id: parseInt(spaceshipId),
          destination,
          launch_date: formattedLaunchDate,
          duration,
        })
        .then((res) => {
          console.log(res);
          navigate("/show-missions");
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
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 h-100vh h-md-auto m-5">
        <form onSubmit={handleSubmit}>
          <h2 className="text-dark mb-4">Update Mission</h2>
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
            <label htmlFor="Destination">Destination</label>
            <input
              type="text"
              id="destination"
              placeholder="Enter Destination"
              className={`form-control ${
                errors.destination ? "is-invalid" : ""
              }`}
              value={destination}
              onChange={handleOnChangeDestination}
            />
            <div className="invalid-feedback">{errors.destination}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="launchDate">Launch Date</label>
            <input
              type="date"
              id="launchDate"
              placeholder="Enter Launch Date: YYYY-MM-DD HH:MM:SS"
              className={`form-control ${
                errors.launchDate ? "is-invalid" : ""
              }`}
              value={launchDate}
              onChange={handelOnChangeLaunchDate}
            />
            <div className="invalid-feedback">{errors.launchDate}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="Duration">Duration</label>
            <input
              type="text"
              id="duration"
              placeholder="Enter Duration"
              className={`form-control ${
                errors.duration ? "is-invalid" : ""
              }`}
              value={duration}
              onChange={handleOnChangeDuration}
            />
            <div className="invalid-feedback">{errors.duration}</div>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMission;

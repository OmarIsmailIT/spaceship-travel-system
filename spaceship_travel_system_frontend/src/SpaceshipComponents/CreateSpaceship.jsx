import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateSpaceship() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handelOnChangeName(event) {
    setName(event.target.value);
  }

  function handelOnChangeCapacity(event) {
    setCapacity(event.target.value);
  }

  function handelOnChangeLaunchDate(event) {
    setLaunchDate(event.target.value);
  }

  function handelOnChangeStatus(event) {
    setStatus(event.target.value);
  }

  function validateInputs() {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (typeof name !== "string") {
      errors.name = "Name must be a string";
    } else if (name.length > 255) {
      errors.name = "Name must be less than or equal to 255 characters";
    }

    if (!capacity.trim()) {
      errors.capacity = "Capacity is required";
    } else if (isNaN(capacity)) {
      errors.capacity = "Capacity must be a number";
    }

    if (!launchDate.trim()) {
      errors.launchDate = "Launch Date is required";
    }

    if (!status) {
      errors.status = "Status is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handelSubmit(event) {
    event.preventDefault();

    const formattedLaunchDate = launchDate
      ? new Date(launchDate).toISOString().slice(0, 19).replace("T", " ")
      : null;
    if (validateInputs()) {
      axios
        .post("http://localhost:3000/api/v1/spaceships/add_spaceship", {
          name,
          capacity: parseInt(capacity),
          launch_date: formattedLaunchDate,
          status,
        })
        .then((res) => {
          console.log(res);
          navigate("/show-spaceship");
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
      <div className="w-50 bg-white rounded p-3 h-100vh h-md-auto m-5" style={{ height: "" }}>
        <form onSubmit={handelSubmit}>
          <h2 className="text-dark mb-4">Add Spaceship</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={handelOnChangeName}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>
          <div className="mb-2">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="text"
              id="capacity"
              placeholder="Enter Capacity"
              className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
              value={capacity}
              onChange={handelOnChangeCapacity}
            />
            <div className="invalid-feedback">{errors.capacity}</div>
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
            <label htmlFor="status">Status</label>
            <select
              id="status"
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
              aria-label="Default select example"
              value={status}
              onChange={handelOnChangeStatus}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
            <div className="invalid-feedback">{errors.status}</div>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSpaceship;

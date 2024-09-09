import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Spaceship.css"; // Import the CSS file

function CrewMember() {
  const [crewMember, setCrewMember] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/v1/crewmembers?page=${page}&limit=${limit}`
      )
      .then((res) => {
        setCrewMember(res.data.crewMembers_list);
        setTotalPages(Math.ceil(res.data.total / limit));
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this crew member?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:3000/api/v1/crewmembers/${id}`);
        setCrewMember(crewMember.filter((ship) => ship.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container ">
      <div className="content  bg-white rounded p-3">
        <div className="header d-flex flex-row mb-3 align-items-center">
          <Link to="/add-crew-member" className="btn btn-success mb-3 ">
            Add +
          </Link>

          <h3 className="mx-auto text-black">Crew Members</h3>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Spaceship Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Experience Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {crewMember.map((ship, index) => (
              <tr key={index}>
                <td>{ship.id}</td>
                <td>{ship.spaceship_id}</td>
                <td>{ship.name}</td>
                <td>{ship.role}</td>
                <td>{ship.experience_level}</td>
                <td>
                  <div className="d-flex flex-column flex-md-row">
                    <Link
                      to={`update-crew-member/${ship.id}`}
                      className="btn btn-primary mb-2 mb-md-0"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger ms-md-2"
                      onClick={() => handleDelete(ship.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePrevious}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${page === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CrewMember;

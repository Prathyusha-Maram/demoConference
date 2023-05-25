import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
const CheckStatus = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  function payment() {
    navigate("/payment");
  }

  return (
    <div>
      {
        <>
          <>
            <div className="first-coon">
              <div className="staus-wrap">
                <p>Overall Approval Status</p>
                <p>
                  {state?.approved === "Approved" ? (
                    <>
                      <p className="approved">Approved</p>
                      {state?.payementStatus === "" ? (
                        <>
                          <button onClick={payment} >Payment to attend conference</button>
                        </>
                      ) : (<p className="approved">Thanks for completing registration</p>)
                      }
                    </>
                  ) : state?.approved === "Rejected" ? (
                    <p className="approved" style={{ background: "red" }}>Rejected</p>
                  ) : (
                    <p className="approved" style={{ background: "#F6BE00" }}>Pending</p>
                  )}
                </p>
              </div>
            </div>
            {state?.reviewerApproval.map((element) => {
              return (
                <div className="first-coon">
                  <div className="staus-wrap">
                    <p>Reviewer's Approval</p>
                    <p>
                      {element.approve === "Pending" ? (
                        <p className="approved" style={{ background: "#F6BE00" }}>Pending</p>
                      ) : element.approve === "Rejected" ? (
                        <p className="approved" style={{ background: "red" }}>Rejected</p>
                      ) : (
                        <p className="approved">{element.approve}</p>
                      )}
                    </p>
                  </div>
                  <div className="status-card">
                    <p>
                      Findings Comments : <b>{element.findings.comments}</b>
                    </p>
                    <p>
                      Findings Marks : <b>{element.findings.points}</b>
                    </p>
                  </div>
                  <div className="status-card">
                    <p>
                      Objective Comments : <b>{element.objective.comments}</b>
                    </p>
                    <p>
                      Objective Marks : <b>{element.objective.points}</b>
                    </p>
                  </div>
                  <div className="status-card">
                    <p>
                      Presentation Comments :{" "}
                      <b>{element.presentation.comments}</b>
                    </p>
                    <p>
                      Presentation Marks : <b>{element.presentation.points}</b>
                    </p>
                  </div>
                  <div className="status-card">
                    <p>
                      Relavance Comments : <b>{element.relavance.comments}</b>
                    </p>
                    <p>
                      Relavance Marks : <b>{element.relavance.points}</b>
                    </p>
                  </div>
                  <div className="status-card">
                    <p>
                      Theoretical comments :{" "}
                      <b>{element.theoretical.comments}</b>
                    </p>
                    <p>
                      Theoretical Marks : <b>{element.theoretical.points}</b>
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        </>
      }
    </div>
  );
};

export default CheckStatus;

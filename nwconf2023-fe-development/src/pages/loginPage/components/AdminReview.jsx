import React from "react";
import { AssigendPapers } from "../sampleData/userContent";
import { useLocation, Link } from "react-router-dom";

const AdminReview = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <div className="review-container">
        <h1>Reviewer's Review</h1>
        <div className="review-card-new">
          {/* {AssigendPapers.map((product) => (
            <>
              <div className="">
                <p>{product.Abstarct}</p>
                <h3>
                  Reviewrs Mark <h1>82</h1>
                </h3>
              </div>
            </>

          ))} */}

          <div className="first-coon">
            <div className="approvalstate">
              {state.approve !== "Rejected" ? (
                <h1 style={{ color: "green" }}>{state.approve}</h1>
              ) : (
                <h1 style={{ color: "red" }}>Rejected</h1>
              )}
            </div>
            <p>
              RESEARCH QUESTION/PROBLEM/OBJECTIVE : {state.objective.points}
            </p>
            <h4>{state.objective.comments}</h4>
            <p>RELEVANCE : {state.relavance.points}</p>
            <h4>{state.relavance.comments}</h4>
            <p>
              THEORETICAL CONTEXT FOR THE PROJECT002FORIGINALITY :{" "}
              {state.theoretical.points}
            </p>
            <h4>{state.theoretical.comments}</h4>
            <p>MAJOR FINDINGS : {state.findings.points}</p>
            <h4>{state.findings.comments}</h4>
            <p>
              PROFESSIONAL WRITING/PRESENTATION : {state.presentation.points}
            </p>
            <h4>{state.presentation.comments}</h4>
          </div>
          <div className="marks-con">
            <p>Total Marks</p>
            <h2>
              {Number(state.objective.points) +
                Number(state.relavance.points) +
                Number(state.theoretical.points) +
                Number(state.findings.points) +
                Number(state.presentation.points)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReview;

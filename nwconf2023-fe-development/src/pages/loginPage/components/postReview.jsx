import React, { useEffect } from "react";
// import pdfFile from "../../../constant/EbinJoeResumeNew.pdf";
import { API_ENDPOINT } from "../../../constant/constant";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
const PostReview = () => {
  const { state } = useLocation();
  const [alreadyApproved, setAlreadyApproved] = useState(false);
  const [objective, setObjective] = useState({ comments: "", points: "" });
  const [relavance, setRelavance] = useState({ comments: "", points: "" });
  const [theoretical, setTheoretical] = useState({ comments: "", points: "" });
  const [findings, setFindings] = useState({ comments: "", points: "" });
  const [pdfFile, setPdfFile] = useState(state.userDetails.document);
  const [reviewDone, setReviewDone] = useState(false);
  const [wantToReview, setWantToReview] = useState({ wantTo: "" });
  const [userEmail, setUserEmail] = useState(state.userDetails.email);
  const [presentation, setPresentation] = useState({
    comments: "",
    points: "",
  });

  let total =
    Number(objective.points) +
    Number(relavance.points) +
    Number(theoretical.points) +
    Number(findings.points) +
    Number(presentation.points);

  const [SaveReview, setSaveReview] = useState([]);

  const [items, setItems] = useState([]);

  const reviewerEmail = localStorage.getItem("Reviewer-email");

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('SavedUserdetail'));
  //   if (items) {
  //     setItems(items);
  //   }
  // }, []);

  function saveReview(e, p) {
    let data = [];
    if (localStorage.getItem("reviewer-local")) {
      data = JSON.parse(localStorage.getItem("reviewer-local"));
    }
    let obj = {};
    obj.email = userEmail;
    obj.objective = objective;
    obj.relavance = relavance;
    obj.theoretical = theoretical;
    obj.findings = findings;
    obj.presentation = presentation;
    const existingObj = data.find((obj) => obj.email === userEmail);

    if (existingObj) {
      // if an object with the same key already exists, replace it with the new object
      const index = data.indexOf(existingObj);
      data.splice(index, 1, obj);
    } else {
      // if an object with the same key doesn't exist, push the new object to the array
      data.push(obj);
    }

    localStorage.setItem("reviewer-local", JSON.stringify(data));
    alert("Saved successfully");
  }
  function saveReviewFirst(e, p) {
    let data = [];
    if (localStorage.getItem("reviewer-local")) {
      data = JSON.parse(localStorage.getItem("reviewer-local"));
    }
    let obj = {};
    obj.email = userEmail;
    obj.objective = objective;
    obj.relavance = relavance;
    obj.theoretical = theoretical;
    obj.findings = findings;
    obj.presentation = presentation;
    const existingObj = data.find((obj) => obj.email === userEmail);

    if (existingObj) {
      // if an object with the same key already exists, replace it with the new object
      const index = data.indexOf(existingObj);
      data.splice(index, 1, obj);
    } else {
      // if an object with the same key doesn't exist, push the new object to the array
      data.push(obj);
    }

    localStorage.setItem("reviewer-local", JSON.stringify(data));
  }

  useEffect(() => {
    let obj;
    if (state.userDetails.reviewerApproval.length > 0) {
      let flag = true;
      state.userDetails.reviewerApproval.forEach((e) => {
        if (e.email === reviewerEmail) {
          flag = false;
          obj = e;
          setReviewDone(true);
          setObjective(obj.objective);
          setRelavance(obj.relavance);
          setTheoretical(obj.theoretical);
          setFindings(obj.findings);
          setPresentation(obj.presentation);
          setAlreadyApproved(obj.approve);
          setWantToReview(obj.wantToReview);
        } else {
        }
      });
      if (flag) {
        if (localStorage.getItem("reviewer-local")) {
          let data = JSON.parse(localStorage.getItem("reviewer-local"));

          data.forEach((ele) => {
            if (ele.email === userEmail) {
              setObjective(ele.objective);
              setRelavance(ele.relavance);
              setTheoretical(ele.theoretical);
              setFindings(ele.findings);
              setPresentation(ele.presentation);
            }
          });
        }
      }
    } else {
      if (localStorage.getItem("reviewer-local")) {
        let data = JSON.parse(localStorage.getItem("reviewer-local"));

        data.forEach((ele) => {
          if (ele.email === userEmail) {
            setObjective(ele.objective);
            setRelavance(ele.relavance);
            setTheoretical(ele.theoretical);
            setFindings(ele.findings);
            setPresentation(ele.presentation);
          }
        });
      }
    }
  }, []);

  const [myReviewerheader] = useState({
    headers: {
      token: localStorage.getItem("Reviewertoken"),
    },
  });
  /// API added

  function sendReview(e, approve, bool = false) {
    e.preventDefault();
    let array = state.userDetails.reviewerApproval;
    let obj = {};
    obj.email = reviewerEmail;
    obj.objective = objective;
    obj.relavance = relavance;
    obj.theoretical = theoretical;
    obj.findings = findings;
    obj.presentation = presentation;
    obj.approve = approve;
    setAlreadyApproved(approve);

    let allObjectsHaveValue = true;

    for (const outerKey in obj) {
      for (const innerKey in obj[outerKey]) {
        if (!obj[outerKey][innerKey]) {
          // If the value of the inner key is null, undefined, or false
          allObjectsHaveValue = false;
          break;
        }
      }
    }
    if (!allObjectsHaveValue) {
      alert("Please enter all details");
    } else {
      array.push(obj);
      axios
        .post(
          `${API_ENDPOINT}/reviewer/approve`,
          {
            email: state.userDetails.email,
            reviewerApproval: array,
            needReview: bool,
          },
          myReviewerheader
        )
        .then(
          (response) => {
            if (response.data.status) {
              setReviewDone(true);
              alert("Review posted successfully");
            } else {
              alert("something went wrong");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  function wantToReviewUpdate(response) {
    setWantToReview(response)
  }

  useEffect(() => {
    let savedReviewerCmt = localStorage.getItem("reivewerDetail");
  }, []);

  return (
    <div>
      <div className="user-postt">
        <p>
          Author Name: <b>{state.userDetails.firstName + " " + state.userDetails.lastName}</b>
        </p>
        <p>
          Post Title : <b>{state.userDetails.title}</b>
        </p>
        <p>
          {" "}
          Key Word :{" "}
          <b>
            {state.userDetails.keyword.map((val) => val.label + " " + " ")}
          </b>{" "}
        </p>
        <p>
          Abstract : <b>{state.userDetails.abstract}</b>
        </p>
        <div className="dwn-btn">
          <Link to={pdfFile} target="_blank" download className="download">
            Download
          </Link>
        </div>
      </div>

      <table className="table">
        <tr className="tr">
          <th className="th">REQUIRED ELEMENTS of a PROPOSAL ABSTRACT</th>
          <th className="th">Points Possible</th>
          <th className="th">Points Awarded</th>
          <th className="th">Comments</th>
        </tr>
        <tr className="tr">
          <td className="td">
            RESEARCH QUESTION/PROBLEM/OBJECTIVE Has the author (or authors)
            clearly stated the question/focus/purpose of the scholarly or
            creative work?
          </td>
          <td className="td">10</td>
          <td className="td">
            {" "}
            <input
              type="number"
              value={objective.points}
              onChange={(e) => {
                setObjective((prevState) => ({
                  ...prevState,
                  points: e.target.value,
                }));
                saveReviewFirst();
              }}
            />
          </td>
          <td className="td">
            {" "}
            <textarea
              name="message"
              rows="2"
              cols="60"
              value={objective.comments}
              onChange={(e) => {
                setObjective((prevState) => ({
                  ...prevState,
                  comments: e.target.value,
                }));
                saveReviewFirst();
              }}
            ></textarea>
          </td>
        </tr>
        <tr className="tr">
          <td className="td">
            RELEVANCE Does the author present a compelling argument for the
            importance of the research problem in their discipline? 10{" "}
          </td>
          <td className="td">10</td>
          <td className="td">
            {" "}
            <input
              type="number"
              value={relavance.points}
              onChange={(e) => {
                setRelavance((prevState) => ({
                  ...prevState,
                  points: e.target.value,
                }));
                saveReviewFirst();
              }}
            />
          </td>
          <td className="td">
            {" "}
            <textarea
              name="message"
              rows="2"
              value={relavance.comments}
              cols="60"
              onChange={(e) => {
                setRelavance((prevState) => ({
                  ...prevState,
                  comments: e.target.value,
                }));
                saveReviewFirst();
              }}
            ></textarea>
          </td>
        </tr>
        <tr className="tr">
          <td className="td">
            THEORETICAL CONTEXT FOR THE PROJECT002FORIGINALITY Does the author
            adequately describe the theory that guided this project. In other
            words, does the paper contains originality? 10{" "}
          </td>
          <td className="td">10</td>
          <td className="td">
            {" "}
            <input
              type="number"
              value={theoretical.points}
              onChange={(e) => {
                setTheoretical((prevState) => ({
                  ...prevState,
                  points: e.target.value,
                }));
                saveReviewFirst();
              }}
            />
          </td>
          <td className="td">
            {" "}
            <textarea
              name="message"
              rows="2"
              cols="60"
              value={theoretical.comments}
              onChange={(e) => {
                setTheoretical((prevState) => ({
                  ...prevState,
                  comments: e.target.value,
                }));
                saveReviewFirst();
              }}
            ></textarea>
          </td>
        </tr>
        <tr className="tr">
          <td className="td">
            MAJOR FINDINGS Does the author clearly and concisely describe the
            major findings of their project or, if the project is not yet
            completed, the preliminary findings and outcomes they are assessing.
            10{" "}
          </td>
          <td className="td">10</td>
          <td className="td">
            {" "}
            <input
              type="number"
              value={findings.points}
              onChange={(e) => {
                setFindings((prevState) => ({
                  ...prevState,
                  points: e.target.value,
                }));
                saveReviewFirst();
              }}
            />
          </td>
          <td className="td">
            {" "}
            <textarea
              name="message"
              rows="2"
              cols="60"
              value={findings.comments}
              onChange={(e) => {
                setFindings((prevState) => ({
                  ...prevState,
                  comments: e.target.value,
                }));
                saveReviewFirst();
              }}
            ></textarea>
          </td>
        </tr>
        <tr className="tr">
          <td className="td">
            PROFESSIONAL WRITING/PRESENTATION Is the text free from grammar and
            syntax errors? Is this language precise and clear? 10{" "}
          </td>
          <td className="td">10</td>
          <td className="td">
            {" "}
            <input
              type="number"
              value={presentation.points}
              onChange={(e) => {
                setPresentation((prevState) => ({
                  ...prevState,
                  points: e.target.value,
                }));
                saveReviewFirst();
              }}
            />
          </td>
          <td className="td">
            {" "}
            <textarea
              name="message"
              rows="2"
              cols="60"
              value={presentation.comments}
              onChange={(e) => {
                setPresentation((prevState) => ({
                  ...prevState,
                  comments: e.target.value,
                }));
                saveReviewFirst();
              }}
            ></textarea>
          </td>
        </tr>

        <tr className="tr">
          <td className="td">Total Possible Points</td>
          <td className="td">50</td>
          <td className="td">{total}</td>
          <td>
            {reviewDone ? null : (
              <div className="review-btn-con">
                <button
                  className="submit"
                  onClick={(event) => sendReview(event, "Strongly Approved")}
                >
                  Strongly Accept
                </button>
                <button
                  className="submit"
                  onClick={(event) => sendReview(event, "Approved", true)}
                >
                  Accept
                </button>
                <button
                  className="submit"
                  onClick={(event) => sendReview(event, "Weekly Approved", true)}
                >
                  Weekly Accept
                </button>
                <button
                  className="reject"
                  onClick={(event) => sendReview(event, "Rejected")}
                >
                  Reject
                </button>
                <button
                  className="save"
                  onClick={(event) => saveReview(event, reviewerEmail)}
                >
                  Save
                </button>
              </div>
            )}
          </td>
        </tr>
      </table>

      {/* <div className="review-container">


      <div className="review-container">
        <div className="review-card">
<div className="dwn-btn">
            </Link>
          </div>
          <div className="first-card-new">
            <>
              <p>RESEARCH QUESTION/PROBLEM/OBJECTIVE : </p>
              <textarea
                name="message"
                rows="2"
                cols="60"
                value={objective.comments}
                onChange={(e) =>
                  setObjective((prevState) => ({
                    ...prevState,
                    comments: e.target.value,
                  }))
                }
              ></textarea>
              <p>Marks</p>
              <input

                type="number"
                value={objective.points}
                onChange={(e) =>
                  setObjective((prevState) => ({
                    ...prevState,
                    points: e.target.value,
                  }))
                }
              />
            </>
            <>
              <p>RELEVANCE :</p>
              <textarea
                name="message"
                rows="2"
                value={relavance.comments}
                cols="60"
                onChange={(e) =>
                  setRelavance((prevState) => ({
                    ...prevState,
                    comments: e.target.value,
                  }))
                }
              ></textarea>
              <p>Marks</p>
              <input
                type="number"
                value={relavance.points}
                onChange={(e) =>
                  setRelavance((prevState) => ({
                    ...prevState,
                    points: e.target.value,
                  }))
                }
              />
            </>
            <>
              <p>THEORETICAL CONTEXT FOR THE PROJECT002FORIGINALITY :</p>
              <textarea
                name="message"
                rows="2"
                cols="60"
                value={theoretical.comments}
                onChange={(e) =>
                  setTheoretical((prevState) => ({
                    ...prevState,
                    comments: e.target.value,
                  }))
                }
              ></textarea>
              <p>Marks</p>
              <input
                type="number"
                value={theoretical.points}
                onChange={(e) =>
                  setTheoretical((prevState) => ({
                    ...prevState,
                    points: e.target.value,
                  }))
                }
              />
            </>
          </div>
          <div className="second-card">
            <>
              <p>MAJOR FINDINGS :</p>
              <textarea
                name="message"
                rows="2"
                cols="60"
                value={findings.comments}
                onChange={(e) =>
                  setFindings((prevState) => ({
                    ...prevState,
                    comments: e.target.value,
                  }))
                }
              ></textarea>
              <p>Marks</p>
              <input
                type="number"
                value={findings.points}
                onChange={(e) =>
                  setFindings((prevState) => ({
                    ...prevState,
                    points: e.target.value,
                  }))
                }
              />
            </>
            <>
              <p>PROFESSIONAL WRITING/PRESENTATION :</p>
              <textarea
                name="message"
                rows="2"
                cols="60"
                value={presentation.comments}
                onChange={(e) =>
                  setPresentation((prevState) => ({
                    ...prevState,
                    comments: e.target.value,
                  }))
                }
              ></textarea>
              <p>Marks</p>
              <input
                type="number"
                value={presentation.points}
                onChange={(e) =>
                  setPresentation((prevState) => ({
                    ...prevState,
                    points: e.target.value,
                  }))
                }
              />

              <div style={{ display: "flex" }}>
                {reviewDone ? (
                  alreadyApproved === "Approved" ? (
                    <h1 style={{ color: "green" }}>Approved</h1>
                  ) : (
                    <h1 style={{ color: "red" }}>Rejected</h1>
                  )
                ) : null}
              </div>
              <div className="review-btn-con">
                {reviewDone ? null : (
                  <div>
                    <button
                      className="submit"
                      onClick={(event) => sendReview(event, "Approved")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject"
                      onClick={(event) => sendReview(event, "Rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className="save"
                      onClick={(event) => saveReview(event, reviewerEmail)}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PostReview;

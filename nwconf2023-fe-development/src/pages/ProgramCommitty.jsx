import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../constant/constant";

const ProgramCommitty = () => {
  const [reviewerEmail, setReviewerDetails] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/admin/reviewers`)
      .then((response) => setReviewerDetails(response.data));
  }, []);

  return (
    <div>
      <div>
        <h1 className="heading1">PROGRAM COMMITTY</h1>
        <div className="assign-card-con popupnew">
          <div className="assign-cardNew">
            <li>
              <b>Reviewer's Name</b>
            </li>

            <li>
              <b>Reviewer's Email</b>
            </li>

            <li>
              <b>Reviewer's Area Of Interest</b>
            </li>
          </div>
        </div>
        {reviewerEmail.data?.map((product) => (
          <>
            <div className="assign-card-con popupnew">
              <div className="assign-cardNew">
                <li>
                  {product.firstName + " " + product.lastName}
                </li>

                <li>
                  {product.email}
                </li>

                <li>
                  {product.areaOfInterest}
                </li>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default ProgramCommitty
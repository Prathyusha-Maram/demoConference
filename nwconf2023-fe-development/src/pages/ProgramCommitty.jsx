import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CustomTost.css";
import { API_ENDPOINT } from "../constant/constant";

const ProgramCommittee = () => {
  const [reviewerEmail, setReviewerDetails] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/admin/reviewers`)
      .then((response) => setReviewerDetails(response.data));
  }, []);

  return (
    <div>
      <div>
        <h1 className="heading1">PROGRAM COMMITTEE</h1>
        <div className="assign-card-con popupnew" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <div className="assign-cardNew" style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="assign-card-info">
              <div className="assign-card-field">
                <span className="assign-card-label" style={{ flex: "1" }}><b>Reviewer's Name:</b></span>
              </div>
              <div className="assign-card-field">
                <span className="assign-card-label" style={{ flex: "1" }}><b>Reviewer's Email:</b></span>
              </div>
              <div className="assign-card-field">
                <span className="assign-card-label" style={{ flex: "1" }}><b>Reviewer's Area Of Interest:</b></span>
              </div>
            </div>
          </div>
        </div>
        {reviewerEmail.data?.map((product) => (
          <div className="assign-card-con popupnew" key={product.email} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <div className="assign-cardNew" style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <div className="assign-card-info">
                <div className="assign-card-field">
                  <span className="assign-card-value">{product.firstName + " " + product.lastName}</span>
                </div>
                <div className="assign-card-field">
                  <span className="assign-card-value">{product.email}</span>
                </div>
                <div className="assign-card-field">
                  <span className="assign-card-value">{product.areaOfInterest}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default ProgramCommittee
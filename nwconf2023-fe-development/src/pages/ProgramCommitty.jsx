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
                {reviewerEmail.data?.map((product) => (
                  <>
                    <div className="assign-card-con popupnew">
                      <div className="assign-cardNew">
                        <li>
                          Reviewer's Name : <b>{product.userName}</b>
                        </li>

                        <li>
                          Reviewer's Email : <b>{product.email}</b>
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
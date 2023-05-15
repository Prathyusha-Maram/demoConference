import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../constant/constant";
import axios from "axios";
const Accept = () => {
  const [acceptedd, setAccepted] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/admin//approved/projects`)
      .then((response) => setAccepted(response.data.project));
  }, []);

  return (
    <div>
      <h1 className="heading1">ACCEPTED PAPERS</h1>
      <div className="assign-card-con popupnew">
        <div className="assign-cardNew">
          <li>
            <b>Author</b>
          </li>
          <li>
            <b>Title</b>
          </li>
          <li>
            <b>Abstract</b>
          </li>
        </div>
      </div>
      {acceptedd.map((product) => (
        <>
          <div className="assign-card-con popupnew">
            <div className="assign-cardNew">
            <li>
                <b>{product.firstName + " " + product.lastName}</b>
              </li>
              <li>
                <b>{product.title}</b>
              </li>
              <li>
                <b>{product.abstract}</b>
              </li>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Accept;

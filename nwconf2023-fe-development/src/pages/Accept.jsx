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
      {acceptedd.map((product) => (
        <>
        {/* <div className="assign-card-con popupnew">
            <div className="assign-cardNew"> */}
              {/* <li>
                Reviewer's Name : <b>{product.title}</b>
              </li> */}
              {/* <li>
              <b> TITLE</b>
              </li>
              <li>
                <b>STATUS</b>
              </li>
            </div>
          </div> */}
          <div className="assign-card-con popupnew">
            <div className="assign-cardNew">
              {/* <li>
                Reviewer's Name : <b>{product.title}</b>
              </li> */}
              <li>
              <a href={product.document}>
                <b>{product.title}</b>
              </a>
              </li>
              {/* <li>
                Reviewer's Email : <b>{product.email}</b>
              </li>
              <li>
                abstract : <b>{product.abstract}</b>
              </li> */}
              <li>
                <b>{product.approved}</b>
              </li>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Accept;

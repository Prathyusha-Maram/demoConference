import React, { useState, useEffect } from "react";
import Select from "react-select";
import { colourOptions } from "../sampleData/data";
import { API_ENDPOINT } from "../../../constant/constant";

import axios from "axios";

var gkeyarr = []
var values = {
  "title": '',
  "key": [],
  "abs": '',
  'file': ''
}

const SubmitPaperPage = () => {
  const [title, setTitle] = useState("");
  const [abstarct, setAbstarct] = useState("");
  const [file, setFile] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [otherKeyword, setOtherKeyword] = useState("");
  const [groupEmail, setGroupEmail] = useState("");
  const [susTost, setSussToast] = useState(false);
  const [susTost1, setSuss1Toast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [approved, setApproved] = useState("");
  const [other, setOther] = useState("");
  
  function sendPost(e) {
    e.preventDefault();
    axios
      .post(
        `${API_ENDPOINT}/project`,
        {
          title: title,
          abstract: abstarct,
          keyword: keywords,
          otherKeyword: otherKeyword,
          document: file,
          groupSubmission: isChecked,
          groupEmail: groupEmail,
        },
        myheader
      )
      .then(
        (response) => {
          if (response.data.status === true) {
            setSussToast(true);
            localStorage.removeItem("user-local");
          } else {
            alert("Enter all Data");
            setSuss1Toast(true);
          }
        },
        (error) => { }
      );
  }

  function savePost(e) {
    e.preventDefault();
    let obj = {};
    obj.title = title;
    obj.file = file;
    obj.abstarct = abstarct;
    obj.checked = isChecked;
    obj.keywords = keywords;
    obj.isChecked = checked;
    obj.groupEmail = groupEmail;
    obj.otherKeyword = otherKeyword;
    localStorage.setItem("user-local", JSON.stringify(obj));
  }
  function withdrawPost(e) {
    e.preventDefault();
    if (window.confirm("Are you Sure!")) {
      axios
        .post(
          `${API_ENDPOINT}/withdraw/project`,
          {
            title: "",
            abstract: "",
            keyword: [],
            document: "",
            groupSubmission: false,
            groupEmail: "",
            otherKeyword: "",
            paperID: "",
          },
          myheader
        )
        .then(
          (response) => {
            if (response.data.status === true) {
              alert("withdraw successful");
              GetApi();
            } else {
            }
          },
          (error) => { }
        );
    } else {
    }
  }

  const uploadImage = async (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    let u = await axios.post(
      `${API_ENDPOINT}/upload/image`,
      formData,
      myheader
    );
    if (u.data.status) {
      setFile(u.data.secureUrl);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const [checked, setChecked] = useState(false);

  const GetApi = () => {
    axios.get(`${API_ENDPOINT}/my/project`, myheader).then((response) => {
      if (response.data.status) {
        if (response.data.project.title) {
          setTitle(response.data.project.title);
          setFile(response.data.project.document);
          setAbstarct(response.data.project.abstract);
          setIsChecked(response.data.project.groupSubmission);
          setKeywords(response.data.project.keyword);
          setApproved(response.data.project.approved);
          setGroupEmail(response.data.project.groupEmail);
          setOtherKeyword(response.data.project.otherKeyword);
          if(response.data.project.otherKeyword !== "") {
            setOther("Other");
          }
        } else {
          alert("Please back after submitting a paper");
          if (localStorage.getItem("user-local")) {
            let data = JSON.parse(localStorage.getItem("user-local"));
            setTitle(data.title);
            setFile(data.file);
            setAbstarct(data.abstarct);
            setIsChecked(data.checked);
            setKeywords(data.keywords);
            setGroupEmail(data.groupEmail);
            setOtherKeyword(data.otherKeyword);
          }
        }
      }
    });
  };

  const [myheader] = useState({
    headers: {
      token: localStorage.getItem("Usertoken"),
    },
  });

  const handleSelectChange = (selectedOption) => {
    setKeywords(selectedOption);
    let found = false;
    selectedOption.forEach(key => {
      if (key.value === 'Other') {
        setOther(key.value);
        found = true;
      }
    })
    if (!found) {
      setOther("");
      setOtherKeyword("");
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
      setGroupEmail("");
    }
  };

  useEffect(() => {
    GetApi();
    const currentDate = new Date();
    const targetDate = new Date("2023-05-30");

    if (currentDate > targetDate) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, []);

  return (
    <div className="paper">
      <h3 style={{ textAlign: "center", color: "var(--green)" }}><b>Edit Your Submission your Paper</b></h3>
      <form className="form-con" onSubmit={sendPost}>
        
        <label htmlFor="" style={{ color: "white" }}>Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px', width: "100%" }}
        />

        <label htmlFor="" style={{ color: "white" }}>Abstract</label>
        <textarea
          name="message"
          rows="10"
          cols="60"
          onChange={(e) => setAbstarct(e.target.value)}
          value={abstarct}
        ></textarea>

        <label htmlFor="" style={{ color: "white" }}>Keywords</label>
        <Select
          isMulti
          name="colors"
          value={keywords}
          options={colourOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(event) => { handleSelectChange(event) }}
        ></Select>

        {other === 'Other' ? (
          <>
            <label htmlFor="" style={{ color: "white" }}>Other Keywords</label>
            <input
              name="otherKeywords"
              className="colors"
              type="text"
              placeholder="Enter keywords separated by ,"
              onChange={(e) => setOtherKeyword(e.target.value)}
              value={otherKeyword}
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px', width: "100%" }}
            />
          </>
        ) : null}

        <div style={{ color: "white" }}>
          Is this a group Submission{" "}
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>

        {isChecked ? (
          <div>
            <label htmlFor="" style={{ color: "white" }}>Email</label>
            <input
              name="groupEmail"
              className="colors"
              type="text"
              placeholder="Enter each email ID.."
              onChange={(e) => setGroupEmail(e.target.value)}
              value={groupEmail}
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px', width: "100%" }}
            />
          </div>
        ) : null}

        <label htmlFor="" style={{ color: "white" }}>
          {" "}
          Upload your Paper{" "}
          <h4 style={{ color: "red" }}>{loading ? "loading" : ""}</h4>
        </label>
        <input
          type="file"
          accept=".pdf"/*,.doc,.docx*/
          onChange={(e) => uploadImage(e)}
        />
        
        <div className="form-btn-con">
          <div className="form-btns">
            <button onClick={sendPost} className="submit" disabled={disabled}>
              Submit
            </button>
            <button className="save" onClick={savePost}>
              Save
            </button>
            <button
              className="withdraw"
              onClick={withdrawPost}
              disabled={disabled}
            >
              Withdraw
            </button>
          </div>
        </div>
        {susTost ? (
          <strong style={{ color: "green" }}>Post Saved Succesfully</strong>
        ) : (
          ""
        )}
        {susTost1 ? (
          <strong style={{ color: "red" }}>post Not Sent</strong>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default SubmitPaperPage;

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
  const [susTost, setSussToast] = useState(false);
  const [susTost1, setSuss1Toast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [approved, setApproved] = useState("");
//   const handleChange = (event) => {

//     if (event.target == undefined) {

//         var keyarr = []
//         event.map(o => {
//             keyarr.push(o.label)
//         })
//         setkeyword(keyarr)
//         setSelectedOptions(keyarr)
//         gkeyarr = keyarr
//         values['key'] = keyarr

//         if (gkeyarr.length == 0) {
//             errors['key'] = 'Keywords are Mandatory'
//             setkerr('Keywords are Mandatory')
//         }
//         else {
//             errors['key'] = ''
//             setkerr()
//         }
//         if (gkeyarr.indexOf('Other') >= 0) {
//             console.log("selected other");
//             setother('selected')
//         }
//     }

//     else {
//         values[event.target.id] = event.target.value
//         if (values[event.target.id] == '') {
//             errors[event.target.id] = 'This field cant be Empty'
//         }
//         else {
//             errors[event.target.id] = ''

//         }
//         if (event.target.id == "title") {
//             if (event.target.value == '') {
//                 setterr('This field cant be Empty')
//             }
//             else {
//                 setterr()
//             }
//         } if (event.target.id == "abs") {
//             if (event.target.value == '') {
//                 setaerr('This field cant be Empty')
//             }
//             else {
//                 setaerr()
//             }
//         }
//         if (event.target.id == "key") {
//             if (event.target.value == '') {
//                 setkerr('This field cant be Empty')
//             }
//             else {
//                 setkerr()
//             }
//         }

//     }
//     ec = 0
//     Object.keys(errors).forEach(er => {
//         if (errors[er] != '') {
//             ec++
//         }
//     })
//     console.log(ec);
//     console.log(errors);

// }
  function sendPost(e) {
    e.preventDefault();
    axios
      .post(
        `${API_ENDPOINT}/project`,
        {
          title: title,
          abstract: abstarct,
          keyword: keywords,
          document: file,
          groupSubmission: isChecked,
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
        (error) => {}
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
          (error) => {}
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
        } else {
          if (localStorage.getItem("user-local")) {
            let data = JSON.parse(localStorage.getItem("user-local"));
            setTitle(data.title);
            setFile(data.file);
            setAbstarct(data.abstarct);
            setIsChecked(data.checked);
            setKeywords(data.keywords);
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
  var other = "";
  const handleSelectChange = (selectedOption) => {
    setKeywords(selectedOption);
    if(selectedOption === "Other")
      other = "selected";
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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
      <h3 style={{textAlign:"center", color:"var(--green)"}}><b>Submit your Paper</b></h3>
      {/* {approved ? (
        <>
          <span>Approved Statusdd</span> <h4>{approved}</h4>{" "}
        </>
      ) : null} */}
      <form className="form-con" onSubmit={sendPost}>
        <label htmlFor="" style={{color:"white"}}>Title</label>

        <input
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '5px' , width: "100%" }}
        />
        <label htmlFor="" style={{color:"white"}}>Abstract</label>
        <textarea
          name="message"
          rows="10"
          cols="60"
          onChange={(e) => setAbstarct(e.target.value)}
          value={abstarct}
        ></textarea>
        <label htmlFor="" style={{color:"white"}}>Keywords</label>

        <Select
  isMulti
  name="colors"
  value={keywords}
  options={colourOptions}
  className="basic-multi-select"
  classNamePrefix="select"
  onChange={handleSelectChange}
></Select>
{other == 'selected' ? (
  <>
    <input
      id="keyws"
      className="colors"
      // {(errors.keyws) ? "error" : null}
      type="text"
      // value={values.keyws}
      placeholder="Enter keywords separated by ,"
      // onKeyDown={(event) => { keywordHandle(event) }}
      // onChange={(event) => { handleChange(event) }}
    ></input>
    {/* <div style={{ width: 'fit-content', background: 'transparent', display: "flex", flexDirection: "row", flexWrap: "wrap", margin: '0 auto' }}>
      {test.map((word, index) =>
        <div>
          <Word iskey={'yes'} word={word} key={index}></Word>
        </div>
      )}
    </div> */}
  </>
) : null}
 
                    <div style={{color:"white"}}>
  Is this a group Submission{" "}
  <input
    type="checkbox"
    checked={isChecked}
    onChange={handleCheckboxChange}
    // style={{width:"100%"}}
  />
</div>
{isChecked ? (
  <div>
    <label htmlFor="" style={{color:"white"}}>Email</label>
    <input
      placeholder="Enter each email ID.."
      // onChange={(event) => { handleChange(event) }} className={(errors.email) ? "error" : null} id="email" type="email" 
    ></input>
    {/* {errEm ? <p className="error">{errEm}</p> : null}
    <button type="button" className="button" onClick={() => { handleKey("email") }}>
      Add
    </button>
    <div style={{ width: 'fit-content', background: 'transparent', display: "flex", flexDirection: "row", flexWrap: "wrap", margin: '0 auto' }}>
      {emails.map((em, index) =>
        <div onClick={() => { remove(index, "email") }}>
          <Word word={em} key={index}></Word>
        </div>
      )}
    </div> */}
  </div>
) : null}

        <label htmlFor="" style={{color:"white"}}>
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

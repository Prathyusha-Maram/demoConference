import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useLocation, Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../../constant/constant";
import axios from "axios";
import { Button } from "react-bootstrap";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1400,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [assign, setAssign] = useState(false);
  const [assigned, setAssigned] = useState({ status: false, value: {} });
  const [postUserEmail, setPostUserEmail] = useState("");
  const [tableDetails, setTableDetails] = useState([]);
  const [reviewerEmail, setReviewerDetails] = useState([]);
  const [checked, setChecked] = useState([]);
  const [assignPaper, setAssignPaper] = useState([]);
  const [evaluatePaper, setEvaluatePaper] = useState([]);
  const [checkDisable, setCheckdisble] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [myadminheader] = useState({
    headers: {
      token: localStorage.getItem("Admintoken"),
    },
  });
  let detail = tableDetails;

  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    { id: "name", label: "Authors Name" },
    { id: "title", label: "Title" },
    {
      id: "keyword",
      label: "View Status",
      width: 10,
    },
    {
      id: "keyword",
      label: "Approval Status",
      width: 10,
    },
    {
      id: "keyword",
      label: "Reviewers",
      width: 10,
    },
  ];

  const columnsOne = [
    { id: "name", label: "Authors Name" },
    { id: "code", label: "Title" },
    {
      id: "keyword",
      label: "Keywords",
      width: 10,
    },
    { id: "code", label: "Abstract" },
    { id: "code", label: "Document" },
    // { id: "code", label: "Group Submission" },
    {
      id: "population",
      label: "Assign Reviewers",
      width: 10,
    },
  ];
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function assignReviewer(e, p) {
    setAssign(true);
    setPostUserEmail(p);
  }

  useEffect(() => {
    GetPro();

    axios
      .get(`${API_ENDPOINT}/admin/reviewer`, myadminheader)
      .then((response) => setReviewerDetails(response.data));
  }, []);

  const GetPro = () => {
    axios
      .get(`${API_ENDPOINT}/admin/projects`, myadminheader)
      .then((response) => {
        let array = response.data.project.filter((e) => e.document !== "");
        let assign = [];
        let evaluate = [];
        array.forEach((e) => {
          if (e.reviewerApproval.length > 0) {
            evaluate.push(e);
          } else {
            assign.push(e);
          }
        });
        setAssignPaper(assign);
        setEvaluatePaper(evaluate);
        setTableDetails(response.data.project.filter((e) => e.document !== ""));
      });
  };
  const handleCheck = (product) => {
    if (checked.includes(product)) {
      setChecked(checked.filter((e) => e !== product));
    } else {
      setChecked([...checked, product]);
    }

    if (checked.length === 2) {
      setCheckdisble(true);
    }
  };

  function Approval(approval) {
    axios
      .post(
        `${API_ENDPOINT}/admin/approve`,
        {
          approved: approval,
          email: assigned.value.email,
        },
        myadminheader
      )
      .then(
        (response) => {
          if (response.data.status) {
            GetPro();
            setAssigned((prevState) => ({
              ...prevState,
              status: false,
            }));
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function sendReview() {
    axios
      .post(
        `${API_ENDPOINT}/admin/add/reviewer`,
        {
          reviewers: checked,
          email: postUserEmail,
        },
        myadminheader
      )
      .then(
        (response) => {
          alert("reviewer added successfully");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="tabs-global">
      {assign ? (
        <div className="reviewer-popup">
          {reviewerEmail.data?.map((product) => (
            <>
              <div className="assign-card-con popup">
                <div className="assign-card">
                  <li>
                    Reviewer's Name : <b>{product.firstName + " " + product.lastName}</b>
                  </li>

                  {/* <input
                    value={product.email}
                    type="checkbox"
                    checked={checked.includes(product)}
                    onChange={() => handleCheck(product)}
                    disabled={checkDisable}
                  /> */}
                  <input
                    value={product.email}
                    type="checkbox"
                    checked={checked.includes(product)}
                    onChange={() => handleCheck(product)}
                    disabled={checked.includes(product) ? false : checked.length >= 3}
                  />
                </div>
              </div>
            </>
          ))}
          <div className="wrap-btn">
            <button onClick={() => setAssign(false)} className="withdraw">
              Close
            </button>
            <button className="assign-btn" onClick={sendReview}>
              Assign
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {assigned.status ? (
        <div className="reviewer-popup">
          {assigned.value.reviewers?.map((product) => (
            <>
              <div className="assign-card-con popup vertical-nav-bar">
                <div className="assign-card ">
                  <li>
                    Reviewer's Name : <b>{product.firstName + " " + product.lastName}</b>
                  </li>
                  {/* {product.email present in assigned.value.reviewerApproval} */}
                  {assigned.value.reviewerApproval.map((ele) => {
                    if (ele.email === product.email) {
                      return (
                        <button
                          onClick={() =>
                            navigate("/AdminReview", { state: ele })
                          }
                        >
                          Check Status
                        </button>
                      );
                    } else {
                      return <button disabled>Pending</button>;
                    }
                  })}
                </div>
              </div>
            </>
          ))}
          <div className="wrap-btn">
            <button
              className="withdraw"
              onClick={() =>
                setAssigned((prevState) => ({
                  ...prevState,
                  status: false,
                }))
              }
            >
              close
            </button>
            <button className="save" onClick={() => Approval("Approved")}>
              Accept{" "}
            </button>
            <button className="reject" onClick={() => Approval("Rejected")}>
              Reject{" "}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="tabs-contaniner">
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Assign Paper" {...a11yProps(0)} />
              <Tab label="Evaluated Paper" {...a11yProps(1)} />
              <Tab label="Reviewers List" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div>
                <>
                  {/* <div className="assign-card-con">
                      <div className="assign-card">
                        <li>
                          Author's Name : <b>{product.firstName + " " + product.lastName}</b>
                        </li>
                        <li>
                          Title: <b>{product.title}</b>
                        </li>
                        <li>
                          {" "}
                          abstract :<b>{product.abstract}</b>
                        </li>
                        <button
                          onClick={(event) =>
                            assignReviewer(event, product.email)
                          }
                        >
                          Assign Reviewer
                        </button>
                      </div>
                    </div> */}
                  <div className="table-con">
                    <Paper
                      sx={{
                        width: "70%",
                        overflow: "hidden",
                        marginTop: "30px",
                      }}
                    >
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columnsOne.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {assignPaper
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row) => {
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                  >
                                    <TableCell>{row.firstName + " " + row.lastName}</TableCell>
                                    {/* now keyword is array needed to be mapped  ebin*/}
                                    {/* <TableCell >{row.keyword}</TableCell> */}
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                      {row.keyword.map((ele) => (
                                        <p>{ele.label}</p>
                                      ))}
                                    </TableCell>
                                    <TableCell>{row.abstract}</TableCell>
                                    <TableCell>
                                      {" "}
                                      <Link
                                        to={row.document}
                                        target="_blank"
                                        download
                                        className="download"
                                      >
                                        Download
                                      </Link>
                                    </TableCell>
                                    {/* <TableCell>
                                      {row.groupSubmission ? (
                                        <Button
                                          variant="success"
                                          style={{ pointerEvents: "none" }}
                                        >
                                          Yes
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="warning"
                                          style={{ pointerEvents: "none" }}
                                        >
                                          No
                                        </Button>
                                      )}
                                    </TableCell> */}
                                    <TableCell>
                                      {" "}
                                      <button
                                        className="assign-btn"
                                        onClick={(event) =>
                                          assignReviewer(event, row.email)
                                        }
                                      >
                                        Assign Reviewer
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={assignPaper.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </div>
                </>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div>
                <>
                  {/* <div className="assign-card-con">
                      <div className="assign-card">
                        <li>{product.id}</li>
                        <li>
                          Reviewer's Name : <b>{product.firstName + " " + product.lastName}</b>
                        </li>
                        <span>
                          {" "}
                          Check Review Status{" "}
                          <button
                            className="view-btn"
                            onClick={() =>
                              setAssigned((prevState) => ({
                                ...prevState,
                                status: true,
                                value: product,
                              }))
                            }
                          >
                            View111
                          </button>
                        </span>

                        <div>
                          <button className="approve-btn">Approve</button>
                          <button className="reject-btn">Reject</button>
                        </div>
                      </div>
                    </div> */}

                  <div className="table-con">
                    <Paper
                      sx={{
                        width: "70%",
                        overflow: "hidden",
                        marginTop: "30px",
                      }}
                    >
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {evaluatePaper
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row) => {
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.code}
                                  >
                                    <TableCell>{row.firstName + " " + row.lastName}</TableCell>
                                    {/* now keyword is array needed to be mapped ebin*/}

                                    {/* <TableCell >{row.keyword}</TableCell> */}
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                      {" "}
                                      <button
                                        className="view-btn"
                                        onClick={() =>
                                          setAssigned((prevState) => ({
                                            ...prevState,
                                            status: true,
                                            value: row,
                                          }))
                                        }
                                      >
                                        View
                                      </button>
                                    </TableCell>
                                    <TableCell>
                                      <li>
                                        {row.approved === "Pending" ? (
                                          <p style={{ color: "orange" }}>
                                            Pending
                                          </p>
                                        ) : row.approved === "Approved" ? (
                                          <p style={{ color: "Green" }}>
                                            Approved
                                          </p>
                                        ) : (
                                          <p style={{ color: "Red" }}>
                                            Rejected
                                          </p>
                                        )}
                                      </li>
                                    </TableCell>
                                    <TableCell>
                                      {row.reviewers.map((ele) => (
                                        <p>
                                          {ele.firstName + " " + ele.lastName}, {ele.email}
                                        </p>
                                      ))}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={evaluatePaper.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </div>
                </>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <div>
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
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

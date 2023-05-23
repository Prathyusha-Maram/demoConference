import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { AssigendPapers } from "../sampleData/adminAssignPaperData";
import { useNavigate, useLocation } from "react-router-dom";
import { API_ENDPOINT } from "../../../constant/constant";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import axios from "axios";
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
  const navigate = useNavigate();
  const { state } = useLocation();
  const [reviewerTableDetail, setreviewerTableDetail] = useState([]);
  const [checkData, setCheckData] = useState([]);
  //evaluated paper
  const [evaluatedPaper, setEvaluatedPaper] = useState([]);
  const [myReviewerheader] = useState({
    headers: {
      token: localStorage.getItem("Reviewertoken"),
    },
  });

  const [fiteredReviewTable, setFilteredReviewTable] = useState([]);
  const reviewerEmail = localStorage.getItem("Reviewer-email");

  ///
  // const fiteredReviewTable = reviewerTableDetail?.filter(
  //   (val) => val?.reviewerApproval.length == 0
  // );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [assignedNew, setAssignedNew] = useState({ status: false, value: {} });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "name", label: "Authors Name" },
    { id: "code", label: "Keyword" },
    {
      id: "population",
      label: "Title",
      width: 10,
    },
    { id: "code", label: "Abstract" },
    {
      id: "Review Paper",
      label: "Review Paper",
    },
  ];

  const columnsone = [
    { id: "name", label: "Authors Name" },
    { id: "code", label: "Title" },

    { id: "code", label: "Review Status" },
    {
      id: "Review",
      label: "Reviewer Email",
    },
    { id: "code", label: "View" },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let data = [];
    if (localStorage.getItem("reviewer-local")) {
      data = JSON.parse(localStorage.getItem("reviewer-local"));
    }
    let newArray = [];
    data.forEach((ele) => {
      newArray.push(ele.email);
    });
    setCheckData(newArray);
    axios
      .get(`${API_ENDPOINT}/reviewer/project`, myReviewerheader)

      .then((response) => {
        let array = [];
        let evalArray = [];
        response.data.project.forEach((ele) => {
          ele.reviewers.forEach((p) => {
            if (p.email === reviewerEmail) {
              array.push(ele);
            }
          });
        });
        let newArray = [];
        array.forEach((ele) => {
          let found = false;
          if (ele.reviewerApproval.length === 0) {
            newArray.push(ele);
          } else {
            ele.reviewerApproval.forEach((r) => {
              if (r.email === reviewerEmail) {
                found = true;
                evalArray.push(ele);
              }
            });
          }
          if (found === false) {
            newArray.push(ele);
          }
        });
        setEvaluatedPaper(evalArray);
        setFilteredReviewTable(newArray);
        setreviewerTableDetail(response.data.project);
      });
  }, []);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="tabs-global">
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
              <Tab label="Review Paper" {...a11yProps(0)} />
              <Tab label="Evaluated Paper" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <>
                {/* <div className="assign-card-con">
                                        <div className="assign-card">
                                            <li>{product.id}</li>
                                            <li>Post Title : <b>{product.Title}</b></li>
                                            <li>Authors's Name : <b>{product.firstName + " " + product.lastName}</b>
                                            </li>
                                            <li></li>
                                            <span>Authors's post:   <button className='view-btn' onClick={() => navigate("/PostReview", { state: { 
                                                 userDetails: product,
                                                ReviewerEmail: reviewerEmail 
                                                }, })}>View</button></span>


                                        </div>
                                    </div> */}

                <div className="table-con">
                  <Paper
                    sx={{ width: "70%", overflow: "hidden", marginTop: "30px" }}
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
                          {fiteredReviewTable
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
                                  <TableCell>
                                    {" "}
                                    {row.keyword.map((ele) => (
                                      <p>{ele.label}</p>
                                    ))}
                                  </TableCell>
                                  <TableCell>{row.title}</TableCell>
                                  <TableCell>{row.abstract}</TableCell>
                                  <TableCell>
                                    <button
                                      className={
                                        checkData.includes(row.email)
                                          ? "view-btn-pending"
                                          : "view-btn"
                                      }
                                      onClick={() =>
                                        navigate("/PostReview", {
                                          state: {
                                            userDetails: row,
                                            ReviewerEmail: reviewerEmail,
                                            fullUserDetail: fiteredReviewTable,
                                          },
                                        })
                                      }
                                    >
                                      {checkData.includes(row.email)
                                        ? "In-Progress"
                                        : "Review"}
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
                      count={fiteredReviewTable.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </>
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
                              {columnsone.map((column) => (
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
                            {evaluatedPaper
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

                                    {/* <TableCell>
                                      {" "}
                                      <button
                                        className="view-btn"
                                        onClick={() =>
                                          setAssignedNew((prevState) => ({
                                            ...prevState,
                                            status: true,
                                            value: row,
                                          }))
                                        }
                                      >
                                        View
                                      </button>
                                    </TableCell> */}
                                    <TableCell>
                                      {/* <li> */}
                                      {/* {console.log(row, "")}
                                        {row.reviewerApproval.map() === "Approved" ? (
                                          <p style={{ color: "Green" }}>
                                            Approved
                                          </p>
                                        ) : (
                                          <p style={{ color: "Red" }}>
                                            Rejected
                                          </p>
                                        )}
                                      </li> */}
                                      {row.reviewerApproval.map((ele) => {
                                        if (ele.email === reviewerEmail) {
                                          return ele.approve === "Approved" ? (
                                            <p style={{ color: "Green" }}>
                                              Approved
                                            </p>
                                          ) : (
                                            <p style={{ color: "Red" }}>
                                              Rejected
                                            </p>
                                          );
                                        }
                                      })}
                                    </TableCell>
                                    <TableCell>
                                      {row.reviewers.map((ele) => (
                                        <p>{ele.email}</p>
                                      ))}
                                    </TableCell>
                                    <TableCell>
                                      <button
                                        className="view-btn"
                                        onClick={() =>
                                          navigate("/viewReview", {
                                            state: {
                                              userDetails: row,
                                              ReviewerEmail: reviewerEmail,
                                              fullUserDetail:
                                                fiteredReviewTable,
                                            },
                                          })
                                        }
                                      >
                                        View
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
                        count={evaluatedPaper.length}
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
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

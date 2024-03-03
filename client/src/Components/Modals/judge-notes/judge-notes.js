import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./judge-notes.css";
import axios from "axios";
import { useContext } from "react";
import { EmailContext } from "../../../hooks/emailContext";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default function JudgeNotes(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [buttondisable, setButtonDisable] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const date = new Date();
  const today = date.toDateString();
  const formattedDate = formatDate(date);
  const email = useContext(EmailContext);
  const [activeView, setActiveView] = React.useState("newnote");
  const [searchValue, setSearchValue] = React.useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editedNote, setEditedNote] = useState("");

  const [notesData, setNotesData] = useState([]);

  const handleNotesSave = () => {
    setButtonDisable(true);
    axios
      .post("http://localhost:64000/judge-notes/save-notes", {
        email: email,
        caseId: props.caseId,
        date: formattedDate,
        notes: notes,
      })
      .then((res) => {
        if (res.status === 200) {
          setError("Saved");
        }
      })
      .catch((err) => {
        setError("Error");
      });
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  useEffect(() => {
    if (activeView !== "casenotes") {
      return;
    }
    axios
      .get(
        "http://localhost:64000/judge-notes/get-notes?email=" +
          email +
          "&caseId=" +
          props.caseId
      )
      .then((res) => {
        if (res.status === 200) {
          setNotesData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeView]);

  useEffect(() => {
    const search = (searchValue) => {
      axios
        .get(
          "http://localhost:64000/judge-notes/search-notes?email=" +
            email +
            "&caseId=" +
            props.caseId +
            "&date=" +
            searchValue
        )
        .then((res) => {
          if (res.status === 200) {
            setNotesData(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    search(searchValue);
  }, [searchValue]);

  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="notes-main">
          <div className="notes-sidebar">
            <Typography
              variant="h5"
              onClick={() => handleViewChange("newnote")}
              style={{ cursor: "pointer" }}
            >
              New Note
            </Typography>
            <Typography
              variant="h5"
              onClick={() => handleViewChange("casenotes")}
              style={{ cursor: "pointer" }}
            >
              Case Notes
            </Typography>
          </div>
          <div className="notes-inside">
            <div className="notes-title">
              <Typography variant="h4">Case Id: {props.caseId}</Typography>
              {error && <Typography variant="h4">{error}</Typography>}
              <Typography variant="h4">Date: {today}</Typography>
            </div>
            {activeView === "newnote" && (
              <>
                <div className="notes-body">
                  <textarea
                    placeholder="Enter your notes here"
                    rows="10"
                    cols="50"
                    className="notes-text-area"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
                <div className="notes-btn">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleNotesSave}
                    disabled={buttondisable}
                  >
                    Save
                  </Button>
                </div>
              </>
            )}
            {activeView === "casenotes" && (
              <div className="case-notes-body">
                <div className="search">
                  <input
                    type="text"
                    placeholder="Search by date"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <td>Date</td>
                        <td>Notes</td>
                        <td>Edit</td>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(notesData).map((date) => {
                        return (
                          <tr>
                            <td>{date}</td>
                            <td>
                              {editingNote === date ? (
                                <>
                                
                                <textarea
                                  value={editedNote}
                                  style={{background:"transparent"}}
                                  onChange={(e) =>
                                    setEditedNote(e.target.value)
                                  }
                                ></textarea>
                                                        <button onClick={() => {
                            // Save the edited note
                            axios.post('http://localhost:64000/judge-notes/edit-notes', {
                                email,
                                caseId: props.caseId,
                                date,
                                notes: editedNote
                            }).then((res) => {
                                if (res.status === 200) {
                                    // Update the note in the local state
                                    setNotesData({
                                        ...notesData,
                                        [date]: editedNote
                                    });
                                }
                            }).catch((err) => {
                                console.log(err);
                            });

                            setEditingNote(null);
                        }}>Save</button>
                                </>
                              ) : (
                                notesData[date]
                              )}
                            </td>
                            <td>
                              <IconButton
                                onClick={() => {
                                    if (editingNote !== date) {
                                        setEditingNote(date);
                                        setEditedNote(notesData[date]);
                                    }
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

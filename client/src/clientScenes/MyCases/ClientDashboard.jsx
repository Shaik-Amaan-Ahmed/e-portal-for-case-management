import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));



const columns = [
  {
    id:"sno",
    label:"S.No.",
    minWidth:100,
    aligh:'left'
  },
  { id: "caseNumber", label: "Case Number", minWidth: 170, align: "left" },
  { id: "status", label: "Status", minWidth: 170, align: "left" },
  {
    id: "petitioners",
    label: "Petitioners",
    minWidth: 170,
    align: "left",
  },
  {
    id: "respondents",
    label: "Respondents",
    minWidth: 170,
    align: "left",
  }
];

function createData(sno,caseNumber, status, petitioners, respondents) {
  return { sno,caseNumber, status, petitioners, respondents };
}

const cases = [];


for (let i = 0; i < 100; i++) {
  const statusOptions = ["Pending", "Next Hearing", "Completed"];
  const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

  const caseData = createData(
    i+1,
    `ABC${i+1}`, 
    randomStatus, 
    { names: ["John Doe"], advocates: ["Lorem", "ipsum"] },
    { names: ["Jane Doe"], advocates: ["Lorem", "ipsum"] }
  );
  cases.push(caseData);

}

function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={cases.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          
          <TableHead>
            
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.caseNumber}
                  >
                    {columns.map((column) => {
                      const value =
                        column.id === "petitioners" || column.id === "respondents"
                          ? row[column.id].names.join(", ")
                          : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}

const ClientDashboard = () => {
  return (
    <div style={{ height: "90rem", width: "85rem", padding:'20px'}}>
      <div>
      <Grid item xs={12} >
        <Item sx={{ fontSize: "20px" }} >
          <b>Case Progress Table</b>
        </Item>
      </Grid>
      </div>
      <br />
      <div >
        <StickyHeadTable />
      </div>
    </div>
  );
};

export default ClientDashboard;

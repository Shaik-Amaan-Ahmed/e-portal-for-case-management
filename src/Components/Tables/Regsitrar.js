import { Box, InputBase, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  
} from "@mui/x-data-grid";
import { tokens } from "../../themes";
import data from "../../Data/people.json";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import { SecurityOutlined } from "@mui/icons-material/SecurityOutlined";
import Header from "../Header";
import { useMemo, useState } from "react";
import { Maximize } from "@mui/icons-material";
import UserActions from "../useractions";

const RegistrarTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [edit, setEdit] = useState(false);
  const [rowId, setRowId] = useState(null);
  const VISIBLE_FIELDS = [
    "CaseId",
    "Prosecution",
    "Defandant",
    "Status",
    "CourtNo",
    "Judge",
  ];

  function Edit({ dats, id }) {
    if (edit) {
      return dats.id === id && <InputBase placeholder="Change" />;
    }
    return <Typography variant="h5">{dats}</Typography>;
  }

  const columns = useMemo(
    () => [
    {
      field: "id",
      width: 50,
      renderHeader: () => {
        return (
          <Typography variant="h3" fontWeight="bold">
            ID
          </Typography>
        );
      },
      renderCell: ({ row: { id } }) => {
        return <Typography variant="h5">{id}</Typography>;
      },
    },
    {
      field: "Prosecution",
      width: 200,
      editable: true,
      renderHeader: () => {
        return (
          <Typography variant="h3" fontWeight="bold">
            Prosecution
          </Typography>
        );
      },
      cellClassName: "name-column-cell",
      renderCell: ({ row: { Prosecution } }) => {
        return <Edit dats={Prosecution} id={Prosecution.id} />;
      },
      filterable: true,
    },
    {
      field: "Defandant",
      width: 200,
      renderHeader: () => {
        return (
          <Typography variant="h3" fontWeight="bold">
            Defandant
          </Typography>
        );
      },
      cellClassName: "name-column-cell",
      alignItems: "center",
      renderCell: ({ row: { Defendant } }) => {
        return <Typography variant="h4">{Defendant}</Typography>;
      },
      sortable: true,
    },
    {
      field: "Status",
      renderHeader: () => {
        return (
          <Typography variant="h3" fontWeight="bold">
            Status
          </Typography>
        );
      },
      width: 150,
      cellClassName: "name-column-cell",
      alignItems: "center",
      renderCell: ({ row: { Status } }) => {
        return (
          <Typography
            variant="h4"
            color={
              Status === "Completed"
                ? colors.greenAccent[700]
                : colors.redAccent[500]
            }
          >
            {Status}
          </Typography>
        );
      },
    },
    {
      field: "CourtNo",
      renderHeader: () => {
        return (
          <Typography variant="h3" fontWeight="bold">
            Court No
          </Typography>
        );
      },
      width: 130,
      alignItems: "center",
      align: "center",
      renderCell: ({ row: { CourtNo } }) => {
        return <Typography variant="h4">{CourtNo}</Typography>;
      },
    },
    {
      field: "Judge",
      renderHeader: () => {
        return (
          <Typography variant="h3" fontWeight="bold">
            Judge
          </Typography>
        );
      },
      width: 190,
      cellClassName: "name-column-cell",
      alignItems: "center",
      renderCell: ({ row: { Judge } }) => {
        return <Typography variant="h4">{Judge}</Typography>;
      },
    },
    {
      field: "Actions",
      width: 110,
      type: "actions",
      renderHeader: () => {
        return (
          <Typography variant="h3" margin="auto" fontWeight="bold">
            Actions
          </Typography>
        );
      },
      renderCell: (params) => {
        <UserActions {...{params, rowId, setRowId}}/>
      },
    },
  ]
  ,[rowId]
  );

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  return (
    <Box sx={{ position: "relative" }}>
      <Header title="CASES" subtitle="Managing the cases" />
      <Box
        sx={{
          ".MuiDataGrid-columnSeparator": {
            borderRight: "solid",
          },
          "& MuiDataGrid-root": {
            border: "solid",
            borderRight: " 2 solid",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F28C28",
            border: "solid",
            borderWidth: 1,
            borderRight: "solid",
            borderRightWidth: 2,
          },

          "& .MuiDataGrid-cell": {
            border: "solid",
            borderWidth: 0.9,
            borderBottom: "solid",
            borderLeft: "solid",
          },
        }}
      >
        <DataGrid
          {...data}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 100]}
          rows={data}
          rowHeight={69}
          columns={columns}
          slots={{ 
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          getRowSpacing={params=>({
            top:params.isFirstVisible?0 : 5,
            bottom: params.isLastVisible?0:5,
          })}
          getRowId={(row) => row.id}
          showCellVerticalBorder
          showColumnVerticalBorder
          onCellEditCommit={params => setRowId(params.id)}
        />
      </Box>
    </Box>
  );
};

export default RegistrarTable;

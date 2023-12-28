import { Box, InputBase, Typography, useTheme } from "@mui/material";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Fragment } from "react";
import {
    DataGrid,
    GridToolbar,

} from "@mui/x-data-grid";
import { tokens } from "../../themes";
import data from "../../Data/people.json";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import { SecurityOutlined } from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";
import { useMemo, useState } from "react";
import { Maximize } from "@mui/icons-material";
import UserActions from "../../Components/useractions";
import SignIn from "../Login/login";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Button onClick={handleOpen}
                style={{ backgroundColor: "#F28C28"}}>Open Child Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </Fragment>
    );
}

const ViewButton = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}
                style={{
                    backgroundColor: "#F28C28",
                }}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                    <ChildModal />
                </Box>
            </Modal>
        </div>
    );
}
const EFilingTable = () => {
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
                width: 100,
                renderHeader: () => {
                    return (
                        <Typography variant="h4" fontWeight="bold">
                            ID
                        </Typography>
                    );
                },
                renderCell: ({ row: { id } }) => {
                    return <Typography variant="h5">{id}</Typography>;
                },
            },
            {
                field: "CauseTitle",
                width: 400,
                editable: true,
                renderHeader: () => {
                    return (
                        <Typography variant="h4" fontWeight="bold">
                            Cause Title
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
                field: "Details",
                width: 390,
                renderHeader: () => {
                    return (
                        <Typography variant="h4" fontWeight="bold">
                            Details
                        </Typography>
                    );
                },
                cellClassName: "name-column-cell",
                alignItems: "center",
                renderCell: ({ row: { Defendant } }) => {
                    return <ViewButton name="View" />;
                },
                sortable: true,
            },
            {
                field: "Actions",
                width: 400,
                type: "actions",
                renderHeader: () => {
                    return (
                        <Typography variant="h4" margin="auto" fontWeight="bold">
                            Actions
                        </Typography>
                    );
                },
                renderCell: () => {
                    return (<div style={{
                        display: "flex"

                    }}>
                        <ViewButton name="Approve" /> <ViewButton name="Reject" />
                    </div>);
                },
            },
        ]
        , [rowId]
    );

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });

    return (
        <Box sx={{ position: "relative", marginTop: "10px" }}>
            <Box>
                <Header title="CASES" subtitle="Managing the cases" />
            </Box>

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
                        // border: "0.1px solid",
                        borderWidth: "0.2px",
                        borderBottom: "0.9px solid grey",
                        // borderLeft: "solid",
                    },
                    // border:'0.1px solid',
                    border: '0.1px solid grey',
                    borderRadius: '10px',
                    marginTop: "10px",
                    padding: "20px",
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
                    rowHeight={0}
                    columnHeaderHeight={45}
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    getRowSpacing={params => ({
                        top: params.isFirstVisible ? 0 : 2,
                        bottom: params.isLastVisible ? 0 : 2,
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

export default EFilingTable;

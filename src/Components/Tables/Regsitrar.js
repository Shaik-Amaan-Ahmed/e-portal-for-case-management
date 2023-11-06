import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import data from "../../Data/people.json"
import  AdminPanelSettingsOutlined  from "@mui/icons-material/AdminPanelSettingsOutlined";
import  LockOpenOutlined  from "@mui/icons-material/LockOpenOutlined";
import { SecurityOutlined } from "@mui/icons-material/SecurityOutlined";
import Header from "../Header";
import { useMemo } from "react";
import { Maximize } from "@mui/icons-material";



const RegistrarTable = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const VISIBLE_FIELDS = ['CaseId','Prosecution','Defandant','Status','CourtNo', 'Judge']
    const columns = 
    [
        {
            field: "id",
            width:50,
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        ID
                    </Typography>
                )
            },
            renderCell: ({row:{id}}) => {
                return (
                    <Typography variant = "h5" >
                        {id}
                    </Typography>
                )
            }
        
        },
        {
            field: "Prosecution",
            width:200,
            editable:true,
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Prosecution
                    </Typography>
                )
            },
           
            cellClassName: "name-column-cell",
            renderCell: ({row: {Prosecution}}) => {
                return (
                <Typography variant="h5" color={colors.grey[200]}>
                        {Prosecution}
                </Typography>
                )
            }
        },
        {
            field: "Defandant",
            width:200,
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Defandant
                    </Typography>
                )
            },
            
            cellClassName: "name-column-cell",
            alignItems: "center",
            renderCell: ({row: {Defendant}}) => {
                return (
                <Typography variant="h5" color={colors.grey[200]}>
                        {Defendant}
                </Typography>
                )
            }
        },
        {
            field: "Status",
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Status
                    </Typography>
                )
            },
<<<<<<< HEAD
            flex:1,
=======
            width:150,
>>>>>>> main
            cellClassName: "name-column-cell",
            alignItems: "center",
            renderCell : ({row: {Status}}) => {
                return (<Typography 
                        variant="h5" 
                        color={Status==="Completed" ? colors.greenAccent[500] : colors.redAccent[400]}>
                        {Status}
                        </Typography>
                )
                
            }
        },
        {
            field: "CourtNo",
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Court No
                    </Typography>
                )
            },
<<<<<<< HEAD
            type: "number",
            flex:1,
            alignItems:"center"
=======
            width:120,
            alignItems:"center",
            align:"center",
            renderCell: ({row: {CourtNo}}) => {
                return (
                <Typography variant="h4" color={colors.grey[200]}>
                        {CourtNo}
                </Typography>
                )
            }
>>>>>>> main
        },
        {
            field: "Judge",
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Judge
                    </Typography>
                )
            },
            width:150,
            cellClassName: "name-column-cell",
            alignItems: "center",
            renderCell: ({row: {Judge}}) => {
                return (
                <Typography variant="h5" color={colors.grey[200]}>
                        {Judge}
                </Typography>
                )
            }
        },
        {
            field: "district",
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        District
                    </Typography>
                )
            },
            flex:1,
            cellClassName: "name-column-cell",
            alignItems: "center",
            renderCell: ({row: {district}}) => {
                return (
                <Typography variant="h5" color={colors.grey[200]}>
                        {district}
                </Typography>
                )
            }
        },
        {
            field: "date",
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Date
                    </Typography>
                )
            },
            width:150,
            cellClassName: "name-column-cell",
            alignItems: "center",
            renderCell: ({row: {date}}) => {
                return (
                <Typography variant="h5" color={colors.grey[200]}>
                        {date}
                </Typography>
                )
            }
        },
    ]

    return (
        <Box sx={{position:"relative"}}>
            <Header title="CASES" subtitle="Managing the cases" />
            <Box>
                <DataGrid
                {...data}
                initialState={{
                  ...data.initialState,
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20, 100]}
                 rows={data}
                 rowHeight={69}
                 columns={columns} sx={{width:"maxWidth"}}
                 />
            </Box>
        </Box>
    )
}

export default RegistrarTable;
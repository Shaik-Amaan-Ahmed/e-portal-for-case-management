import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import data from "../../Data/people.json"
import  AdminPanelSettingsOutlined  from "@mui/icons-material/AdminPanelSettingsOutlined";
import  LockOpenOutlined  from "@mui/icons-material/LockOpenOutlined";
import { SecurityOutlined } from "@mui/icons-material/SecurityOutlined";
import Header from "../Header";


const RegistrarTable = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = 
    [
        {
            field: "id",
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
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Prosecution
                    </Typography>
                )
            },
            flex:0.8,
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
            renderHeader: () => {
                return (
                    <Typography variant="h3" >
                        Defandant
                    </Typography>
                )
            },
            flex:0.8,
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
            flex:0,
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
            type: "number",
            flex:1,
            alignItems:"center"
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
            flex:1,
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
    ]

    return (
        <Box>
            <Header title="CASES" subtitle="Managing the cases" />
            <Box>
                <DataGrid
                {...data}
                initialState={{
                  ...data.initialState,
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                 rows={data}
                 columns={columns}/>
            </Box>
        </Box>
    )
}

export default RegistrarTable;
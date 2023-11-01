import { Box } from "@mui/material";
import Header from "../../Components/Header"
import RegistrarTable from "../../Components/Tables/Regsitrar";

const Dashboard = () => {
    return (
        <Box m="20px">
            <Box>
                <RegistrarTable/>
            </Box>
            
        </Box>
    );
};

export default Dashboard;
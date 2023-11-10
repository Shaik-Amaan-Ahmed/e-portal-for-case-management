import { Box, ThemeProvider } from "@mui/material";
import Header from "../../Components/Header"
import { useTheme } from "@emotion/react";
import { tokens } from "../../themes";
import RegistrarTable from "../../Components/Tables/Regsitrar";
import MyTable from "../../Components/Tables/myowntable";
const Dashboard = () => {

    const theme = useTheme();
    const colors = tokens(theme)

    return (
        <ThemeProvider theme={theme}>
        <Box ml="20px">
            <Box>
                <RegistrarTable/>
            </Box>
        </Box>
        </ThemeProvider>
    );
};

export default Dashboard;
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../themes";

const Header = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="30px">
            <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mb: "5px"}}>
         HIGH COURT
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                For The State of Telangana
            </Typography>
        </Box>
    )

}

export default Header
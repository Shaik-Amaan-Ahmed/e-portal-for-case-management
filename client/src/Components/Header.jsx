import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../themes";

const Header = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="30px" m="auto" borderBottom="1px solid grey" borderRadius="20px" padding="10px">
            <Typography variant="h3" fontWeight="bold" sx={{ mb: "5px"}}>
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                For The State of Telangana
            </Typography>
        </Box>
    )

}

export default Header
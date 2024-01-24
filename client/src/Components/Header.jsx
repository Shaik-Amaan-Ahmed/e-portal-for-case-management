import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../themes";

const Header = ({title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="30px" m="auto" borderBottom="1px solid grey" borderRadius="20px" padding="10px" display="flex" width="fit-content" flexDirection="column">
            <Typography variant="h3" sx={{ mb: "5px",fontWeight:"500"}}>
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    )

}

export default Header
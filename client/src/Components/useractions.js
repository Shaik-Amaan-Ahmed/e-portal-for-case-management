import { Check, Save } from '@mui/icons-material';
import { Box, Button} from '@mui/material';
import { colors } from '@material-tailwind/react/types/generic';
import { useState } from 'react';
import { grey } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';

const UserActions = ({ params, rowId, setRowId }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => { 

    };
    return (
        <Box 
            sx={{m:1, position:"relative"}}
        >
            {success ? (
                <Fab
                    color='primary'
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor:"white",
                        '&:hover':{
                            bgcolor:colors.success.dark,
                        },
                    }}  
                >
                   <Check/> 
                </Fab>
            ): (
                <Fab
                color="blue"
                sx={{
                    width: 40,
                    height: 40,
                }}
                disabled={params.id !== rowId || loading}
                onClick={handleSubmit}
                >
                    <Save/>
                </Fab>
            )}
            {loading && (
                <CircularProgress 
                size={52}
                sx={{
                    position:"absolute",
                    color: colors.green[500],
                    top:-6,
                    left: -6,
                    zIndex: -1,
                }}
                />
            )}
                
        </Box>
    )
}

export default UserActions
import { Modal, Typography } from "@mui/material";
import "./notifications-menu.css"
import axios from "axios";


const ShowItem = (props) => {


    return (
    <div>
        <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
    
        <div className="notification-main">
            <div className="notification-header">
                <Typography variant="h4" color="orange">Notifications</Typography>
            </div>
            <div className="notification-body">
                <Typography variant="h5">Latest Judgements</Typography>
                
            </div>
        </div>
        </Modal>
        </div> 

    )
}

export default ShowItem;
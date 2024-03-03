import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Button } from '@mui/base/Button';
import { useSpring, animated } from '@react-spring/web';
import { tokens } from '../../themes';
import { Typography, colors } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import "./springModal.css";

function SpringModal(props) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
        BackdropProps={{
          sx: {
            backdropFilter : 'blur(10px)',
          },
        }}
      >
        <Fade in={props.open}>
          <ModalContent sx={style}>
            <div className='modal-title'>
            <Typography variant='h4' sx={{color: 'orange'}}>
              Are you sure you want to {props.message}?
            </Typography>
            </div>
            <div className='modal-buttons'>
                <div className='buttons'>
                    <button className='confirm-button' onClick={() => {props.handleSubmit();}}>Confirm</button>
                </div>  
                <div className='buttons'>
                    <button className='confirm-button' onClick={props.handleClose}>Cancel</button>
                </div>   
            </div>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return <Fade ref={ref} in={props.open} {...other} />;
});

Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
  notif: PropTypes.string
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
  1000: '#000000'
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "fit-content",
  backdropFilter : 'blur(20px)',
};

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ?  grey[1000] : '#fff'};
    border-radius: 8px;
    border: 0.7px solid ${theme.palette.mode === 'dark' ? grey[100] : grey[1000]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  `,
);

export default SpringModal;
import {
  Backdrop,
  Button,
  Fade,
  Link,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React from 'react';
import Edit from '../../../assets/icons/edit.svg';
import Remove from '../../../assets/icons/remove.svg';
import Modal from '@material-ui/core/Modal';
const useStyles = makeStyles((theme) => ({
  editIcon: {
    cursor: 'pointer',
    marginRight: '10px',
  },
  removeIcon: {
    cursor: 'pointer',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btnPosition: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '20px',
  },
}));

const ActionButton = ({ id }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Link href={`/master/edit-flight/${id}`}>
        <Tooltip title="Click to edit" arrow placement="top">
          <img
            id="editIcon"
            className={classes.editIcon}
            src={Edit}
            alt="edit icon"
            // title="Click to edit"
          />
        </Tooltip>
      </Link>

      <Tooltip title="Click to remove" arrow placement="top">
        <img
          onClick={handleOpen}
          id="removeIcon"
          className={classes.removeIcon}
          src={Remove}
          alt="edit icon"
          // title="Click to remove"
        />
      </Tooltip>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ textAlign: 'center' }}>
              DELETE MARKUP
            </h2>
            <p id="transition-modal-description">
              Are you sure you want to delete 'Markup Destination: Domestic'?
            </p>
            <div className={classes.btnPosition}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '34px' }}
              >
                Save
              </Button>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ActionButton;

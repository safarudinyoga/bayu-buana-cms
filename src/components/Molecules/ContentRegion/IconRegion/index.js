import {
  Backdrop,
  Button,
  Fade,
  Link,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React from 'react';
import Edit from '../../../../assets/icons/edit.svg';
import Remove from '../../../../assets/icons/remove.svg';
import view from '../../../../assets/icons/view.svg';
import Modal from '@material-ui/core/Modal';
import Iconstyle from './Iconstyle';
const IconsRegion = ({ id, urlEdit, removeFunction, urlDetail }) => {
  const classes = Iconstyle();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const removeData = () => {
    removeFunction(id);
    handleClose();
  };

  return (
    <div>
      <Link href={`${urlEdit}/${id}`}>
        <Tooltip title="Edit" arrow placement="top">
          <img
            id="editIcon"
            className={classes.editIcon}
            src={Edit}
            alt="edit icon"
            // title="Edit"
          />
        </Tooltip>
      </Link>

      <Link href={`${urlDetail}/${id}`}>
        <Tooltip title="View Details" arrow placement="top">
          <img
            id="viewIcon"
            className={classes.viewIcon}
            src={view}
            alt="view icon"
            // title="View Details"
          />
        </Tooltip>
      </Link>

      <Tooltip
        title="Remove"
        arrow
        placement="top"
        sx={{ backgroundColor: '#3E40AE' }}
      >
        <img
          onClick={handleOpen}
          id="removeIcon"
          className={classes.removeIcon}
          src={Remove}
          alt="edit icon"
          // title="Remove"
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
              DELETE REGION
            </h2>
            <p id="transition-modal-description">
              Are you sure you want to delete?
            </p>
            <div className={classes.btnPosition}>
              <Button
                onClick={removeData}
                variant="contained"
                color="primary"
                style={{ marginRight: '34px' }}
              >
                Remove
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

export default IconsRegion;

// components/TodoCard.js
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Proptypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  card: {
    transition: "transform 0.3s",
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0 0 10px 3px ${theme.palette.primary.main}`,
      transform: "scale(1.02)",
    },
  },
  deleteButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const TodoCard = ({ todo, onDeleteTodo, onUpdateTodo }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editTodo, setEditTodo] = useState({
    title: "",
    description: "",
    id: Date.now(),
  });

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleShowForm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTodo({ title: "", description: "", id: Date.now() });
  };

  const handleSave = () => {
    onUpdateTodo(editTodo);
    setEditTodo({ title: "", description: "", id: Date.now() });
    handleClose();
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {todo.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{
              whiteSpace: "normal",
              maxHeight: showFullDescription ? "none" : "3em",
              overflow: "hidden",
              justifyContent: "stretch",
            }}
          >
            {todo.description}
          </Typography>
          {todo.description.length > 100 && (
            <IconButton onClick={handleToggleDescription}>
              {showFullDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}

          <IconButton
            edge="center"
            aria-label="update"
            onClick={() => handleShowForm()}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteTodo(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={todo.title}
            onChange={(e) => setEditTodo({ ...todo, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={todo.description}
            onChange={(e) =>
              setEditTodo({ ...todo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

TodoCard.propTypes = {
  todo: Proptypes.object,
  onDeleteTodo: Proptypes.func,
  onUpdateTodo: Proptypes.func,
  onSaveTodo: Proptypes.func,
};

export default TodoCard;

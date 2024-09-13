import { ListItem, Checkbox, IconButton, ListItemText } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TaskItem = ({ task, onDelete, onComplete, onEdit }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" color="info" onClick={() => onEdit(task.id)}>
            <Edit />
          </IconButton>
          <IconButton
            edge="end"
            color="error"
            onClick={() => onDelete(task.id)}
          >
            <Delete />
          </IconButton>
        </>
      }
    >
      <Checkbox checked={task.completed} onChange={() => onComplete(task.id)} />
      <ListItemText primary={task.text} />
    </ListItem>
  );
};

export default TaskItem;

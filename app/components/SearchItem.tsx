import { ListItem, IconButton, ListItemText } from "@mui/material";
import { Undo } from "@mui/icons-material";

const SearchItem = ({ task, undoComplete, completedAt }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton
            edge="end"
            color="info"
            onClick={() => undoComplete(task.id)}
          >
            <Undo />
          </IconButton>
        </>
      }
    >
      <div className="flex flex-row">
        <div className="mr-auto">
          <ListItemText primary={task.text} />
        </div>

        <div>Completed: {completedAt}</div>
      </div>
    </ListItem>
  );
};

export default SearchItem;

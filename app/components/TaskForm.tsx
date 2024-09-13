import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const TaskForm = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    onAdd(input);
    setInput("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mt={2}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TaskForm;

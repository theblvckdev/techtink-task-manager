import { useState } from "react";
import { TextField, Box } from "@mui/material";

const SearchForm = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    onSearch(input);
    setInput("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mt={2}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </Box>
  );
};

export default SearchForm;

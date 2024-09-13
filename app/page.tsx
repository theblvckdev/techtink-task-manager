"use client";
import { useState, useEffect } from "react";
import { Container, Typography, List, Box } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import SearchForm from "./components/SearchForm";
import SearchItem from "./components/SearchItem";

// Helper function to format date to "YYYY-MM-DD HH:mm"
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      completedAt: null,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null,
          }
        : task
    );
    setTasks(updatedTasks);
    setCompletedTasks(updatedTasks.filter((task) => task.completed));
  };

  const undoComplete = (taskId) => {
    const confirmation = confirm(
      "Are you sure you want to undo the completion of this task?"
    );
    if (confirmation) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: false, completedAt: null }
          : task
      );
      setTasks(updatedTasks);
      setCompletedTasks(updatedTasks.filter((task) => task.completed));
    }
  };

  const editTask = (taskId) => {
    const newText = prompt("Edit task");
    if (newText) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        )
      );
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredCompletedTasks = completedTasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm)
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        paddingTop: "50px",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Pending Tasks
        </Typography>
        <Box sx={{ minHeight: "80vh", padding: "20px" }}>
          <TaskForm onAdd={addTask} />
          <List>
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onComplete={toggleComplete}
                  onEdit={editTask}
                />
              ))}
          </List>
        </Box>
      </Container>

      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Completed Tasks
        </Typography>
        <Box
          sx={{
            backgroundColor: "#FFE9E4",
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <SearchForm onSearch={handleSearch} />
          <List>
            {(searchTerm ? filteredCompletedTasks : completedTasks).map(
              (task) => (
                <SearchItem
                  key={task.id}
                  task={task}
                  undoComplete={undoComplete}
                  completedAt={formatDateTime(task.completedAt)}
                />
              )
            )}
          </List>
        </Box>
      </Container>
    </Box>
  );
}

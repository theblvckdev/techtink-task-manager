"use client";

import React, { useEffect, useState } from "react";
import { AddTaskDialog } from "@/components/common/addTaskModal";
import TaskCard from "@/components/common/taskCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

export interface TaskDataProps {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

const Homepage = () => {
  const [tasks, setTasks] = useState<TaskDataProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function to handle adding a new task
  const handleAddTask = (newTask: TaskDataProps) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage when a task is added
      return updatedTasks;
    });
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage after task deletion
      return updatedTasks;
    });
  };

  // Function to handle marking a task as completed
  const handleCompleteTask = (taskId: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage when a task is completed
      return updatedTasks;
    });
  };

  // Function to handle editing a task
  const handleEditTask = (
    taskId: number,
    newName: string,
    newDescription: string
  ) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, name: newName, description: newDescription }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage when a task is edited
      return updatedTasks;
    });
  };

  // Fetch tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Function to filter tasks based on search query
  const filterTasksByQuery = (tasks: TaskDataProps[]) => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const pendingTasks = filterTasksByQuery(
    tasks.filter((task) => !task.completed)
  );
  const completedTasks = filterTasksByQuery(
    tasks.filter((task) => task.completed)
  );

  return (
    <main className="min-h-screen bg-gray-50 flex lg:flex-row flex-col gap-4">
      <div className="lg:basis-1/2 p-4">
        <div className="flex flex-row items-center">
          <div className="mr-auto">
            <h1 className="text-2xl font-semibold text-black leading-tight">
              Pending tasks
            </h1>
            <small className="text-gray-400">Techtink task manager</small>
          </div>

          {/* AddTaskDialog component with the onAddTask prop */}
          <AddTaskDialog onAddTask={handleAddTask} />
        </div>

        <div className="mt-5">
          <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  description={task.description}
                  completed={task.completed}
                  onTaskDelete={handleDeleteTask}
                  onTaskComplete={handleCompleteTask}
                  onTaskEdit={handleEditTask} // Pass the edit handler to the TaskCard
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-2">
                No pending tasks available
              </p>
            )}
          </div>
        </div>
      </div>
      <Separator className="lg:min-h-screen w-full h-[1px] lg:w-[1px] bg-gray-300" />
      <div className="basis-1/2 p-4">
        <div className="flex md:flex-row flex-col md:items-center">
          <div className="mr-auto">
            <h1 className="text-2xl font-semibold text-black leading-tight">
              Completed tasks
            </h1>
            <small className="text-gray-400">
              You have {completedTasks.length} completed tasks
            </small>
          </div>

          {/* Search task by task name */}
          <form>
            <Input
              className="md:w-40 w-full"
              type="search"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
          </form>
        </div>

        <div className="mt-5">
          <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-3">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  description={task.description}
                  completed={task.completed}
                  onTaskDelete={handleDeleteTask}
                  onTaskComplete={handleCompleteTask}
                  onTaskEdit={handleEditTask} // Pass the edit handler to the TaskCard
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-2">
                No completed tasks available
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Homepage;

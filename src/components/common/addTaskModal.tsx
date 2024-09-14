"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TaskDataProps } from "@/app/page"; // Ensure this is correctly imported

interface AddTaskDialogProps {
  onAddTask: (task: TaskDataProps) => void;
}

export function AddTaskDialog({ onAddTask }: AddTaskDialogProps) {
  const { toast } = useToast();

  // State to store the input values
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  // State to control the dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Handler functions for onChange events
  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  // Function to save task to local storage and notify parent
  const saveTaskToLocalStorage = () => {
    const newTask: TaskDataProps = {
      id: Date.now(), // Unique id using current timestamp
      name: taskName,
      description: taskDescription,
      completed: false,
      createdAt: Date.now(),
    };

    // Get existing tasks from local storage
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Add the new task to the array of tasks
    tasks.push(newTask);

    // Save the updated tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Notify parent component
    onAddTask(newTask);

    // Clear the input fields after saving
    setTaskName("");
    setTaskDescription("");
  };

  // Handler for form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    saveTaskToLocalStorage();
    toast({
      title: "Task created",
      description: "Your task has been created",
    });
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size={"lg"}
          onClick={() => setIsDialogOpen(true)}
        >
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] font-poppins bg-white`}>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
            <DialogDescription className="text-xs">
              Please fill in the details for the new task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="name">Task name</Label>
              <Input
                required
                name="taskName"
                id="name"
                value={taskName}
                onChange={handleTaskNameChange}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="description">Task description</Label>
              <Textarea
                required
                name="taskDescription"
                id="description"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

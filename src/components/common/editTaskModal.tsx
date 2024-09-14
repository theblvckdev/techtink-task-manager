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
import { Poppins } from "next/font/google";
import { Textarea } from "../ui/textarea";
import { FilePenLine } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

interface EditTaskDialogProps {
  taskId: number;
  taskName: string;
  taskDescription: string;
  onTaskEdit: (taskId: number, newName: string, newDescription: string) => void;
}

export function EditTaskDialog({
  taskId,
  taskName,
  taskDescription,
  onTaskEdit,
}: EditTaskDialogProps) {
  const [name, setName] = useState(taskName);
  const [description, setDescription] = useState(taskDescription);
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  // Function to handle task edit
  const handleEditTask = () => {
    onTaskEdit(taskId, name, description);
    setIsOpen(false); // Close the modal

    toast({
      title: "Task Edited",
      description: "Your task has been edited",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size={"sm"}
          title="Edit task"
          className="text-xs no-underline duration-300 ease-in py-1 px-2 outline-none bg-gray-100"
          onClick={() => setIsOpen(true)} // Open the modal
        >
          <FilePenLine size={16} strokeWidth={1} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] font-poppins bg-white ${poppins.className}`}
      >
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription className="text-xs">
            Modify the details of your task below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="name">Task name</Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="description">Task description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleEditTask}>
            Save task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

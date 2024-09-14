import { TaskDataProps } from "@/app/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface DeleteTaskAlertDialogProps {
  taskId: number;
  onTaskDelete: (taskId: number) => void;
}

export function DeleteTaskAlertDialog({
  taskId,
  onTaskDelete,
}: DeleteTaskAlertDialogProps) {
  const { toast } = useToast();

  const [allTasks, setAllTasks] = useState<TaskDataProps[]>([]);

  // Fetch tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setAllTasks(JSON.parse(storedTasks));
    }
  }, []);

  const deleteTask = (taskId: number) => {
    const updatedTasks = allTasks.filter((task) => task.id !== taskId);
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast({
      title: "Task deleted",
      description: "Your task has been deleted",
    });

    // Inform the parent component that the task was deleted
    onTaskDelete(taskId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          title="delete task"
          className="text-xs no-underline duration-300 ease-in py-1 px-2 outline-none bg-gray-100"
        >
          <Trash size={16} strokeWidth={1} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={`bg-white`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteTask(taskId)}
            className="bg-red-500 hover:bg-red-600"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

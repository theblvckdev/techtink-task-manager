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
import { X } from "lucide-react";

interface UndoTaskCompletionAlertDialogProps {
  taskId: number;
  tasks: TaskDataProps[] | undefined;
  onToggleComplete: (updatedTask: TaskDataProps) => void;
}

export function UndoTaskCompletionAlertDialog({
  taskId,
  tasks,
  onToggleComplete,
}: UndoTaskCompletionAlertDialogProps) {
  const { toast } = useToast();

  // Find the task by ID
  const task = tasks?.find((t) => t.id === taskId);

  if (!task) {
    return null; // Render nothing if the task is not found
  }

  // Undo the task completion by marking it as pending
  const undoTaskCompletion = () => {
    const updatedTask = { ...task, completed: false };

    // Inform the parent component that the task completion status was reverted
    onToggleComplete(updatedTask);

    toast({
      title: "Task reverted",
      description: "Task has been marked as pending",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          title="Undo completed task"
          className="text-xs absolute bottom-0 right-0 m-2 no-underline duration-300 ease-in py-1 px-2 outline-none bg-gray-100"
        >
          <X size={16} strokeWidth={1} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark this task as pending and return it back to the
            pending block.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={undoTaskCompletion}
            className="bg-red-500 hover:bg-red-600"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

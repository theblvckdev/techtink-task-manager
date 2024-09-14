import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const CardDropdown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <EllipsisVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white mt-1 shadow outline-none duration-300 ease-in rounded-md ring-1 ring-gray-300">
          <DropdownMenuItem className="text-xs duration-300 ease-in py-1.5 px-2 outline-none hover:bg-gray-100">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs duration-300 ease-in py-1.5 px-2 outline-none hover:bg-gray-100">
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs duration-300 ease-in py-1.5 px-2 outline-none hover:bg-gray-100">
            Completed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CardDropdown;

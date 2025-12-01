import { EditIcon, EllipsisVertical, Trash2Icon } from "lucide-react";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";

export const CardItemMenu = () => {
  return (
    <>
      <DropdownMenu
        align="end"
        side="top"
        sideOffset={20}
        trigger={
          <IconButton>
            <EllipsisVertical />
            <span className="sr-only">open menu</span>
          </IconButton>
        }
      >
        <DropdownMenuItem>
          <EditIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenu>
    </>
  );
};

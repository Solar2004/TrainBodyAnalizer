"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AddFamilyMemberDialog } from "./add-family-member-dialog";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditFamilyMemberDialogProps {
  member: any;
  onSuccess?: () => void;
}

export function EditFamilyMemberDialog({
  member,
  onSuccess,
}: EditFamilyMemberDialogProps) {
  if (!member) return null;

  return (
    <AddFamilyMemberDialog
      memberToEdit={member}
      isEditing={true}
      onSuccess={onSuccess}
      trigger={
        <Button variant="outline" size="sm" className="h-8 px-2">
          <Edit size={14} className="mr-1" /> Edit
        </Button>
      }
    />
  );
}

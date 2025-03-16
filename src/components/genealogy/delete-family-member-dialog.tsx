"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Trash2 } from "lucide-react";
import { createClientSideClient } from "../../../supabase/client-side";

interface DeleteFamilyMemberDialogProps {
  memberId: string;
  memberName: string;
  onSuccess?: () => void;
}

export function DeleteFamilyMemberDialog({
  memberId,
  memberName,
  onSuccess,
}: DeleteFamilyMemberDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientSideClient();

  const handleDelete = async () => {
    if (!memberId) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("family_members")
        .delete()
        .eq("id", memberId);

      if (error) throw error;

      if (onSuccess) onSuccess();
      router.refresh();
    } catch (error) {
      console.error("Error deleting family member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 size={14} className="mr-1" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Family Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {memberName} from your family tree?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

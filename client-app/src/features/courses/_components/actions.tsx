"use client";

import { ConfirmModal } from "@/components/confirm-modal";
//import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
//import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
//import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
}

export const Actions = ({ courseId, isPublished, disabled }: ActionsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //const confetti = useConfettiStore();

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      navigate({ to: "/teacher/courses" });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onTogglePublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        //await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        //await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        //confetti.onOpen();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onTogglePublish}
        disabled={disabled || isLoading}
        variant={isPublished ? "destructive" : "outline"}
        size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

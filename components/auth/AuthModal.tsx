"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full p-0 border-0">
        <DialogTitle className="sr-only">
          FoodShare нэвтрэх / бүртгүүлэх
        </DialogTitle>
        <LoginForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

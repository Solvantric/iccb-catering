"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  message?: string;
  confirmLabel?: string;
  confirmText?: string;
  confirmVariant?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  description,
  message,
  confirmLabel = "Confirm",
  confirmText,
  confirmVariant,
  isDestructive = true,
  isLoading = false,
}: ConfirmDialogProps) {
  const handleClose = onClose || onCancel || (() => {});
  const displayMsg = message || description || "";
  const displayLabel = confirmText || confirmLabel;
  const isDanger = confirmVariant === "danger" || isDestructive;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="sm">
      <div className="text-center space-y-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
            isDanger ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-display font-bold text-lg uppercase text-ink-950">
            {title}
          </h3>
          <p className="text-xs text-ink-500 mt-1 leading-relaxed">
            {displayMsg}
          </p>
        </div>

        <div className="flex gap-3 pt-3">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="flex-1 text-xs"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={isDanger ? "danger" : "primary"}
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1 text-xs font-bold uppercase"
          >
            {displayLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

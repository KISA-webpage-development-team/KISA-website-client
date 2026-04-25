import React, { useEffect, useState } from "react";

import { MenuItemRaw } from "@/types/pocha";

import PochaMenuItemForm from "./PochaMenuItemForm";
import PochaMenuItemList from "./PochaMenuItemList";

type FormState =
  | null
  | { mode: "create"; presetImmediatePrep: boolean }
  | { mode: "update"; initialData: MenuItemRaw };

export interface MenuFormViewState {
  active: boolean;
  mode?: "create" | "update";
}

interface PochaMenuFieldsProps {
  /**
   * Fired whenever the inline menu-item form opens or closes. The parent
   * (PochaFormDialog) uses this to swap the dialog title, hide the TabsList,
   * and hide the outer DialogFooter — turning the dialog into a focused
   * menu-form view.
   */
  onFormStateChange?: (state: MenuFormViewState) => void;
}

export default function PochaMenuFields({
  onFormStateChange,
}: PochaMenuFieldsProps) {
  const [formState, setFormState] = useState<FormState>(null);

  useEffect(() => {
    if (!onFormStateChange) return;
    if (formState) {
      onFormStateChange({ active: true, mode: formState.mode });
    } else {
      onFormStateChange({ active: false });
    }
  }, [formState, onFormStateChange]);

  const closeForm = () => setFormState(null);

  if (formState) {
    return (
      <PochaMenuItemForm
        mode={formState.mode}
        initialData={
          formState.mode === "update" ? formState.initialData : undefined
        }
        presetImmediatePrep={
          formState.mode === "create" ? formState.presetImmediatePrep : undefined
        }
        closeItemForm={closeForm}
      />
    );
  }

  return (
    <PochaMenuItemList
      onAdd={(presetImmediatePrep) =>
        setFormState({ mode: "create", presetImmediatePrep })
      }
      onEdit={(menu) => setFormState({ mode: "update", initialData: menu })}
    />
  );
}

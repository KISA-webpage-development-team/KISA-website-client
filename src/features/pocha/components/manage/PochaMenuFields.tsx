import React, { useState } from "react";

import { MenuItemRaw } from "@/types/pocha";

import PochaMenuItemForm from "./PochaMenuItemForm";
import PochaMenuItemList from "./PochaMenuItemList";

type FormState =
  | null
  | { mode: "create"; presetImmediatePrep: boolean }
  | { mode: "update"; initialData: MenuItemRaw };

export default function PochaMenuFields() {
  const [formState, setFormState] = useState<FormState>(null);

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

import { useState, type KeyboardEvent } from "react";
import { Badge, Button, Icon, IconButton, Input } from "@umichkisa-ds/web";

type RoleTagInputProps = {
  id: string;
  value: string[];
  onChange: (roles: string[]) => void;
  onBlur: () => void;
  /** Labels already in use; any new label is allowed too. */
  suggestions: string[];
  invalid: boolean;
  disabled: boolean;
};

/**
 * Tag-style roles input: typing and Enter adds a role, chips remove one, and
 * suggestion chips add a known label in one click.
 */
export default function RoleTagInput({
  id,
  value,
  onChange,
  onBlur,
  suggestions,
  invalid,
  disabled,
}: RoleTagInputProps) {
  const [draft, setDraft] = useState("");

  const addRole = (label: string) => {
    const role = label.trim();
    setDraft("");
    if (role === "" || value.includes(role)) return;
    onChange([...value, role]);
  };

  const removeRole = (role: string) =>
    onChange(value.filter((current) => current !== role));

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Enter that confirms a Korean IME composition is not an add.
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    event.preventDefault();
    addRole(draft);
  };

  const query = draft.trim().toLowerCase();
  const visibleSuggestions = suggestions.filter(
    (label) =>
      !value.includes(label) &&
      (query === "" || label.toLowerCase().includes(query)),
  );

  return (
    <div className="flex flex-col gap-2">
      {value.length > 0 ? (
        <ul aria-label="추가된 역할" className="flex flex-wrap gap-2">
          {value.map((role) => (
            <li key={role}>
              <Badge variant="default" className="gap-2">
                {role}
                <IconButton
                  icon="x"
                  size="sm"
                  variant="tertiary"
                  aria-label={`${role} 역할 삭제`}
                  onClick={() => removeRole(role)}
                  disabled={disabled}
                />
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <Input
        id={id}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        placeholder="역할을 입력하고 Enter를 누르세요"
        invalid={invalid}
        disabled={disabled}
      />

      {visibleSuggestions.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="type-caption text-muted-foreground">추천</span>
          {visibleSuggestions.map((label) => (
            <Button
              key={label}
              type="button"
              variant="tertiary"
              size="sm"
              onClick={() => addRole(label)}
              disabled={disabled}
            >
              <Icon name="plus" size="xs" />
              {label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

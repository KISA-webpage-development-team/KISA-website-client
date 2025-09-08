import CustomField from "@/deprecated-components/shared/CustomField";

interface PochaInfoField {
  value: string;
  setValue: (value: string) => void;
  label: string;
  type: string;
  placeholder?: string;
  isError: boolean;
  errorMsg: string;
  errorState: string;
}

export default function PochaInfoFields({ fields }: { fields: PochaInfoField[] }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {fields.map(
        (
          {
            value,
            setValue,
            label,
            type,
            placeholder,
            isError,
            errorMsg,
            errorState,
          },
          index
        ) => (
          <div key={index} className="w-full">
            <CustomField
              value={value}
              setValue={setValue}
              label={label}
              required={true}
              type={type}
              placeholder={placeholder}
              isError={isError}
              errorMsg={errorMsg}
              errorState={errorState}
            />
          </div>
        )
      )}
    </div>
  );
}

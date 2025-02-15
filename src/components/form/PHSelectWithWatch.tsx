import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple";
  onValueChange: React.Dispatch<React.SetStateAction<string>>
};

const PHSelectWithWatch = ({
  name,
  label,
  options,
  disabled,
  mode,
  onValueChange
}: TSelectProps) => {
  const { control } = useFormContext();
  const inputValues = useWatch({ control, name });

  useEffect(()=> {
    onValueChange(inputValues)
  },[inputValues])

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            {...field}
            options={options}
            disabled={disabled}
          />
          {error && <small className="text-rose-500">{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple";
};

const PHSelect = ({ name, label, options, disabled, mode }: TSelectProps) => {
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

export default PHSelect;

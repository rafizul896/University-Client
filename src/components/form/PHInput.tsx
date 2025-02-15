import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div className="mb-5">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input disabled={disabled} {...field} type={type} id={name} />
            {error && <small className="text-rose-500">{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;

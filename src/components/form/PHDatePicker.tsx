import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div className="mb-5">
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker {...field} id={name} style={{ width: "100%" }} />
            {error && <small className="text-rose-500">{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;

import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  const { register } = useFormContext();

  return (
    <div className="flex gap-2 items-center">
      {label && <label htmlFor={name}>{label} </label>}
      <Input type={type} id={name} {...register(name)} />
    </div>
  );
};

export default PHInput;

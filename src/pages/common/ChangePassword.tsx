import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TResponse } from "@/types";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePassword = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("creating..!");

    try {
      const res = (await changePassword(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Password change is successful", { id: toastId });
        dispatch(logout())
        navigate(`/login`);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message, { id: toastId });
      }
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Change</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;

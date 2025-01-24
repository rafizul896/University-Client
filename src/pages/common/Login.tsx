import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { Button } from "antd";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register } = useForm({
  //   defaultValues: { id: "A-0001", password: "admin123" },
  // });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const toastId = toast.loading("Logging in");
    // try {
    //   const res = await login(data).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user, token: res.data.accessToken }));

    //   toast.success("Logged In", { id: toastId, duration: 2000 });
    //   navigate(`/${user?.role}/dashboard`);
    // } catch (err) {
    //   if (err instanceof Error) {
    //     toast.error(err?.message || "Something went wrong!", {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //   }
    // }
  };

  return (
    <PHForm
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center min-h-screen"
    >
      <div>
        <label htmlFor="id">UserId : </label>
        <PHInput type="text" name="id" />
      </div>
      <div>
        <label htmlFor="password">Password : </label>
        <PHInput type="text" name="password" />
      </div>

      <Button htmlType="submit">Login</Button>
    </PHForm>
  );
};

export default Login;

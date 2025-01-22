import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: { id: "A-0001", password: "admin123" },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success("Logged In", { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message || "Something went wrong!", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center min-h-screen"
    >
      <div>
        <label htmlFor="id">UserId : </label>
        <input className="border-2" type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password : </label>
        <input type="text" id="password" {...register("password")} />
      </div>

      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { Button } from "antd";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: { id: "A-0001", password: "admin123" },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (data: object) => {
    const res = await login(data).unwrap();
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user, token: res.data.accessToken }));
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

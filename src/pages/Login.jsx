import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import loginSchema from "../validators/login-validator";
import { axiosError } from "../utils/axios-error";
import userApi from "../apis/userApi";
import { toast } from "sonner";
import { getAccessToken, setAccessToken } from "../utils/local-storage";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  // const token = getAccessToken();
  // if (token) {
  //   return <Navigate to="/" />;
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await userApi.login(data);
      setAccessToken(response.data.accessToken);
      toast.success("Login Succesfully");
    } catch (error) {
      console.log(error);
      axiosError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-md shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          {...register("username")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}

export default Login;

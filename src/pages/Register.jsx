import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import registerSchema from "../validators/register-validator";
import userApi from "../apis/userApi";
import { axiosError } from "../utils/axios-error";
import { toast } from "sonner";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { username, password, confirmPassword } = data;
      const response = await userApi.register({
        username,
        password,
        confirmPassword,
      });

      toast.success("Register Succesful");
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
      <div className="mb-4">
        <label className="block text-gray-700">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

export default Register;

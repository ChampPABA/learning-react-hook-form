import axios from "./config/axiosConfig";

const userApi = {};

userApi.register = (body) => axios.post("/user/register", body);
userApi.login = (body) => axios.post("/user/login", body);

export default userApi;

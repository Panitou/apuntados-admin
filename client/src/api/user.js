import axios from "./axios";

export const addUserRequest = async (user) => axios.post("/users", user);
export const getUsersRequest = async () => axios.get("/users");

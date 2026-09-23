import api from "./api";

// Get logged-in user's profile
export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// Update logged-in user's profile
export const updateProfile = async (userData) => {
  const { data } = await api.put("/users/profile", userData);
  return data;
};
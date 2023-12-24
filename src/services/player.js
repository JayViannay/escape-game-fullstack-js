import api from "./api";

export const getPlayer = async (id) => {
    const response = await api.get(`/players/${id}`);
    return response.data;
};

export const getPlayerByUsername = async (username) => {
    const response = await api.get(`/players/${username}`);
    return response.data;
};

export const newPlayer = async (username, ip) => {
    const response = await api.post("/players", { username, ip });
    return response.data;
};
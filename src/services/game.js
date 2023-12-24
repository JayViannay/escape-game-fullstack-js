import api from "./api";

export const getGame = async (id) => {
    const response = await api.get(`/games/find/${id}`);
    return response.data;
};

export const newGame = async (playerId, minutes, secondes) => {
    const response = await api.post("/games", { playerId, minutes, secondes });
    return response.data;
};

export const updateGame = async (id, minutes, secondes) => {
    const response = await api.put(`/games/edit/${id}`, { minutes, secondes });
    return response.data;
};
import api from "./api";

export const getUsergameChallenge = async (gameId, playerId) => {
    const response = await api.get(`/games/usergame/challenge/${gameId}/${playerId}`);
    return response.data;
}

export const getAllChallenge = async () => {
    const response = await api.get("/games/challenges");
    return response.data;
};

export const getChallengeById = async (id) => {
    const response = await api.get(`/games/challenges/${id}`);
    return response.data;
}

export const finishChallenge = async (data) => {
    const response = await api.put(`/games/challenges/`, data);
    return response.data;
};
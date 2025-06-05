import api from "./api";

export const getAppointment = async () => {
    const response = await api.get("/appointments");
    return response.data;
}

export const createAppointment = async (data) => {
    const response = await api.post("/appointments", data);
    return response.data;
}

export const updateAppointment = async (id, data) => {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
}

export const deleteAppointment = async (id) => {
    const response = api.delete(`/appointments/${id}`, data)
    return response.data;
}
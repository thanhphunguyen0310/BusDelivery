import { axiosClient, handleApiError } from "./axiosClient";

export const getOrders = async (pageIndex, pageSize) => {
  try {
    const response = await axiosClient.get(
      `/api/v1/Order?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axiosClient.get(`/api/v1/Order/${orderId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

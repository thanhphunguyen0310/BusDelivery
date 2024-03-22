import { axiosClient, handleApiError } from "./axiosClient";

export const getBusById = async (BusId) => {
  try {
    const response = await axiosClient.get(`/api/v1/Bus/${BusId}`);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getBusRoutes = async (pageIndex, pageSize, searchParams) => {
  console.log(pageIndex, pageSize, searchParams);
  try {
    const { data } = await axiosClient.get(
      `/api/v1/Route?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchParams}`
    );
    console.log(data);
    return {
      error: null,
      data: data,
    };
  } catch (e) {
    return {
      error: e?.response,
      data: null,
    };
  }
};

export const getBusRoute = async (id) => {
  try {
    const { data } = await axiosClient.get(`/api/v1/Route/${id}`);
    return {
      error: null,
      data: data,
    };
  } catch (e) {
    return {
      error: e?.response,
      data: null,
    };
  }
};

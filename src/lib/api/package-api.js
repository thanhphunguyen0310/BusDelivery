import { axiosClient, handleApiError } from "./axiosClient";

export const getPackageById = async (packageId) => {
  try {
    const response = await axiosClient.get(`/api/v1/Package/${packageId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPackages = async (pageIndex, pageSize, fromTime, toTime) => {
  try {
    const response = await axiosClient.get(
      `/api/v1/Package?pageIndex=${pageIndex}&pageSize=${pageSize}${(fromTime && toTime) ? `&fromTime=${fromTime}&toTime=${toTime}` : ""}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
import { axiosClient, handleApiError } from "./axiosClient";
import { axiosClientMultiPart } from "./axiosClientMultiPart";

export const getOffices = async (searchParams, pageIndex, pageSize) => {
  try {
    const { data } = await axiosClient.get(
      `/api/v1/Office?status=true&pageIndex=${pageIndex}&pageSize=${pageSize}${searchParams !== "" ? `&SearchTerm=${searchParams}` : ""}`
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

export const getOffice = async (id) => {
  try {
    const { data } = await axiosClient.get(`/api/v1/Office/${id}`);
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

export const createOffice = async (sendData) => {
  try {
    const { data } = await axiosClientMultiPart.post(
      `/api/v1/Office`,
      sendData
    );
    return {
      error: null,
      data: data,
    };
  } catch (error) {
    return {
      error: error?.response,
      data: null,
    };
  }
};

export const updateOffice = async (officeId, sendData) => {
  try {
    const { data } = await axiosClientMultiPart.put(
      `/api/v1/Office/${officeId}`,
      sendData
    );
    return {
      error: null,
      data: data,
    };
  } catch (error) {
    return {
      error: error?.response,
      data: null,
    };
  }
};

export const deleteOffice = async (officeId) => {
  try {
    const { data } = await axiosClientMultiPart.delete(
      `/api/v1/Office/${officeId}`
    );
    return {
      error: null,
      data: data,
    };
  } catch (error) {
    return {
      error: error?.response,
      data: null,
    };
  }
};

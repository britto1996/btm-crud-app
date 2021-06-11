import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_UPDATE_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ALL_USERS,
  USER_DETAILS_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
} from "../Constants/registerContants";

export const register = (name, email, age, gender) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/register`,
      { name, email, age, gender },

      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/getUsers/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/getUsers`);
    dispatch({
      type: ALL_USERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUsers = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/edit/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUsers = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    await axios.delete(`/api/delete/${id}`);
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

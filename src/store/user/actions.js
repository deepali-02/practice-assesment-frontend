import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export function spaceUpdated(space) {
  return {
    type: "SPACE_UPDATE",
    payload: space,
  };
}
export function storyPostSuccess(story) {
  return {
    type: "POST_STORY",
    payload: story,
  };
}

export function storyDeleted(id) {
  return {
    type: "DELETE_STORY",
    payload: id,
  };
}

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

//update space
export function updateSpace(title, description, backgroundColor, color) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      console.log("What is in getState?", state);
      //const token2 = state.user.token
      const { space, token } = selectUser(state);
      const res = await axios.patch(
        `${apiUrl}/spaces/${space.id}`,
        { title, description, backgroundColor, color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Space Updated?", res);
      dispatch(spaceUpdated(res.data.updateSpace));
      //dispatch(showMessageWithTimeout())
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Space updated successfully!",
          1500
        )
      );
    } catch (e) {
      console.log(e.message);
    }
  };
}

//post a story
export function postStory(name, content, imageUrl) {
  return async (dispatch, getState) => {
    try {
      const { space, token } = selectUser(getState());
      dispatch(appLoading());
      const res = await axios.post(
        `${apiUrl}/spaces/${space.id}/stories`,
        { name, content, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Story Posted? ", res);

      dispatch(storyPostSuccess(res.data.story));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "New story posted successfully!",
          3000
        )
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log("Error message: ", error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
}

//delet a story
export const deleteStory = (id) => async (dispatch, getstate) => {
  try {
    const res = await axios.delete(`${apiUrl}/spaces/stories/${id}`);
    console.log("deleted?", res.data);
    dispatch(storyDeleted(id));
  } catch (e) {
    console.log(e.message);
  }
};

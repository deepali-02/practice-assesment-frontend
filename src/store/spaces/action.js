import axios from "axios";
//import { selectUser } from "../user/selectors";
//import { appLoading, appDoneLoading } from "../appState/actions";

const API_URL = "http://localhost:5000";

export function spaceFetched(spaces) {
  return {
    type: "SPACE_FETCHED",
    payload: spaces,
  };
}

export function oneSpaceFetched(data) {
  return {
    type: "space/oneSpaceFetched",
    payload: data,
  };
}

export async function fetchSpaces(dispatch, getState) {
  const res = await axios.get(`${API_URL}/spaces`);
  console.log("All spaces: ", res);
  dispatch(spaceFetched(res.data));
}

// export const fetchSpaces = () => {
//   return async (dispatch, getState) => {
//     try {
//       const res = await axios.get(`${API_URL}/spaces`);
//       console.log("All spaces: ", res);
//       dispatch(spaceFetched(res.data));
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// };

export function fetchSpaceDetail(id) {
  return async function thunk(dispatch, getState) {
    const res = await axios.get(`${API_URL}/spaces/${id}`);
    console.log("One Space Detai: ", res);
    dispatch(oneSpaceFetched(res.data));
  };
}

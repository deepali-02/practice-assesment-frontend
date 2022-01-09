import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  space: null, //{stories:[{},{}]}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "SPACE_UPDATE": {
      console.log("payload from update space", action.payload);
      return {
        ...state,
        space: {
          ...action.payload,
          stories: [...state.space.stories],
        },
      };
    }

    case "POST_STORY": {
      console.log("Payload from post story:", action.payload);
      return {
        ...state,
        space: {
          ...state.space,
          stories: [...state.space.stories, action.payload],
        },
      };
    }

    case "DELETE_STORY": {
      // 1 hand: storyId
      // 2 hand: an array with stories.
      // Obj: remove the one with the matching id.
      const storyId = action.payload;
      const stories = state.space.stories;
      const filterStories = stories.filter((s) => s.id !== storyId);
      console.log("filtered stories: ", filterStories);
      return {
        ...state,
        space: {
          ...state.space,
          stories: filterStories,
        },
      };
    }

    default:
      return state;
  }
}

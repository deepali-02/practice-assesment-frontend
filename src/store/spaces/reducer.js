const initialState = {
  allSpaces: [],
  selectedSpace: null,
};

export default function spaceFetchReducer(state = initialState, action) {
  switch (action.type) {
    case "SPACE_FETCHED": {
      console.log("Payload from all space reducer", action.payload);
      return {
        ...state,
        allSpaces: [...action.payload],
      };
    }
    case "space/oneSpaceFetched": {
      console.log("Payload fron one space: ", action.payload);
      return {
        ...state,
        selectedSpace: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
}

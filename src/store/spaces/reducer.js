const initialState = {
    loading: true,
    lists: [],
    selectedSpace: null,
  };
  
  export default function spaceFetchReducer(state = initialState, action) {
    switch (action.type) {
      case "startLoading": {
        return {
          ...state,
          loading: true,
        };
      }
      case "space/spaceFetched": {
        return {
          ...state,
          lists: [...action.payload],
        };
      }
      case "space/oneSpaceFetched": {
        console.log("Payload fron one space: ", action.payload);
        return {
          ...state,
          selectedSpace: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  }
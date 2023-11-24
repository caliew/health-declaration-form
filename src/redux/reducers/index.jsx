const initialState = {
    formDataList: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_FORM_DATA':
        let existingIndex = state.formDataList.findIndex(person => person.name === action.payload.name);
        if (existingIndex !== -1) {
          // If the person with the same name exists, update the entry
          const updatedFormDataList = state.formDataList.map((person, index) =>
            index === existingIndex ? action.payload : person
          );
          return {
            ...state,
            formDataList: updatedFormDataList,
          };
        } else {
          // If the person with the same name doesn't exist, add it as a new entry
          return {
            ...state,
            formDataList: [...state.formDataList, action.payload],
          };
        }
      default:
        return state;
    }
  };
  
  export default rootReducer;
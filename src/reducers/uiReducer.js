const INITIAL_STATE = {
  terms: false,
  long: 0,
  lat: 0,
  address: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'agree_terms':
      return {
        ...state,
        terms: true
      };
    case 'set_coords':
      return {
        ...state,
        long: action.long,
        lat: action.lat,
        address: action.address
      };
    default:
      return state;
  }
};

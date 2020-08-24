export const agreeToTerms = () => (dispatch) => { dispatch({ type: 'agree_terms' }) };

export const setInitialCoords = (long, lat, address) => (dispatch) => { dispatch({ type: 'set_coords', long, lat, address }) };

export const clearLocation = () => (dispatch) => { dispatch({ type: 'clear_coords' }) };

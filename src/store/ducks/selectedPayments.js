export const TOGGLE_SELECTION = 'selectedPayments/TOGGLE_SELECTION';
export const RESET_SELECTION = 'selectedPayments/RESET_SELECTION';

export function reducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_SELECTION:
      return { ...state, [action.payload]: !state[action.payload] };
    case RESET_SELECTION:
      return {};
    default:
      return state;
  }
}

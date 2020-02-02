const initState = {
  activeLink: '',
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_LINK':
      return {
        ...state,
        activeLink: action.payload
      }
    default:
      return state;
  }
}

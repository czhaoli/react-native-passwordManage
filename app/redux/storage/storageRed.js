const initialState = {
  list: [],
}
export default function reducer(state = initialState, {type, data, err = '', ...rest}) {
  switch (type) {
    case 'list':
      return {...state, list: data};
      break;
    default:
      return state;
  }
}
// initial state
export type InitialStateType = {
  isInitialized: boolean
  isProgress: boolean
  errorMessage: string | null
}

// type
const initialState = {
  isInitialized: false,
  isProgress: true,
  errorMessage: null,
};
export type GeneralType =
  ReturnType<typeof initializeSuccessAC>
  | ReturnType<typeof errorAC>
  | ReturnType<typeof progressAC>

// reducer
export const appReducer = (state: InitialStateType = initialState, action: GeneralType): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED-SUCCESS':
      return { ...state, isInitialized: action.value };
    case 'APP-ERROR':
      return { ...state, errorMessage: action.value };
    case 'PROGRESS':
      return { ...state, isProgress: action.value };
    default:
      return state;
  }
};

// action creator
export const initializeSuccessAC = (value: boolean) => ({
  type: 'INITIALIZED-SUCCESS', value,
} as const);

export const progressAC = (value: boolean) => ({
  type: 'PROGRESS', value,
} as const);

export const errorAC = (value: any) => ({
  type: 'APP-ERROR', value,
} as const);

// thunk
// export const initializeAppTC = () => async (dispatch: any) => {
//   dispatch(getAuthUserDataThunk());
//   // dispatch(initializeSuccessAC(true))
// };
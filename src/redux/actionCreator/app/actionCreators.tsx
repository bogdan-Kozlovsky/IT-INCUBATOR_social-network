export const initializeSuccessAC = (value: boolean) => ({
  type: 'INITIALIZED-SUCCESS', value,
} as const);

export const progressAC = (value: boolean) => ({
  type: 'PROGRESS', value,
} as const);

export const errorAC = (value: any) => ({
  type: 'APP-ERROR', value,
} as const);
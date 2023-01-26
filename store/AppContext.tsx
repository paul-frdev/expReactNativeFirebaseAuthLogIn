import React, { createContext, Dispatch, useReducer } from "react";
import { AppProviderProps, ExpenseType } from '../types/expense';
import { ExpenseActions, expenseReducer } from './reducers';


type InitialStateType = {
  expenses?: ExpenseType[] | undefined;
};

const defaultState = {
  expenses: [],
}

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ExpenseActions>
}>({
  state: defaultState,
  dispatch: () => null
});

const mainReducer = ({ expenses }: InitialStateType, actions: ExpenseActions ) => ({
  expenses: expenseReducer(expenses!, actions),
});

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(mainReducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
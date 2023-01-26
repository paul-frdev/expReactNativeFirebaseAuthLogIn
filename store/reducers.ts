import { ActionKind, ActionMap, ExpenseType } from "../types/expense";

export type InitialExpenseStateType = {
  expenses?: ExpenseType[];
};

type ExpensePayload = {
  [ActionKind.ADD]: {
    id: number;
    description: string;
    amount: number;
    date: Date;
  };
  [ActionKind.DELETE]: {
    id: number;
  };
  [ActionKind.UPDATE]: {
    currentId?: number;
    id?: number;
    description: string;
    amount: number;
    date: Date;
  };
  [ActionKind.SET]: {
    [x: string]: any;
    expenses: ExpenseType[];
  };
};

export type ExpenseActions =
  ActionMap<ExpensePayload>[keyof ActionMap<ExpensePayload>];

export const expenseReducer = (
  state: ExpenseType[],
  action: ExpenseActions
) => {
  switch (action.type) {
    case ActionKind.ADD:
      return [
        {
          ...action.payload,
        },
        ...state,
      ];
    case ActionKind.DELETE:
      return [
        ...state.filter((expense: ExpenseType) => {
          return expense.id !== action.payload.id;
        }),
      ];
    case ActionKind.UPDATE:
      const updatableExpenseIndex = state.findIndex(
        (expense: ExpenseType) => expense.id === action.payload.currentId
      );

      const updatableExpense = state[updatableExpenseIndex];
      const updatableItem = { ...updatableExpense, ...action.payload };
      const updatableExpenses = [...state];
      updatableExpenses[updatableExpenseIndex] = updatableItem;
      return updatableExpenses;
    case ActionKind.SET:
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return state;
  }
};



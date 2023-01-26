import { ReactNode } from 'react';

export type ExpenseType = {
  id?: any;
  description?: string;
  amount: number;
  date: Date;
};

export enum ActionKind {
  ADD = "ADD",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  SET = "SET",
}

export interface ValuesProps {
  currentId?: string;
  id?: string;
  description: string;
  amount: number;
  date: Date;
}

export interface InputValuesProps {
  id?: string;
  description?: string;
  amount: string;
  date: string;
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface AppProviderProps {
  children: ReactNode;
}

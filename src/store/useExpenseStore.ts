import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Expense } from '../types';

interface ExpenseState {
  expenses: Expense[];
  addExpense: (data: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
}

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (data) =>
        set((state) => ({
          expenses: [{ ...data, id: generateId() }, ...state.expenses],
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
    }),
    {
      name: 'cache-expenses',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

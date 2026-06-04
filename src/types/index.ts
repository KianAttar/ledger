export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Health'
  | 'Entertainment'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  note: string;
  date: string; // ISO 8601
  receiptUri?: string;
}

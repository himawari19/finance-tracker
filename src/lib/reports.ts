import { Transaction } from "./db";
import { startOfDay, startOfWeek, startOfMonth, startOfYear, isSameDay, isSameWeek, isSameMonth, isSameYear } from "date-fns";

export interface Report {
  income: number;
  expense: number;
  balance: number;
  transactions: Transaction[];
}

export function getDailyReport(transactions: Transaction[], date: Date): Report {
  const filtered = transactions.filter((t) =>
    isSameDay(new Date(t.date), date)
  );
  return calculateReport(filtered);
}

export function getWeeklyReport(transactions: Transaction[], date: Date): Report {
  const filtered = transactions.filter((t) =>
    isSameWeek(new Date(t.date), date, { weekStartsOn: 1 })
  );
  return calculateReport(filtered);
}

export function getMonthlyReport(transactions: Transaction[], date: Date): Report {
  const filtered = transactions.filter((t) =>
    isSameMonth(new Date(t.date), date)
  );
  return calculateReport(filtered);
}

export function getYearlyReport(transactions: Transaction[], date: Date): Report {
  const filtered = transactions.filter((t) =>
    isSameYear(new Date(t.date), date)
  );
  return calculateReport(filtered);
}

function calculateReport(transactions: Transaction[]): Report {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
    transactions,
  };
}

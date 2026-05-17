import { billTemplates } from "./billTemplates";
import type { Bill } from "../App.tsx";

const categories = ["Food", "Housing", "Transportation", "Utilities", "Other"] as const;

type categories = typeof categories[number];

export const demoMembers = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: true },
  { id: 3, name: "Charlie", active: true },
];

export const generateDemoBills = (): Bill[] => {
  const bills: Bill[] = [];
  let id = 1;

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1); // Start from 1 year ago

  const getStatus = (dueDate: Date): Bill["status"] => {
  const today = new Date();

  if (dueDate < today) return "Paid";
  return "Unpaid";
};

  for (let i = 0; i < 3; i++) {
    const currentMonth = new Date(startDate);
    currentMonth.setMonth(startDate.getMonth() + i);

    billTemplates.forEach((template) => {
      const dueDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        Math.floor(Math.random() * 20) + 5
      );

      bills.push({
        id: id++,
        billName: template.billName,
        dueDate: dueDate.toLocaleDateString("en-US"),
        totalAmount: template.baseAmount,
        yourShare: template.share,
        category: categories[Math.floor(Math.random() * categories.length)],
        status: getStatus(dueDate),
        members: template.members,
      });
    });
  }

  return bills;
};
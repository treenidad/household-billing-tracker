import { billTemplates } from "./billTemplates";
import type { Bill } from "../App.tsx";

const categories = ["Food", "Housing", "Transportation", "Utilities", "Other"] as const;

type category = typeof categories[number];

export const generateDemoBills = (): Bill[] => {
  const bills: Bill[] = [];
  let id = 1;

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);

  const getStatus = (dueDate: Date): Bill["status"] => {
  const today = new Date();

  if (dueDate < today) return "Paid";
  return "Due";
};

  for (let i = 0; i < 12; i++) {
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
        dueDate: dueDate.toISOString().split("T")[0],
        totalAmount: template.baseAmount,
        yourShare: template.share,
        // category: template.category,
        category: categories[Math.floor(Math.random() * categories.length)],
        status: getStatus(dueDate),
      });
    });
  }

  return bills;
};
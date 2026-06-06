import { useEffect, useState } from "react";
import type { Bill } from "../App.tsx";
import { categories } from "../data/generateDemoBills.tsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Category = typeof categories[number];
// import { generateDemoBills } from "../data/generateDemoBills.tsx";

export const getBills = (): Bill[] => {
    const billsData = localStorage.getItem("bills");
    return billsData ? JSON.parse(billsData) : [];
};

function Dashboard() {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const date = localStorage.getItem("bills");
    const parse = date ? JSON.parse(date) : [];
    setBills(parse);
  }, []);

  const monthlyTotalsMap: Record<string, number> = {};

  // Calculate total spending for each month based on bill due dates
  bills.forEach((bill) => {
    const date = new Date(bill.dueDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!monthlyTotalsMap[monthKey]) {
      monthlyTotalsMap[monthKey] = 0;
    }

    monthlyTotalsMap[monthKey] += bill.totalAmount;
  });

  // Convert the monthly totals map into an array sorted by month
  const monthlyTotals = Object.keys(monthlyTotalsMap).sort().map((monthKey) => {
    const date = new Date(`${monthKey}-01`);
    return {
      month: date.toLocaleString("default", { 
        month: "short", 
        year: "numeric" 
            }),
      total: monthlyTotalsMap[monthKey],
    };
  });

  // Calculate total spending for each category
  const categoryMap: Record<string, number> = {};

  bills.forEach((bill) => {
    if (!categoryMap[bill.category]) {
      categoryMap[bill.category] = 0;
    }

    categoryMap[bill.category] += bill.totalAmount;
  });

  const categoryColors: Record<Category, string> = {
    Food: "#f97316",
    Housing: "#6366f1",
    Transportation: "#22c55e",
    Utilities: "#ef4444",
    Other: "#000000",
  };

  // Convert the category map into an array for the pie chart
  const categoryTotals = Object.keys(categoryMap).map((category) => ({
    name: category,
    value: categoryMap[category],
    fill: categoryColors[category as Category] ?? "#cccccc",
  }));

  // Calculate total spending across all bills
  const totalSpending = bills.reduce(
  (sum, bill) => sum + bill.totalAmount,
  0
);

// Find the month with the highest spending
const highestMonth =
  monthlyTotals.length > 0
    ? monthlyTotals.reduce((max, m) =>
        m.total > max.total ? m : max
      )
    : { month: "", total: 0 };

// Calculate average monthly spending
const averageSpending =
  monthlyTotals.length > 0
    ? totalSpending / monthlyTotals.length
    : 0;

  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  // If there are no bills, display a single message instead of the charts
  if (bills.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard Overview</h1>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">No data available. Add bills to see the dashboard.</p>
        </div>
        <div className="mt-4 mx-auto text-center">
          <button 
            onClick={() => (window.location.href = "/bills/add")}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
           + Add Bill
          </button>
        </div>
      </div>
    );
  }
  const displayedData = view === "monthly"
    ? monthlyTotals
    : [
        {
          month: "2025",
          total: categoryTotals.reduce((sum, c) => sum + c.value, 0),
        },
        {
          month: "2026",
          total: "7510",
        },
      ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Total Spending Card */}
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-grey-500">Total Spending</p>
          <p className="text-2xl font-bold">${totalSpending}</p>
        </div>

        {/* Highest Month Card */}
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-grey-500">Highest Month</p>
          <p className="text-2xl font-bold">
            {highestMonth.month} (${highestMonth.total})
          </p>
        </div>

        {/* Average Spending Card */}
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-grey-500">Average Spending</p>
          <p className="text-2xl font-bold">${averageSpending}</p>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setView("monthly")}
          className={`px-4 py-2 rounded  ${view === "monthly" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>
          Monthly
        </button>

        <button onClick={() => setView("yearly")} 
        className={`px-4 py-2 rounded ${view === "yearly" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}>
          Yearly
        </button>
      </div>
 
      {/* Charts */}
      {/* Start of Line Chart */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Monthly Spending</h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={displayedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip /> 
              <Line
                type="monotone"
                dataKey="total"
                stroke="#6366f1" 
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* End of Line Chart */}

      {/* Start of Chart */}
      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <h2 className="font-semibold text-lg mb-4">Spending by Category</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryTotals}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) => `${name}: $${value}`}
              >
                {categoryTotals.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.fill}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* End of Chart */}
    </div>
  );
}

export default Dashboard;
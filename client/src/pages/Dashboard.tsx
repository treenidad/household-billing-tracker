import { useState } from "react";
// import type { Bill } from "../App.tsx";
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

function Dashboard() {

  const spendingData = [
    { month: "January", rent: 1200, food: 420, utilities: 180, entertainment: 150 },
    { month: "February", rent: 1200, food: 400, utilities: 170, entertainment: 130 },
    { month: "March", rent: 1200, food: 450, utilities: 190, entertainment: 160 },
    { month: "April", rent: 1200, food: 500, utilities: 200, entertainment: 180 },
    { month: "May", rent: 1200, food: 380, utilities: 210, entertainment: 120 },
  ];

  // Calculate total spending per month
  const monthlyTotals = spendingData.map((monthData) => ({
    month: monthData.month,
    total: monthData.rent + monthData.food + monthData.utilities + monthData.entertainment,
  })); 

  const categoryTotals = [
    {
      name: "Rent",
      value: spendingData.reduce((sum, m) => sum + m.rent, 0),
    },
    {
      name: "Food",
      value: spendingData.reduce((sum, m) => sum + m.food, 0),
    },
    {
      name: "Utilities",
      value: spendingData.reduce((sum, m) => sum + m.utilities, 0),
    }, 
    {
      name: "Entertainment",
      value: spendingData.reduce((sum, m) => sum + m.entertainment, 0),
    },
  ];


  const totalSpending = categoryTotals.reduce(
    (total, category) => total + category.value,
    0,
  );

  const highestMonth = monthlyTotals.reduce((max, monthData) =>
    monthData.total > max.total ? monthData : max,
  );

  const averageSpending = totalSpending / spendingData.length;

  const [view, setView] = useState<"monthly" | "yearly">("monthly");

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
                {categoryTotals.map((_, index) => (
                  <Cell
                    key={index}
                    fill={["#6366f1", "#22c55e", "#f97316", "#ef4444"][index]}
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

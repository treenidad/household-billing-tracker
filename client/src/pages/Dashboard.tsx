import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const spendingData = [
    { month: "January", amount: 420 },
    { month: "Feb", amount: 400 },
    { month: "Mar", amount: 450 },
    { month: "Apr", amount: 500 },
    { month: "May", amount: 550 },
  ];

  const totalSpending = spendingData.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const highestMonth = spendingData.reduce((max, item) =>
    item.amount > max.amount ? item : max,
  );

  const averageSpending = totalSpending / spendingData.length;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard</h1>

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
            {highestMonth.month} (${highestMonth.amount})
          </p>
        </div>

        {/* Average Spending Card */}
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-grey-500">Average Spending</p>
          <p className="text-2xl font-bold">${averageSpending}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Monthly Spending</h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

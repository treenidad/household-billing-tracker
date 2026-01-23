import { useNavigate } from "react-router-dom";

type Bill = {
  id: number;
  name: string;
  dueDate: string;
  total: number;
  yourShare: number;
  status: "Paid" | "Due" | "Overdue" | "Draft";
};

const mockBills: Bill[] = [];
// const mockBills: Bill[] = [
//   {
//     id: 1,
//     name: "Phone Bill",
//     dueDate: "2024-06-15",
//     total: 80.0,
//     yourShare: 40.0,
//     status: "Overdue",
//   },
//   {
//     id: 2,
//     name: "Internet",
//     dueDate: "2024-06-30",
//     total: 100.0,
//     yourShare: 50.0,
//     status: "Paid",
//   },
//   {
//     id: 3,
//     name: "Rent",
//     dueDate: "2024-07-01",
//     total: 1200.0,
//     yourShare: 600.0,
//     status: "Due",
//   },
// ];

const statusClasses = {
  Paid: "bg-green-100 text-green-700",
  Due: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
};

function Bills() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bills Page</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          + Add Bill
        </button>
      </div>

      <div className="space-y-4">
        {mockBills.length === 0 ? (
    <div className="bg-white rounded-xl shadow p-10 text-center">
      <h3 className="text-lg font-semibold mb-2">No bills yet</h3>
      <p className="text-gray-500 mb-6">
        Start by adding your first household bill.
      </p>

      <button onClick={() => navigate("/bills/add")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        + Add Bill
      </button>
    </div>
  ) : (
    <div className="space-y-4">
      {mockBills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"> 
            <div>
              <h3 className="font-semibold text-lg">{bill.name}</h3>
              <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
            </div>

            <div className="text-right ">
              <p className="font-medium">Your Share: ${bill.yourShare}</p>
              <p className="text-sm text-gray-500">Total: ${bill.total}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[bill.status] ?? "bg-gray-100 text-gray-700"}`}>
              {bill.status}
            </span>
          </div>
        ))}
      </div>)}
    </div>
    
  </div>
  );
}

export default Bills;

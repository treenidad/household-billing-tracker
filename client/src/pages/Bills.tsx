// Add Metrics Calculation section after we load the bill list.

import { useNavigate } from "react-router-dom";
import type { Bill } from "../App.tsx"
import type React from "react";
import ConfirmModal from "../components/ConfirmModal";
import { useState } from "react";

type BillsProps = {
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
  resetDemoData: () => void;
};

const statusClasses = {
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
};

function Bills({ bills , setBills, resetDemoData }: BillsProps) {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billToDelete, setBillToDelete] = useState<number | null>(null)
  
  const navigate = useNavigate();

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const confirmReset = () => {
    resetDemoData();
    setIsResetModalOpen(false);
  }

  const cancelReset = () => {
    setIsResetModalOpen(false);
  }

  const handleDeleteClick = (id: number) => {
    setBillToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (billToDelete === null) return;

    setBills((prev) => prev.filter((b) => b.id !== billToDelete));

    setIsModalOpen(false);
    setBillToDelete(null);
  }
  const cancelDelete = () => {
    setIsModalOpen(false);
    setBillToDelete(null);
  }

  const totalDue = bills.reduce((sum, bill) => sum + (bill.status === "Unpaid" ? bill.yourShare : 0), 0);

  const totalOverdue = bills.reduce((sum, bill) => sum + (bill.status === "Overdue" ? bill.yourShare : 0), 0);

  const paidCount = bills.filter(bill => bill.status === "Paid").length;

  type Status = "Paid" | "Unpaid" | "Overdue";
  
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  //toggle dropdown open/close
  const [isOpen, setIsOpen] = useState(false); 

  const filteredBills = selectedStatuses.length > 0 ? bills.filter((bill) => selectedStatuses.includes(bill.status)) : bills;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bills Page</h2>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate("/bills/add")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            + Add Bill
          </button>

          <button
            onClick={handleResetClick}
          className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Bill Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Total Due Card */}
        <div className="bg-white rounded-xl shadow-xl p-4. sm:p-6">
          <p className="text-sm text-grey-500">
            Total Due
          </p>
          <p className="text-2xl font-bold">
            ${totalDue.toFixed(2)}
          </p>
        </div>

        {/* Overdue Card */}
        <div className="bg-white rounded-xl shadow-xl p-4. sm:p-6">
          <p className="text-sm text-grey-500">
            Overdue
          </p>
          <p className="text-2xl font-bold">
            ${totalOverdue.toFixed(2)}
          </p>
        </div>

        {/* Paid Count Card */}
        <div className="bg-white rounded-xl shadow-xl p-4. sm:p-6">
          <p className="text-sm text-grey-500">
            Bills Paid
          </p>
          <p className="text-2xl font-bold">
            {paidCount}
          </p>
        </div>
      </div>
  

{/* Filter Dropdown Wrapper */}
<div className="relative inline-block mb-4">
  
  {/* Button */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="px-4 py-2 text-sm border border-gray-300 rounded bg-gray-200 hover:bg-gray-300"
  >
    {selectedStatuses.length > 0
      ? selectedStatuses.join(", ")
      : "Filter by Status"}
  </button>

  {/* Dropdown */}
  {isOpen && (
    <div className="relative left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div className="px-2 py-1">
        {(["Paid", "Unpaid", "Overdue"] as Status[]).map((status) => (
          <label key={status} className="block px-4 py-2 text-sm hover:bg-gray-100">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedStatuses.includes(status)}
              onChange={() => {
                if (selectedStatuses.includes(status)) {
                  setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
                } else {
                  setSelectedStatuses([...selectedStatuses, status]);
                }
              }}
            />
            {status}
          </label>
        ))}
      </div>
    </div>
  )}
</div>

      <div className="space-y-4">
        {bills.length === 0 ? (
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
      {filteredBills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"> 
            <div>
              <h3 className="font-semibold text-lg">{bill.billName}</h3>
              <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
            </div>

            <div className="text-right ">
              <p className="font-medium">Your Share: ${bill.yourShare}</p>
              <p className="text-sm text-gray-500">Total: ${bill.totalAmount}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[bill.status] ?? "bg-gray-100 text-gray-700"}`}>
              {bill.status}
            </span>

            <div className="flex items-center gap-3">
              <button onClick={() => navigate(`/bills/${bill.id}/edit`)} 
              className="text-indigo-600 hover:underline text-sm">
                Edit
              </button>

              <button onClick={() => handleDeleteClick(bill.id)}
                className="text-red-600 hover:underline text-sm">
                Delete
              </button>
            </div>
          </div>
          
        ))}
      </div>)}
    </div>
    
    <ConfirmModal
      isOpen={isModalOpen}
      title="Delete Bill"
      message="Are you sure you want to delete this bill? This action cannot be undone."
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
    />
    <ConfirmModal
      isOpen={isResetModalOpen}
      title="Reset Demo Data"
      message="Are you sure you want to reset all bills to demo data? This will overwrite your current bills."
      onConfirm={confirmReset}
      onCancel={cancelReset}
    />
  </div>
  
  );
}

export default Bills;

import type React from "react";
import { useNavigate } from "react-router-dom";

function AddBill() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  // frontend-only placeholder
  navigate("/bills");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6">
        Add New Bill
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Bill Name</label>
          <input className="w-full border rounded-lg px-4 py-2" placeholder="Rent, Water, Internet..." />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input type="date" className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Total Amount ($)</label>
          <input type="number" className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Share ($)</label>
          <input type="number" className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Save Bill
          </button>

          <button type="button" onClick={() => navigate("/bills")} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
};

export default AddBill;
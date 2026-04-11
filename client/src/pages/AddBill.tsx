import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Bill } from "../App.tsx";

type AddBillProps = {
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
};

type BillFormData = Omit<Bill, "id">;

function AddBill({ setBills }: AddBillProps) {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<BillFormData>({
      billName: "",
      dueDate: today,
      totalAmount: 0,
      yourShare: 0,
      category: "",
      status: "Unpaid",
    });

  const [error, setError] = useState("");

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        name === "totalAmount" || name === "yourShare"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.billName.trim()) {
      setError("Bill name is required");
      return;
    }

    if (formData.totalAmount <= 0) {
      setError("Total amount must be greater than 0");
      return;
    }
    const newBill: Bill = { 
      id: Date.now(),
      ...formData
    };

    setError("");

    setBills(prev => [...prev, newBill]);

    navigate("/bills");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6">
        Add New Bill
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Bill Name</label>
          <input 
            type="text"
            name="billName"
            placeholder="Rent, Water, Internet..." 
            value={formData.billName} 
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
            />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input 
            type="date" 
            name="dueDate"
            placeholder={today}
            value={formData.dueDate}
            className="w-full border rounded-lg px-4 py-2" 
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Total Amount ($)</label>
          <input 
            type="number" 
            name="totalAmount"
            value={formData.totalAmount || ""}
            placeholder="0"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Share ($)</label>
          <input 
            type="number" 
            name="yourShare"
            value={formData.yourShare || ""}
            placeholder="0"
            onChange={handleChange}  
            className="w-full border rounded-lg px-4 py-2" 
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Save Bill
          </button>

          <button 
          type="button" 
          onClick={() => navigate("/bills")} 
          className="border px-4 py-2 rounded-lg">
          Cancel
          </button>
        </div>
      </form>
    </div>
  )
};

export default AddBill;
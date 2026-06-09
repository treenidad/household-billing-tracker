import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Bill, Member } from "../App.tsx";

type AddBillProps = {
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
  members: Member[];
};

type BillFormData = Omit<Bill, "id">;

function AddBill({ setBills, members }: AddBillProps) {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<BillFormData>({
      billName: "",
      dueDate: today,
      totalAmount: 0,
      yourShare: 0,
      category: "",
      status: "Unpaid",
      members: [],
    });

  const [error, setError] = useState("");
  
  const handleMemberChange = (memberId: number) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(memberId)
        ? prev.members.filter(m => m !== memberId)
        : [...prev.members, memberId]
    }));
  };

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Members</label>
          <div className="space-y-2 border rounded-lg p-3">
            {members.length === 0 ? (
              <p className="text-gray-500">No household members available. Add members on the Members page.</p>
            ) : (
              members.map((member) => (
                <label key={member.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.members.includes(member.id)}
                    onChange={() => handleMemberChange(member.id)}
                    className="mr-2"
                  />
                  {member.name}
                </label>
              ))
            )}
          </div>
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
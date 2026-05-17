import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import type { Bill } from "../App";
import { demoMembers } from "../data/generateDemoBills";

type EditBillProps = {
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
}

function EditBill({ bills, setBills }: EditBillProps) {
  const {id} = useParams();
  const navigate = useNavigate();

  const billId = Number(id);
  const billToEdit = bills.find(bill => bill.id === billId)

  const [formData, setFormData] = useState<BillFormData | null>(null);
  type BillFormData = {
    billName: string;
    dueDate: string;
    totalAmount: number;
    yourShare: number;
    category: Bill["category"];
    status: Bill["status"];
    members: number[];
  };
  const [error, setError] = useState("");

  const today = new Date().toISOString().split('T')[0];


  // Load existing bill data into form state
  useEffect(() => {
    if (billToEdit) {
      setFormData({
        billName: billToEdit.billName,
        dueDate: new Date(billToEdit.dueDate).toISOString().split('T')[0],
        totalAmount: billToEdit.totalAmount,
        yourShare: billToEdit.yourShare,
        category: billToEdit.category,
        status: billToEdit.status,
        members: billToEdit.members,
      });
    }
  }, [billToEdit]);

  // Handle invalid bill id
  if (!billToEdit && bills.length > 0) {
    return (
      <div>
        <h2>Bill not found</h2>
        <button 
          onClick={() => navigate("/bills")}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded">
            Back to Bills
          </button>
      </div>
    )
  }

  if (!formData) {
    return <p>Loading...</p>
  }

  const handleMemberChange = (memberId: number) => {
    setFormData(prev =>
      prev ? {
        ...prev,
        members: prev.members.includes(memberId)
          ? prev.members.filter(m => m !== memberId)
          : [...prev.members, memberId]
      } : prev
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev =>
      prev
        ? {
            ...prev,
            [name]:
              name === "totalAmount" || name === "yourShare"
              ? Number(value)
              : value,
          }
        : prev
    );
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

    let updatedForm = {...formData};

    if (updatedForm.dueDate < today && updatedForm.status !== "Paid") {
      updatedForm.status = "Overdue";
    }

    setError("");

    setBills(prev =>
      prev.map(bill =>
        bill.id === billId 
        ? { ...bill, ...updatedForm }: bill
      )
    );

    navigate("/bills");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Bill</h2>

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
            placeholder="Bill Name" 
            name="billName"
            value={formData?.billName || ""} 
            onChange={handleChange} 
            required 
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input 
            type="date" 
            placeholder="Due Date" 
            name="dueDate"
            value={formData.dueDate} 
            onChange={handleChange} 
            required 
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total Amount</label>
          <input 
            type="number" 
            placeholder="0" 
            name="totalAmount"
            value={formData?.totalAmount || 0} 
            onChange={handleChange} 
            required 
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Share</label>
          <input 
            type="number" 
            placeholder="Your Share" 
            name="yourShare"
            value={formData?.yourShare || 0} 
            onChange={handleChange} 
            required 
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select 
            value={formData?.category || ""}
            onChange={handleChange}
            name="category"
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
            {demoMembers.map((member) => (
              <label key={member.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData?.members?.includes(member.id) || false}
                  onChange={() => handleMemberChange(member.id)}
                  className="mr-2"
                />
                {member.name}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select 
            value={formData?.status} 
            onChange={handleChange} 
            name="status"
            required
            className="w-full border rounded-lg px-4 py-2"
            >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded">
              Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/bills")}
            className="border px-4 py-2 rounded-lg"
            >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBill;
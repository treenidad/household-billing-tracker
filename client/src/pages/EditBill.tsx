import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import type { Bill } from "../App";

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
    totalAmount: number
    yourShare: number;
    status: Bill["status"];
  };
  const [error, setError] = useState("");

  const today = new Date().toISOString().split('T')[0];


  // Load existing bill data into form state
  useEffect(() => {
    if (billToEdit) {
      setFormData({
        billName: billToEdit.billName,
        dueDate: billToEdit.dueDate,
        totalAmount: billToEdit.totalAmount,
        yourShare: billToEdit.yourShare,
        status: billToEdit.status,
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
        <input 
          type="text" 
          placeholder="Bill Name" 
          name="billName"
          value={formData?.billName || ""} 
          onChange={handleChange} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <input 
          type="date" 
          placeholder="Due Date" 
          name="dueDate"
          value={formData?.dueDate || ""} 
          onChange={handleChange} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <input 
          type="number" 
          placeholder="Total Amount" 
          name="totalAmount"
          value={formData?.totalAmount || 0} 
          onChange={handleChange} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <input 
          type="number" 
          placeholder="Your Share" 
          name="yourShare"
          value={formData?.yourShare || 0} 
          onChange={handleChange} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <select 
          value={formData?.status} 
          onChange={handleChange} 
          name="status"
          required
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="Due">Due</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
          <option value="Draft">Draft</option>
        </select>

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
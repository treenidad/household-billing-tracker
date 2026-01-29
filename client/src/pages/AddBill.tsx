import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Bill } from "../App.tsx";

type AddBillProps = {
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
};


function AddBill({ setBills }: AddBillProps) {
  const navigate = useNavigate();

  const [billName, setBillName] = useState(""); 
  const [dueDate, setDueDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [yourShare, setYourShare] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBill: Bill = {
      id: Date.now(),
      billName,
      dueDate,
      totalAmount: Number(totalAmount),
      yourShare: Number(yourShare),
      status: "Due"
    };

    // const existingBills = JSON.parse(
    //   localStorage.getItem("bills") || "[]"
    // ) as Bill[];

    // const updatedBills = [...existingBills, newBill];

    setBills(prev => [...prev, newBill]);
    navigate("/bills");


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
          <input 
            className="w-full border rounded-lg px-4 py-2" placeholder="Rent, Water, Internet..." value={billName} onChange={(e) => setBillName(e.target.value)}/>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input 
            type="date" 
            value={dueDate}
            className="w-full border rounded-lg px-4 py-2" 
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Total Amount ($)</label>
          <input 
            type="number" 
            value={totalAmount}
            className="w-full border rounded-lg px-4 py-2" 
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Share ($)</label>
          <input 
            type="number" 
            value={yourShare}
            className="w-full border rounded-lg px-4 py-2" 
            onChange={(e) => setYourShare(e.target.value)}  
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Save Bill
          </button>

          <button 
          type="button" onClick={() => navigate("/bills")} 
          className="border px-4 py-2 rounded-lg">
          Cancel
          </button>
        </div>
      </form>
    </div>
  )
};

export default AddBill;
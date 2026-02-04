import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"
import type { Bill } from "../App"

type EditBillProps = {
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
}

function EditBill({ bills, setBills }: EditBillProps) {
  const {id} = useParams();
  const navigate = useNavigate();

  const billToEdit = bills.find(b => b.id === Number(id))

  const [billName, setBillName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [yourShare, setYourShare] = useState("");
  const [status, setStatus] = useState<Bill["status"]>("Due");

  useEffect(() => {
    if (!billToEdit) {
      navigate("/bills");
    }
  }, [billToEdit, navigate])

  useEffect(() => {
    if (billToEdit) {
      setBillName(billToEdit.billName);
      setDueDate(billToEdit.dueDate);
      setTotalAmount(String(billToEdit.totalAmount));
      setYourShare(String(billToEdit.yourShare));
      setStatus(billToEdit.status);
    }
  }, [billToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setBills(prev =>
      prev.map(bill =>
        bill.id === billToEdit!.id
        ? {
          ...bill,
          billName,
          dueDate,
          totalAmount: Number(totalAmount),
          yourShare: Number(yourShare),
          status,
        }
        : bill
      )
    );

    navigate("/bills");
  }
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6">EditBill Page</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="text" 
          placeholder="Bill Name" 
          value={billName} 
          onChange={e => setBillName(e.target.value)} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <input 
          type="date" 
          placeholder="Due Date" 
          value={dueDate} 
          onChange={e => setDueDate(e.target.value)} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <input 
          type="number" 
          placeholder="Total Amount" 
          value={totalAmount} 
          onChange={e => setTotalAmount(e.target.value)} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <input 
          type="number" 
          placeholder="Your Share" 
          value={yourShare} 
          onChange={e => setYourShare(e.target.value)} 
          required 
          className="w-full border rounded-lg px-4 py-2"
        />
        <select 
          value={status} 
          onChange={e => setStatus(e.target.value as Bill["status"])} required
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
            onClick={() => navigate("/bills")}
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
import { useState } from "react";
import type { Bill, Member } from "../App.tsx";

type MembersProps = {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
};

function Members({ members, setMembers, bills, setBills }: MembersProps) {
  const [memberName, setMemberName] = useState("");
  const [error, setError] = useState("");

  const handleAddMember = () => {
    const trimmedName = memberName.trim();
    if (!trimmedName) {
      setError("Please enter a member name.");
      return;
    }

    if (members.some((member) => member.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError("A member with that name already exists.");
      return;
    }

    const newMember: Member = {
      id: Date.now(),
      name: trimmedName,
    };

    setMembers([...members, newMember]);
    setMemberName("");
    setError("");
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
    setBills((prev) =>
      prev.map((bill) => ({
        ...bill,
        members: bill.members.filter((id) => id !== memberId),
      }))
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Household Members</h2>
          <p className="text-gray-500 mt-1">Add clients to your household and remove them when they leave.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 p-5">
            <label className="block text-sm font-medium mb-2">Member Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={memberName}
                onChange={(e) => {
                  setMemberName(e.target.value);
                  setError("");
                }}
                placeholder="Enter client name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold mb-4">Current Members</h3>
            {members.length === 0 ? (
              <p className="text-gray-500">No household members yet. Add one to start assigning bills.</p>
            ) : (
              <ul className="space-y-3">
                {members.map((member) => (
                  <li
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
                  >
                    <span>{member.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-sm text-red-600 hover:text-red-800 hover:cursor-pointer"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold mb-4">Member Impact</h3>
          <p className="text-gray-600 mb-4">
            Removing a member will also remove them from any bills they were assigned to.
          </p>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-gray-500">Total members</p>
              <p className="text-xl font-semibold">{members.length}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-gray-500">Total bills</p>
              <p className="text-xl font-semibold">{bills.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Members;

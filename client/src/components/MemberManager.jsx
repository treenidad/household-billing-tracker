import { useState } from "react";

function MemberManager() {
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState([]);

  const handleAddMember = () => {
    if (memberName.trim() === "") return;

    const newMember = {
      id: Date.now(),
      name: memberName,
    };

    setMembers([...members, newMember]);
    setMemberName("");
  };

  const handleRemoveMember = (id) => {
    const updatedMembers = members.filter(
      (member) => member.id !== id
    );

    setMembers(updatedMembers);
  };

  return (
    <div>
      <h2>Members</h2>

      <input
        type="text"
        placeholder="Enter member name"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
      />

      <button onClick={handleAddMember}>
        Add
      </button>

      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name}

            <button
              onClick={() =>
                handleRemoveMember(member.id)
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberManager;
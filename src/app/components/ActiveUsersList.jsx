'use client'
import useActiveUsers from "../services/useActiveUsers";

export default function ActiveUsersList({ currentUser }) {
  const activeUsers = useActiveUsers(currentUser);
  console.log('Active Users : ',activeUsers)
  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Active Users</h2>
      <ul className="list-disc ml-5">
        {activeUsers.map((u, index) => (
          <li key={index}>{u}</li>
        ))}
      </ul>
    </div>
  );
}

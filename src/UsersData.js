import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSearchInput } from "./redux/userSlice";

function UsersData() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const searchInput = useSelector((state) => state.users.searchInput);

  // Fetch users when the component loads
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchInput}
        onChange={(e) => dispatch(setSearchInput(e.target.value))}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-96 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />

      {/* Users List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg 
                         transition-shadow duration-200 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500">{user.phone}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4 text-center col-span-full">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
}

export default UsersData;

import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';


const ManageUsers = () => {

  const axiosInstance = useAxios();
  const [users, setUsers] = useState([]);

  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users`);
      setUsers(res.data); // set into local state
      return res.data;
    }
  });


  // console.log(users)

  const [name, setName] = useState("");

  const {
    data: usersName = [],
    refetch,
  } = useQuery({
    queryKey: ["searchedUsers", name],
    // enabled: !!emailQuery, //enabled option controls whether the query runs automatically.
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/search?name=${name}`);
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosInstance.patch(`/users/${id}/role`, { role: "admin" });

      if (res.data?.result?.modifiedCount > 0) {
        toast.success('User Is Now An Admin Successfully!', { position: 'top-right' });
        const updateRoleInList = (list) =>
          list.map((user) =>
            user._id === id ? { ...user, role: 'admin' } : user
          );
        if (name) {
          refetch();
        } else {
          setUsers((prev) => updateRoleInList(prev));
        }
      }
    } catch (error) {
      toast.error(error, { position: 'top-right' });
    }
  };


  return (
    <div>
      <input
        type="text"
        className="input input-bordered w-full max-w-md"
        placeholder="Search user by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />


      <table className="table-auto w-full border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(name ? usersName : users).map((user, index) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{user.name}</td>
              <td className="border px-4 py-2 text-center">{user.email}</td>

              <td className="border px-4 py-2 text-center">{user.role || 'user'}</td>
              <td className="border px-4 py-2 text-center">
                {
                  user.role === "admin" ? (
                    <button className="btn btn-disabled">Already Admin</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleMakeAdmin(user._id)}>
                      Make Admin
                    </button>
                  )
                }
              </td>
              <td className="border px-4 py-2 text-center">{user.subscriptionStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ManageUsers;
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const COLORS = ['red', 'green', 'blue']; // blue, green, yellow


const AdminProfile = () => {
  const { user } = useAuth()
  const axiosInstance = useAxios(0)



  const { data: countPosts = {}, isLoading: isPostsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/count`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: countUsers = {}, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/count`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  const { data: countComments = {}, isLoading: isCommentsLoading, } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments/count`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(countPosts, countUsers, countComments)

  const isLoading = isPostsLoading || isUsersLoading || isCommentsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-blue-500">Loading...</p>
      </div>
    );
  }

  const pieData = [
    { name: 'Posts', value: countPosts?.count || 0 },
    { name: 'Users', value: countUsers?.count || 0 },
    { name: 'Comments', value: countComments?.count || 0 },
  ];

  return (
    <div>

      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>

        </div>
      </div>

      <div className='my-6 flex flex-col justify-center items-center'>
        <p>Number Of Posts: <span className='font-semibold'>{countPosts?.count ?? 0}</span></p>
        <p>Number Of Users: <span className='font-semibold'>{countUsers?.count ?? 0}</span></p>
        <p>Number Of Comments: <span className='font-semibold'>{countComments?.count ?? 0}</span></p>

      </div>



      <div className='flex justify-center'>
        <ResponsiveContainer width="100%" height={300} >
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminProfile;
// import React from 'react';
// import useAuth from '../../hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxios from '../../hooks/useAxios';

// const MyProfile = () => {
//   const { user } = useAuth();
//   const axiosInstance = useAxios()

//     const {data: profileInfo=[]} = useQuery({
//          queryKey: ['profile', user?.email],
//          queryFn: async()=>{
//            const res = await axiosInstance.get(`/users/${user.email}`);
//            return res.data
//          }
//     })

//     console.log(profileInfo)

//     const {data: posts=[]} = useQuery({
//          queryKey: ['posts', user?.email],
//          queryFn: async()=>{
//            const res = await axiosInstance.get(`/posts/recent/${user.email}`);
//            return res.data
//          }
//     })

//     console.log(posts)

//   return (
//     <div>
//       {/* My Profile */}
  
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center space-y-4">
//        <img
//          src={profileInfo.image}
//          alt={profileInfo.name}
//          className="w-24 h-24 rounded-full mx-auto object-cover"
//        />
//        <h2 className="text-xl font-semibold">{profileInfo.name}</h2>
//        <p className="text-gray-600">{profileInfo.email}</p>
//        <div className="inline-block px-4 py-1 bg-yellow-400 text-white font-bold rounded-full">
//          Badge: {profileInfo.badge}
//        </div>
//     </div> 

//     <div >
    
//      {posts.map((post,index)=>{
//       return (
//         <div key={index} >
//             <p>Title: {post.postTitle}</p>
//             <p>Description: {post.postDescription}</p>
//             <p>Tag: {post.tag}</p>
//             <p>Up Vote: {post.upVote}</p>
//             <p>Down Vote: {post.downVote}</p>
//         </div>
//       )
//      })}
//     </div>
//     </div>
//   );
// };

// export default MyProfile;




import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { IoMdThumbsUp } from "react-icons/io";
import { IoMdThumbsDown } from "react-icons/io";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: profileInfo = {}, isLoading: isProfileLoading, } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: posts = [], isLoading: isPostsLoading, } = useQuery({
    queryKey: ['posts', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/recent/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

   const isLoading = isProfileLoading || isPostsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-blue-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={profileInfo.image}
          alt={profileInfo.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{profileInfo.name}</h2>
          <p className="text-gray-600">{profileInfo.email}</p>
          <span className="inline-block px-3 py-1 text-sm bg-yellow-400 text-white font-semibold rounded-full">
            Badge: {profileInfo.badge || "None"}
          </span>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">My Recent Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500">No recent posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-sm ">
                <p className=" text-blue-600 px-2 py-0.5 rounded-full">#{post.tag}</p>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{post.postTitle}</h4>
                <p className="text-gray-600 text-sm mb-2">{post.postDescription}</p>
                <div className="flex flex-wrap text-sm gap-4 text-gray-500">
                  
                  <div className='flex items-center gap-1'>
                    <IoMdThumbsUp /> 
                    <span>{post.upVote}</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    
                    <span>{post.downVote}</span>
                    <IoMdThumbsDown/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

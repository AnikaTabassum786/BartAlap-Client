


// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useNavigate } from "react-router";

// const fetchPosts = async () => {
//   const { data } = await axios.get("https://server-forum.vercel.app/all-post"); 
//   return data;
// };

// const AllPost = () => {
//   const navigate = useNavigate();
//   const { data: posts, isLoading, isError } = useQuery({
//     queryKey: ["posts"],
//     queryFn: fetchPosts,
//   });

//   if (isLoading) return <p className="mt-20 text-center">Loading posts...</p>;
//   if (isError) return <p className="mt-20 text-center text-red-500">Failed to fetch posts</p>;

//   const postsArray = Array.isArray(posts) ? posts : [];

//   return (
//     <div className="p-4 mt-20">
//       <h1 className="text-center text-2xl font-semibold mb-8 italic">All Posts</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {postsArray.length > 0 ? (
//           postsArray.map((post) => (
//             <div key={post._id} className="p-4 rounded shadow-md hover:shadow-lg transition">
//               <h3 className="font-semibold text-lg mb-2">{post.postTitle}</h3>
//               <p className=" mb-2">{post.postDescription}</p>
//               <p className=" text-sm mb-4">{new Date(post.created_at).toLocaleString()}</p>
//               <button
//                 onClick={() => navigate(`/post/${post._id}`)}
//                 className="btn bg-blue-100 text-blue-500  hover:bg-blue-200 px-4 py-2 rounded"
//               >
//                 View Details
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-full">No posts found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllPost;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const fetchPosts = async () => {
  const { data } = await axios.get("https://server-forum.vercel.app/all-post"); 
  return data;
};

const AllPost = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p className="mt-20 text-center">Loading posts...</p>;
  if (isError) return <p className="mt-20 text-center text-red-500">Failed to fetch posts</p>;

  const postsArray = Array.isArray(posts) ? posts : [];

  return (
    <div className="p-4 mt-20">
      <h1 className="text-center text-2xl font-semibold mb-8 italic">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsArray.length > 0 ? (
          postsArray.map((post) => (
            <div
              key={post._id}
              className="flex flex-col justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition h-[250px]"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2">{post.postTitle}</h3>
                <p className=" mb-2 line-clamp-3">
                  {post.postDescription}
                </p>
              </div>
              <div className="mt-4 flex flex-col justify-end">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.created_at).toLocaleString()}
                </p>
                <button
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="btn bg-blue-100 text-blue-500 hover:bg-blue-200 px-4 py-2 rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default AllPost;

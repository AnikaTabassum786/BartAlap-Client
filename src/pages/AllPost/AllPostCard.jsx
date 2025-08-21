// // import React from 'react';

// // const AllPostCard = ({post}) => {
// //     console.log(post)
// //     return (
// //         <div>
// //             All Post Card
// //         </div>
// //     );
// // };

// // export default AllPostCard;

// import React from 'react';
// import { useNavigate } from 'react-router';

// const AllPostCard = ({ post }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/post/${post._id}`); // or post.id depending on your DB
//   };

//   return (
//     <div className="border rounded-lg shadow-md p-4 flex flex-col justify-between">
//       <h3 className="text-lg font-semibold mb-2">{post.postTitle || post.title}</h3>
//       <p className="text-gray-600 mb-4">
//         {post.content?.slice(0, 100)}{post.content?.length > 100 ? '...' : ''}
//       </p>
//       <button
//         onClick={handleViewDetails}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start"
//       >
//         View Details
//       </button>
//     </div>
//   );
// };

// export default AllPostCard;

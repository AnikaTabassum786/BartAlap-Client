// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../hooks/useAuth';
// import useAxios from '../../hooks/useAxios';


// const MyPost = () => {
 
//     const {user} = useAuth()
//     const axiosInstance = useAxios()
//     console.log(user.email)

//     const { data: posts = []} = useQuery({
//     queryKey: ['my-posts', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/posts/${user.email}`); 
//       return res.data;
//     },
//     });

//     console.log(posts)
//     return (
//         <div>
//             My Post
//         </div>
//     );
// };

// export default MyPost;


import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const MyPost = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ['my-posts', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    toast.warn('Post Deleted.', { position: 'top-right' });
    // if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/posts/${id}`);
      refetch(); // refetch posts after delete
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border ">
            <thead>
              <tr className="">
                <th className="px-4 py-2 text-left ">Post Title</th>
                <th className="px-4 py-2 text-center">Votes</th>
                <th className="px-4 py-2 text-center">Comment</th>
                <th className="px-4 py-2 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-t">
                  <td className="px-4 py-2">{post.postTitle}</td>
                  <td className="px-4 py-2 text-center">
                    {post.upVote - post.downVote}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link to={`/post/${post._id}`}>
                    <button className="btn bg-blue-100 text-blue-500  hover:bg-blue-200 px-3 py-1 rounded cursor-pointer">
                      Comment
                    </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPost;

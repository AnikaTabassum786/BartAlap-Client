import React from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';


const PostCard = ({ post }) => {


  const { _id, authorImage, postTitle, created_at, postDescription } = post

  const voteCount = post.upVote - post.downVote;
  const axiosInstance = useAxios();


  const { data: commentCount = {} } = useQuery({
    queryKey: ['comment-count', postTitle],

    queryFn: async () => {
      const res = await axiosInstance.get(`/comments/count/${postTitle}`);
      return res.data;
    },
  });

  const totalComment = commentCount.count || 0;

  return (
    <div>
        <div className="w-full max-w-sm  flex flex-col justify-between p-4  rounded-lg shadow-sm bg-gray-50 mt-4"> 
          <div className="flex gap-4">
            <img
              src={authorImage}
              className="w-14 h-14 rounded-full object-cover"
              alt="Author"
            />
            <div className="flex flex-col">
              <p className="text-sm text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full w-fit mt-1">
                #{post.tag}
              </p>
              <p className="font-semibold text-base text-gray-800 mt-1">{postTitle}</p>
              

              <p className="text-gray-600">
                {postDescription.length > 50
                  ? postDescription.substring(0, 50) + "..."
                  : postDescription}
              </p>
            </div>
          </div>

         
          <div className="flex justify-start items-center gap-4 text-sm text-black mt-6">
            <p>Comments: <span className='font-medium'>{totalComment}</span></p>
            <p> Vote: <span className='font-medium'>{voteCount}</span></p>
            <p className=" text-gray-600 ">{created_at}</p>

          </div>

 <Link to={`/post/${_id}`}>
          <button className='btn mt-4 w-full bg-blue-100 hover:bg-blue-200 text-blue-700'>
          View Details
        </button>

          </Link>

        </div>

        

     
    </div>
  );
};

export default PostCard;
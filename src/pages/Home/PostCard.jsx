import React from 'react';
import { Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';


const PostCard = ({ post }) => {
    // console.log(post)
   
    const{_id,authorImage,postTitle,created_at} = post

    const voteCount = post.upVote - post.downVote;
    const axiosInstance = useAxios();


    const { data: commentCount = {} } = useQuery({
    queryKey: ['comment-count',postTitle],
    
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments/count/${postTitle}`);
      return res.data;
    },
  });

  const totalComment = commentCount.count || 0;

    return (
        <div>
            {/* {post.length} */}

            <Link to={`/post/${_id}`}>
            {/* <div className="card bg-base-100 w-80 shadow-sm">
                <figure>
                    <img className='w-40 h-40'
                        src={authorImage}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {postTitle}
                        <div className="badge badge-secondary">{post.tag}</div>
                    </h2>
                 
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{created_at}</div>
                        <div className="badge badge-outline">Vote Count:{voteCount}</div>
                        <div className="badge badge-outline">
                            Comments:{totalComment}
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className='flex justify-center items-start gap-4'>
                <img src={authorImage} className='w-20 h-20 rounded-full' alt="Image" />
                <div>
                     <p>{postTitle}</p>
                     <p className=" ">{post.tag}</p>
                     <p> Comments: {totalComment}</p>
                     <p>Vote: {voteCount}</p>
                     <p>{created_at}</p>
                </div>

               
            </div> */}


<div className="w-full max-w-sm  flex flex-col justify-between p-4  rounded-lg shadow-sm bg-gray-50 mt-4">
  {/* Author Info */}
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
      
    </div>
  </div>

  {/* Post Stats */}
  <div className="flex justify-start items-center gap-4 text-sm text-black mt-6">
    <p>Comments: <span className='font-medium'>{totalComment}</span></p>
    <p> Vote: <span className='font-medium'>{voteCount}</span></p>
    <p className=" text-gray-600 ">{created_at}</p>
  </div>

  {/* Created Date */}
  
</div>


            </Link>

            
        </div>
    );
};

export default PostCard;
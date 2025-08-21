
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

import { IoMdThumbsUp, IoMdThumbsDown } from 'react-icons/io';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';
import { toast } from 'react-toastify';

const PostDetails = () => {
  const post = useLoaderData();
  const axiosInstance = useAxios();
  const { user } = useAuth();
  // console.log(post)

  const [commentText, setCommentText] = useState('');
  const [feedbackStates, setFeedbackStates] = useState({});
  
  const [reportedComments, setReportedComments] = useState({});
  const [selectedComment, setSelectedComment] = useState(null);

  const [upVoteCount, setUpVoteCount] = useState(post.upVote);
  const [downVoteCount, setDownVoteCount] = useState(post.downVote);

  const postUrl = `${window.location.origin}/post/${post._id}`;

  const { data: profileInfo = {} } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: comments = [], refetch } = useQuery({
    queryKey: ['comment', post.postTitle],
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments/${post.postTitle}`);
      return res.data;
    }
  });

  const handleUpvote = async () => {
    try {
      await axiosInstance.patch(`/posts/upvote/${post._id}`);
      setUpVoteCount(prev => prev + 1);
    } catch (err) {
      console.error("Upvote failed", err);
    }
  };

  const handleDownvote = async () => {
    try {
      await axiosInstance.patch(`/posts/downvote/${post._id}`);
      setDownVoteCount(prev => prev + 1);
    } catch (err) {
      console.error("Downvote failed", err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    await axiosInstance.post('/comments', {
      postTitle: post.postTitle,
      email: profileInfo.email,
      commentText,
    });

    setCommentText('');
    refetch();
    toast.success('Comment Done Successfully!', { position: 'top-right' });
  };

  const handleFeedbackChange = (commentId, value) => {
    setFeedbackStates(prev => ({
      ...prev,
      [commentId]: value
    }));
  };


  const handleReport = async (commentId) => {
  const feedback = feedbackStates[commentId];
  if (!feedback) return;

  try {
    await axiosInstance.patch(`/comments/report/${commentId}`, {
      reportedFeedback: feedback,
    });
    toast.success('Reported Successfully!', { position: 'top-right' });
    setReportedComments(prev => ({
      ...prev,
      [commentId]: true,
    }));

    console.log("Reported:", feedback);
    refetch();
  } catch (err) {
    console.error("Report failed", err);
  }
};


useEffect(() => {
    const initialFeedbacks = {};
    const reported = {};

    comments.forEach((comment) => {
        if (comment.reportedFeedback) {
            initialFeedbacks[comment._id] = comment.reportedFeedback;
            reported[comment._id] = true;
        }
    });

    setFeedbackStates(initialFeedbacks);
    setReportedComments(reported);
}, [comments]);



  return (

    <>
   <div className="max-w-3xl mx-auto p-6  rounded-lg shadow-md my-8">
  {/* Author Info */}
  <div className="text-center mb-8">
    <img
      src={profileInfo.image}
      alt={profileInfo.name}
      className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
    />
    <h2 className="text-xl font-bold mt-3">{profileInfo.name}</h2>
    <p className=" text-sm">{profileInfo.email}</p>
   
  </div>

  {/* Post Content */}
  <div className="mb-6 border-t border-gray-200 pt-4">
    <div className='flex items-center gap-2'>
      <p className="inline-block  py-1 text-sm  text-blue-800 rounded-full">
      #{post.tag}
    </p>
     <p className="text-sm">{new Date(profileInfo.created_at).toLocaleDateString('en-CA')}</p>
    </div>
    <h1 className="text-2xl font-bold mb-2 text-justify">{post.postTitle}</h1>
    <p className="mb-2 text-justify">{post.postDescription}</p>
    
  </div>

  {/* Actions: Vote & Share */}
  <div className="flex flex-col sm:flex-row items-center justify-between my-10 gap-4 border-t border-gray-200 pt-4">
    {/* Voting */}
    <div className="flex gap-6 text-xl">
      <button
        onClick={handleUpvote}
        className="flex items-center gap-1 text-green-600 cursor-pointer"
      >
        <IoMdThumbsUp /> {upVoteCount}
      </button>

      <button
        onClick={handleDownvote}
        className="flex items-center gap-1 text-red-600 cursor-pointer"
      >
        <IoMdThumbsDown /> {downVoteCount}
      </button>
    </div>

    {/* Share */}
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-600">Share:</span>
      <FacebookShareButton url={postUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <WhatsappShareButton url={postUrl}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  </div>

  {/* Comment Input */}
  <div className="my-10 flex gap-2">
    <input
      type="text"
      placeholder="Write a comment..."
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
    <button
      onClick={handleComment}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
    >
      Comment
    </button>
  </div>

  {/* Comment Table */}
  <div className="overflow-x-auto mt-6">
    <table className="w-full text-sm border border-gray-200">
      <thead className="">
        <tr>
          <th className="text-left px-4 py-2">Email</th>
          <th className="text-left px-4 py-2">Comment</th>
          <th className="text-left px-4 py-2">Feedback</th>
          <th className="text-left px-4 py-2">Action</th>
        </tr>
      </thead>
      {/* <tbody>
        {comments
          .filter(comment => comment.status === 'active')
          .map((comment) => {
            const feedback = feedbackStates[comment._id] || '';
            const isReported = reportedComments[comment._id];

            return (
              <tr key={comment._id} className="border-t">
                <td className="px-4 py-2">{comment.email}</td>
                <td className="px-4 py-2">
                  {comment.commentText.length > 20 ? (
                    <>
                      {comment.commentText.slice(0, 20)}...
                      <button
                        onClick={() => setSelectedComment(comment)}
                        className="text-blue-600 ml-1 underline text-xs cursor-pointer"
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    comment.commentText
                  )}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={feedback}
                    onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="">Select</option>
                    <option value="Inappropriate">Inappropriate</option>
                    <option value="Spam">Spam</option>
                    <option value="Offensive">Offensive</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleReport(comment._id)}
                    disabled={!feedback || isReported}
                    className={`px-3 py-1 rounded text-white text-xs ${
                      isReported
                        ? 'bg-gray-400 cursor-not-allowed'
                        : feedback
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-red-300 cursor-not-allowed'
                    }`}
                  >
                    {isReported ? 'Reported' : 'Report'}
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody> */}

      <tbody>
  {comments.filter(comment => comment.status === 'active').length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-4 text-gray-500">
        No comments yet.
      </td>
    </tr>
  ) : (
    comments
      .filter(comment => comment.status === 'active')
      .map((comment) => {
        const feedback = feedbackStates[comment._id] || '';
        const isReported = reportedComments[comment._id];

        return (
          <tr key={comment._id} className="border-t">
            <td className="px-4 py-2">{comment.email}</td>
            <td className="px-4 py-2">
              {comment.commentText.length > 20 ? (
                <>
                  {comment.commentText.slice(0, 20)}...
                  <button
                    onClick={() => setSelectedComment(comment)}
                    className="text-blue-600 ml-1 underline text-xs"
                  >
                    Read More
                  </button>
                </>
              ) : (
                comment.commentText
              )}
            </td>
            <td className="px-4 py-2">
              <select
                value={feedback}
                onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="">Select</option>
                <option value="Inappropriate">Inappropriate</option>
                <option value="Spam">Spam</option>
                <option value="Offensive">Offensive</option>
              </select>
            </td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleReport(comment._id)}
                disabled={!feedback || isReported}
                className={`px-3 py-1 rounded text-white text-xs  ${
                  isReported
                    ? 'bg-gray-400 cursor-not-allowed'
                    : feedback
                    ? 'bg-red-500 hover:bg-red-600 cursor-pointer'
                    : 'bg-red-300 cursor-not-allowed'
                }`}
              >
                {isReported ? 'Reported' : 'Report'}
              </button>
            </td>
          </tr>
        );
      })
  )}
</tbody>

    </table>
  </div>

  {/* Modal */}
  {selectedComment && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full relative">
        <h2 className="text-lg font-semibold mb-2">Full Comment</h2>
        <p className="text-gray-700">{selectedComment.commentText}</p>
        <div className="mt-4 text-right">
          <button
            onClick={() => setSelectedComment(null)}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>

    </>
    
  );
};

export default PostDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const Comment = ({ postTitle, userEmail }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
    const axiosInstance = useAxios()


  const fetchComments = async () => {
    const res = await axiosInstance.get(`/comments/${postTitle}`);
    setComments(res.data);
  };

  const fetchCount = async () => {
    const res = await axiosInstance.get(`/comments/count/${postTitle}`);
    setCount(res.data.count);
  };

  const handleComment = async () => {
    if (commentText.trim() === '') return;

    await axiosInstance.post('/comments', {
      postTitle,
      userEmail,
      commentText,
    });

    setCommentText('');
    fetchComments();
    fetchCount();
  };

  useEffect(() => {
    fetchComments();
    fetchCount();
  }, []);

  return (
    <div className="border p-4 rounded-md shadow">
      <h3 className="text-lg font-semibold mb-2">Comments ({count})</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={handleComment}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Comment
        </button>
      </div>

      <ul className="space-y-2">
        {/* {comments?.map((c, index) => (
          <li key={index} className="border p-2 rounded bg-gray-100">
            <p className="text-sm text-gray-700">{c.userEmail}</p>
            <p>{c.commentText}</p>
          </li>
        ))} */}

        {Array.isArray(comments) &&
  comments.map((c, index) => (
    <li key={index} className="border p-2 rounded bg-gray-100">
      <p className="text-sm text-gray-700">{c.userEmail}</p>
      <p>{c.commentText}</p>
    </li>
))}

      </ul>
    </div>
  );
};

export default Comment;

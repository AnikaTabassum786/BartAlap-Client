import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AddPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [profilePic, setProfilePic] = useState('');
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //  Get user's post count
  const { data: countResult = {}, isLoading, refetch } = useQuery({
    queryKey: ['my-post-count', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/count/${user.email}`);
      return res.data;
    },
  });

  const postCount = countResult.count || 0;

  //  Get user's badge
  const { data: users = {}, isLoading: userLoading } = useQuery({
    queryKey: ['user-info', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const badge = users?.badge || 'free';



  //  Form Submission
  const onSubmit = async (data) => {


    // if (!profilePic) {
    //   alert('Please upload an author image before submitting');
    //   return;
    // }

    const postWithVotes = {
      authorImage: users.image,
      name: users.name,
      email: users.email,
      postTitle: data.postTitle,
      postDescription: data.postDescription,
      tag: data.tag,
      upVote: 0,
      downVote: 0,
      created_at: new Date().toLocaleDateString('en-CA'),
    };

    try {
      const res = await axiosInstance.post('/posts', postWithVotes);
      // console.log('Post saved:', res.data);
      toast.success('Post Submitted Successfully!', { position: 'top-right' });
      reset();
      setProfilePic('');
      await refetch();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };


  return (
    <div className="max-w-xl mx-auto my-6">
      {/* <p>{postCount}</p> */}

      {isLoading || userLoading ? (
        <p className="text-center text-gray-500">Loading...</p>

      ) : postCount >= 5 && badge !== 'gold' ? (
        <div className="p-6 bg-white shadow-md rounded-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            You have reached the maximum limit of 5 posts.
          </h2>
          <p className="mb-6 text-gray-600 font-medium">
            Become a member to add more posts.
          </p>
          <button
            onClick={() => navigate('/membership')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded cursor-pointer"
          >
            Become a Member
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 bg-white shadow-md rounded-md">


          <div className='flex flex-col justify-start'>
            <div className='flex justify-start'>
              <img
              src={users.image}
              alt={users.name}
              className="w-24 h-24 rounded-full  object-cover"
            />
            </div>
            <p className="text-gray-600">{users.email}</p>
            <p className="text-xl font-semibold">{users.name}</p>
            
          </div>

          {/* Post Title */}
          <div>
            <label className="block font-medium">Post Title</label>
            <input
              type="text"
              {...register('postTitle', { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.postTitle && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Post Description</label>
            <textarea
              {...register('postDescription', { required: true })}
              className="w-full border p-2 rounded"
              rows={4}
            />
            {errors.postDescription && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* Tag */}
          <div>
            <label className="block font-medium">Tag</label>
            <select
              {...register('tag', { required: true })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select a tag</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
            
              <option value="Education">Education</option>
            </select>
            {errors.tag && <p className="text-red-500 text-sm">This field is required</p>}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Submit Post'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddPost;

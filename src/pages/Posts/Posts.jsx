import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import PostCard from '../Home/PostCard';
import { IoIosClose } from "react-icons/io";
import Marquee from "react-fast-marquee";


const Posts = () => {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [searchTag, setSearchTag] = useState('');
  const [activeTag, setActiveTag] = useState(''); // tag to trigger search


  const availableTags = ['Technology', 'Science', 'Education'];
  const [tagSelected, setTagSelected] = useState('');


  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosInstance.get('/announcements');
      return res.data
    }
  })

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts', page, sortByPopularity, searchTag, activeTag],
    queryFn: async () => {
      if (activeTag.trim()) {
        const res = await axiosInstance.get(`/search-posts?tag=${searchTag}`);
        return res.data;
      } else {
        const res = await axiosInstance.get(
          `/all-posts?page=${page}&sortByPopularity=${sortByPopularity}`
        );
        return res.data;
      }
    },
  });


  const handleSearch = () => {
    setActiveTag(searchTag.trim());
  };

  const clearSearch = () => {
    setSearchTag('');
    setActiveTag('');
  };

  console.log(posts)

  const { data: tagPosts = [], isLoading: isTagLoading } = useQuery({
    queryKey: ['tag-posts', tagSelected],
    enabled: !!tagSelected, // Only fetch when a tag is selected
    queryFn: async () => {
      const res = await axiosInstance.get(`/search-posts?tag=${tagSelected}`);
      return res.data;
    },
  });

  const { data: countPosts = {} } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts/count`);
      return res.data;
    },
    // enabled: !!user?.email,
  });

  return (
    <div>
      <div>
        <h1 className="text-center text-2xl font-semibold mt-20 italic">Welcome Our Platform</h1>

        <div className="my-8 flex gap-2 justify-center">
          <input
            type="text"
            placeholder="Search by tag (e.g., technology)"
            className="input input-bordered"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          <button onClick={handleSearch} className="btn bg-blue-100 text-blue-500  hover:bg-blue-200">
            Search
          </button>
          {activeTag && (
            <button className="btn flex items-center justify-center bg-red-400 hover:bg-red-500 text-white" onClick={clearSearch}>
              <div className="flex items-center gap-1">
                Clear
                <IoIosClose size={20} className="mt-0.5 " />
              </div>
            </button>
          )}
        </div>

        <div className="my-8">
          {/* <h2 className="text-center font-semibold mb-2">Browse by Tag</h2> */}
          <div className="flex flex-wrap gap-2 justify-center">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagSelected(tag)}
                className={`badge badge-outline cursor-pointer px-3 py-4 text-sm ${tagSelected === tag ? 'bg-blue-100 text-blue-500  hover:bg-blue-200 font-semibold' : ''
                  }`}
              >
                {tag}
              </button>
            ))}
            {tagSelected && (
              <button
                onClick={() => setTagSelected('')}
                className="badge badge-secondary text-sm px-3 py-4  btn bg-red-500 text-white"
              >
                Clear <IoIosClose size={20} className='mt-0.5' />
              </button>


            )}
          </div>
        </div>

        <div className="text-center my-8">
          <button
            onClick={() => setSortByPopularity((prev) => !prev)}
            className="bg-blue-100 text-blue-500  hover:bg-blue-200 font-semibold px-4 py-2 rounded cursor-pointer"
          >
            {sortByPopularity ? 'Sort by Newest' : 'Sort by Popularity'}
          </button>


        </div>

        <div >

          <div>
            {announcements.map((announcement, index) => {
              return (
                <div key={index} className='my-6 rounded-lg shadow-sm bg-gray-50 w-full p-4'>
                  <p className='text-lg font-medium text-gray-900'>{announcement.title}</p>
                  <p className='mt-4 text-gray-700'>{announcement.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <Marquee>
          {
            posts.map((post, index) => {
              return (
                <div key={index} className="py-8 mx-8 text-blue-400 font-medium whitespace-nowrap">

                  {post.postTitle}

                </div>
              )
            })
          }
        </Marquee>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center md:place-items-stretch">
          {isLoading || isTagLoading ? (
            <p>Loading...</p>
          ) : tagSelected ? (
            tagPosts.length > 0 ? (
              tagPosts.map((post, i) => <PostCard key={i} post={post} />)
            ) : (
              <p>No posts found for "{tagSelected}".</p>
            )
          ) : posts.length > 0 ? (
            posts.map((post, i) => <PostCard key={i} post={post} />)
          ) : (
            <p>No posts found.</p>
          )}
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
  {posts.length > 0 ? (
    posts.map((post) => (
      <AllPostCard key={post._id || post.id} post={post} />
    ))
  ) : (
    <p className="text-center text-gray-500 col-span-full">No posts found.</p>
  )}
</div> */}



        <div className="text-center my-12 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="btn bg-blue-100 text-blue-500  hover:bg-blue-200"
          >
            Prev
          </button>
          <span className="font-semibold text-lg">{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className=" btn bg-blue-100 text-blue-500  hover:bg-blue-200"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Posts;

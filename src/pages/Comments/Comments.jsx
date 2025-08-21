// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const Comments = () => {
//   // Fetch announcements with cookies
//   const { data: announcements = [], isLoading, isError } = useQuery({
//     queryKey: ['announcements'],
//     queryFn: async () => {
//       const res = await axios.get('https://server-forum.vercel.app/announcements', {
//         withCredentials: true, // important to send cookies
//       });
//       return res.data;
//     },
//   });

//   if (isLoading) return <div>Loading announcements...</div>;
//   if (isError) return <div>Failed to load announcements.</div>;

//   return (
//     <div className="mt-24 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Notice</h2>
//       {announcements.length === 0 ? (
//         <p>No announcements yet.</p>
//       ) : (
//         announcements.map((announcement) => (
//           <div key={announcement._id} className=" py-4">
//             <p className="font-semibold">{announcement.title}</p>
//             <p className='mt-2'>{announcement.description}</p>
//             <small className="text-gray-500">
//               {announcement.createdAt
//                 ? new Date(announcement.createdAt).toLocaleString()
//                 : ''}
//             </small>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Comments;
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Comments = () => {
  // Fetch announcements
  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axios.get('https://server-forum.vercel.app/announcements');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading Notice...</div>;
  if (isError) return <div>Failed to load Notice.</div>;

  return (
    <div className="mt-24 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notice</h2>
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map((announcement) => (
          <div key={announcement._id} className="py-4 ">
            <p className="font-semibold">{announcement.title}</p>
            <p className="mt-2">{announcement.description}</p>
            <small className="text-gray-500">
              {announcement.createdAt
                ? new Date(announcement.createdAt).toLocaleString()
                : ''}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;

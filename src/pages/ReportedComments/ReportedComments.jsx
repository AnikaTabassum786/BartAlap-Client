import { useQuery } from '@tanstack/react-query';

import useAxios from '../../hooks/useAxios';
import { toast } from 'react-toastify';

const ReportedComments = () => {

  const axiosInstance = useAxios();

  const { data: reports = [], refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const res = await axiosInstance.get('/reported-comments');
      return res.data
    }
  })

  // console.log(reports)


  const handleHide = async (id) => {
    try {
      await axiosInstance.patch(`/comments/status/${id}`, {
        status: 'inactive',
        
      });
      toast.success('Comment Hide Successfully!', { position: 'top-right' });
      refetch();
    } catch (error) {
      console.error('Failed to hide comment:', error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2 className="text-xl font-bold mb-4">Action By Admin</h2>
          <table className="table-auto border w-full">
            <thead>
              <tr>
                <th className="border px-2 py-1">Post Title</th>
                <th className="border px-2 py-1">User Email</th>
                <th className="border px-2 py-1">Comment</th>
                <th className="border px-2 py-1">Reported Feedback</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Action</th>
                <th className="border px-2 py-1">Created At</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td className="border px-2 py-1">{report.postTitle}</td>
                  <td className="border px-2 py-1">{report.email}</td>
                  <td className="border px-2 py-1">{report.commentText}</td>
                  <td className="border px-2 py-1">{report.reportedFeedback}</td>
                  <td className="border px-2 py-1">{report.status}</td>
                  <td className="border px-2 py-1 text-center">
                    {report.status === 'active' ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                        onClick={() => handleHide(report._id)}
                      >
                        Hide
                      </button>
                    ) : (
                      <span className="text-gray-500 italic">Hidden</span>
                    )}
                  </td>
                  <td className="border px-2 py-1">{new Date(report.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedComments;
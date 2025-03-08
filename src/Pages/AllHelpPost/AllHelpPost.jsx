import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import Swal from 'sweetalert2';  

const AllHelpPost = () => {
  const { user } = useAuth();  
  const axiosSecure = useAxiosSecure();  
  const [commentInputs, setCommentInputs] = useState({});

  const { data: helpRequests = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['help-requests'],
    queryFn: async () => {
      const token = localStorage.getItem('authToken'); 
      const { data } = await axiosSecure.get('/help-requests', {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
      return data;
    },
  });

  const handleCommentSubmit = async (event, requestId) => {
    event.preventDefault();
    if (!commentInputs[requestId]?.trim()) return;

    try {
      const token = localStorage.getItem('authToken');  

      const response = await axiosSecure.post(
        `/help-request/${requestId}/comment`,
        { commentText: commentInputs[requestId], userName: user.name },  
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Comment added successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        
        setCommentInputs((prev) => ({ ...prev, [requestId]: '' }));
        refetch();  // Refresh data
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (isLoading) return <p>Loading help requests...</p>;
  if (isError) return <p>Error loading help requests.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Help Requests</h2>
      {helpRequests.map((request) => (
        <div key={request._id} className="border p-4 rounded mb-4 shadow">
          <h3 className="text-lg font-semibold">{request.title}</h3>
          <p className="text-gray-700">{request.description}</p>
          <p className="text-sm text-red-500">Urgency: {request.urgency}</p>

          <div className="mt-4">
            <h4 className="font-semibold">Comments:</h4>
            {request.comments && request.comments.length > 0 ? (
              request.comments.map((c, index) => (
                <p key={index} className="text-sm text-gray-600">
                  <strong>{c.userName || 'Anonymous'}:</strong> {c.text}  
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>

          <form onSubmit={(e) => handleCommentSubmit(e, request._id)} className="mt-2">
            <input
              type="text"
              value={commentInputs[request._id] || ''}
              onChange={(e) =>
                setCommentInputs((prev) => ({ ...prev, [request._id]: e.target.value }))
              }
              className="border p-2 w-full rounded"
              placeholder="Write a comment..."
              required
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
              Submit
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AllHelpPost;

import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiousSecure";

const MyJoiningEvent = () => {
  const { user } = useAuth();  
  const axiosSecure = useAxiosSecure();  
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axiosSecure.get("/my-join-events", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.data && Array.isArray(response.data.events)) {
          setEvents(response.data.events); 
        } else {
          setError("No events found.");
        }
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [axiosSecure]); 

  // Ensure `events` is always an array before doing `.slice()`
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = Array.isArray(events) ? events.slice(indexOfFirstEvent, indexOfLastEvent) : [];
  const totalPages = Math.ceil((Array.isArray(events) ? events.length : 0) / itemsPerPage);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="mb-10">
      <div
        className="relative h-[190px] md:h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/ksVmHLdR/129040833-gettyimages-1386409598-jpg.webp')",
        }}
      >
        <div className="absolute inset-0 bg-opacity-60 flex justify-center items-center text-green-700">
          <h1 className="font-bold text-lg md:text-4xl">My Joined Events</h1>
        </div>
      </div>
      <h2 className="text-xl md:text-3xl text-center font-bold my-10">
        My Joined Events
      </h2>
      {events.length === 0 && (
        <p className="text-center text-lg">You haven't joined any events yet.</p>
      )}
      <div className="overflow-x-auto shadow-lg">
        <table className="table">
          <thead className="bg-[#ddf5f3]">
            <tr>
              <th>SL.No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, idx) => (
              <tr key={event._id}>
                <td>{indexOfFirstEvent + idx + 1}</td>
                <td>
                  <img
                    src={event.event.imageUrl} 
                    alt="Event"
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td>{event.event.title}</td>
                <td>{event.event.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-8">
        <p className="text-teal-600">
          Showing {indexOfFirstEvent + 1} to{" "}
          {Math.min(indexOfLastEvent, events.length)} of {events.length} results
        </p>
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded bg-white text-teal-500"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded bg-white text-purple-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyJoiningEvent;

import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MdOutlineEdit, MdDelete } from 'react-icons/md';
import { CiCircleMore } from 'react-icons/ci';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import useAuth from '../../Hooks/useAuth';
import DeleteModal from './DeleteModal';

const MyEvents = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const closeModal = () => setIsOpen(false);

    // Fetch events
    const { data: events = [], isLoading, refetch } = useQuery({
        queryKey: ['my-events', user?.email],
        queryFn: async () => {
            const token = localStorage.getItem('authToken');
            const { data } = await axiosSecure.get(`/my-events/${user?.email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        }
    });

    // Delete event
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const token = localStorage.getItem('authToken');
            const { data } = await axiosSecure.delete(`/delete-event/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data;
        },
        onSuccess: () => {
            Swal.fire({ position: 'center', icon: 'success', title: 'Event Deleted!', showConfirmButton: false, timer: 1500 });
            refetch();
        }
    });

    const handleDelete = async (id) => {
        try { await mutateAsync(id); } catch (err) { console.error(err); }
    };

    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / itemsPerPage);

    return (
        <div className='mb-10'>
            <div className="relative h-[190px] md:h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/ksVmHLdR/129040833-gettyimages-1386409598-jpg.webp')" }}>
                <div className="absolute inset-0  bg-opacity-60 flex justify-center items-center text-green-700">
                    <h1 className="font-bold text-lg md:text-4xl">My All Events Here</h1>
                </div>
            </div>
            <h2 className="text-xl md:text-3xl text-center font-bold my-10">My Events</h2>
            {events.length === 0 && <p className="text-center text-lg">You have not added any events.</p>}
            <div className="overflow-x-auto shadow-lg">
                <table className="table">
                    <thead className="bg-[#ddf5f3]">
                        <tr>
                            <th>SL.No.</th><th>Image</th><th>Title</th><th>Date</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.map((event, idx) => (
                            <tr key={event._id}>
                                <td>{indexOfFirstEvent + idx + 1}</td>
                                <td><img src={event.imageUrl} alt="Event" className="w-12 h-12 rounded" /></td>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>
                                    <Link to={`/event-details/${event._id}`}><button className="btn btn-xs text-blue-600"><CiCircleMore /> View</button></Link>
                                    <Link to={`/my-events/update/${event._id}`}><button className="btn btn-xs text-green-600"><MdOutlineEdit /> Edit</button></Link>
                                    <button onClick={() => { setIsOpen(true); setSelectedId(event._id); }} className="btn btn-xs text-red-600"><MdDelete /> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DeleteModal handleDelete={handleDelete} id={selectedId} isOpen={isOpen} closeModal={closeModal} />
            <div className="flex justify-between items-center mt-8">
                <p className="text-teal-600">Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, events.length)} of {events.length} results</p>
                <div className="flex space-x-2">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 border rounded bg-white text-teal-500">Prev</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-white text-teal-500'}`}>{index + 1}</button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 border rounded bg-white text-purple-500">Next</button>
                </div>
            </div>
        </div>
    );
};

export default MyEvents;

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';  
import { BeatLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import { imageUpload } from '../../Hooks/api/utils';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Transition, Dialog } from '@headlessui/react';

const Profile = () => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [loading, setLoading] = useState(false);  

  const { data: fetchedUser = {}, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center my-4 md:my-6">
        <LoadingSpinner />
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    setLoading(true);  

    const updatedData = {
      name: updatedName || fetchedUser?.name,
      image: updatedImage ? await imageUpload(updatedImage) : fetchedUser?.image, 
    };

    try {
      const response = await axiosSecure.put(`/users/${user?.email}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been successfully updated.',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
        refetch();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed!',
          text: 'There was an error updating your profile. Please try again.',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        confirmButtonText: 'Okay',
      });
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="min-h-screen">
      {/* Profile Banner */}
      <div className="bg-cover bg-center bg-no-repeat text-[#02faee]" style={{ backgroundImage: 'url("https://i.ibb.co/SfRz7q8/loginbg.jpg")' }}>
        <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60">
          <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left"></div>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="absolute top-[8rem] md:top-[12rem] left-[50%] transform -translate-x-1/2 bg-white bg-opacity-40 p-8 rounded-lg shadow-xl w-[90%] sm:w-[60%] md:w-[40%] text-center backdrop-blur-md">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            alt={fetchedUser?.name || user.name}
            src={fetchedUser?.image || "https://via.placeholder.com/150"}
            className="w-full h-full rounded-full border-4 border-teal-500 object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 border-2 border-white"></div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          {fetchedUser?.name || user.name}
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mb-4">{fetchedUser?.email || user.email}</p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            className="btn border-none bg-teal-500 text-white px-2 md:px-6 rounded-lg hover:bg-teal-600 transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            Update Profile
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn px-2 md:px-6 bg-green-500 hover:bg-green-600 border-none text-white"
          >
            Back To Home
          </button>
          <button
            onClick={() => navigate('/my-join-events')} // assuming you have a route for volunteers
            className="btn px-2 md:px-6 bg-blue-500 hover:bg-blue-600 border-none text-white"
          >
            Volunteer History
          </button>
        </div>
      </div>

      {/* Update Profile Modal */}
      <Transition show={isModalOpen}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={() => setIsModalOpen(false)}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative flex justify-center items-center min-h-screen">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
              <Dialog.Title className="text-xl font-semibold mb-4">Update Profile</Dialog.Title>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mt-1"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium">Profile Image</label>
                <input
                  id="image"
                  type="file"
                  onChange={(e) => setUpdatedImage(e.target.files[0])}
                  className="w-full mt-1"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className={`px-4 py-2 bg-teal-600 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? <BeatLoader size={8} color="#ffffff" /> : 'Save Changes'}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Profile;

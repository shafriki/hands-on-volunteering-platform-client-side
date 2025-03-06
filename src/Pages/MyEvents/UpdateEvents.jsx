import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiousSecure";

const UpdateEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch event data to pre-fill the form
  const { data: eventData, isLoading, refetch } = useQuery({
    queryKey: ['event-details', id],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');
      const { data } = await axiosSecure.get(`/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      setValue('title', data.title);
      setValue('description', data.description); 
      setValue('image', data.imageUrl); 
      setValue('category', data.category); 
      setValue('date', data.date); 
      setValue('time', data.time); 
      setValue('location', data.location); 
    }
  });

  const onSubmit = async (data) => {
    const updatedEventData = {
      ...data,
      email: user?.email,  // Make sure email is sent for updates
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axiosSecure.put(`/update-event/${id}`, updatedEventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Event Updated Successfully!`,
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
        navigate('/my-events');
      }
    } catch (err) {
      console.error("Error updating event:", err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Updating Event",
        showConfirmButton: true,
      });
    }
  };

  if (isLoading) {
    return <div className="text-center my-10 md:my-20">
      <span className="loading loading-bars loading-lg"></span>
    </div>;
  }

  return (
    <div>
      {/* Banner */}
      <div
        style={{
          backgroundImage: "url('https://i.ibb.co.com/SfRz7q8/loginbg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 text-[#02faee]"
      >
        <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
          <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">
            Update Your Event
          </h1>
        </div>
      </div>

      <div className="p-10 rounded-md bg-gray-200 max-w-screen-lg mx-auto shadow my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                {...register('title', { required: true })}
                placeholder="Enter event title"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Image URL</label>
              <input
                type="text"
                {...register('image', { required: true })}
                placeholder="Enter image URL"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              {...register('description', { required: true })}
              placeholder="Enter event description"
              className="w-full border border-gray-300 p-2 rounded"
              rows="5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">Category</label>
              <input
                type="text"
                {...register('category', { required: true })}
                placeholder="Enter category"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Event Date</label>
              <input
                type="date"
                {...register('date', { required: true })}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">Time</label>
              <input
                type="time"
                {...register('time', { required: true })}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Location</label>
              <input
                type="text"
                {...register('location', { required: true })}
                placeholder="Enter event location"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn border-none bg-[#2fc4bd] text-white py-2 px-4 rounded hover:bg-[#1c7975] transition"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvents;

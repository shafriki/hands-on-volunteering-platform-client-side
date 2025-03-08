import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import useAxiosSecure from '../../Hooks/useAxiousSecure'; // Assuming you have this hook created

const JoinTeam = () => {
  const [teams, setTeams] = useState([]); // Initialize teams as an empty array
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]); // Initialize teamMembers as an empty array
  const [loadingTeams, setLoadingTeams] = useState({}); // Track loading state for each team
  const axiosSecure = useAxiosSecure(); // Use the custom axios instance

  // Fetch the teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get the token from localStorage
        const response = await axiosSecure.get('/teams', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        });

        if (response?.data?.success) {
          setTeams(response.data.teams || []); // Ensure teams is always an array
        } else {
          setMessage(response?.data?.message || 'Failed to fetch teams.');
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setMessage("Failed to fetch teams.");
      }
    };

    fetchTeams();
  }, []);

  // Handle team selection and joining
  const handleJoinTeam = async (teamId) => {
    setLoadingTeams((prev) => ({ ...prev, [teamId]: true })); // Set loading for the selected team
    try {
      const token = localStorage.getItem("authToken"); // Get the token from localStorage
      const response = await axiosSecure.post('/join-team', { teamId }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response?.data?.success) {
        setMessage("Successfully joined the team!");
        setTeamMembers(response?.data?.teamMembers || []); // Ensure teamMembers is an array

        Swal.fire({
          title: 'Success!',
          text: 'You have successfully joined the team.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        setMessage(response?.data?.message || 'Failed to join the team.');
        Swal.fire({
          title: 'Error!',
          text: response?.data?.message || 'Unable to join the team.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error("Error joining team:", error);
      setMessage("Failed to join the team.");
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while joining the team.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoadingTeams((prev) => ({ ...prev, [teamId]: false })); 
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Join a Team</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{team.teamName}</h3>
              <p className="text-gray-600 mb-4">{team.description}</p>
              <button
                onClick={() => handleJoinTeam(team._id)}
                disabled={loadingTeams[team._id]} 
                className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loadingTeams[team._id] ? <BeatLoader size={10} color="#ffffff" /> : 'Join Team'}
              </button>
            </div>
          ))
        ) : (
          <p>No teams available to join.</p>
        )}
      </div>

      {/* Display team members' emails after successful join */}
      {teamMembers.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Team Members:</h3>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index} className="text-gray-700">
                {member.email} 
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JoinTeam;

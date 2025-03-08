import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import { AuthContext } from "../../providers/AuthProvider";

const CreateTeam = () => {
    const { user } = useContext(AuthContext);
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");
    const [teamType, setTeamType] = useState("public");
    const [inviteEmails, setInviteEmails] = useState("");
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!teamName || !description) {
            Swal.fire({
                title: "Error!",
                text: "Please fill all required fields.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            setLoading(true);
            const response = await axiosSecure.post(
                "/create-team",
                {
                    teamName,
                    description,
                    teamType,
                    inviteEmails: teamType === "private" ? inviteEmails.split(",").map(email => email.trim()) : [],
                    email: user?.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );

            if (response?.data?.success) {
                setTeamName("");
                setDescription("");
                setTeamType("public");
                setInviteEmails("");

                Swal.fire({
                    title: "Success!",
                    text: "Team created successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response?.data?.message || "Unknown error occurred.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error creating team", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong while creating the team.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-green-400" style={{ backgroundImage: 'url("https://i.ibb.co.com/1f8tFm0T/shoishober-alponai-rongin-boishakh-sessions.jpg")' }}>
                <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
                    <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">
                        Create a New Team
                    </h1>
                </div>
            </div>

            <div className="p-5 md:p-10 rounded-md bg-gray-200 max-w-screen-lg mx-auto shadow my-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Team Name</label>
                        <input
                            type="text"
                            name="teamName"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter team name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter team description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Team Type</label>
                        <select
                            name="teamType"
                            className="w-full border border-gray-300 p-2 rounded"
                            value={teamType}
                            onChange={(e) => setTeamType(e.target.value)}
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                    {teamType === "private" && (
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Invite Members (Emails, comma-separated)</label>
                            <input
                                type="text"
                                name="inviteEmails"
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="example1@gmail.com, example2@gmail.com"
                                value={inviteEmails}
                                onChange={(e) => setInviteEmails(e.target.value)}
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full btn border-none bg-[#2f80ed] text-white py-2 px-4 rounded hover:bg-[#1e6091] transition"
                        disabled={loading}
                    >
                        {loading ? <BeatLoader size={10} color="#ffffff" /> : "Create Team"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTeam;
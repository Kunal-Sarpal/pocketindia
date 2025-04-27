import React, { useEffect, useState } from 'react';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    CheckCircle as AvailableIcon,
    Cancel as BusyIcon,
    AssignmentInd as AssignIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { AssignAgent, GetAgents } from '../store/actions/Productaction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Agent = () => {
    const [agents, setAgents] = useState([]);
    const [error, setError] = useState();
    const [assignedAgentId, setAssignedAgentId] = useState(null); 
    const param = useParams();
    const navigate = useNavigate();

    const assignAgent = async (agentId, orderId) => {
        try {
            setAssignedAgentId(agentId);

            const status = await AssignAgent(agentId, orderId);
            console.log(status);
            if (status.statusCode === 403) {
                setError("You are not authorized to access this page. Please login as an admin.");
                return;
            } else if (status.statusCode === 404) {
                setError("No agents available yet. Please check back later.");
                return;
            } else if (status.statusCode === 500) {
                setError("Internal server error. Please try again later.");
                return;
            }

            toast.success("Agent assigned successfully");

            // Wait 2.5s before redirect
            setTimeout(() => {
                navigate('/admin');
            }, 2500);

        } catch (error) {
            setError("Something went wrong while assigning agent.");
            toast.error("Something went wrong while assigning agent");
            setAssignedAgentId(null); // re-enable on failure
        }
    };

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const getAgentsResponse = await GetAgents();

                if (getAgentsResponse.statusCode === 403) {
                    setError("You are not authorized to access this page. Please login as an admin.");
                    return;
                } else if (getAgentsResponse.statusCode === 404) {
                    setError("No agents available yet. Please check back later.");
                    return;
                } else if (getAgentsResponse.statusCode === 500) {
                    setError("Internal server error. Please try again later.");
                    return;
                }

                setAgents(getAgentsResponse.agents);
            } catch (error) {
                setError("Failed to fetch agents.");
            }
        };

        fetchAgents();
    }, []);

    if (error) {
        return (
            <h1 className="flex justify-center items-center h-screen text-2xl font-normal text-red-500">
                {error}
            </h1>
        );
    }

    if (agents.length === 0) {
        return (
            <h1 className="text-3xl font-extrabold text-red-500 text-center mt-16">
                No agents available
            </h1>
        );
    }

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-normal tracking-tighter text-gray-900 mb-8">
                        Agent Management
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {agents.map((agent) => (
                            <div key={agent._id} className="bg-white border border-zinc-400 rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{agent.name}</h2>
                                            <p className="text-sm text-gray-500">ID: {agent._id}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <EmailIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <p className="text-gray-600">{agent.email}</p>
                                        </div>

                                        <div className="flex items-center">
                                            <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <p className="text-gray-600">{agent.phone}</p>
                                        </div>

                                        <div className="flex items-center">
                                            <LocationIcon className="h-5 w-5 text-gray-400 mr-2" />
                                            <p className="text-gray-600">{agent.area}</p>
                                        </div>

                                        <div className="flex items-center">
                                            {agent.assignedOrders.length === 0 ? (
                                                <>
                                                    <AvailableIcon className="h-5 w-5 text-green-500 mr-2" />
                                                    <span className="text-green-600">Available</span>
                                                </>
                                            ) : (
                                                <>
                                                    <BusyIcon className="h-5 w-5 text-red-500 mr-2" />
                                                    <span className="text-red-600">Currently Busy</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={() => assignAgent(agent._id, param.id)}
                                            className={`w-full flex items-center justify-center px-4 py-2 rounded-md ${agent.assignedOrders.length === 0 ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-400'} text-white font-medium transition-colors duration-300 ${assignedAgentId && assignedAgentId !== agent._id ? 'cursor-not-allowed opacity-50' : ''}`}
                                            disabled={agent.assignedOrders.length !== 0 || assignedAgentId !== null}
                                        >
                                            <AssignIcon className="h-5 w-5 mr-2" />
                                            {agent.assignedOrders.length === 0 ? 'Assign Agent' : 'Not Available'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Agent;

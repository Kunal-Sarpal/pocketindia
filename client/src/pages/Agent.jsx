import React from 'react';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    CheckCircle as AvailableIcon,
    Cancel as BusyIcon,
    AssignmentInd as AssignIcon
} from '@mui/icons-material';

const Agent = () => {
    // Array of 3 random agent data
    const agents = [
        {
            id: 'AG-001',
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '+1 (555) 123-4567',
            available: true,
            location: 'New York, USA',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            id: 'AG-002',
            name: 'Michael Chen',
            email: 'michael.c@example.com',
            phone: '+1 (555) 987-6543',
            available: false,
            location: 'San Francisco, USA',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: 'AG-003',
            name: 'Emma Rodriguez',
            email: 'emma.r@example.com',
            phone: '+1 (555) 456-7890',
            available: true,
            location: 'Chicago, USA',
            image: 'https://randomuser.me/api/portraits/women/63.jpg'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-normal tracking-tighter text-gray-900 mb-8 ">Agent Management</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent) => (
                        <div key={agent.id} className="bg-white  border border-zinc-400 rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        className="h-16 w-16 rounded-full object-cover border-2 border-blue-100"
                                        src={agent.image}
                                        alt={agent.name}
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{agent.name}</h2>
                                        <p className="text-sm text-gray-500">ID: {agent.id}</p>
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
                                        <p className="text-gray-600">{agent.location}</p>
                                    </div>

                                    <div className="flex items-center">
                                        {agent.available ? (
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
                                        className={`w-full flex items-center justify-center px-4 py-2 rounded-md ${agent.available ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-400 cursor-not-allowed'} text-white font-medium transition-colors duration-300`}
                                        disabled={!agent.available}
                                    >
                                        <AssignIcon className="h-5 w-5 mr-2" />
                                        {agent.available ? 'Assign Agent' : 'Not Available'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Agent;
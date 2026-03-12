import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProjects } from '../data/mockProjects';
import { MapPin, Calendar, Clock, ChevronRight, Search, Filter, PlusCircle } from 'lucide-react';

const ProjectList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredProjects = mockProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'Delayed': return 'bg-red-100 text-red-800 border-red-200';
            case 'Planning': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto animation-fade-in mt-12">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Active Projects</h1>
                    <p className="text-slate-500 mt-1">Select a project to submit a daily progress report.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-slate-400" />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg w-full sm:w-48 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                        >
                            <option value="All">All Statuses</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Planning">Planning</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-lg">No projects found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                        className="mt-4 text-blue-600 font-medium hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
                        >
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className="text-slate-400 text-sm font-mono">#{project.id.split('-')[1]}</span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                                    {project.name}
                                </h3>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-sm text-slate-500">
                                        <MapPin className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
                                        <span className="truncate">{project.location}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Calendar className="h-4 w-4 mr-2 text-slate-400 shrink-0" />
                                        <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                                <button
                                    onClick={() => navigate(`/dpr/${project.id}`)}
                                    className="w-full flex items-center justify-center text-blue-600 font-semibold hover:text-blue-800 transition-colors py-2"
                                >
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                    Submit DPR
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectList;

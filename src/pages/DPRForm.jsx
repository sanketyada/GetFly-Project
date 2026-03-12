import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects } from '../data/mockProjects';
import { ArrowLeft, Image as ImageIcon, X, CheckCircle, UploadCloud } from 'lucide-react';

const DPRForm = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            projectId: projectId || '',
            date: new Date().toISOString().split('T')[0],
            weather: '',
            description: '',
            workerCount: ''
        }
    });

    const [photos, setPhotos] = useState([]);
    const [photoError, setPhotoError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);

        if (photos.length + files.length > 3) {
            setPhotoError('You can only upload up to 3 photos.');
            return;
        }

        setPhotoError('');

        const newPhotos = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7)
        }));

        setPhotos(prev => [...prev, ...newPhotos].slice(0, 3));
    };

    const removePhoto = (idToRemove) => {
        setPhotos(photos.filter(p => p.id !== idToRemove));
        if (photos.length <= 3) {
            setPhotoError('');
        }
    };

    const onSubmit = async (data) => {
        if (photos.length === 0) {
            setPhotoError('Please upload at least 1 photo.');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowToast(true);
            reset();
            setPhotos([]);

            // Redirect after showing toast
            setTimeout(() => {
                setShowToast(false);
                navigate('/projects');
            }, 2500);
        }, 1000);
    };

    return (
        <div className="w-full max-w-3xl mx-auto animation-fade-in pb-12 relative">

            {/* Success Toast */}
            {showToast && (
                <div className="fixed top-4 right-4 sm:top-20 sm:right-8 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center z-50 animate-[slide-in_0.3s_ease-out]">
                    <CheckCircle className="w-6 h-6 mr-3" />
                    <div className="font-semibold">DPR Submitted Successfully!</div>
                </div>
            )}

            <button
                onClick={() => navigate('/projects')}
                className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Daily Progress Report</h1>
                    <p className="text-slate-500 mt-1">Log today's site activities, workforce, and visual evidence.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Project Selection */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Project *</label>
                            <select
                                {...register("projectId", { required: "Please select a project" })}
                                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all ${errors.projectId ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'}`}
                            >
                                <option value="">-- Select a project --</option>
                                {mockProjects.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} - {p.location}</option>
                                ))}
                            </select>
                            {errors.projectId && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.projectId.message}</p>}
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Date *</label>
                            <input
                                type="date"
                                {...register("date", { required: "Date is required" })}
                                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all ${errors.date ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'}`}
                            />
                            {errors.date && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.date.message}</p>}
                        </div>

                        {/* Weather */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Weather Conditions *</label>
                            <select
                                {...register("weather", { required: "Weather condition is required" })}
                                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all ${errors.weather ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'}`}
                            >
                                <option value="">-- Select weather --</option>
                                <option value="Sunny">Sunny ☀️</option>
                                <option value="Cloudy">Cloudy ☁️</option>
                                <option value="Rainy">Rainy 🌧️</option>
                                <option value="Snowy">Snowy ❄️</option>
                                <option value="Windy">Windy 💨</option>
                            </select>
                            {errors.weather && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.weather.message}</p>}
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Work Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Work Description *</label>
                        <textarea
                            rows="4"
                            {...register("description", {
                                required: "Work description is required",
                                minLength: { value: 10, message: "Description must be at least 10 characters" }
                            })}
                            placeholder="Describe the tasks completed today..."
                            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all resize-none ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'}`}
                        ></textarea>
                        {errors.description && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.description.message}</p>}
                    </div>

                    {/* Worker Count */}
                    <div className="w-full md:w-1/2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Total Worker Count *</label>
                        <input
                            type="number"
                            min="0"
                            {...register("workerCount", {
                                required: "Worker count is required",
                                min: { value: 0, message: "Count cannot be negative" }
                            })}
                            placeholder="e.g. 15"
                            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all ${errors.workerCount ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'}`}
                        />
                        {errors.workerCount && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.workerCount.message}</p>}
                    </div>

                    <hr className="border-slate-100" />

                    {/* Photo Upload */}
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <label className="block text-sm font-semibold text-slate-700">Site Photos (1-3 images) *</label>
                            <span className="text-xs text-slate-500 font-medium">{photos.length} / 3 uploaded</span>
                        </div>

                        <div className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${photoError ? 'border-red-300 bg-red-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}>
                            <div className="space-y-2 text-center">
                                <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                                <div className="flex text-sm text-slate-600 justify-center">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2">
                                        <span>Upload files</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="sr-only"
                                            onChange={handlePhotoUpload}
                                            disabled={photos.length >= 3}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                        </div>
                        {photoError && <p className="mt-2 text-sm text-red-500 font-medium">{photoError}</p>}

                        {/* Photo Previews */}
                        {photos.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {photos.map((photo) => (
                                    <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-100">
                                        <img
                                            src={photo.preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removePhoto(photo.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
                                            aria-label="Remove photo"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg focus:ring-4 focus:ring-blue-200 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting Report...
                                </>
                            ) : (
                                'Submit Daily Progress Report'
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DPRForm;

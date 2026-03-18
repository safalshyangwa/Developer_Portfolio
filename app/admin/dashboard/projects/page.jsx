
'use client';

import { acheivementAPI } from '@/services/achievement.service';
import { projectAPI } from '@/services/project.service';
import { useState, useEffect } from 'react';

export default function PortfolioManager() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [portfolios, setPortfolios] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [objectUrl, setObjectUrl] = useState("");

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        image: ''
    });

    /* Handle input changes */
    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "image") {
            value = e.target.files?.[0];
            const url = URL.createObjectURL(value);
            setObjectUrl(url);
        }


        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    /* Reset form state */
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            techStack: '',
            image: ''
        });
        setObjectUrl("");
        setIsEditing(false);
        setShowForm(false);
        setErrors({});
    };

    /* Handle Create or Update */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            let requestPayload = new FormData();
            requestPayload.append("title", formData.title);
            requestPayload.append("description", formData.description);
            requestPayload.append("techStack", formData.techStack);

            if (typeof formData.image === "object") {
                requestPayload.append("image", formData.image);
            }

            if (isEditing) {
                await projectAPI.updatePortfolio(requestPayload, formData._id);
                alert("Portfolio updated successfully!");
            } else {
                await projectAPI.createPortfolio(requestPayload);
                alert("Portfolio created successfully!");
            }

            resetForm();
            fetchPortfolios();
        } catch (error) {
            alert("Operation failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    /* Prepare form for editing */
    const handleEdit = (portfolio) => {
        setFormData({
            title: portfolio.title || '',
            description: portfolio.description || '',
            techStack: portfolio.techStack || '',
            image: ''
        });

        if (portfolio.image) {
            setObjectUrl(`${API_URL}/uploads/${portfolio.image}`);
        }

        setIsEditing(true);
        setShowForm(true);
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fetch all portfolios
    const fetchPortfolios = async () => {
        try {
            const response = await projectAPI.getAllPortfolios();
            setPortfolios(response.data);
        } catch (error) {
            console.error("Failed to fetch portfolios:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await projectAPI.deletePortfolio(id);
            alert("Portfolio deleted successfully!");
            fetchPortfolios();
        } catch (error) {
            alert("Unable to delete portfolio: " + error);
        }
    };

    const handleDeleteConfirmation = (portfolio) => {
        if (window.confirm(`Are you sure you want to delete "${portfolio.title}"?`)) {
            handleDelete(portfolio._id);
        }
    };

    useEffect(() => {
        fetchPortfolios();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Available Portfolios</h3>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add New Portfolio
                    </button>
                )}
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-md font-semibold mb-4 text-gray-700">
                        {isEditing ? 'Edit Portfolio' : 'Create New Portfolio'}
                    </h4>
                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. AI Portfolio"
                                required
                            />
                            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Describe your portfolio"
                                required
                            />
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">techStack</label>
                            <input
                                name="techStack"
                                value={formData.techStack}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="AI, ML, React"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {objectUrl && <img src={objectUrl} alt="portfolio" className="mt-2 w-40 h-40 object-cover rounded" />}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {loading ? "Saving..." : isEditing ? "Update Portfolio" : "Save Portfolio"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Portfolio List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">techStack</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {portfolios?.map((portfolio) => (
                            <tr key={portfolio._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {portfolio.image && (
<img
  src={`http://localhost:8000/uploads/${portfolio.image}`}
  alt="portfolio"
  className="w-24 h-24 object-cover rounded"
/>
)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{portfolio.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{portfolio.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {
                                        portfolio.techStack?.map((tech, idx)=> {
                                              
                                            return <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mx-1">{tech}</span>
                                        }
                                        )}

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(portfolio)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                                    <button onClick={() => handleDeleteConfirmation(portfolio)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
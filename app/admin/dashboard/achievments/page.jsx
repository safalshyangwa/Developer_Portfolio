// // 



// 'use client';
// import { acheivementAPI } from '@/services/achievement.service';
// import { useState, useEffect } from 'react';

// export default function AchievementFrom() {

// const IMAGE_URL = process.env.IMAGE_URL

// const [profolios, setPortfolios] = useState([]);
// const [showForm, setShowForm] = useState(false);
// const [isEditing, setIsEditing] = useState(false);
// const [loading, setLoading] = useState(false);
// const [errors, setErrors] = useState({});
// const [objectUrl, setObjectUrl] = useState("")


// const [formData, setFormData] = useState({
// title: '',
// description: '',
// image: '',
// });


// /* Handle input change */

// const handleChange = (e) => {

// let { name, value } = e.target;

// if (name === "image") {
// value = e.target.files?.[0];
// const url = URL.createObjectURL(value);
// setObjectUrl(url)
// }

// setFormData(prev => ({ ...prev, [name]: value }));
// setErrors(prev => ({ ...prev, [name]: "" }))

// };


// /* Reset Form */

// const resetForm = () => {
// setFormData({ title: '', description: '', image: '' });
// setIsEditing(false);
// setShowForm(false);
// setObjectUrl("")
// };


// /* Submit */

// const handleSubmit = async (e) => {

// e.preventDefault();

// if (!validateForm()) return;

// setLoading(true);

// try {

// let requestPayload = new FormData()

// requestPayload.append("title", formData.title)
// requestPayload.append("description", formData.description)

// if (typeof formData.image === "object") {
// requestPayload.append("image", formData.image)
// }

// if (isEditing) {
// await acheivementAPI.updateachievement(requestPayload, formData._id);
// } else {
// await acheivementAPI.createachievment(requestPayload);
// }

// alert(`Achievement ${isEditing ? 'updated' : 'created'} successfully`);

// resetForm();
// fetchprofolios();

// } catch (error) {

// alert("Operation failed: " + error.message);

// } finally {

// setLoading(false);

// }

// };


// /* Edit */

// const handleEdit = (portfolio) => {

// setFormData(portfolio);

// if (portfolio.image) {
// setObjectUrl(`${IMAGE_URL}/uploads/${portfolio.image}`)
// }

// setIsEditing(true);
// setShowForm(true);

// };


// /* Validate */

// const validateForm = () => {

// const newErrors = {};

// if (!formData.title.trim()) {
// newErrors.title = 'Title is required';
// } else if (formData.title.length < 4) {
// newErrors.title = 'Title must be at least 4 characters';
// }

// if (!formData.description.trim()) {
// newErrors.description = 'Description is required';
// } else if (formData.description.length < 20) {
// newErrors.description = 'Description must be at least 20 characters';
// }

// setErrors(newErrors);
// return Object.keys(newErrors).length === 0;

// };


// /* Fetch */

// const fetchprofolios = async () => {

// try {

// const response = await acheivementAPI.getAllacheivement();
// setPortfolios(response);

// } catch (error) {

// console.error("Failed to fetch achievements:", error);

// }

// };


// /* Delete */

// const handleDelete = async (id) => {

// try {

// await acheivementAPI.deleteachievement(id)

// alert("Achievement deleted")

// fetchprofolios()

// } catch (error) {

// console.error("Delete error:", error)

// }

// };


// /* Confirm delete */

// const handleDeleteConfirmation = (service) => {

// window.confirm(`Are you sure you want to delete ${service.title}?`)
// && handleDelete(service._id)

// };


// useEffect(() => {
// fetchprofolios();
// }, [])



// return (

// <div className="p-8 bg-slate-50 min-h-screen space-y-8">

// {/* Header */}

// <div className="flex justify-between items-center">

// <h3 className="text-2xl font-bold text-slate-800">
// Achievements Dashboard
// </h3>

// {!showForm && (
// <button
// onClick={() => setShowForm(true)}
// className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
// >
// + Add Achievement
// </button>
// )}

// </div>


// {/* Form */}

// {showForm && (

// <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 max-w-xl">

// <h4 className="text-lg font-semibold mb-4 text-slate-700">
// {isEditing ? 'Edit Achievement' : 'Create Achievement'}
// </h4>

// <form onSubmit={handleSubmit} className="space-y-4 text-black">


// <div>

// <label className="block text-sm font-medium text-gray-700 mb-1">
// Title
// </label>

// <input
// name="title"
// value={formData.title}
// onChange={handleChange}
// className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// />

// {errors.title && (
// <p className="text-red-500 text-sm mt-1">{errors.title}</p>
// )}

// </div>


// <div>

// <label className="block text-sm font-medium text-gray-700 mb-1">
// Description
// </label>

// <textarea
// name="description"
// value={formData.description}
// onChange={handleChange}
// rows="3"
// className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
// />

// {errors.description && (
// <p className="text-red-500 text-sm mt-1">{errors.description}</p>
// )}

// </div>


// <div>

// <label className="block text-sm font-medium text-gray-700 mb-1">
// Achievement Image
// </label>

// <input
// type="file"
// name="image"
// onChange={handleChange}
// className="w-full border border-gray-300 rounded-lg px-3 py-2"
// />

// {objectUrl && (
// <img
// src={objectUrl}
// alt="preview"
// className="mt-3 w-32 h-32 rounded-lg object-cover border"
// />
// )}

// </div>


// <div className="flex justify-end gap-3 pt-3">

// <button
// type="button"
// onClick={resetForm}
// className="px-4 py-2 text-gray-600 hover:text-gray-900"
// >
// Cancel
// </button>

// <button
// type="submit"
// disabled={loading}
// className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
// >
// {loading ? 'Saving...' : isEditing ? 'Update Achievement' : 'Save Achievement'}
// </button>

// </div>

// </form>

// </div>

// )}


// {/* Achievement List */}

// <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

// {profolios.map((portfolio) => (

// <div
// key={portfolio._id}
// className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border"
// >

// {portfolio.image && (
// <img
// src={`${API_URL}/uploads/${portfolio.image}`}
// className="h-48 w-full object-cover"
// />
// )}

// <div className="p-4 space-y-2">

// <h4 className="text-lg font-semibold">
// {portfolio.title}
// </h4>

// <p className="text-gray-600 text-sm line-clamp-3">
// {portfolio.description}
// </p>

// <div className="flex justify-between pt-3">

// <button
// onClick={() => handleEdit(portfolio)}
// className="text-blue-600 hover:text-blue-800 text-sm"
// >
// Edit
// </button>

// <button
// onClick={() => handleDeleteConfirmation(portfolio)}
// className="text-red-600 hover:text-red-800 text-sm"
// >
// Delete
// </button>

// </div>

// </div>

// </div>

// ))}

// </div>

// </div>

// );

// }




'use client';
import toast from "react-hot-toast";

import { acheivementAPI } from '@/services/achievement.service';

import { useState, useEffect } from 'react';

export default function AchievmentManager() {
    const API_URL = process.env.NEXT_IMAGE_URL || 'http://localhost:8000';

    const [achievment, setachievments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [objectUrl, setObjectUrl] = useState("");

    const [formData, setFormData] = useState({
        title: '',
        description: '',
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
                await acheivementAPI.updateachievement(requestPayload, formData._id);
                toast.success("achievment updated successfully!");
            } else {
                await acheivementAPI.createachievment(requestPayload);
                toast.success("created successfully")
            }

            resetForm();
            fetchachievments();
        } catch (error) {
            alert("Operation failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    /* Prepare form for editing */
    const handleEdit = (achievment) => {
        setFormData({
            title: achievment.title || '',
            description: achievment.description || '',
       
            image: ''
        });

        if (achievment.image) {
            setObjectUrl(`${API_URL}/uploads/${achievment.image}`);
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

    // Fetch all achievments
    const fetchachievments = async () => {
        try {
            const response = await acheivementAPI.getAllacheivement();
            console.log(response)
            setachievments(response.message);
        } catch (error) {
            console.error("Failed to fetch achievments:", error);
        }
    };

 

const handleDelete = async (id) => {
  try {

    const promise = acheivementAPI.deleteachievement(id);

    toast.promise(promise, {
      loading: "Deleting achievement...",
      success: "Achievement deleted successfully!",
      error: "Unable to delete achievement",
    });

    await promise;

    fetchachievments();

  } catch (error) {
    console.error(error);
  }
};

const handleDeleteConfirmation = (achievement) => {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="text-sm">
        Are you sure you want to delete <b>{achievement.title}</b>?
      </p>

      <div className="flex gap-2 justify-end">
        <button
          className="px-3 py-1 text-sm bg-gray-200 rounded"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>

        <button
          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
          onClick={() => {
            handleDelete(achievement._id);
            toast.dismiss(t.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};
    useEffect(() => {
        fetchachievments();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Available Achievment</h3>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add New Achievment
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
                                placeholder="e.g. Hackathon"
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
                                placeholder="Describe your achievment"
                                required
                            />
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                        </div>

                       

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Achievment Image</label>
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
                                {loading ? "Saving..." : isEditing ? "Update achievment" : "Save achievment"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* achievment List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {achievment?.map((achievments) => (
                            <tr key={achievments._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {achievments.image && (
<img
  src={`${API_URL}/uploads/${achievments.image}`}
  alt="achievment"
  className="w-24 h-24 object-cover rounded"
/>
)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{achievments.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{achievments.description}</td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(achievments)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                                    <button onClick={() => handleDeleteConfirmation(achievments)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
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
        id:'',
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
            id:'',
            title: '',
            description: '',
        
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
            

            if (typeof formData.image === "object") {
                requestPayload.append("image", formData.image);
            }

            if (isEditing) {
                await acheivementAPI.updateachievement(requestPayload, formData.id);
                toast.success("achievment updated successfully!");
            } else {
                await acheivementAPI.createachievment(requestPayload);
                toast.success("created  achievment successfully")
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
          id: achievment._id,
          title: achievment.title || "",
          description: achievment.description || "",

          image: "",
        });

        if (achievment.image) {
            setObjectUrl(`http://localhost:8000/uploads/${achievment.image}`);
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
            
            setachievments(response.data);
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
          <h3 className="text-lg font-medium text-gray-900">
            Available Achievment
          </h3>
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
              {isEditing ? "Edit Portfolio" : "Create New Portfolio"}
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Hackathon"
                  required
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Describe your achievment"
                  required
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Achievment Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {objectUrl && (
                  <img
                    src={objectUrl}
                    alt="portfolio"
                    className="mt-2 w-40 h-40 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {loading
                    ? "Saving..."
                    : isEditing
                      ? "Update achievment"
                      : "Save achievment"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* achievment List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                  Thumbnail
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {achievment?.map((achievments) => (
                <tr key={achievments._id}>
                  <td className="px-4 py-3 text-sm text-gray-900 w-28">
                    {achievments.image && (
                      <img
                        src={`${API_URL}/uploads/${achievments.image}`}
                        alt="achievment"
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {achievments.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                    {achievments.description}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-right">
                    <button
                      onClick={() => handleEdit(achievments)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(achievments)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
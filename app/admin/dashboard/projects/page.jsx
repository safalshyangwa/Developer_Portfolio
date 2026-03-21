
'use client';

import { acheivementAPI } from '@/services/achievement.service';
import { projectAPI } from '@/services/project.service';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function PortfolioManager() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  

  const [portfolios, setPortfolios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [objectUrl, setObjectUrl] = useState("");

  const [formData, setFormData] = useState({
    
    id:"",
    title: "",
    description: "",
    techStack: "",
    image: "",
  });

  /* Handle input changes */
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "image") {
      value = e.target.files?.[0];
      const url = URL.createObjectURL(value);
      setObjectUrl(url);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* Reset form state */
  const resetForm = () => {
    setFormData({
      id:"",
      title: "",
      description: "",
      techStack: "",
      image: "",
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
        await projectAPI.updatePortfolio(requestPayload,formData.id);
        toast.success("Project updated successfully");
      } else {
        await projectAPI.createPortfolio(requestPayload);
        toast.success("Project created successfully");
      }

      resetForm();
      fetchPortfolios();
    } catch (error) {
      alert("Operation failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // /* Prepare form for editing */
  // const handleEdit = (portfolio) => {
  //     setFormData({
  //         title: portfolio.title || '',
  //         description: portfolio.description || '',
  //         techStack: portfolio.techStack || '',
  //         image: ''
  //     });

  //     if (portfolio.image) {
  //         setObjectUrl(`${API_URL}/uploads/${portfolio.image}`);
  //     }

  //     setIsEditing(true);
  //     setShowForm(true);
  // };
  /* Prepare form for editing */
  const handleEdit = (portfolio) => {
    setFormData({
      // store the ID for updating
      id:portfolio._id,
      title: portfolio.title || "",
      description: portfolio.description || "",
      techStack: Array.isArray(portfolio.techStack)
        ? portfolio.techStack.join(",")
        : portfolio.techStack || "",
      image: "", // reset file input
    });

    if (portfolio.image) {
      setObjectUrl(`http://localhost:8000/uploads/${portfolio.image}`);
    }

    setIsEditing(true);
    setShowForm(true);
  };
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
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
    const loadingToast = toast.loading("Deleting portfolio...");

    try {
      await projectAPI.deletePortfolio(id);

      toast.dismiss(loadingToast);

      fetchPortfolios();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Unable to delete portfolio");

      console.error(error);
    }
  };

  const handleDeleteConfirmation = (portfolio) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm">
          Are you sure you want to delete{" "}
          <span className="font-semibold">"{portfolio.title}"</span>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm rounded bg-gray-600 text-white"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleDelete(portfolio._id);
              toast.dismiss(t.id);
              toast.success("Deleted successfully");
            }}
            className="px-3 py-1 text-sm rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Available Project</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add New Project
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="text-md font-semibold mb-4 text-gray-700">
            {isEditing ? "Edit Project" : "Create New Project"}
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
                placeholder="e.g. AI Portfolio"
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
                placeholder="Describe your portfolio"
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
                techStack
              </label>
              <input
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="AI, ML, React"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image
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
                    ? "Update Project"
                    : "Save Project"}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                techStack
              </th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {portfolio.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                  {portfolio.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {portfolio.techStack?.map((tech, idx) => {
                    return (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mx-1"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(portfolio)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(portfolio)}
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
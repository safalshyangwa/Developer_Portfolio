
'use client';



import { blogAPI } from '@/services/blog.service';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function BlogManager() {
  

    const [blogs, setBlogs] = useState([]);
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



 const handleSubmit = async (e) => {
   e.preventDefault();
   console.log(formData)

   if (!validateForm()) return;

   const toastId = toast.loading(
     isEditing ? "Updating blog..." : "Creating blog...",
   );

   setLoading(true);

   try {
     const requestPayload = new FormData();
     requestPayload.append("title", formData.title);
     requestPayload.append("description", formData.description);

     if (typeof formData.image === "object") {
       requestPayload.append("image", formData.image);
     }

     if (isEditing) {
       console.log(formData.id)
       await blogAPI.updateblog(requestPayload, formData.id);
       toast.success("Blog updated successfully ", { id: toastId });
     } else {
       await blogAPI.createblog(requestPayload);
       toast.success("Blog created successfully ", { id: toastId });
     }

     resetForm();
     fetchblogs();
   } catch (error) {
     toast.error(
       error?.response?.data?.message ||
         error.message ||
         "Something went wrong ",
       { id: toastId },
     );
   } finally {
     setLoading(false);
   }
 };

    
    
    
    
    
    
    
    
    /* Prepare form for editing */

   const handleEdit = (blog) => {
     if (!blog) {
       toast.error("Invalid blog data ");
       return;
     }
   
   
     setFormData({
       id:blog._id,
       title: blog.title || "",
       description: blog.description || "",
       image: "",
     });

     if (blog.image) {
       setObjectUrl(`http://localhost:8000/uploads/${blog.image}`);
     } else {
       setObjectUrl(null);
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
    const fetchblogs = async () => {
        try {
            const response = await blogAPI.getAllblogs();
            setBlogs(response.data);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    };

const handleDelete = async (id) => {
  const toastId = toast.loading("Deleting blog... ");

  try {
    await blogAPI.deleteblog(id);

    toast.success("Blog deleted successfully ", { id: toastId });

    fetchblogs();
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message || "Failed to delete ",
      { id: toastId },
    );
  }
};

    const handleDeleteConfirmation = (blog) => {
      toast.custom((t) => (
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-700 w-[300px]">
          <p className="text-sm mb-3">
            Delete{" "}
            <span className="font-semibold text-red-400">"{blog.title}"</span>?
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm bg-slate-700 rounded hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                handleDelete(blog._id);
                toast.dismiss(t.id);
             
              }}
              className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ));
    };

    useEffect(() => {
        fetchblogs();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Available Blogs</h3>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add New Blog
                    </button>
                )}
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-md font-semibold mb-4 text-gray-700">
                        {isEditing ? 'Edit Blog' : 'Create New Blog'}
                    </h4>
                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. AI BOOM"
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
                                placeholder="Describe your Blog"
                                required
                            />
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                        </div>

                      
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Image</label>
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
                                {loading ? "Saving..." : isEditing ? "Update Blog" : "Save Blog"}
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

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(blogs) && blogs.map((blog) => (
                            
                            <tr key={blog._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {blog.image && (
<img
  src={`http://localhost:8000/uploads/${blog.image}`}
  alt="blog"
  className="w-24 h-24 object-cover rounded"
/>
)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{blog.description}</td>
                              
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                                    <button onClick={() => handleDeleteConfirmation(blog)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
// 



'use client';
import { acheivementAPI } from '@/services/achievement.service';
import { useState, useEffect } from 'react';

export default function AchievementFrom() {

const API_URL = process.env.NEXT_PUBLIC_API_URL

const [profolios, setPortfolios] = useState([]);
const [showForm, setShowForm] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});
const [objectUrl, setObjectUrl] = useState("")

const [formData, setFormData] = useState({
title: '',
description: '',
image: '',
});


/* Handle input change */

const handleChange = (e) => {

let { name, value } = e.target;

if (name === "image") {
value = e.target.files?.[0];
const url = URL.createObjectURL(value);
setObjectUrl(url)
}

setFormData(prev => ({ ...prev, [name]: value }));
setErrors(prev => ({ ...prev, [name]: "" }))

};


/* Reset Form */

const resetForm = () => {
setFormData({ title: '', description: '', image: '' });
setIsEditing(false);
setShowForm(false);
setObjectUrl("")
};


/* Submit */

const handleSubmit = async (e) => {

e.preventDefault();

if (!validateForm()) return;

setLoading(true);

try {

let requestPayload = new FormData()

requestPayload.append("title", formData.title)
requestPayload.append("description", formData.description)

if (typeof formData.image === "object") {
requestPayload.append("thumbnail", formData.image)
}

if (isEditing) {
await acheivementAPI.updateachievement(requestPayload, formData._id);
} else {
await acheivementAPI.createachievment(requestPayload);
}

alert(`Achievement ${isEditing ? 'updated' : 'created'} successfully`);

resetForm();
fetchprofolios();

} catch (error) {

alert("Operation failed: " + error.message);

} finally {

setLoading(false);

}

};


/* Edit */

const handleEdit = (portfolio) => {

setFormData(portfolio);

if (portfolio.image) {
setObjectUrl(`${API_URL}/uploads/${portfolio.image}`)
}

setIsEditing(true);
setShowForm(true);

};


/* Validate */

const validateForm = () => {

const newErrors = {};

if (!formData.title.trim()) {
newErrors.title = 'Title is required';
} else if (formData.title.length < 4) {
newErrors.title = 'Title must be at least 4 characters';
}

if (!formData.description.trim()) {
newErrors.description = 'Description is required';
} else if (formData.description.length < 20) {
newErrors.description = 'Description must be at least 20 characters';
}

setErrors(newErrors);
return Object.keys(newErrors).length === 0;

};


/* Fetch */

const fetchprofolios = async () => {

try {

const response = await acheivementAPI.getAllAchievement();
setPortfolios(response);

} catch (error) {

console.error("Failed to fetch achievements:", error);

}

};


/* Delete */

const handleDelete = async (id) => {

try {

await acheivementAPI.deleteAchievement(id)

alert("Achievement deleted")

fetchprofolios()

} catch (error) {

console.error("Delete error:", error)

}

};


/* Confirm delete */

const handleDeleteConfirmation = (service) => {

window.confirm(`Are you sure you want to delete ${service.title}?`)
&& handleDelete(service._id)

};


useEffect(() => {
fetchprofolios();
}, [])



return (

<div className="p-8 bg-slate-50 min-h-screen space-y-8">

{/* Header */}

<div className="flex justify-between items-center">

<h3 className="text-2xl font-bold text-slate-800">
Achievements Dashboard
</h3>

{!showForm && (
<button
onClick={() => setShowForm(true)}
className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
>
+ Add Achievement
</button>
)}

</div>


{/* Form */}

{showForm && (

<div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 max-w-xl">

<h4 className="text-lg font-semibold mb-4 text-slate-700">
{isEditing ? 'Edit Achievement' : 'Create Achievement'}
</h4>

<form onSubmit={handleSubmit} className="space-y-4">


<div>

<label className="block text-sm font-medium text-gray-700 mb-1">
Title
</label>

<input
name="title"
value={formData.title}
onChange={handleChange}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>

{errors.title && (
<p className="text-red-500 text-sm mt-1">{errors.title}</p>
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
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
/>

{errors.description && (
<p className="text-red-500 text-sm mt-1">{errors.description}</p>
)}

</div>


<div>

<label className="block text-sm font-medium text-gray-700 mb-1">
Achievement Image
</label>

<input
type="file"
name="image"
onChange={handleChange}
className="w-full border border-gray-300 rounded-lg px-3 py-2"
/>

{objectUrl && (
<img
src={objectUrl}
alt="preview"
className="mt-3 w-32 h-32 rounded-lg object-cover border"
/>
)}

</div>


<div className="flex justify-end gap-3 pt-3">

<button
type="button"
onClick={resetForm}
className="px-4 py-2 text-gray-600 hover:text-gray-900"
>
Cancel
</button>

<button
type="submit"
disabled={loading}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
>
{loading ? 'Saving...' : isEditing ? 'Update Achievement' : 'Save Achievement'}
</button>

</div>

</form>

</div>

)}


{/* Achievement List */}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{profolios.map((portfolio) => (

<div
key={portfolio._id}
className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border"
>

{portfolio.image && (
<img
src={`${API_URL}/uploads/${portfolio.image}`}
className="h-48 w-full object-cover"
/>
)}

<div className="p-4 space-y-2">

<h4 className="text-lg font-semibold">
{portfolio.title}
</h4>

<p className="text-gray-600 text-sm line-clamp-3">
{portfolio.description}
</p>

<div className="flex justify-between pt-3">

<button
onClick={() => handleEdit(portfolio)}
className="text-blue-600 hover:text-blue-800 text-sm"
>
Edit
</button>

<button
onClick={() => handleDeleteConfirmation(portfolio)}
className="text-red-600 hover:text-red-800 text-sm"
>
Delete
</button>

</div>

</div>

</div>

))}

</div>

</div>

);

}
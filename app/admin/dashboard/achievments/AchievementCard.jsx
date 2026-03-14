"use client"

export default function AchievementCard({
  portfolio,
  API_URL,
  handleEdit,
  handleDeleteConfirmation
}) {

return(

<div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300">

{/* Image */}

<div className="h-44 bg-gray-100 overflow-hidden flex items-center justify-center">

{portfolio.image && (

<img
src={`${API_URL}/uploads/${portfolio.image}`}
alt={portfolio.title}
className="w-full h-full object-cover hover:scale-105 transition duration-300"
/>

)}

</div>


{/* Content */}

<div className="p-5 space-y-3">

<h3 className="text-lg font-semibold text-gray-800">
{portfolio.title}
</h3>

<p className="text-sm text-gray-600 line-clamp-3">
{portfolio.description}
</p>


{/* Tags */}

<div className="flex flex-wrap gap-2">

{portfolio.tags && portfolio.tags.split(",").map((tag,index)=>(
<span
key={index}
className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
>
{tag}
</span>
))}

</div>


{/* Actions */}

<div className="flex justify-between pt-3">

<button
onClick={()=>handleEdit(portfolio)}
className="text-blue-600 hover:text-blue-800 font-medium text-sm"
>
Edit
</button>

<button
onClick={()=>handleDeleteConfirmation(portfolio)}
className="text-red-600 hover:text-red-800 font-medium text-sm"
>
Delete
</button>

</div>

</div>

</div>

)

}
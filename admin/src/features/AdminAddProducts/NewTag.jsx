import React, { useState } from "react";

const NewTag = ({formData,setFormData}) => {
    const availableTags = ["winter", "summer", "yearend", "offer", "new"];
    // const [formData, setFormData] = useState({ tags: [] });
    const [showToast, setShowToast] = useState(false);
    const handleTagClick = (tag) => {
      if (formData?.tags?.includes(tag)) {
        setFormData((prev) => ({
          ...prev,
          tags: prev?.tags?.filter((t) => t !== tag),
        }));
      } else if (formData?.tags?.length < 3) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev?.tags || []), tag],
        }));
      } else {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    };
  
    const handleRemoveTag = (tag) => {
      setFormData((prev) => ({
        ...prev,
        tags: prev?.tags?.filter((t) => t !== tag),
      }));
    };
  
  return (
    <div className="   ">
    <h2 className="text-sm mt-2 mb-4 font-semibold text-gray-700">Select Tags (Max: 3)</h2>
    <div className="flex flex-wrap gap-2">
      {availableTags?.map((tag) => (
        <button
          key={tag}
          className={`px-4  text-xs capitalize rounded-md border py-1 font-medium transition-all 
          ${formData?.tags?.includes(tag) ? 
            "bg-blue-500 text-white border-blue-500" : 
            "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"}
          ${formData?.tags?.length === 3 && !formData?.tags?.includes(tag) ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handleTagClick(tag)}
          disabled={formData?.tags?.length === 3 && !formData?.tags?.includes(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
    <div className="mt-4">
      <h3 className="text-sm  text-gray-700">Selected Tags:</h3>
      <div className="mt-2 text-gray-600 flex flex-wrap gap-2">
        {formData?.tags?.length > 0 ? (
          formData?.tags?.map((tag) => (
            <div
              key={tag}
              className="flex items-center  px-3 py-[2px] bg-blue-100 text-blue-700 rounded text-sm font-medium mr-2"
            >
              {tag}
              <button
                className="ml-2 mb-1 text-blue-700 hover:text-blue-900 focus:outline-none"
                onClick={() => handleRemoveTag(tag)}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <span className= " text-xs text-gray-500">No tags selected</span>
        )}
      </div>
    </div>
    {showToast && (
      <div className="mt-4 p-2 bg-red-500 text-white text-sm rounded-md shadow-md">
        You can only select up to 3 tags!
      </div>
    )}
  </div>
  );
};

export default NewTag;

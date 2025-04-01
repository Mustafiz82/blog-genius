import { useState, useEffect } from "react";
import Input from "../common/Input";

export default function Details({ blogData, setBlogData }) {
  const [author, setAuthor] = useState(blogData?.authorName || "");
  const [category, setCategory] = useState(blogData?.category || "");
  const [tags, setTags] = useState(blogData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const categories = ["Technology", "Travel", "Food", "Lifestyle", "Business"];

  // Sync state with blogData when it changes
  useEffect(() => {
    setAuthor(blogData?.authorName || "");
    setCategory(blogData?.category || "");
    setTags(blogData?.tags || []);
  }, [blogData]);

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      const updatedTags = [...tags, tagInput.trim()];
      setTags(updatedTags);
      setBlogData((prev) => ({ ...prev, tags: updatedTags }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setBlogData((prev) => ({ ...prev, tags: updatedTags }));
  };

  return (
    <div className="p-6 mt-20 bg-white/80 shadow-sm mx-auto rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Blog Details</h2>

      {/* Author Name */}
      <label className="block mb-2 text-gray-600">Author Name</label>
      <input
        type="text"
        className="w-full bg-transparent p-2 focus:outline-0 border rounded"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
          setBlogData((prev) => ({ ...prev, authorName: e.target.value }));
        }}
        placeholder="Enter author name"
      />


      {/* Category */}
      <label className="block mt-4 mb-2 text-gray-600">Category</label>
      <select
        className="w-full bg-transparent p-2 border rounded"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setBlogData((prev) => ({ ...prev, category: e.target.value }));
        }}
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Tags */}
      <label className="block mt-4 mb-2 text-gray-600">Tags</label>
      <div className="flex flex-wrap gap-2 border p-2 rounded">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
            {tag} <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-red-500">×</button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 p-1 outline-none"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Press Enter to add tags"
        />
      </div>

      {/* Prev Button */}
    
    </div>
  );
}

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function ThumbnailUploader({setBlogData}) {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handlePaste = (event) => {
      const clipboardItems = event.clipboardData.items;
      for (let item of clipboardItems) {
        if (item.type.startsWith("image")) {
          const file = item.getAsFile();
          previewImage(file);
          setBlogData(prev => ({
            ...prev,
            thumbnail: file
        }));
          break;
        }
      }
    };
    
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      previewImage(file);
      setBlogData(prev => ({
        ...prev,
        thumbnail: file
    }));
     
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      previewImage(file);
      setBlogData(prev => ({
        ...prev,
        thumbnail: file
    }));
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="border-2 mt-20 h-[300px] w-full my-10 flex justify-center items-center border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-white/30 duration-300"
      onClick={() => fileInputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {image ? (
        <img src={image} alt="Thumbnail" className="h-full w-auto rounded-lg" />
      ) : (
        <div className="flex flex-col justify-center items-center">
            <Image alt="thumbnail" src={"/images/image-icon.png"}
            className="w-[100px] h-[100px] object-cover opacity-65"
             width={500} height={500} />
            <p className="text-gray-500">Click, drag & drop, or paste an image here</p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
}

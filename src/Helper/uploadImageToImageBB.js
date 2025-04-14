// /// utils/uploadImageToImageBB.js
// import axios from "axios";

// const uploadImageToImageBB = async (file) => {
//   const imageBBUrl = process.env.NEXT_PUBLIC_IMAGEBB_URL;

//   // If it's already a hosted URL or not a valid object/image string, return as-is
//   if (!file || typeof file === "string" && !file.startsWith("data:image/")) {
//     return file;
//   }

//   try {
//     const formData = new FormData();

//     if (typeof file === "object") {
//       formData.append("image", file);
//     } else if (typeof file === "string" && file.startsWith("data:image/")) {
//       formData.append("image", file.replace(/^data:image\/\w+;base64,/, ""));
//     }

//     const res = await axios.post(imageBBUrl, formData, {
//       headers: { "content-type": "multipart/form-data" },
//     });

//     return res?.data?.data?.display_url || "";
//   } catch (error) {
//     console.error("Error uploading image to ImageBB:", error);
//     throw new Error("Image upload failed");
//   }
// };

// export default uploadImageToImageBB;




/// utils/uploadImageToCloudinary.js
import axios from "axios";

const uploadImageToImageBB = async (file) => {
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/danjjdo1b/image/upload";
  const UPLOAD_PRESET = "blog_genius_ai";

  // If already a hosted URL or not a valid image, return as-is
  if (!file || (typeof file === "string" && !file.startsWith("data:image/"))) {
    return file;
  }

  try {
    const formData = new FormData();
    if (typeof file === "object") {
      formData.append("file", file);
    } else if (typeof file === "string" && file.startsWith("data:image/")) {
      // Convert base64 to raw string
      const blob = await fetch(file).then((r) => r.blob());
      formData.append("file", blob);
    }

    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res?.data?.secure_url || "";
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};

export default uploadImageToImageBB;

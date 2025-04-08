/// utils/uploadImageToImageBB.js
import axios from "axios";

const uploadImageToImageBB = async (file) => {
  const imageBBUrl = process.env.NEXT_PUBLIC_IMAGEBB_URL;

  // If it's already a hosted URL or not a valid object/image string, return as-is
  if (!file || typeof file === "string" && !file.startsWith("data:image/")) {
    return file;
  }

  try {
    const formData = new FormData();

    if (typeof file === "object") {
      formData.append("image", file);
    } else if (typeof file === "string" && file.startsWith("data:image/")) {
      formData.append("image", file.replace(/^data:image\/\w+;base64,/, ""));
    }

    const res = await axios.post(imageBBUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    return res?.data?.data?.display_url || "";
  } catch (error) {
    console.error("Error uploading image to ImageBB:", error);
    throw new Error("Image upload failed");
  }
};

export default uploadImageToImageBB;


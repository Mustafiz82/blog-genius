// utils/updateBlog.js
import Swal from "sweetalert2";
import blogService from "@/Service";
import uploadImageToImageBB from "./uploadImageToImageBB";

const updateBlog = async ({ BlogData, setLoading }) => {
  setLoading(true);

  try {
    const imageUrl = await uploadImageToImageBB(BlogData.thumbnail);

    const updatedBlogData = {
      ...BlogData,
      thumbnail: imageUrl,
    };

    const res = await blogService.updateBlogs(BlogData?._id, updatedBlogData);

    if (res?.data) {
      Swal.fire({
        title: 'Success!',
        text: 'Your blog has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'View Blog',
        confirmButtonColor: '#8e67e6',
      }).then((result) => {
        sessionStorage.setItem("justPublishedOrUpdatedBlog", "true");
        if (result.isConfirmed) {
          window.location.href = `/blogs/${BlogData?._id}`;
        }
      });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong while updating your blog.',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#e74c3c',
    });
  } finally {
    setLoading(false);
  }
};

export default updateBlog;

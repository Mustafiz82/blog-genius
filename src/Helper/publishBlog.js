// utils/publishBlog.js
import Swal from "sweetalert2";
import uploadImageToImageBB from "./uploadImageToImageBB";
import blogService from "@/Service";

const publishBlog = async ({ BlogData, sessionUser, setLoading }) => {
  setLoading(true);

  try {
    const imageUrl = await uploadImageToImageBB(BlogData.thumbnail);

    const finalBlogData = {
      ...BlogData,
      id: BlogData.id || `blog_${Date.now()}`,
      thumbnail: imageUrl,
      authorName: BlogData.authorName || sessionUser?.name || "",
      authorEmail: BlogData.authorEmail || sessionUser?.email || "",
    };

    const res = await blogService.postBlogs(finalBlogData);

    if (res?.data) {
      Swal.fire({
        title: 'Success!',
        text: 'Your blog has been published successfully.',
        icon: 'success',
        confirmButtonText: 'View Blog',
        confirmButtonColor: '#8e67e6',
      }).then((result) => {

        sessionStorage.setItem("justPublishedOrUpdatedBlog", "true");
        if (result.isConfirmed) {
          window.location.href = `/blogs/category/${BlogData?.category}`;
        }
        else {
          window.location.reload();
        }
      });
    }
  } catch (err) {
    console.error("Error publishing blog:", err);
    Swal.fire({
      title: 'Oops!',
      text: 'There was an error publishing your blog.',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#8e67e6',
    });
  } finally {
    setLoading(false);
  }
};

export default publishBlog;

import httpClient from "./httpClient";

const blogService = {
    postBlogs: (formData) => httpClient.post(`/blogs`, formData),
};


export default blogService  
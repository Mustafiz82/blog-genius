import httpClient from "./httpClient";

const blogService = {
    postBlogs: (formData) => httpClient.post(`/blogs`, formData),
    getLatestBlogs : () => httpClient.get("/blogs/latest"),
    getPopularBlog : () => httpClient.get("/blogs/popular"),
    getBlogByCategory : (category , page ) => httpClient.get(`/blogs/category?category=${category}&page=${page || 1}&limit=10`),
    getBlogs: (formData) => httpClient.post(`/blogs`, formData),
};


export default blogService  ;


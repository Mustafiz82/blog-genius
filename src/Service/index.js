import httpClient from "./httpClient";

const blogService = {
    postBlogs: (formData) => httpClient.post(`/blogs`, formData),
    getLatestBlogs : () => httpClient.get("/blogs/latest"),
    getPopularBlog : () => httpClient.get("/blogs/popular"),
    getBlogByCategory : (category , page ) => httpClient.get(`/blogs/category?category=${category}&page=${page || 1}&limit=10`),
    getBlogs: (formData) => httpClient.post(`/blogs/fetch`, formData),
    getSingleBlogs: (id) =>  httpClient.get(`/blogs/${id}`),
    searchBlogs : (query) =>  httpClient.post(`/blogs/search` ,query),
    getMyBlogs : (email) =>  httpClient.post(`/blogs/my-blogs` ,email),
    updateBlogs : (id , formData ) => httpClient.put(`/blogs/${id}` , formData)
};


export default blogService  ;    


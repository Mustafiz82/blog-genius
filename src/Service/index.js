import httpClient from "./httpClient";

const blogService = {
    postBlogs: (formData) => httpClient.post(`/blogs`, formData),
    getLatestBlogs : () => httpClient.get("/blogs/latest"),
    getFeaturedBlogs : () => httpClient.get("/blogs/featured"),
    getPopularBlog : () => httpClient.get("/blogs/popular"),
    getBlogByCategory : (category , page ) => httpClient.get(`/blogs/category?category=${category}&page=${page || 1}&limit=10`),
    getBlogs: (formData) => httpClient.post(`/blogs/fetch`, formData),
    getSingleBlogs: (id) =>  httpClient.get(`/blogs/${id}`),
    searchBlogs : (query) =>  httpClient.post(`/blogs/search` ,query),
    getMyBlogs : (email) =>  httpClient.post(`/blogs/my-blogs` ,email),
    updateBlogs : (id , formData ) => httpClient.put(`/blogs/${id}` , formData),
    deleteBlogs : (id) => httpClient.delete(`/blogs/${id}`),
    patchReact : (id , email ) => httpClient.patch(`/blogs/react/${id}` , email),
    getReactStatus : (formData) => httpClient.post("/blog/react-status" , formData)
};


export default blogService  ;    


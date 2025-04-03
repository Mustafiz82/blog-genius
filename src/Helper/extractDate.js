export  function getBlogCreationDate(blogId) {
        const timestamp = parseInt(blogId?.split('_')[1]);
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
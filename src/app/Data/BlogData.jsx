export const blogs = [
    {
      image: "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=2071&auto=format&fit=crop",
      title: "Discover the Hidden Gems of the World",
      author: "John Doe",
      date: "March 5, 2025",
      tags: ["travel", "adventure"],
      description: "Embark on a journey to uncover the world's best-kept secrets. From secluded beaches to ancient ruins, explore the extraordinary destinations that most travelers miss.Embark on a journey to uncover the world's best-kept secrets. From secluded beaches to ancient ruins, explore the extraordinary destinations that most travelers missEmbark on a journey to uncover the world's best-kept secrets. From secluded beaches to ancient ruins, explore the extraordinary destinations that most travelers miss",
      category: "Travel" // Added category
    },
    {
      image: "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=2070&auto=format&fit=crop",
      title: "The Art of Solo Traveling",
      author: "Sarah Johnson",
      date: "April 10, 2025",
      tags: ["solotravel", "explore"],
      description: "Delve into the liberating experience of solo travel. Learn how to navigate new cultures, build self-reliance, and create unforgettable memories on your own.",
      category: "Travel" // Added category
    },
    {
      image: "https://images.unsplash.com/photo-1719749990914-a3ba54e6343f?q=80&w=2072&auto=format&fit=crop",
      title: "Why Traveling is the Best Education",
      author: "Emily Carter",
      date: "May 20, 2025",
      tags: ["learning", "culture"],
      description: "Discover how traveling can expand your horizons and provide invaluable life lessons. Experience firsthand the diverse cultures, histories, and perspectives that shape our world.",
      category: "Education" // Added category
    },

    
  ];




  export const blogdetail = {
    id: "blog_1743426078298",
    title: "all types of editorjs blocks example",
    blog: {
        time: 1716844800000,
        version: "2.28.0",
        blocks: [
            {
                type: "header",
                data: {
                    text: "All Types of Editor.js Blocks Example",
                    level: 2
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "Editor.js is a <b>block-style</b> editor that supports various content types. Below is a comprehensive example of all available blocks, including formatting like <i>italic</i>, <u>underline</u>, and <b><i>combined styles</i></b>."
                }
            },
            {
                type: "header",
                data: {
                    text: "1. Paragraph Block",
                    level: 3
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "This is a standard paragraph block. You can format text with <b>bold</b>, <i>italic</i>, <u>underline</u>, and even <a href='https://editorjs.io/'>hyperlinks</a>."
                }
            },
            {
                type: "header",
                data: {
                    text: "2. Header Block",
                    level: 3
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "Headers help structure content. Editor.js supports <b>H1 to H6</b>."
                }
            },
            {
                type: "header",
                data: {
                    text: "3. List Block",
                    level: 3
                }
            },
            {
                type: "list",
                data: {
                    style: "unordered",
                    items: [
                        "Unordered list item 1",
                        "Unordered list item 2",
                        "Nested lists are also supported"
                    ]
                }
            },
            {
                type: "list",
                data: {
                    style: "ordered",
                    items: [
                        "Ordered list item 1",
                        "Ordered list item 2"
                    ]
                }
            },
            {
                type: "header",
                data: {
                    text: "4. Code Block",
                    level: 3
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "Use code blocks for programming-related content:"
                }
            },
            {
                type: "code",
                data: {
                    code: "console.log('Hello, Editor.js!');\nconst example = true;\nif (example) {\n  return 'Code formatting works!';\n}"
                }
            },
            {
                type: "header",
                data: {
                    text: "5. Quote Block",
                    level: 3
                }
            },
            {
                type: "quote",
                data: {
                    text: "Editor.js simplifies content creation with its modular approach.",
                    caption: "Anonymous Developer",
                    alignment: "left"
                }
            },
            {
                type: "header",
                data: {
                    text: "6. Table Block",
                    level: 3
                }
            },
            {
                type: "table",
                data: {
                    content: [
                        ["Block Type", "Usage"],
                        ["Paragraph", "General text"],
                        ["Header", "Titles & subtitles"],
                        ["Code", "Programming snippets"]
                    ]
                }
            },
            {
                type: "header",
                data: {
                    text: "7. Delimiter Block",
                    level: 3
                }
            },
            {
                type: "delimiter",
                data: {}
            },
            {
                type: "paragraph",
                data: {
                    text: "Use delimiters to separate sections visually."
                }
            },
            {
                type: "header",
                data: {
                    text: "8. Image Block",
                    level: 3
                }
            },
            {
                type: "image",
                data: {
                    file: {
                        url: "https://example.com/image.jpg"
                    },
                    caption: "Example image with caption",
                    withBorder: false,
                    stretched: false,
                    withBackground: false
                }
            },
            {
                type: "header",
                data: {
                    text: "9. Warning Block",
                    level: 3
                }
            },
            {
                type: "warning",
                data: {
                    title: "Note",
                    message: "Warning blocks highlight important notes or disclaimers."
                }
            },
            {
                type: "header",
                data: {
                    text: "10. Embed Block",
                    level: 3
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "Embed external content like YouTube videos or tweets."
                }
            },
            {
                type: "embed",
                data: {
                    service: "youtube",
                    source: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    width: 580,
                    height: 320,
                    caption: "Example YouTube Embed"
                }
            },
            {
                type: "header",
                data: {
                    text: "Conclusion",
                    level: 3
                }
            },
            {
                type: "paragraph",
                data: {
                    text: "Editor.js provides a <b>flexible</b> and <i>user-friendly</i> way to create structured content. Experiment with these blocks to enhance your writing!"
                }
            },
            {
                type: "quote",
                data: {
                    text: "The right tools make all the difference in content creation.",
                    caption: "Tech Enthusiast",
                    alignment: "left"
                }
            }
        ]
    },
    thumbnail: "https://images.unsplash.com/photo-1742077414023-45a81fd63736?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    category: "Technology",
    tags: ["d"],
    authorName: "mustafiz"
};


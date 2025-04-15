# ✨Blog Genius AI

**Blog Genius AI** is an intelligent blog generation platform powered by cutting-edge AI technology. Built with Next.js, it allows users to effortlessly generate blog titles, thumbnails, and descriptions. Users can also manage their blog content by editing, deleting, and reading posts manually, providing full control over the blog creation process.

---
## 🚀 Features

- **AI-Powered Blog Creation**: Generate blog titles, descriptions, and thumbnails using AI.

- **Rich-Text Editor**: Use **Editor.js** (soon to be replaced with a WYSIWYG editor).
- **Blog Management**: Write, edit, and manage posts with options to publish or delete.
- **Authentication**: Login via **NextAuth.js** with Google, GitHub, and LinkedIn.
- **Responsive UI/UX**: Clean and mobile-friendly design.
- **Fast Performance**: Static Site Generation (SSG) with on-demand revalidation for quick updates.
- **User Engagement**: Users can share and react to blog posts.
- **Advanced Search**: Search blog content even with minor spelling mistakes.

---

## 📦 Technologies Used

- **Framework**: [Next.js 15+](https://nextjs.org)

- **Styling**: [Tailwind CSS 3](https://tailwindcss.com)
- **AI Integration**:
  - [Together AI](https://github.com/togethercomputer/together-ai) (`Flux-free`)
  - [OpenRouter](https://openrouter.ai) _(`Gemini-flash`)_ 
- **Editor**: [Editor.js](https://editorjs.io) (planned replacement with WYSIWYG)
- **Authentication**: [`next-auth`](https://next-auth.js.org)

### 🛠 Backend
- Built with **Node.js**, **Express**, and **MongoDB**

- 🔗 [Backend GitHub Repository](https://github.com/Mustafiz82/blog-genius-backend)



## 🚀 Future Goals

- **WYSIWYG Editor**: Replace Editor.js with a WYSIWYG editor for a more intuitive writing experience.

- **AI Markdown Response**: Receive AI-generated content in markdown format instead of Editor.js format.
- **AI Word-by-Word Buffer**: Implement a feature where the AI responds word-by-word or in small chunks for better flow and control.
- **Image Upload Option**: Add an option for uploading and inserting images directly within the blog or editor.
- **AI Blog Features**:

  - **Blog Summary**: Generate concise blog summaries.
  
  - **Better Writing Suggestions**: Provide AI-driven suggestions to enhance writing quality.
  - **Continue Writing**: Enable AI to continue writing from where the user left off.
  - **Spelling & Grammar Check**: Integrate AI-powered spelling and grammar correction.
  - **Listen to Blog**: Implement text-to-speech for listening to the blog content.



## 🔧 Setup Instructions

1. Clone the repo

```bash
git clone https://github.com/Mustafiz82/blog-genius.git
cd blog-genius
```

2. Install dependencies

```bash
npm install
```

Before running the project, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### ✅ Update `.env.local` with your configuration:

```env
# .env.local

NEXTAUTH_SECRET=  # NextAuth secret

NEXT_PUBLIC_BASE_URL=          # Backend API URL
NEXT_PUBLIC_CLOUDINARY_URL=    # Cloudinary URL

GOOGLE_CLIENT_ID=  # Google OAuth ID
GOOGLE_CLIENT_SECRET=  # Google OAuth secret

LINKEDIN_CLIENT_ID=  # LinkedIn OAuth ID
LINKEDIN_CLIENT_SECRET=  # LinkedIn OAuth secret

GITHUB_ID=  # GitHub OAuth ID
GITHUB_SECRET=  # GitHub OAuth secret

NEXT_PUBLIC_OPENROUTER_API_KEY=   # OpenRouter API key
NEXT_PUBLIC_TOGETHER_API_KEY=     # Together AI API key

```


Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

Open http://localhost:3000 in your browser to view the app.


## 🏗️ Build for Production

To create a production build:
```bash
npm run build
npm start
```


## 📤 Deployment

For deployment, refer to the official [Vercel Deployment Documentation](https://nextjs.org/docs/deployment).

# ✍️ Author

- **Name:** Mustafiz Rahman 
- **GitHub:** [@Mustafiz82](https://github.com/Mustafiz82)  
- **Email:** [mustafiz8260@gmail.com](mailto:mustafiz8260@gmail.com)  
- **Portfolio:** [yourportfolio.com](https://mustafizrahman.vercel.app/)


'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function revalidateBlogs() {
  // Invalidate the /posts route in the cache
  revalidatePath('/blogs')
}

export async function revalidateBlogsCategories( path ) {
  console.log(path);
  revalidatePath(`/blogs/category/${path}`);
  revalidatePath(`/`);
}


// export async function revalidateBlogsDetails({path}) {
//   revalidatePath( `/blogs/${path}`)
// }  
export function extractDescription(blogDetail) {
    const blocks = blogDetail?.blog?.blocks;
    // console.log(blocks);

    // Function to remove HTML tags
    const stripHtml = (text) => text?.replace(/<\/?[^>]+(>|$)/g, "");

    // First, try to get text from paragraph blocks
    let textBlocks = blocks?.filter(block => block.type === "paragraph")?.map(block => stripHtml(block.data.text));

    // If no paragraphs, fallback to quote blocks
    if (textBlocks?.length === 0) {
        textBlocks = blocks?.filter(block => block?.type === "quote")?.map(block => `"${stripHtml(block?.data?.text)}"`);
    }

    // If no quotes, fallback to headers or other text-based blocks
    if (textBlocks?.length === 0) {
        textBlocks = blocks?.filter(block => ["header", "list", "code"]?.includes(block?.type))
            ?.map(block => stripHtml(block?.data?.text || block?.data?.items?.join(", ") || block?.data?.code));
    }

    // Get the first two lines of text
    return textBlocks?.slice(0, 2)?.join(" ");
}

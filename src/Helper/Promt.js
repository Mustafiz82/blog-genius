
const exampleResultOfThumbnailUplaodPromt = ({
    prompt: `Blog Thumbnail: Inviting scene capturing the essence of budget backpacking in Thailand.
  
      Imagine a vibrant, sun-drenched scene highlighting:
  
      *   **Dominant Image:** A backpacker (ideally a diverse or inclusive representation), smiling or looking contently at a stunning Thai vista. Options include:
          *   Overlooking a turquoise beach and limestone karsts.
          *   Surrounded by lush jungle scenery and ancient ruins.
          *   Exploring a bustling, colorful Thai market with delicious street food stalls.
      *   **Focus:** Emphasize the sense of freedom, adventure, and cultural immersion rather than luxury.
      *   **Color Palette:** Warm, inviting colors - vibrant blues, greens, yellows, oranges - reflecting the tropical environment.
      *   **Text:**  Clear, bold, and easily readable. "Thailand" in a larger, more prominent font, and "Budget Backpacking" smaller, underneath. Consider a font that suggests travel or adventure. Colour of text needs to contrast backdrop
      *   **Composition:** Use the rule of thirds to create a visually balanced and appealing image. Maybe backpacker in top-left or right with vista in bottom two-thirds.
      *   **Style:** Photorealistic, travel-style photography. Slightly desaturated but still vibrant, with a sense of authenticity.
      *Emphasize the local texture by including motorbikes, local transport or clothing.
          *   **Aspect Ratio:** Standard blog thumbnail (16:9).
          *   **Text placement : Place text at places Where it does not cluter important aspect of photo but draws attention
  
      A visual invitation to experience the beauty and culture of Thailand without breaking the bank.`,
    negative_prompt: "luxury resorts, expensive hotels, fine dining, empty beaches, overly posed models, images of poverty, political unrest, scams or danger, crowded tourist traps, overly dark or gloomy images, poorly lit scenes, cartoonish, illustration, maps, passport, airplane photos",
    aspect_ratio: "16:9",
    style: "photorealistic, travel photography",
    keywords: ["Thailand", "budget travel", "backpacking", "adventure", "Southeast Asia", "cheap travel", "travel guide", "explore", "vibrant", "tropical"]
});

// export const GenerateImagePromt = `generate  a perfect promt for generating blog thumbnail fot title "${blogData?.title}" data . write the promt in json without any additional text .  make it creative while following all the thumbnail making principles to attarch the user to click the post . their will be only promt withoru any additonal code or other think. make sure the respons look like this .also make sure theri si no syntax in the json file .
//   ${exampleResultofThumbnailUplaodPromt}
// `

export const generateImagePrompt = (title) => {
    return `generate a perfect prompt for generating blog thumbnail for title "${title}" data. Write the prompt in JSON without any additional text. Make it creative while following all the thumbnail-making principles to attract the user to click the post. There will be only prompt without any additional code or other things. Make sure the response looks like this. Also, make sure there is no syntax in the JSON file.  
  
  ${exampleResultOfThumbnailUplaodPromt}`;
  };
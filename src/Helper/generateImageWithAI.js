import axios from 'axios';
import { Together } from 'together-ai';
import { generateImagePrompt } from './Promt';


export const generateImageWithAI = async ({ title, setLoading, setImage, setBlogData, setSelectedIndex, loading }) => {
  setLoading(true);
  setImage(null);
  setSelectedIndex(0)

  const TogetherApiKey = process.env.NEXT_PUBLIC_TOGETHER_API_KEY;
  const together = new Together({ apiKey: TogetherApiKey });

  const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  const prompt = generateImagePrompt(title);
  const messages = [{ role: 'user', content: prompt }];

  setTimeout(() => {
    setSelectedIndex(1)
  }, 2000);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.0-flash-lite-001',
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiContent = response.data.choices[0]?.message?.content;
    if (!aiContent) throw new Error('No AI content received');

    const generatedPrompt = aiContent.split('```json')?.[1]?.split('```')?.[0];
    const parsedPrompt = JSON.parse(generatedPrompt);


  
    const timeOut1 = setTimeout(() => setSelectedIndex(2), 2000);
    const timeOut2 = setTimeout(() => setSelectedIndex(3), 8000);
    const timeOut3 = setTimeout(() => setSelectedIndex(4), 14000);
    const timeOut4 = setTimeout(() => setSelectedIndex(5), 20000);
    
    

    const imgResponse = await together.images.create({
      model: 'black-forest-labs/FLUX.1-schnell-Free',
      prompt: parsedPrompt?.prompt || prompt,
      width: 1280,
      height: 720,
      steps: 4,
      n: 4,
      response_format: 'b64_json',
    });

    const base64Image = imgResponse.data[0].b64_json;
    const imageDataUrl = `data:image/png;base64,${base64Image}`;

    clearTimeout(timeOut1);
    clearTimeout(timeOut2);
    clearTimeout(timeOut3);
    clearTimeout(timeOut4);
    

    setImage(imageDataUrl);
    setBlogData(prev => ({
      ...prev,
      thumbnail: imageDataUrl,
    }));
  } catch (error) {
    console.error('Image generation failed:', error);
  } finally {
    setTimeout(() => {
      setLoading(false);
      setSelectedIndex(0)
    
    }, 1000);
  }
};

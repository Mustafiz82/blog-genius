export async function POST(req) {
  try {
    const { prompt } = await req.json(); // Extract prompt from request body

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'f4db5c756a0379f16e30cd86791d992928645c9094dc2c2b3a84eaaeabf01897',
        input: {
          prompt,
          num_outputs: 1,
          guidance_scale: 7.5,
        },
      }),
    });

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

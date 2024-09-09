import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateHikeRoute(description: string): Promise<string> {
  console.log('Generating hike route for description:', description);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert hiking guide assistant that generates hiking routes based on descriptions. You provide navigable routes that hikers can follow. Provide the route as a JSON array of [latitude, longitude] coordinates. Do not include any other text in your response besides the JSON array. Do not include any comments or explanations. Only return the JSON array. Use extremely accurate and correct coordinates. If the name of a trailhead is provided, begin the route at the provided trailhead."
        },
        {
          role: "user",
          content: `Generate a hiking route for the following description: ${description}`
        }
      ],
    });

    console.log('OpenAI API response:', completion.choices[0].message);
    let json_data = completion.choices[0].message.content ||  "";
    // Clean the response to remove any non-JSON content
    json_data = json_data.trim().replace(/^`+|`+$/g, '');

    if (json_data.startsWith('json')) {
        json_data = json_data.slice(4);  // Remove the first 4 characters 'json'
    }
    console.log('json_data:', json_data);
    return json_data || '[]';
  } catch (error) {
    console.error('Error generating hike route:', error);
    throw error;
  }
}

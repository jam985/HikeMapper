import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RouteInstructions {
  steps: string[];
  landmarks: string[];
}

export async function generateHikeRoute(description: string): Promise<{ instructions: RouteInstructions; coordinates: [number, number][] }> {
  console.log('Generating hike route for description:', description);

  try {
    // Step 1: Generate step-by-step instructions and key landmarks
    const instructionsCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert hiking guide assistant. Given a hiking route description, provide step-by-step instructions and key landmarks for the hike. 
          Format your response as a JSON object with two arrays: "steps" for instructions and "landmarks" for key points of interest.`
        },
        {
          role: "user",
          content: `Generate step-by-step instructions and key landmarks for the following hike description: ${description}`
        }
      ],
    });

    
    let json_data1 = instructionsCompletion.choices[0].message.content ||  "";
    // Clean the response to remove any non-JSON content
    json_data1 = json_data1.trim().replace(/^`+|`+$/g, '');

    if (json_data1.startsWith('json')) {
        json_data1 = json_data1.slice(4);  // Remove the first 4 characters 'json'
    }
    console.log('Refined route json_data1:', json_data1);
    const instructionsJson = JSON.parse(json_data1 || "{}");
    const instructions: RouteInstructions = {
      steps: instructionsJson.steps || [],
      landmarks: instructionsJson.landmarks || [],
    };

    console.log('Generated instructions:', instructions);

    // Step 2: Generate coordinates based on instructions and landmarks
    const coordinatesCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert in generating precise GPS coordinates for hiking routes. Given step-by-step instructions and key landmarks, 
          generate a series of [latitude, longitude] coordinates that represent the hiking route. 
          Your goal is to output the directions into a set of coordinates for the latitude and longitude of each of these points on the hike such that the coordinates can be fed into a google maps route. 
          The coordinates you provide should be as close to exact as possible. The closer the coordinates are, the closer the route will be to the actual hiking route.
          Provide the coordinates as a JSON array. Do not include any comments alongisde the coordinates. Only return the JSON array. Use extremely accurate and correct coordinates. 
          Ensure the coordinates are as accurate as possible and follow the path described by the instructions and landmarks.
          Do not include any comments or explanations. Only return the JSON array. Use extremely accurate and correct coordinates. 
          If the name of a trailhead is provided, begin the route at the provided trailhead.`
        },
        {
          role: "user",
          content: `Generate coordinates for the following hiking route:
          Instructions: ${JSON.stringify(instructions.steps)}
          Landmarks: ${JSON.stringify(instructions.landmarks)}`
        }
      ],
    });

    let json_data = coordinatesCompletion.choices[0].message.content ||  "";
    // Clean the response to remove any non-JSON content
    json_data = json_data.trim().replace(/^`+|`+$/g, '');

    if (json_data.startsWith('json')) {
        json_data = json_data.slice(4);  // Remove the first 4 characters 'json'
    }
    console.log('Refined route json_data:', json_data);

    const coordinatesJson = JSON.parse(json_data || "[]");
    const coordinates: [number, number][] = coordinatesJson;

    console.log('Generated coordinates:', coordinates);

    return { instructions, coordinates };
  } catch (error) {
    console.error('Error generating hike route:', error);
    throw error;
  }
}

export async function refinedHikeRoute(description: string, currentRoute: [number, number][], feedback: string): Promise<string> {
  console.log('Refining hike route based on feedback:', { description, currentRoute, feedback });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert hiking guide assistant that refines hiking routes based on user feedback. You provide navigable routes that hikers can follow. Provide the refined route as a JSON array of [latitude, longitude] coordinates. 
          Do not include any other text in your response besides the JSON array. Do not include any comments or explanations. Only return the JSON array. Use extremely accurate and correct coordinates.`
        },
        {
          role: "user",
          content: `Refine the following hiking route based on the user's feedback:
          Original description: ${description}
          Current route: ${JSON.stringify(currentRoute)}
          User feedback: ${feedback}
          
          Please provide the refined route as a JSON array of [latitude, longitude] coordinates.`
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
    console.log('Refined route json_data:', json_data);
    return json_data || '[]';
  } catch (error) {
    console.error('Error refining hike route:', error);
    throw error;
  }
}

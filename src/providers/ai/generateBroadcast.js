import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCaeHCrDtlLvdtPUddp_7VeLvkI9DM3Qfg');

// Function to generate form data based on the user's prompt using Google Generative AI
export const getAIDraft = async (userPrompt) => {
  try {
    // Context for the model to generate structured form data
    const context = `
      You are an AI assistant tasked with helping the user create a community broadcast.
      Based on the prompt provided, you will return the following form data:
      - A concise subject line.
      - Subcategories (options: 'Town Hall Meeting', 'Community Event', 'Volunteer Opportunity', 'Meet & Greet', 'Other').
      - A severity level: 'Regular' or 'High'.
      - A message body based on the prompt. Minimum 5 sentences.
      - Notification methods: 'SMS', 'Email', or both.
    
      If no prompt is provided make one up, similar but not necessarily like "Pool party, 6pm Sunday, SMS".
      Don't add any delimiters at the start or end. Your response only needs to contain the json text and thats it.
      
      Return data in json format:
      {"response": {"subject": "", "subcategories": [], "severity": "", "message": "", "notification_methods": []}}
    `;

    // Prompt that combines the context and the user’s input
    const prompt = `${context} \nPrompt: ${userPrompt}`;

    // Get the model instance
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content using the prompt
    const result = await model.generateContent(prompt);

    // Extracting data from the AI's response (assuming the AI response has structured data)
    const generatedData = result['response']['candidates'][0]['content']['parts'][0].text;  // Modify based on actual response format

    console.log(generatedData)

    const aiData = JSON.parse(generatedData)['response'];

    console.log(aiData)

    // Map the AI response to your form fields
    return {
      subject: aiData['subject'],
      subcategory: aiData['subcategories'], // Default value
      severity: aiData['severity'], // Default severity
      message: aiData['message'],
      notifyMethods: aiData['notification_methods'], // Default notify method
    };
  } catch (error) {
    console.error('Error generating AI draft:', error);

    // Return default/fallback values in case of an error
    return {
      subject: `Try Again`,
      subcategory: [],
      severity: '',
      message: '',
      notifyMethods: [],
    };
  }
};

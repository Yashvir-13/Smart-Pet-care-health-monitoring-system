import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import { Configuration, OpenAIApi } from 'npm:openai@4.24.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface PetData {
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  activityLevel: string;
  healthConditions?: string[];
  vitalSigns: {
    heartRate: number;
    temperature: number;
    spO2: number;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: { persistSession: false }
      }
    );

    // Get OpenAI API key from Supabase secrets
    const { data: secrets, error: secretsError } = await supabaseClient
      .from('secrets')
      .select('value')
      .eq('key', 'openai_api_key')
      .single();

    if (secretsError || !secrets) {
      throw new Error('Failed to retrieve OpenAI API key');
    }

    const configuration = new Configuration({ apiKey: secrets.value });
    const openai = new OpenAIApi(configuration);

    const { petData } = await req.json() as { petData: PetData };

    const prompt = `Generate a detailed, personalized diet recommendation for a pet with the following characteristics:
    
Name: ${petData.name}
Type: ${petData.type}
Breed: ${petData.breed}
Age: ${petData.age} years
Weight: ${petData.weight} kg
Activity Level: ${petData.activityLevel}
Health Conditions: ${petData.healthConditions?.join(', ') || 'None reported'}
Current Vital Signs:
- Heart Rate: ${petData.vitalSigns.heartRate} bpm
- Temperature: ${petData.vitalSigns.temperature}°C
- SpO2: ${petData.vitalSigns.spO2}%

Please provide:
1. Daily caloric requirements
2. Recommended meal frequency
3. Specific food recommendations (including portions)
4. Important nutrients to focus on
5. Foods to avoid
6. Feeding schedule
7. Special considerations based on health data
8. Hydration recommendations

Format the response in clear, easy-to-follow sections.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a veterinary nutrition expert specializing in personalized pet diet recommendations. Provide detailed, scientific, yet easy-to-understand dietary advice.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const recommendation = completion.data.choices[0].message?.content;

    return new Response(
      JSON.stringify({ recommendation }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate diet recommendation' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Utensils, RefreshCw } from "lucide-react";
import { format, parseISO, subDays } from "date-fns";
import { DietRecommendation, HealthReport } from "../types";
import { dietRecommendations } from "../data/mockData";

// Generate mock health reports
function generateHealthReports(): HealthReport[] {
  return Array.from({ length: 7 }, (_, i) => ({
    date: format(subDays(new Date(), i), "yyyy-MM-dd"),
    averageHeartRate: Math.floor(75 + Math.random() * 20),
    averageTemperature: 38.2 + Math.random() * 0.8,
    averageSpO2: Math.floor(96 + Math.random() * 4),
    activityLevel: ["low", "moderate", "high"][
      Math.floor(Math.random() * 3)
    ] as "low" | "moderate" | "high",
    alerts: Math.floor(Math.random() * 2),
  }));
}

const DietPage: React.FC = () => {
  const { currentPet } = useAuth();
  const [recommendations, setRecommendations] = useState<DietRecommendation[]>([]);
  const [healthReports] = useState<HealthReport[]>(generateHealthReports());
  const [isLoading, setIsLoading] = useState(false);

  const generateWithAI = async (prompt: string) => {
    try {
      // Use a proxy server in production
      const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer api_key", // Replace with your token
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 600,
            temperature: 0.7,
            repetition_penalty: 1.2
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
      }

      const data = await response.json();
      return data[0]?.generated_text || "Could not generate recommendation";
    } catch (error) {
      console.error("AI generation error:", error);
      return null;
    }
  };

  const generateNewRecommendation = async () => {
    if (!currentPet) return;
    
    setIsLoading(true);
    const latestReport = healthReports[0];

    const prompt = `
Instruction: Create a detailed daily diet plan for a pet based on the provided information.
Input:
- Name: ${currentPet.name}
- Breed: ${currentPet.breed}
- Age: ${currentPet.age} years
- Weight: ${currentPet.weight} kg
- Heart Rate: ${latestReport.averageHeartRate} bpm
- Temperature: ${latestReport.averageTemperature.toFixed(1)}°C
- Blood Oxygen: ${latestReport.averageSpO2}%
- Activity Level: ${latestReport.activityLevel}

Output Format:
Morning Meal: [details]
Afternoon Meal: [details]
Evening Meal: [details]
`;

    try {
      const aiResponse = await generateWithAI(prompt);
      const recommendationText = aiResponse || 
        dietRecommendations[Math.floor(Math.random() * dietRecommendations.length)].recommendation;

      setRecommendations(prev => [{
        id: `diet-${Date.now()}`,
        petId: currentPet.id,
        timestamp: new Date().toISOString(),
        recommendation: recommendationText.replace(prompt, ""), // Remove prompt from response
      }, ...prev]);
      
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate recommendation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentPet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Diet recommendations not available
        </h2>
        <p className="text-gray-600">
          Please log in to view pet diet recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {currentPet.name}'s Diet Plan
      </h1>

      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Weekly Health Summary
              </h2>
              <button
                onClick={generateNewRecommendation}
                disabled={isLoading}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                <span>{isLoading ? "Generating..." : "Create New Plan"}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Avg. Heart Rate</h3>
                <p className="text-2xl font-bold text-blue-700">
                  {healthReports[0].averageHeartRate} bpm
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600">Avg. SpO2</h3>
                <p className="text-2xl font-bold text-green-700">
                  {healthReports[0].averageSpO2}%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600">Activity Level</h3>
                <p className="text-2xl font-bold text-purple-700 capitalize">
                  {healthReports[0].activityLevel}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start mb-4">
                    <Utensils className="h-6 w-6 text-indigo-600 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Diet Plan - {format(parseISO(rec.timestamp), "MMM d, yyyy")}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Generated at {format(parseISO(rec.timestamp), "h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="prose max-w-none text-gray-700">
                    {rec.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPage;

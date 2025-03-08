import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Utensils, RefreshCw } from 'lucide-react';
import { DietRecommendation } from '../types';
import { dietRecommendations } from '../data/mockData';
import { format, parseISO } from 'date-fns';

const DietPage: React.FC = () => {
  const { currentPet } = useAuth();
  const [recommendations, setRecommendations] = useState<DietRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setRecommendations(dietRecommendations);
  }, []);

  const generateNewRecommendation = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newRecommendation: DietRecommendation = {
        id: `diet${recommendations.length + 1}`,
        petId: currentPet?.id || '',
        timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        recommendation: getRandomRecommendation(),
      };
      
      setRecommendations(prev => [newRecommendation, ...prev]);
      setIsLoading(false);
    }, 2000);
  };

  const getRandomRecommendation = () => {
    const recommendations = [
      `Based on ${currentPet?.name}'s recent activity levels and vital signs, we recommend a diet rich in lean proteins and moderate carbohydrates. Include 2 cups of high-quality dry food divided into two meals per day, supplemented with a tablespoon of fish oil for coat health. Ensure fresh water is always available and limit treats to 10% of daily caloric intake.`,
      
      `${currentPet?.name}'s recent health data suggests a need for increased hydration. Consider switching to a wet food diet or adding water to dry kibble. We recommend 1.5 cups of premium wet food per day, divided into three meals. Add a daily probiotic supplement to support digestive health, and ensure exercise after meals to aid digestion.`,
      
      `For optimal weight management, ${currentPet?.name} should be on a portion-controlled diet with measured meals. Provide 1.75 cups of weight management formula dry food daily, split between morning and evening feedings. Include low-calorie vegetables like carrots or green beans as healthy treats, and ensure at least 30 minutes of active play daily.`,
      
      `${currentPet?.name}'s vital signs indicate potential food sensitivities. Consider a limited ingredient diet focusing on novel proteins like duck or venison. Start with 2 cups daily divided into two meals, and monitor for improvements in digestion and energy levels. Avoid common allergens like chicken, beef, and grains until sensitivities are better understood.`,
      
      `To support ${currentPet?.name}'s joint health, we recommend a diet rich in omega-3 fatty acids and glucosamine. Feed 2 cups of senior-formula dry food daily, supplemented with a teaspoon of fish oil and a joint health supplement. Keep meals consistent in timing and quantity, and provide gentle, regular exercise to maintain mobility.`
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  if (!currentPet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Diet recommendations not available</h2>
        <p className="text-gray-600">Please log in to view pet diet recommendations.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Diet Recommendations</h1>
      
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {currentPet.name}'s Diet Plan
              </h2>
              <button
                onClick={generateNewRecommendation}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition disabled:bg-indigo-400"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    <span>Generate New Recommendation</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-6">
              {recommendations.length > 0 ? (
                recommendations.map((rec) => (
                  <div key={rec.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start mb-4">
                      <Utensils className="h-6 w-6 text-indigo-600 mt-1 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Diet Recommendation
                        </h3>
                        <p className="text-sm text-gray-500">
                          Generated on {format(parseISO(rec.timestamp), 'MMMM d, yyyy')} at {format(parseISO(rec.timestamp), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">
                      {rec.recommendation}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No diet recommendations available yet.</p>
                  <p className="text-gray-500 mt-2">
                    Click the "Generate New Recommendation" button to get personalized diet advice for {currentPet.name}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Diet Tips */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            General Diet Tips for {currentPet.type}s
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Hydration</h3>
              <p className="text-gray-700">
                Always ensure your {currentPet.type.toLowerCase()} has access to fresh, clean water. Consider a pet fountain to encourage drinking.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Portion Control</h3>
              <p className="text-gray-700">
                Measure food carefully to prevent overfeeding. Adjust portions based on activity level and weight goals.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Treats</h3>
              <p className="text-gray-700">
                Limit treats to 10% of daily caloric intake. Consider healthy alternatives like small pieces of vegetables or fruits (if appropriate for your pet).
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Consistency</h3>
              <p className="text-gray-700">
                Feed at the same times each day. Sudden diet changes can cause digestive upset, so transition to new foods gradually.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Special Needs</h3>
              <p className="text-gray-700">
                Consider life stage, breed, and health conditions when selecting food. Consult your veterinarian for specific dietary recommendations.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Food Quality</h3>
              <p className="text-gray-700">
                Choose high-quality pet foods with real meat as the first ingredient. Avoid foods with excessive fillers, artificial preservatives, or by-products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPage;
import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, Sparkles, ChefHat } from 'lucide-react';
import { analyzeImageForChef } from '../services/gemini';
import { AnalysisStatus, AnalysisResult } from '../types';

const InteractiveChef: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setStatus(AnalysisStatus.IDLE); // Reset status on new image
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;

    try {
      setStatus(AnalysisStatus.ANALYZING);
      
      // Extract base64 data (remove "data:image/jpeg;base64," prefix)
      const base64Data = imagePreview.split(',')[1];
      const mimeType = imagePreview.split(';')[0].split(':')[1];

      const analysis = await analyzeImageForChef(base64Data, mimeType);
      setResult(analysis);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <section id="vision" className="py-20 bg-tamil-leaf/10 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-tamil-earth mb-4">
            Chef's Vision AI
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Upload a photo of ingredients or a dish, and our AI Chef will interpret it through the lens of Tamil culture and suggest a culinary masterpiece.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center max-w-6xl mx-auto">
          
          {/* Upload Area */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-xl border border-tamil-saffron/20">
            <div 
              className={`border-2 border-dashed rounded-xl h-80 flex flex-col items-center justify-center transition-colors cursor-pointer relative overflow-hidden ${imagePreview ? 'border-tamil-saffron' : 'border-gray-300 hover:border-tamil-saffron'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Click to upload photo</p>
                  <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </div>

            <div className="mt-6">
              <button
                onClick={handleAnalyze}
                disabled={!imagePreview || status === AnalysisStatus.ANALYZING}
                className="w-full py-4 bg-tamil-earth text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-orange-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {status === AnalysisStatus.ANALYZING ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Consulting the Chef...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze with Chef's Vision
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="w-full lg:w-1/2 min-h-[400px]">
            {status === AnalysisStatus.SUCCESS && result ? (
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-tamil-saffron animate-fade-in-up">
                <div className="bg-tamil-cream p-6 border-b border-tamil-saffron/20">
                  <div className="flex items-center gap-3 mb-2">
                    <ChefHat className="w-8 h-8 text-tamil-earth" />
                    <h3 className="text-2xl font-serif font-bold text-tamil-earth">{result.title}</h3>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2">Cultural Significance</h4>
                    <p className="text-gray-700 italic border-l-4 border-tamil-leaf pl-4 py-1 leading-relaxed">
                      "{result.culturalContext}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2">Chef's Suggestion</h4>
                    <p className="text-gray-800 leading-relaxed bg-orange-50 p-4 rounded-lg text-sm md:text-base">
                      {result.recipeSuggestion}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 text-center">
                    <p className="text-tamil-saffron font-serif font-medium">Visit Gillbet Resart to taste this authentic experience.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white/50 rounded-xl border border-gray-200 p-8 text-center text-gray-400">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ChefHat className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-medium mb-2">Awaiting Ingredients</h3>
                <p>Upload an image to see the magic of Tamil cuisine unfold.</p>
              </div>
            )}
            
            {status === AnalysisStatus.ERROR && (
              <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 mt-4">
                <p>Unable to analyze the image. Please try uploading a clearer picture of food or ingredients.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default InteractiveChef;

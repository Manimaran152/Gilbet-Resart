export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: 'breakfast' | 'main' | 'dessert' | 'beverage';
  spicyLevel: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Spicy
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AnalysisResult {
  title: string;
  culturalContext: string;
  recipeSuggestion: string;
}

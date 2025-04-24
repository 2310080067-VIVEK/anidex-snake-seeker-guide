
import { pipeline, env } from '@huggingface/transformers';
import type { SnakeData } from '@/components/identify/SnakeResult';

// Configure transformers.js to use browser cache efficiently
env.allowLocalModels = false;
env.useBrowserCache = true;

// Map of model classification labels to our snake data
const snakeClassMap: Record<string, string> = {
  'eastern diamondback rattlesnake': 'Eastern Diamondback Rattlesnake',
  'rattlesnake': 'Eastern Diamondback Rattlesnake',
  'king cobra': 'King Cobra',
  'cobra': 'King Cobra',
  'black mamba': 'Black Mamba',
  'mamba': 'Black Mamba',
  'garter snake': 'Garter Snake',
  'garden snake': 'Garter Snake',
};

// Cache the classifier instance
let classifierInstance: any = null;

export const identifySnake = async (
  imageFile: File, 
  availableSnakes: SnakeData[]
): Promise<SnakeData | null> => {
  try {
    console.log('Starting snake identification process...');
    
    // Initialize the classifier if not already done
    if (!classifierInstance) {
      console.log('Initializing image classifier...');
      classifierInstance = await pipeline(
        'image-classification',
        'malachy-liu/mobilenet-v1-animal-detector',
        { device: 'cpu', quantized: true }
      );
      console.log('Classifier initialized successfully');
    }
    
    // Convert file to URL for the model
    const imageUrl = URL.createObjectURL(imageFile);
    
    // Classify the image
    console.log('Classifying image...');
    const results = await classifierInstance(imageUrl);
    console.log('Classification results:', results);
    
    // Clean up the URL
    URL.revokeObjectURL(imageUrl);
    
    // Process the results
    if (!results || !Array.isArray(results) || results.length === 0) {
      console.error('No classification results returned');
      return null;
    }
    
    // Check for snake-related results
    for (const result of results) {
      const label = result.label.toLowerCase();
      
      // Check if the label contains snake or specific snake types
      const isSnakeImage = label.includes('snake') || 
                          label.includes('reptile') || 
                          label.includes('mamba') || 
                          label.includes('cobra') || 
                          label.includes('python');
      
      if (isSnakeImage) {
        console.log(`Detected snake type: ${label}`);
        
        // Find matching snake in our database
        for (const [modelLabel, snakeName] of Object.entries(snakeClassMap)) {
          if (label.includes(modelLabel)) {
            const matchedSnake = availableSnakes.find(snake => snake.name === snakeName);
            if (matchedSnake) {
              console.log(`Matched to known snake: ${matchedSnake.name}`);
              return matchedSnake;
            }
          }
        }
      }
    }
    
    // As fallback, check if any of our snake names appear in the top results
    for (const result of results.slice(0, 3)) {
      const label = result.label.toLowerCase();
      
      for (const snake of availableSnakes) {
        const snakeNameLower = snake.name.toLowerCase();
        const scientificNameLower = snake.scientificName.toLowerCase();
        
        if (label.includes(snakeNameLower) || label.includes(scientificNameLower)) {
          console.log(`Matched snake by name: ${snake.name}`);
          return snake;
        }
      }
    }
    
    console.log('No matching snake found in our database');
    return null;
  } catch (error) {
    console.error('Error identifying snake:', error);
    throw error;
  }
};

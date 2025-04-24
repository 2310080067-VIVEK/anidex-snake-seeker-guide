
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ImageUpload from '@/components/identify/ImageUpload';
import SnakeResult from '@/components/identify/SnakeResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SnakeData } from '@/components/identify/SnakeResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Define multiple snake data options for more realistic simulation
const snakeOptions: SnakeData[] = [
  {
    name: 'Eastern Diamondback Rattlesnake',
    scientificName: 'Crotalus adamanteus',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Eastern_diamondback_rattlesnake.jpg',
    venomType: 'Hemotoxic',
    antidote: 'CroFab (Crotalidae Polyvalent Immune Fab)',
    precautions: [
      'Seek immediate medical attention',
      'Keep the affected limb below heart level',
      'Remove any constrictive items (rings, watches)',
      'Do not apply tourniquet or try to suck out venom',
      'Try to remember the snake\'s appearance for identification',
    ],
    threatLevel: 'deadly',
    description: 'The Eastern diamondback rattlesnake is the largest venomous snake in North America. It has a distinctive pattern of diamond-shaped markings along its back with brown and yellow borders and a rattle at the end of its tail.',
    distribution: 'Southeastern United States, primarily in Florida, southern Alabama, Mississippi, and parts of Georgia.'
  },
  {
    name: 'King Cobra',
    scientificName: 'Ophiophagus hannah',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/King_Cobra.jpg',
    venomType: 'Neurotoxic',
    antidote: 'King Cobra Antivenin',
    precautions: [
      'Seek immediate medical attention',
      'Immobilize the affected area',
      'Avoid physical exertion',
      'Do not apply ice or cut the wound',
      'If possible, take a photo of the snake for identification'
    ],
    threatLevel: 'deadly',
    description: 'The king cobra is the world\'s longest venomous snake. It has a distinctive hood and can raise itself up to a third of its length when threatened. The snake is typically olive-green, tan, or black with pale yellow bands.',
    distribution: 'South and Southeast Asia, including India, southern China, and the Philippines.'
  },
  {
    name: 'Garter Snake',
    scientificName: 'Thamnophis sirtalis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Coast_Garter_Snake.jpg/1200px-Coast_Garter_Snake.jpg',
    venomType: 'Mild toxin (harmless to humans)',
    antidote: 'Not required',
    precautions: [
      'Clean the area with soap and water',
      'Apply antiseptic if available',
      'Monitor for allergic reactions (rare)'
    ],
    threatLevel: 'safe',
    description: 'The garter snake is a common, harmless snake with long stripes running along its body. They are typically dark with yellow, green, blue, or white stripes. Garter snakes are relatively small, rarely exceeding 4 feet in length.',
    distribution: 'Throughout North America, from Canada to Mexico.'
  }
];

const IdentifyPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [identifiedSnake, setIdentifiedSnake] = useState<SnakeData | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    // In a real application, this would send the image to a backend API
    setIsProcessing(true);
    
    // Get a simulated match based on the file size/properties
    // This is just a simulation - in a real app this would be ML-based detection
    const simulateImageAnalysis = async (file: File): Promise<number> => {
      return new Promise((resolve) => {
        // Create a simple hash based on file properties to simulate image analysis
        const fileSize = file.size;
        const fileName = file.name;
        
        // Use file size and first character of filename to create pseudo-random choice
        const fileHash = fileSize % 3;
        const firstChar = fileName.charAt(0).toLowerCase().charCodeAt(0) % 3;
        
        // Combine the two factors to select a snake
        const index = (fileHash + firstChar) % snakeOptions.length;
        
        // Simulate API delay
        setTimeout(() => {
          resolve(index);
        }, 2000);
      });
    };
    
    // Simulate the image analysis process
    simulateImageAnalysis(file).then(snakeIndex => {
      setIsProcessing(false);
      
      // Get a snake option based on the simulated analysis
      const selectedSnake = snakeOptions[snakeIndex];
      setIdentifiedSnake(selectedSnake);
      
      toast({
        title: 'Snake Identified',
        description: `We identified this as a ${selectedSnake.name}.`,
      });
    });
  };
  
  const handleReset = () => {
    setIdentifiedSnake(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Snake Identification</h1>
            <p className="text-muted-foreground mt-2">
              Upload an image of a snake for instant identification
            </p>
          </header>

          {!identifiedSnake ? (
            <div className="bg-secondary/30 rounded-lg p-6">
              <ImageUpload 
                onImageSelect={handleImageSelect}
                isProcessing={isProcessing}
              />
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-lg p-6">
              <SnakeResult 
                snake={identifiedSnake}
                onReset={handleReset}
              />
            </div>
          )}

          {!identifiedSnake && !isProcessing && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Don't have an image? Try describing the snake instead.
              </p>
              <Button variant="secondary" asChild>
                <a href="/describe">Describe a Snake</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IdentifyPage;

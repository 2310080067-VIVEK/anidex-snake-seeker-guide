
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ImageUpload from '@/components/identify/ImageUpload';
import SnakeResult from '@/components/identify/SnakeResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SnakeData } from '@/components/identify/SnakeResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const IdentifyPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [identifiedSnake, setIdentifiedSnake] = useState<SnakeData | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    // In a real application, this would send the image to a backend API
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      // Mock response
      setIdentifiedSnake({
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
          'Try to remember the snake's appearance for identification'
        ],
        threatLevel: 'deadly',
        description: 'The Eastern diamondback rattlesnake is the largest venomous snake in North America. It has a distinctive pattern of diamond-shaped markings along its back with brown and yellow borders and a rattle at the end of its tail.',
        distribution: 'Southeastern United States, primarily in Florida, southern Alabama, Mississippi, and parts of Georgia.'
      });

      toast({
        title: 'Snake Identified',
        description: 'We found a match for your snake image.',
      });
    }, 2000);
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

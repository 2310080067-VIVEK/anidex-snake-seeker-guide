
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ImageUpload from '@/components/identify/ImageUpload';
import SnakeResult from '@/components/identify/SnakeResult';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SnakeData } from '@/components/identify/SnakeResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { identifySnake } from '@/services/snakeIdentificationService';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Define multiple snake data options for the database
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
    name: 'Black Mamba',
    scientificName: 'Dendroaspis polylepis',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Black_mamba_head.jpg',
    venomType: 'Neurotoxic',
    antidote: 'Black Mamba Antivenin (Polyvalent)',
    precautions: [
      'Seek immediate emergency medical care - extremely urgent',
      'Keep victim calm and minimize movement',
      'Immobilize the bitten limb',
      'Do not apply tourniquet or try to suck out venom',
      'Monitor vital signs until emergency services arrive'
    ],
    threatLevel: 'deadly',
    description: 'The black mamba is one of Africa\'s most dangerous and feared snakes. Despite its name, the skin is usually olive, brownish, or grayish with a matte finish. It is named for the ink-black inside of its mouth. It is extremely fast and highly venomous.',
    distribution: 'Sub-Saharan Africa, including parts of Ethiopia, Somalia, Kenya, Tanzania, and southern Africa.'
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
  const [error, setError] = useState<string | null>(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelLoadingStep, setModelLoadingStep] = useState('');
  const { toast } = useToast();

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setModelLoading(true);
    
    try {
      // Set loading steps to provide better feedback
      setModelLoadingStep('Loading AI model components');
      
      toast({
        title: 'Processing Image',
        description: 'Analyzing your snake image with computer vision...',
      });
      
      // Short timeout to allow the UI to update with loading indicators
      await new Promise(resolve => setTimeout(resolve, 500));
      setModelLoadingStep('Preparing image analysis');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setModelLoadingStep('Identifying snake characteristics');
      
      // Real identification using ML model
      const result = await identifySnake(file, snakeOptions);
      
      if (result) {
        setIdentifiedSnake(result);
        toast({
          title: 'Snake Identified',
          description: `We identified this as ${result.name}.`,
        });
      } else {
        setError("We couldn't identify a snake in this image. Please try another image or use the 'Describe a Snake' feature.");
        toast({
          title: 'Identification Failed',
          description: "We couldn't identify a snake in this image.",
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Snake identification error:', err);
      setError("There was an error processing your image. Please try again.");
      toast({
        title: 'Error',
        description: 'There was an error processing your image.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setModelLoading(false);
      setModelLoadingStep('');
    }
  };
  
  const handleReset = () => {
    setIdentifiedSnake(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Snake Identification</h1>
            <p className="text-muted-foreground mt-2">
              Upload an image of a snake for AI-powered identification
            </p>
          </header>

          {!identifiedSnake ? (
            <div className="bg-secondary/30 rounded-lg p-6">
              {error && (
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md flex items-center gap-3">
                  <AlertTriangle className="text-destructive h-5 w-5" />
                  <p className="text-destructive">{error}</p>
                </div>
              )}
              
              {modelLoading && (
                <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-md">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <p className="text-primary font-medium">{modelLoadingStep}</p>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <Skeleton className="h-2 w-3/4" />
                    <Skeleton className="h-2 w-1/2" />
                  </div>
                </div>
              )}
              
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

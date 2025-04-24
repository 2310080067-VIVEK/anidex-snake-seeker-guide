
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SnakeDescription from '@/components/identify/SnakeDescription';
import SnakeResult from '@/components/identify/SnakeResult';
import type { SnakeData } from '@/components/identify/SnakeResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DescribePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [identifiedSnake, setIdentifiedSnake] = useState<SnakeData | null>(null);
  const { toast } = useToast();

  const handleSubmit = (description: string, location: string) => {
    // In a real application, this would send the data to a backend API
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      // Mock response based on description keywords
      if (description.toLowerCase().includes('yellow') && description.toLowerCase().includes('black')) {
        setIdentifiedSnake({
          name: 'Eastern Coral Snake',
          scientificName: 'Micrurus fulvius',
          image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Eastern_Coral_Snake_%28Micrurus_fulvius%29_%287222918220%29.jpg',
          venomType: 'Neurotoxic',
          antidote: 'North American Coral Snake Antivenin',
          precautions: [
            'Seek immediate medical attention',
            'Minimize movement to slow venom spread',
            'Do not apply tourniquet or try to suck out venom',
            'Keep bitten area below the level of the heart if possible',
            'Note time of bite to report to medical professionals'
          ],
          threatLevel: 'deadly',
          description: 'The Eastern coral snake has bright bands of red, yellow, and black, with the red and yellow bands touching. Remember the rhyme: "Red touch yellow, kill a fellow; red touch black, venom lack."',
          distribution: 'Southeastern United States, particularly in wooded, sandy and marshy areas of Florida, Alabama, Georgia, South Carolina, and parts of North Carolina.'
        });
      } else {
        setIdentifiedSnake({
          name: 'Common Garter Snake',
          scientificName: 'Thamnophis sirtalis',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Coast_Garter_Snake.jpg',
          venomType: 'Mild toxicity (not harmful to humans)',
          antidote: 'None needed',
          precautions: [
            'Clean bite area with soap and water',
            'Apply antiseptic if available',
            'Monitor for signs of infection'
          ],
          threatLevel: 'safe',
          description: 'The common garter snake typically has three light stripes running along its body on a darker background. The stripes may be yellow, green, blue, or white. The rest of the body is usually black, brown, gray, or olive.',
          distribution: 'Throughout North America, including Canada, United States, and Mexico. Adaptable to many environments including gardens, woodlands, fields, and wetlands.'
        });
      }

      toast({
        title: 'Snake Identified',
        description: 'We found a potential match based on your description.',
      });
    }, 1500);
  };
  
  const handleReset = () => {
    setIdentifiedSnake(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Describe a Snake</h1>
            <p className="text-muted-foreground mt-2">
              Provide details about the snake's appearance and your location
            </p>
          </header>

          {!identifiedSnake ? (
            <div className="bg-secondary/30 rounded-lg p-6">
              <SnakeDescription 
                onSubmit={handleSubmit}
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
                Have a photo of the snake? Try image identification instead.
              </p>
              <Button variant="secondary" asChild>
                <a href="/identify">Identify by Image</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DescribePage;

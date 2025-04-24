
import React, { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SnakeDescriptionProps {
  onSubmit: (description: string, location: string) => void;
  isProcessing: boolean;
}

const SnakeDescription: React.FC<SnakeDescriptionProps> = ({ onSubmit, isProcessing }) => {
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && location.trim()) {
      onSubmit(description, location);
    }
  };
  
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, we would use a reverse geocoding API
            setLocation('Your current location');
          } catch (error) {
            console.error('Error getting location:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  const examples = [
    'A brown snake with black bands',
    'Small green snake with yellow stripes',
    'Large black snake with diamond pattern',
    'Red and yellow bands with black separations',
  ];
  
  const handleExampleClick = (example: string) => {
    setDescription(example);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description">Describe the snake</Label>
        <Textarea 
          id="description"
          placeholder="Describe the snake's color, pattern, size, and any other notable features..."
          className="min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isProcessing}
        />
        
        <div className="pt-2">
          <p className="text-sm text-muted-foreground mb-2">Example descriptions:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <Button 
                key={index}
                type="button" 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => handleExampleClick(example)}
                disabled={isProcessing}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location where snake was seen</Label>
        <div className="flex gap-2">
          <Input
            id="location"
            placeholder="Enter city, region, or country..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isProcessing}
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGetCurrentLocation}
            disabled={isProcessing}
          >
            <MapPin size={16} />
          </Button>
        </div>
      </div>
      
      <Button 
        type="submit"
        className="w-full gap-2"
        disabled={!description.trim() || !location.trim() || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Search size={16} />
            Identify Snake
          </>
        )}
      </Button>
    </form>
  );
};

export default SnakeDescription;

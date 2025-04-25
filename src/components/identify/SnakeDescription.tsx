
import React, { useState } from 'react';
import { Search, Loader2, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { reverseGeocode, type GeocodingResult } from '@/services/geocodingService';

interface SnakeDescriptionProps {
  onSubmit: (description: string, location: string, coordinates?: { latitude: number; longitude: number }) => void;
  isProcessing: boolean;
}

const SnakeDescription: React.FC<SnakeDescriptionProps> = ({ onSubmit, isProcessing }) => {
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleGetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Location Not Available',
        description: 'Geolocation is not supported by your browser',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingLocation(true);
    setLocationStatus('idle');

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      const result: GeocodingResult = await reverseGeocode(latitude, longitude);
      
      setLocation(result.address);
      setCoordinates(result.coordinates);
      setLocationStatus('success');
      
      toast({
        title: 'Location Captured',
        description: 'Your location has been successfully added',
      });
    } catch (error) {
      console.error('Location error:', error);
      setLocationStatus('error');
      toast({
        title: 'Location Error',
        description: 'Could not access your location. Please enter it manually.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && location.trim()) {
      onSubmit(description, location, coordinates || undefined);
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
            disabled={isProcessing || isLoadingLocation}
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGetCurrentLocation}
            disabled={isProcessing || isLoadingLocation}
            className="min-w-[120px] relative"
          >
            {isLoadingLocation ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Loading...
              </>
            ) : locationStatus === 'success' ? (
              <>
                <CheckCircle2 size={16} className="mr-2 text-green-500" />
                Located
              </>
            ) : locationStatus === 'error' ? (
              <>
                <XCircle size={16} className="mr-2 text-destructive" />
                Retry
              </>
            ) : (
              <>
                <MapPin size={16} className="mr-2" />
                Use My Location
              </>
            )}
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

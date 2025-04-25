
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, AlertTriangle, Shield } from "lucide-react";
import { type SnakeData } from './SnakeResult';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface RegionalSnakesProps {
  snakes: SnakeData[];
  locationName: string;
  isLoading: boolean;
}

const RegionalSnakes: React.FC<RegionalSnakesProps> = ({ snakes, locationName, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-muted-foreground">Looking for snakes in your area...</p>
      </div>
    );
  }

  if (!snakes || snakes.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No snake data available for this location.</p>
      </div>
    );
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'safe':
        return 'bg-snake-safe';
      case 'mild':
        return 'bg-snake-mild';
      case 'moderate':
        return 'bg-snake-moderate';
      case 'dangerous':
        return 'bg-snake-dangerous';
      case 'deadly':
        return 'bg-snake-deadly';
      default:
        return 'bg-muted';
    }
  };

  const getThreatLevelText = (level: string) => {
    switch (level) {
      case 'safe':
        return 'Safe - Non-venomous';
      case 'mild':
        return 'Mild - Minor local effects';
      case 'moderate':
        return 'Moderate - Requires treatment';
      case 'dangerous':
        return 'Dangerous - Medical emergency';
      case 'deadly':
        return 'Deadly - Urgent medical care needed';
      default:
        return 'Unknown threat level';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={18} className="text-primary" />
        <h2 className="text-lg font-medium">Snakes commonly found near {locationName}</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {snakes.map((snake, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48">
              <img 
                src={snake.image} 
                alt={snake.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-lg font-bold text-white">{snake.name}</h3>
                <p className="text-sm text-gray-200 italic">{snake.scientificName}</p>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center justify-between p-2 rounded-md bg-secondary mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getThreatLevelColor(snake.threatLevel)}`}></div>
                  <span className="font-medium text-sm">{getThreatLevelText(snake.threatLevel)}</span>
                </div>
                <Shield size={16} />
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Venom:</span> {snake.venomType}
                </div>
                
                <div>
                  <span className="font-medium text-muted-foreground">Antidote:</span> {snake.antidote}
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="description">
                  <AccordionTrigger className="text-sm">Description</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {snake.description}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="distribution">
                  <AccordionTrigger className="text-sm">Distribution</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {snake.distribution}
                  </AccordionContent>
                </AccordionItem>
                
                {snake.threatLevel !== 'safe' && (
                  <AccordionItem value="precautions">
                    <AccordionTrigger className="text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-destructive" />
                        Emergency Precautions
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        {snake.precautions.map((precaution, idx) => (
                          <li key={idx}>{precaution}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" size="sm" className="text-xs w-full gap-1">
                <ExternalLink size={12} />
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegionalSnakes;


import React from 'react';
import { Shield, AlertTriangle, Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Snake data type
export interface SnakeData {
  name: string;
  scientificName: string;
  image: string;
  venomType: string;
  antidote: string;
  precautions: string[];
  threatLevel: 'safe' | 'mild' | 'moderate' | 'dangerous' | 'deadly';
  description: string;
  distribution: string;
}

interface SnakeResultProps {
  snake: SnakeData;
  onReset: () => void;
}

const SnakeResult: React.FC<SnakeResultProps> = ({ snake, onReset }) => {
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
    <div className="space-y-6 animate-fade-in">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={snake.image}
          alt={snake.name}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h2 className="text-xl font-bold text-white">{snake.name}</h2>
          <p className="text-sm italic text-gray-200">{snake.scientificName}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-md bg-secondary">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getThreatLevelColor(snake.threatLevel)}`}></div>
          <span className="font-medium">{getThreatLevelText(snake.threatLevel)}</span>
        </div>
        <Shield size={20} />
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-md bg-secondary/50">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Info size={18} className="text-primary" />
            Venom Information
          </h3>
          <div className="mt-2 space-y-2">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Type:</span>
              <span className="ml-2">{snake.venomType || 'None'}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Antidote:</span>
              <span className="ml-2">{snake.antidote || 'Not required'}</span>
            </div>
          </div>
        </div>

        {snake.threatLevel !== 'safe' && (
          <div className="p-4 rounded-md bg-destructive/20 border border-destructive/30">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <AlertTriangle size={18} className="text-destructive" />
              Emergency Precautions
            </h3>
            <ul className="mt-2 space-y-2 list-disc list-inside text-sm">
              {snake.precautions.map((precaution, index) => (
                <li key={index}>{precaution}</li>
              ))}
            </ul>
          </div>
        )}

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{snake.description}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="distribution">
            <AccordionTrigger>Distribution</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{snake.distribution}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button onClick={onReset} variant="default" className="flex-1">
          New Identification
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <ExternalLink size={16} />
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default SnakeResult;


import React, { useState } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isProcessing }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      onImageSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleClearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const captureFromCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // This would typically open a camera view component
      // For now, just show a toast notification
      toast({
        title: 'Camera access granted',
        description: 'Camera functionality is in development.',
      });
      
      // In a real implementation, we would take a photo and process it
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      toast({
        title: 'Camera access denied',
        description: 'Please enable camera access to use this feature.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-secondary p-3">
              <Upload size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload Snake Image</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Drag & drop an image or click to browse
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={handleButtonClick} variant="outline" className="gap-2">
                <Upload size={16} />
                Browse
              </Button>
              <Button onClick={captureFromCamera} variant="outline" className="gap-2">
                <Camera size={16} />
                Camera
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden animate-scale-up">
          <img 
            src={preview} 
            alt="Snake preview" 
            className="w-full aspect-video object-cover" 
          />
          {isProcessing ? (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 size={40} className="animate-spin text-primary" />
                <p className="text-lg font-medium">Analyzing image...</p>
              </div>
            </div>
          ) : (
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2"
              onClick={handleClearImage}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

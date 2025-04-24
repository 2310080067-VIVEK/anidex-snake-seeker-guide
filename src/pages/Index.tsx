
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, FileText, Info, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12 md:mb-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">
              <span className="text-gradient">Anidex</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              Snake identification and safety information at your fingertips
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Link to="/identify">
                <Button size="lg" className="gap-2">
                  <Camera size={18} />
                  Identify by Image
                </Button>
              </Link>
              <Link to="/describe">
                <Button size="lg" variant="outline" className="gap-2">
                  <FileText size={18} />
                  Describe a Snake
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Camera size={20} className="text-primary" />
                </div>
                <CardTitle>Image Identification</CardTitle>
                <CardDescription>
                  Upload or snap a photo of a snake for instant identification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI model can recognize snake species with high accuracy 
                  from your uploaded images or camera photos.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/identify" className="group inline-flex items-center text-sm font-medium text-primary">
                  Identify now
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <FileText size={20} className="text-primary" />
                </div>
                <CardTitle>Description-Based Search</CardTitle>
                <CardDescription>
                  Describe the snake's features to find possible matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No photo? No problem. Describe the snake's appearance and your location, 
                  and our system will suggest potential species.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/describe" className="group inline-flex items-center text-sm font-medium text-primary">
                  Start describing
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Info size={20} className="text-primary" />
                </div>
                <CardTitle>Safety Information</CardTitle>
                <CardDescription>
                  Access vital safety and first aid information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get detailed information about venom types, threat levels, 
                  and emergency precautions for identified snake species.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/guide" className="group inline-flex items-center text-sm font-medium text-primary">
                  View safety guide
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Info Section */}
        <section className="mb-12 md:mb-16">
          <div className="bg-secondary rounded-lg p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Why Use Anidex?</h2>
              <p className="text-muted-foreground">
                Snake encounters can be dangerous without proper knowledge. Anidex helps you identify 
                snakes quickly and provides critical safety information that could save lives.
              </p>
              <div className="pt-4">
                <Link to="/guide">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

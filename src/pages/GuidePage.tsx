
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check, X, AlertTriangle, Shield, Phone } from 'lucide-react';

const GuidePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl font-bold">Snake Safety Guide</h1>
            <p className="text-muted-foreground mt-2">
              Essential information about snakes and how to stay safe
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Shield size={24} className="text-primary" />
                </div>
                <CardTitle>Prevention</CardTitle>
                <CardDescription>How to avoid snake encounters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-snake-safe" />
                  </div>
                  <p className="text-sm">Be aware of your surroundings, especially in areas where snakes are common</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-snake-safe" />
                  </div>
                  <p className="text-sm">Wear closed-toe shoes, long pants, and use a walking stick when hiking</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-snake-safe" />
                  </div>
                  <p className="text-sm">Keep your yard clear of debris, tall grass, and woodpiles that attract snakes</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-snake-safe" />
                  </div>
                  <p className="text-sm">Never put hands or feet in places you can't see</p>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <AlertTriangle size={24} className="text-primary" />
                </div>
                <CardTitle>Emergency Response</CardTitle>
                <CardDescription>What to do in case of a snakebite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={14} className="text-snake-dangerous" />
                  </div>
                  <p className="text-sm">DON'T panic, try to catch the snake, or apply ice or tourniquets</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-snake-safe" />
                  </div>
                  <p className="text-sm">Move away from the snake to avoid additional bites</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-snake-safe" />
                  </div>
                  <p className="text-sm">Keep the bite area below heart level and remove any constricting items</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-snake-safe" />
                  </div>
                  <p className="text-sm">Seek immediate medical attention and try to identify the snake if safe to do so</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-secondary/30 rounded-lg p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Emergency Contacts</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Keep these numbers handy in case of snake emergencies
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">Emergency Services:</span> 911 (US)
                  </li>
                  <li>
                    <span className="font-medium">Poison Control Center:</span> 1-800-222-1222 (US)
                  </li>
                  <li>
                    <span className="font-medium">Local Wildlife Service:</span> Check your local directory
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Common Snake Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I tell if a snake is venomous?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    While there are some general characteristics like elliptical pupils, triangular heads, 
                    or heat-sensing pits between the eyes and nostrils in vipers, these are not always reliable. 
                    The safest approach is to maintain a safe distance from any snake and use Anidex to identify it.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What should I do if I find a snake in my house?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Stay calm and keep a safe distance. Do not attempt to catch or kill the snake yourself. 
                    Clear the area of children and pets, and call local animal control or wildlife services 
                    to safely remove the snake.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Are all snake bites venomous?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    No, many snakes are non-venomous. Additionally, even venomous snakes may deliver "dry bites" 
                    without injecting venom. However, all snake bites should be treated as potentially serious 
                    and require medical attention to prevent infection and other complications.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I make my yard less attractive to snakes?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Keep grass short, remove brush piles, store firewood away from your home, seal gaps in your 
                    foundation, remove food sources for rodents (which attract snakes), and consider installing 
                    snake-proof fencing if you live in an area with many venomous species.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How fast do snake venoms act?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    The speed varies by species. Some neurotoxic venoms can cause symptoms within minutes, 
                    while other cytotoxic or hemotoxic venoms might take hours to show serious effects. 
                    This is why immediate medical attention is crucial after any venomous snakebite.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default GuidePage;

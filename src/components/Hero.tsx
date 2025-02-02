import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 5000); // Flip every 5 seconds

    return () => clearInterval(flipInterval);
  }, []);

  const handleMouseEnter = () => {
    setIsFlipped(prev => !prev);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Shopping Independence for the Visually Impaired
            </h1>
            <p className="text-xl text-secondary-foreground mb-8">
              Scout uses advanced camera technology and AI to help visually impaired people navigate stores and find products independently.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Pre-order Scout
            </Button>
          </div>
          <div className="flex-1 [perspective:1000px]">
            <div 
              className={`relative transition-transform duration-1000 w-full h-[400px] [transform-style:preserve-3d] cursor-pointer ${
                isFlipped ? '[transform:rotateY(180deg)]' : ''
              }`}
              onMouseEnter={handleMouseEnter}
            >
              {/* Front side */}
              <img
                src="/lovable-uploads/c10291cb-fe20-428a-a4fe-a3daad8e7de6.png"
                alt="Scout device with camera and speaker"
                className="absolute w-full h-full object-contain rounded-lg shadow-xl [backface-visibility:hidden]"
              />
              {/* Back side */}
              <img
                src="/lovable-uploads/b429e96d-cb4c-4c8b-991f-2d30eb2bf597.png"
                alt="Scout device in action detecting products"
                className="absolute w-full h-full object-contain rounded-lg shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
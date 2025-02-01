import { useEffect, useRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EyeCursor = () => {
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const eye = eyeRef.current;
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(5, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 20);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      eye.style.setProperty('--mouse-x', `${x}px`);
      eye.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="fixed left-1/2 transform -translate-x-1/2 top-20 z-[9999] cursor-help">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <div 
                ref={eyeRef}
                className="w-4 h-4 bg-primary rounded-full animate-eye-follow"
              />
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-white p-4 shadow-lg rounded-lg">
        <div className="space-y-2">
          <p className="font-semibold text-primary">Contact Scout</p>
          <p className="text-sm">Email: info@scoutdevice.com</p>
          <p className="text-sm">Phone: (555) 123-4567</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default EyeCursor;
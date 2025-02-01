import { useEffect, useRef } from 'react';

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
    <div className="fixed top-4 right-4 z-50">
      <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
          <div 
            ref={eyeRef}
            className="w-4 h-4 bg-primary rounded-full animate-eye-follow"
          />
        </div>
      </div>
    </div>
  );
};

export default EyeCursor;
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Scout has completely transformed my shopping experience. I can now confidently navigate stores and find exactly what I need.",
    author: "Sarah M.",
    role: "Scout User",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop"
  },
  {
    quote: "The accuracy of product recognition is incredible. It's like having a personal shopping assistant with me at all times.",
    author: "Michael R.",
    role: "Beta Tester",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop"
  },
  {
    quote: "As someone who lost sight later in life, Scout helps me maintain my shopping routine with confidence.",
    author: "Patricia L.",
    role: "Scout User",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop"
  },
  {
    quote: "The voice feedback is clear and the interface is so intuitive. Scout has made shopping enjoyable again.",
    author: "James K.",
    role: "Scout User",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop"
  },
  {
    quote: "I appreciate how Scout helps me identify products and read labels. It's given me back my independence.",
    author: "Emily W.",
    role: "Scout User",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop"
  },
  {
    quote: "The team behind Scout really understands our needs. This device is a game-changer for the visually impaired community.",
    author: "David H.",
    role: "Accessibility Advocate",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop"
  }
];

const TestimonialsPage = () => {
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("opacity-0", "translate-y-10", "rotate-y-90");
              entry.target.classList.add("opacity-100", "translate-y-0", "rotate-y-0");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px",
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
          Testimonials
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Hear from our users about how Scout has transformed their shopping experience
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (observerRefs.current[index] = el)}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-1000 opacity-0 translate-y-10 rotate-y-90 hover:scale-105 hover:rotate-y-[-5deg] perspective-1000"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="mb-4 relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full transform -rotate-6 scale-110"></div>
                <Avatar className="w-16 h-16 mx-auto relative z-10">
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-lg italic text-gray-700 mb-4 relative z-10">"{testimonial.quote}"</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-primary">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
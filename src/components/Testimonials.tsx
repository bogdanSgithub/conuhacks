import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Scout has given me back my independence when shopping. I no longer need to rely on others for help.",
    author: "Sarah M.",
    role: "Scout User",
  },
  {
    quote: "The accuracy of product recognition is incredible. It's like having a personal shopping assistant.",
    author: "Michael R.",
    role: "Beta Tester",
  },
  {
    quote: "As someone who lost sight later in life, Scout helps me maintain my shopping routine with confidence.",
    author: "Patricia L.",
    role: "Scout User",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.author}
              className="animate-fade-up border-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <p className="text-lg italic text-secondary-foreground">{testimonial.quote}</p>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-primary">{testimonial.author}</p>
                <p className="text-sm text-secondary-foreground">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
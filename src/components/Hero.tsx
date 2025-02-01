import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Shopping Independence for the Visually Impaired
            </h1>
            <p className="text-xl text-secondary mb-8">
              Scout uses advanced camera technology and AI to help visually impaired people navigate stores and find products independently.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Pre-order Scout
            </Button>
          </div>
          <div className="flex-1">
            <img
              src="/placeholder.svg"
              alt="Scout device being used in a store"
              className="rounded-lg shadow-xl animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
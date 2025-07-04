import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export const Cta4 = ({
  title = "Get Interview-Ready with AI-Powered Practise & Feedback",
  description = "Practise real interview questions and get started.",
  buttonText = "Start an Interview",
  buttonUrl = "/phases/interview-prep/generate-interview",
}: Cta4Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
              <div className="md:w-1/2">
                <h4 className="mb-1 text-2xl font-bold md:text-3xl">{title}</h4>
                <p className="text-muted-foreground">{description}</p>
                <Button className="mt-6" asChild>
                  <a href={buttonUrl}>
                    {buttonText} <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
              <Image
        src="/robot.png"
        alt="robo-dude"
        width={400}
        height={400}
      />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

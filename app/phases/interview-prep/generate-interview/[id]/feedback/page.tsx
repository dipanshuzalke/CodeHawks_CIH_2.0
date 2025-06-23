import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
// Optionally import RouteParams type for clarity
// import type { RouteParams } from "@/types";

const Feedback = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch interview and feedback data from API
  const interviewRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/interview?userId=&interviewId=${id}`);
  const interviewData = await interviewRes.json();
  const interview = interviewData.interviews?.[0] || null;
  const feedback = interviewData.feedbacks?.[0] || null;

  if (!interview) redirect("/phases/interview-prep");

  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center mt-3 ">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression: {" "}
              <span className="text-primary-200 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2 ">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div className="mx-auto max-w-6xl py-4">
        <p>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4 mt-3">
        <h2 className="text-3xl">Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category: { name: string; score: number; comment: string }, index: number) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-3xl">Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength: string, index: number) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <h3 className="text-3xl">Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area: string, index: number) => (
            <li key={index} className="mt-1">{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons py-6 flex gap-4">
        <Button className="btn-secondary">
          <Link href="/phases/interview-prep" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary">
          <Link
            href={`/interview-prep/generate-interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
      </div>
    </section>
  );
};

export default Feedback;

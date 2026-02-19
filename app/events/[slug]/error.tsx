"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function EventError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Event page error:", error);
  }, [error]);

  return (
    <section id="event" className="flex-center min-h-[60vh]">
      <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl">Oops!</h1>
          <h2 className="text-xl text-light-100">
            Something went wrong loading this event
          </h2>
        </div>

        <p className="text-light-200 text-sm">
          We encountered an unexpected error while trying to load the event
          details. This might be a temporary issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 cursor-pointer rounded-[6px] px-6 py-3 text-lg font-semibold text-black transition-colors"
          >
            Try again
          </button>

          <Link
            href="/"
            className="border-dark-200 bg-dark-100 border rounded-[6px] px-6 py-3 text-lg font-semibold text-light-100 hover:bg-dark-200 transition-colors text-center"
          >
            Go home
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <details className="mt-6 w-full text-left">
            <summary className="text-light-200 text-sm cursor-pointer hover:text-light-100">
              Technical details
            </summary>
            <pre className="mt-2 p-4 bg-dark-200 rounded-md text-xs text-red-400 overflow-auto max-h-40">
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </section>
  );
}

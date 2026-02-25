"use client";
import Link from "next/link";

export default function MatchesPage() {
  return (
    <main className="h-screen flex flex-col bg-black p-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 min-h-0">
        <div className="flex-shrink-0 mb-4">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            ← Back to home
          </Link>
        </div>
        <div className="rounded-2xl overflow-hidden bg-gray-200 flex-1 min-h-0 relative">
          <iframe
            src="https://challonge.com/g0kzqgyw/module"
            width="100%"
            height="100%"
            title="Tournament Bracket - Challonge"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </main>
  );
}

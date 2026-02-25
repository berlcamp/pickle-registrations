/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'

export default function Home() {
  return (
    // <main className="min-h-screen bg-linear-to-br from-blue-900 via-green-900 to-blue-800 text-white p-6">
    <main className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto bg-gray-100 text-black backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-10">
        {/* Banner */}
        <img
          src="/banner4.jpeg"
          alt="Pickleball Tournament Banner"
          className="rounded-2xl mb-6"
        />

        <h1 className="text-xl md:text-4xl font-bold text-center mb-2">
          Pickleball Tournament Registration
        </h1>
        <p className="text-center text-base opacity-80 mb-6">
          February 27–28, 2026 • Podlike Pickleball Court, Tangub City
        </p>
        <div className="text-center mb-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/guidelines"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition cursor-pointer"
          >
            📋 View Tournament Guidelines
          </Link>
          <Link
            href="/matches"
            className="inline-block bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-500 transition cursor-pointer"
          >
            🏆 View Bracket / Matches
          </Link>
        </div>

        <p className="text-center text-lg font-semibold text-gray-700">
          Registration is now closed.
        </p>
      </div>
    </main>
  )
}

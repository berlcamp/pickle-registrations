/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export default function PickleballGuidelinesPage() {
  return (
    <main className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto bg-gray-100 text-black backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-10">
        {/* Banner */}
        <img
          src="/banner4.jpeg"
          alt="Pickleball Tournament Banner"
          className="rounded-2xl mb-6"
        />

        <h1 className="text-xl md:text-4xl font-bold text-center mb-2">
          🏓 WMR-XXII Tangub City Eagles Club Pickleball Tournament – Official Guidelines
        </h1>
        <p className="text-center text-base opacity-80 mb-6">
          To ensure fair play and an enjoyable tournament for everyone, all participants are required to read and follow the official tournament rules below:
        </p>

        <div className="space-y-6">
          {/* Tournament Category */}
          <section className="bg-gray-300 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">
              🎯 1. Tournament Category
            </h2>
            <p className="text-gray-700 mb-2">
              This tournament is <strong>EXCLUSIVE FOR BEGINNER CATEGORY PLAYERS ONLY</strong>.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Players classified as Intermediate or higher level are <strong>NOT allowed</strong> to join.</li>
              <li>The organizers reserve the right to evaluate and validate player skill level.</li>
              <li>Players with champion history in the beginner category can only partner with players without podium history.</li>
            </ul>
          </section>

          {/* Non-Gender Tournament Policy */}
          <section className="bg-gray-300 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">👥 2. Non-Gender Tournament Policy</h2>
            <p className="text-gray-700 mb-2">
              This is a <strong>NON-GENDER CATEGORY TOURNAMENT</strong>.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>All registered teams will compete regardless of gender.</li>
              <li>Male–Male, Female–Female, and Mixed (Male–Female) teams are all allowed.</li>
            </ul>
          </section>

          {/* No Sandbagging Policy */}
          <section className="bg-gray-300 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">🚫 3. No Sandbagging Policy</h2>
            <p className="text-gray-700 mb-2">
              Sandbagging is <strong>STRICTLY PROHIBITED</strong>.
            </p>
            <p className="text-gray-700 mb-2">
              If a registered player is found to be above Beginner category during the tournament, the team will be:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>❌ Automatically <strong>DISQUALIFIED</strong></li>
              <li>❌ <strong>NO REFUND</strong> will be given</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Tournament Management has the final authority to assess and classify player levels.
            </p>
          </section>

          {/* Partner Change Policy */}
          <section className="bg-gray-300 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">🔁 4. Partner Change Policy</h2>
            <p className="text-gray-700 mb-2">
              Changing partners is <strong>ALLOWED</strong> only with Management approval.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Partner change requests must be submitted <strong>BEFORE</strong> the final match schedules are posted.</li>
              <li>Once the final match schedules are released:</li>
              <li className="ml-4">❌ No partner changes will be allowed.</li>
            </ul>
          </section>

          {/* Attendance & Punctuality */}
          <section className="bg-gray-300 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">⏰ 5. Attendance & Punctuality</h2>
            <p className="text-gray-700 mb-2">
              Teams will <strong>forfeit/default</strong> if called to play but are not present at the scheduled match time.
            </p>
          </section>

          {/* Liability & Accident Waiver */}
          <section className="bg-gray-300 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">⚠️ 6. Liability & Accident Waiver</h2>
            <p className="text-gray-700 mb-2">
              By participating in this tournament, all players acknowledge and agree:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>The tournament organizers do <strong>NOT</strong> have any responsibility or liability for any accidents, injuries, or incidents that occur during the game.</li>
              <li>All participants play at their own risk and are responsible for their own safety and well-being.</li>
              <li>The tournament organizers are not liable for any loss, damage, or injury sustained during the tournament.</li>
            </ul>
          </section>

          {/* Back to Registration Link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-500 transition cursor-pointer"
            >
              Back to Registration
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

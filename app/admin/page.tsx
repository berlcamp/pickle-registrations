/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "wmr2026";

interface Registration {
  id: string;
  player_a_fullname: string;
  player_a_address: string;
  player_a_contact: string;
  player_a_tshirt_size: string;
  player_a_facebook: string;
  player_b_fullname: string;
  player_b_address: string;
  player_b_contact: string;
  player_b_tshirt_size: string;
  player_b_facebook: string;
  approval_code: string;
  proof_of_payment_url: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Check if already authenticated (persist across page refreshes)
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchRegistrations();
    }
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [selectedImage]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      fetchRegistrations();
      setPassword("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setRegistrations([]);
  };

  const fetchRegistrations = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from("pickle_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
        alert("Error loading registrations: " + error.message);
      } else {
        setRegistrations(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred");
    } finally {
      setFetching(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-100 text-black backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Enter password to view registrations
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter admin password"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Access Admin Panel"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[95vw] mx-auto">
        {/* Action Bar */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{registrations.length}</span>{" "}
            registrations
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchRegistrations}
              disabled={fetching}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {fetching ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Table */}
        {fetching && registrations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600">Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600">No registrations found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Approval Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Player A
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Player A Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Player A T-Shirt
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Player B
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Player B Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Player B T-Shirt
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Proof
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((reg, index) => (
                    <tr
                      key={reg.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(reg.created_at)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">
                          {reg.approval_code}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="font-medium">
                          {reg.player_a_fullname}
                        </div>
                        <div className="text-xs text-gray-500">
                          {reg.player_a_address}
                        </div>
                        <div className="text-xs text-gray-500">
                          FB: {reg.player_a_facebook}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {reg.player_a_contact}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {reg.player_a_tshirt_size}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="font-medium">
                          {reg.player_b_fullname}
                        </div>
                        <div className="text-xs text-gray-500">
                          {reg.player_b_address}
                        </div>
                        <div className="text-xs text-gray-500">
                          FB: {reg.player_b_facebook}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {reg.player_b_contact}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {reg.player_b_tshirt_size}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {reg.proof_of_payment_url ? (
                          <button
                            onClick={() =>
                              setSelectedImage(reg.proof_of_payment_url)
                            }
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-xs font-medium"
                          >
                            View
                          </button>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No proof
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold"
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Proof of payment"
                className="max-w-full max-h-[90vh] mx-auto rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

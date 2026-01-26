/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    player_a_fullname: '',
    player_a_address: '',
    player_a_contact: '',
    player_a_tshirt_size: '',
    player_a_facebook: '',

    player_b_fullname: '',
    player_b_address: '',
    player_b_contact: '',
    player_b_tshirt_size: '',
    player_b_facebook: ''
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setErrorMsg('')

    if (!proofFile) {
      setErrorMsg('❌ Please upload proof of payment before submitting.')
      return
    }
    setLoading(true)

    let proofUrl = null

    if (proofFile) {
      const fileExt = proofFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('pickle_payments')
        .upload(fileName, proofFile)

      if (uploadError) {
        alert('Upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: publicData } = supabase.storage
        .from('pickle_payments')
        .getPublicUrl(fileName)

      proofUrl = publicData.publicUrl
    }

    const { error } = await supabase.from('pickle_registrations').insert({
      ...form,
      proof_of_payment_url: proofUrl
    })

    if (!error) setSuccess(true)
    else alert(error.message)

    setLoading(false)
  }

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

        <form onSubmit={handleSubmit}>
          {!success && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* PLAYER A */}
              <section className="bg-gray-300 p-4 rounded-xl">
                <h2 className="font-semibold text-xl mb-3">Player A</h2>
                <Input
                  label="Full Name"
                  name="player_a_fullname"
                  onChange={handleChange}
                />
                <Input
                  label="Address"
                  name="player_a_address"
                  onChange={handleChange}
                />
                <Input
                  label="Contact Number"
                  name="player_a_contact"
                  onChange={handleChange}
                />
                <Select
                  label="T-Shirt Size"
                  name="player_a_tshirt_size"
                  onChange={handleChange}
                />
                <Input
                  label="Facebook Name"
                  name="player_a_facebook"
                  onChange={handleChange}
                />
              </section>

              {/* PLAYER B */}
              <section className="bg-gray-300 p-4 rounded-xl">
                <h2 className="font-semibold text-xl mb-3">Player B</h2>
                <Input
                  label="Full Name"
                  name="player_b_fullname"
                  onChange={handleChange}
                />
                <Input
                  label="Address"
                  name="player_b_address"
                  onChange={handleChange}
                />
                <Input
                  label="Contact Number"
                  name="player_b_contact"
                  onChange={handleChange}
                />
                <Select
                  label="T-Shirt Size"
                  name="player_b_tshirt_size"
                  onChange={handleChange}
                />
                <Input
                  label="Facebook Name"
                  name="player_b_facebook"
                  onChange={handleChange}
                />
              </section>

              <section className="bg-gray-300 p-4 rounded-xl">
                <div>
                  <h2 className="font-semibold text-lg mb-3">Pay with GCash</h2>
                  <Image
                    src="/gcashqr.jpg"
                    alt="GCash"
                    width={200}
                    height={100}
                  />
                </div>
              </section>
              <section className="bg-gray-300 p-4 rounded-xl">
                <div>
                  <h2 className="font-semibold text-xl mb-3">
                    Proof of Payment
                  </h2>
                  <label
                    htmlFor="proofUpload"
                    className="inline-block cursor-pointer bg-gray-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                  >
                    Click here to upload proof of payment
                  </label>
                  <input
                    id="proofUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  {proofFile && (
                    <p className="text-sm mt-2 text-green-300">
                      Selected: {proofFile.name}
                    </p>
                  )}

                  {errorMsg && (
                    <p className="text-red-400 font-semibold mt-2">
                      {errorMsg}
                    </p>
                  )}
                </div>
              </section>

              <button
                type="submit"
                disabled={loading}
                className="col-span-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-500 transition cursor-pointer"
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          )}
          {success && (
            <p className="col-span-full text-green-300 text-2xl font-semibold text-center">
              Registration submitted successfully!
            </p>
          )}
        </form>
      </div>
    </main>
  )
}

// ===============================
// 4) REUSABLE INPUT COMPONENTS
// ===============================
function Input({ label, name, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="text-base block mb-1">{label}</label>
      <input
        name={name}
        placeholder={label}
        required
        onChange={onChange}
        className="w-full p-2 rounded bg-gray-100 border border-white/20 focus:outline-none"
      />
    </div>
  )
}

function Select({ label, name, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="text-sm block mb-1">{label}</label>
      <select
        name={name}
        required
        onChange={onChange}
        className="w-full p-2 rounded bg-gray-100 border-white/20 focus:outline-none"
      >
        <option value="">Select size</option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
      </select>
    </div>
  )
}

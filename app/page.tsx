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
    player_b_facebook: '',

    approval_code: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation functions
  const validateFullName = (name: string): string => {
    if (!name.trim()) return 'Full name is required'
    if (name.trim().length < 2) return 'Full name must be at least 2 characters'
    if (name.trim().length > 100) return 'Full name must be less than 100 characters'
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) return 'Full name can only contain letters, spaces, hyphens, and apostrophes'
    return ''
  }

  const validateAddress = (address: string): string => {
    if (!address.trim()) return 'Address is required'
    if (address.trim().length < 5) return 'Address must be at least 5 characters'
    if (address.trim().length > 200) return 'Address must be less than 200 characters'
    return ''
  }

  const validateContact = (contact: string): string => {
    if (!contact.trim()) return 'Contact number is required'
    if (contact.trim().length < 3) return 'Contact number must be at least 3 characters'
    return ''
  }

  const validateTShirtSize = (size: string): string => {
    if (!size) return 'T-shirt size is required'
    const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    if (!validSizes.includes(size)) return 'Please select a valid t-shirt size'
    return ''
  }

  const validateFacebook = (facebook: string): string => {
    if (!facebook.trim()) return 'Facebook name is required'
    if (facebook.trim().length < 2) return 'Facebook name must be at least 2 characters'
    if (facebook.trim().length > 100) return 'Facebook name must be less than 100 characters'
    return ''
  }

  const validateApprovalCode = (code: string): string => {
    if (!code.trim()) return 'Approval code is required'
    if (code.trim().length < 4) return 'Approval code must be at least 4 characters'
    if (code.trim().length > 50) return 'Approval code must be less than 50 characters'
    return ''
  }

  const validateFile = (file: File | null): string => {
    if (!file) return 'Proof of payment is required'
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)'
    }
    return ''
  }

  const validateField = (name: string, value: string) => {
    let error = ''
    
    if (name.includes('fullname')) {
      error = validateFullName(value)
    } else if (name.includes('address')) {
      error = validateAddress(value)
    } else if (name.includes('contact')) {
      error = validateContact(value)
    } else if (name.includes('tshirt_size')) {
      error = validateTShirtSize(value)
    } else if (name.includes('facebook')) {
      error = validateFacebook(value)
    } else if (name === 'approval_code') {
      error = validateApprovalCode(value)
    }

    setErrors(prev => ({ ...prev, [name]: error }))
    return error === ''
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e: any) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setErrorMsg('')

    // Validate all fields
    const fieldValidations = [
      validateField('player_a_fullname', form.player_a_fullname),
      validateField('player_a_address', form.player_a_address),
      validateField('player_a_contact', form.player_a_contact),
      validateField('player_a_tshirt_size', form.player_a_tshirt_size),
      validateField('player_a_facebook', form.player_a_facebook),
      validateField('player_b_fullname', form.player_b_fullname),
      validateField('player_b_address', form.player_b_address),
      validateField('player_b_contact', form.player_b_contact),
      validateField('player_b_tshirt_size', form.player_b_tshirt_size),
      validateField('player_b_facebook', form.player_b_facebook),
      validateField('approval_code', form.approval_code),
    ]

    const fileError = validateFile(proofFile)
    if (fileError) {
      setErrorMsg(`❌ ${fileError}`)
    }

    // Check if all validations passed
    const allValid = fieldValidations.every(valid => valid) && !fileError

    if (!allValid) {
      setErrorMsg('❌ Please fix all validation errors before submitting.')
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
                  value={form.player_a_fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_a_fullname}
                />
                <Input
                  label="Address"
                  name="player_a_address"
                  value={form.player_a_address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_a_address}
                />
                <Input
                  label="Contact Number"
                  name="player_a_contact"
                  value={form.player_a_contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_a_contact}
                />
                <Select
                  label="T-Shirt Size"
                  name="player_a_tshirt_size"
                  value={form.player_a_tshirt_size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_a_tshirt_size}
                />
                <Input
                  label="Facebook Name"
                  name="player_a_facebook"
                  value={form.player_a_facebook}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_a_facebook}
                />
              </section>

              {/* PLAYER B */}
              <section className="bg-gray-300 p-4 rounded-xl">
                <h2 className="font-semibold text-xl mb-3">Player B</h2>
                <Input
                  label="Full Name"
                  name="player_b_fullname"
                  value={form.player_b_fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_b_fullname}
                />
                <Input
                  label="Address"
                  name="player_b_address"
                  value={form.player_b_address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_b_address}
                />
                <Input
                  label="Contact Number"
                  name="player_b_contact"
                  value={form.player_b_contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_b_contact}
                />
                <Select
                  label="T-Shirt Size"
                  name="player_b_tshirt_size"
                  value={form.player_b_tshirt_size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_b_tshirt_size}
                />
                <Input
                  label="Facebook Name"
                  name="player_b_facebook"
                  value={form.player_b_facebook}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.player_b_facebook}
                />
              </section>

              <section className="bg-gray-300 p-4 rounded-xl col-span-full">
                <h2 className="font-semibold text-xl mb-3">
                  Registration Approval Code
                </h2>
                <Input
                  label="Approval Code"
                  name="approval_code"
                  value={form.approval_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.approval_code}
                />
                <p className="text-sm text-gray-600 mt-2">
                  Please get your approval code from <strong>Steven Nowel Casilang</strong> or <strong>Berl Campomanes</strong> on Facebook.
                </p>
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
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setProofFile(file)
                      if (file) {
                        const fileError = validateFile(file)
                        if (fileError) {
                          setErrorMsg(`❌ ${fileError}`)
                        } else {
                          setErrorMsg('')
                        }
                      } else {
                        setErrorMsg('')
                      }
                    }}
                    className="hidden"
                  />
                  {proofFile && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600 font-semibold">
                        ✓ Selected: {proofFile.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Size: {(proofFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  {errorMsg && (
                    <p className="text-red-600 font-semibold mt-2">
                      {errorMsg}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-2">
                    Accepted formats: JPEG, PNG, GIF, WebP
                  </p>
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
function Input({ label, name, value, onChange, onBlur, error, placeholder }: any) {
  return (
    <div className="mb-3">
      <label className="text-base block mb-1">{label}</label>
      <input
        name={name}
        value={value}
        placeholder={placeholder || label}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full p-2 rounded bg-gray-100 border-2 ${
          error ? 'border-red-500' : 'border-white/20'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

function Select({ label, name, value, onChange, onBlur, error }: any) {
  return (
    <div className="mb-3">
      <label className="text-sm block mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full p-2 rounded bg-gray-100 border-2 ${
          error ? 'border-red-500' : 'border-white/20'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value="">Select size</option>
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
      </select>
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

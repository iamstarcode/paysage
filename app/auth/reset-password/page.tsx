"use client"

import { useState } from "react"

//import { useRouter } from "next/router"

///import { supabase } from "../utils/initSupabase"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  //const router = useRouter()
  //const { access_token: accessToken } = router.query

  const handleResetPassword = async (event: any) => {
    event.preventDefault()
    /*   

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.api.updateUser(accessToken, {
        password,
      })

      if (error) {
        throw error
      }

      router.push("/login")
    } catch (error) {
      console.error("Error resetting password:", error)
      setError(error.error_description || error.message)
    } finally {
      setLoading(false)
    } */
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          Reset Password
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

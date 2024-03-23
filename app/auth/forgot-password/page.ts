import { useState } from 'react'
import { createClient } from "@/utils/supabase/server"

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleResetPassword = async (event) => {
    event.preventDefault()

    try {
      await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      setSuccess(true)
    } catch (error) {
      console.error('Error sending reset password email:', error)
      setError(error.error_description || error.message)
    }
  }

  return (
    <div>
      <h1>Forgot Password</h1>
      {success ? (
        <p>
          A password reset link has been sent to your email address. Please
          follow the instructions in the email to reset your password.
        </p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <button type="submit">Reset Password</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  )
}
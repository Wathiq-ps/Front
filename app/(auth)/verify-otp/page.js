'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { useLang } from '@/context/LanguageContext'
import { requestOtp, verifyOtp } from '@/features/auth/services/authService'
import { getAuthErrorKey } from '@/features/auth/services/authErrors'

function VerifyOtpContent() {
  const { t } = useLang(); const router = useRouter(); const params = useSearchParams()
  const email = params.get('email') || ''; const [code, setCode] = useState(''); const [loading, setLoading] = useState(false); const [resending, setResending] = useState(false); const [error, setError] = useState(''); const [seconds, setSeconds] = useState(0); const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { if (!seconds) return; const timer = setInterval(() => setSeconds(v => v - 1), 1000); return () => clearInterval(timer) }, [seconds])
  const submit = async e => {
    e.preventDefault()
    if (code.length !== 6) {
      setError('otpInvalid')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await verifyOtp(email, code)
      if (data.user?.role === 'admin') {
        router.replace('/dashboard')
        return
      }
      // User Dashboard - مش مجهزها حاليا
    }
     catch (e) {
        console.log('OTP ERROR:', e)
      setError(getAuthErrorKey(e))
    } finally {
      setLoading(false)
    }
  }
  const resend = async () => { if (seconds || !email) return; setResending(true); setError(''); 
    try {
      await requestOtp(email)
      setCode('')
      inputRef.current?.focus()
      setSeconds(60)
    } catch (e) { setError(getAuthErrorKey(e)) } finally { setResending(false) } }
  return <AuthLayout>
    <div className="mb-9 text-start">
      <h2 className="mb-2.5 font-sans text-[30px] font-bold leading-[1.2] text-ink">
        {t.otpTitle}
        </h2>
        <p className="m-0 font-sans text-[15px] leading-[1.8] text-ink-subtle">
          {t.otpSub}{' '}
          <strong className="text-brand-navy">{email}</strong>
          </p>
          </div>
    {error && (
   <div
     role="alert"
     className="mb-[18px] rounded-xl bg-danger-bg px-3.5 py-[11px] text-start font-sans text-[13px] text-danger"
   >
     {t.errors[error] || t.errors.generic}
   </div>
 )}
    <form onSubmit={submit} className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-2">
        <label htmlFor="otp" className="font-sans text-[13.5px] font-semibold text-ink">
          {t.otpLabel}
        </label>
        <input id="otp" ref={inputRef} inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={e => {setCode(e.target.value.replace(/\D/g, '').slice(0, 6));setError('')}} placeholder="••••••" className={`box-border w-full rounded-xl border-[1.5px] px-4 py-3.5 text-center font-sans text-[22px] tracking-[0.35em] text-ink outline-none transition-[border-color,background-color,box-shadow] duration-150 ${
           error
           ? 'border-danger bg-surface-error focus:border-danger focus:ring-[3px] focus:ring-danger/12'
           : 'border-border-strong bg-surface-input focus:border-brand-navy focus:bg-white focus:ring-[3px] focus:ring-brand-navy/10'}`} />
      </div>
      <Button type="submit" size="full" disabled={loading || code.length !== 6}>{loading ? <><Spinner size={16} /> {t.verifyingOtp}</> : t.verifyBtn}</Button>
      <div className="text-center font-sans text-[13.5px] text-ink-subtle">
        <button type="button" onClick={resend} disabled={resending || seconds > 0} className="border-0 bg-transparent font-sans font-semibold text-brand-navy transition-colors duration-150 hover:text-brand-navy-hover disabled:cursor-default disabled:text-ink-faint">{resending ? t.sendingOtp : seconds ? `${t.resendOtp} (${seconds})` : t.resendOtp}</button>
        <span className="mx-2">·</span><button type="button" onClick={() => router.push('/login')} className="border-0 bg-transparent font-sans text-ink-muted transition-colors duration-150 hover:text-ink">{t.changeEmail}</button>
      </div>
    </form>
  </AuthLayout>
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpContent />
    </Suspense>
  )
}
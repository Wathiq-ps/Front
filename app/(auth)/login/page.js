'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Mail } from 'lucide-react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { useLang } from '@/context/LanguageContext'
import { requestOtp } from '@/features/auth/services/authService'

export default function LoginPage() {
  const { t } = useLang()
  const router = useRouter()
  const [loading, setLoading] = useState(false); const [apiError, setApiError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async ({ email }) => {
    setLoading(true); setApiError('')
    try { await requestOtp(email); router.push(`/verify-otp?email=${encodeURIComponent(email)}`) }
    catch (e) { setApiError(e.message) } finally { setLoading(false) }
  }
  return <AuthLayout>
    <div className="mb-9 text-start">
      <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1.2, marginBottom: 10, fontFamily: 'var(--font-family-base)' }}>{t.loginTitle}</h2>
      <p style={{ fontSize: 15, color: 'var(--color-ink-subtle)', fontFamily: 'var(--font-family-base)' }}>{t.loginSub}</p>
    </div>
    {apiError && (
      <div
      role="alert"
      className="mb-[18px] rounded-xl bg-danger-bg px-3.5 py-[11px] text-start font-sans text-[13px] text-danger"
      >
        {apiError}
        </div>
      )}
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[22px]">
      <Input label={t.email} type="email" placeholder={t.emailPh} iconStart={<Mail size={17} />} error={errors.email?.message} {...register('email', { required: t.errors.emailRequired, pattern: {value: /^\S+@\S+\.\S+$/, message: t.errors.emailInvalid,} })} />
      <div className="mt-1.5">
        <Button type="submit" size="full" disabled={loading}>
          {loading ? (
            <>
            <Spinner size={16} />
            {t.sendingOtp}
            </>
            ) : (
              t.continueBtn
              )}
              </Button>
              </div>
              </form>
              </AuthLayout>
              }

'use client'

import { Check, XCircle } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/components/ui/Card'
import { useLang } from '@/context/LanguageContext'

export function VerificationDecisionCard({
  status,
  onApprove,
  onReject,
}) {
  const { t } = useLang()

  const [decisionModal, setDecisionModal] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultModal, setResultModal] = useState(null)
  const [resultMessage, setResultMessage] = useState('')

  const closeModal = () => {
    if (isSubmitting) return

    setDecisionModal(null)
    setRejectionReason('')
  }

  const handleApprove = async () => {
    try {
      setIsSubmitting(true)

      await onApprove()

      setDecisionModal(null)
      setResultMessage(t.verificationCenter.approveSuccess)
      setResultModal('success')
    } catch (error) {
      setDecisionModal(null)
      setResultMessage(
        error.message || t.verificationCenter.decisionError,
      )
      setResultModal('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    const reason = rejectionReason.trim()

    if (!reason) return

    try {
      setIsSubmitting(true)

      await onReject(reason)

      setDecisionModal(null)
      setRejectionReason('')
      setResultMessage(t.verificationCenter.rejectSuccess)
      setResultModal('success')
    } catch (error) {
      setDecisionModal(null)
      setResultMessage(
        error.message || t.verificationCenter.decisionError,
      )
      setResultModal('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isCompleted =
    status === 'approved' || status === 'rejected'

  return (
    <>
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-brand-navy">
              {t.verificationCenter.reviewDecision}
            </h2>

            <p className="mt-1 text-sm text-ink-faint">
              {t.verificationCenter.reviewDecisionDescription}
            </p>
          </div>

          {!isCompleted && (
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => setDecisionModal('approve')}
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={17} aria-hidden="true" />
                {t.verificationCenter.approve}
              </button>

              <button
                type="button"
                onClick={() => {
                  setRejectionReason('')
                  setDecisionModal('reject')
                }}
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle size={17} aria-hidden="true" />
                {t.verificationCenter.reject}
              </button>
            </div>
          )}
        </div>
      </Card>

      {decisionModal === 'approve' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="approve-dialog-title"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="approve-dialog-title"
              className="text-[20px] font-bold text-brand-navy"
            >
              {t.verificationCenter.approveConfirmTitle}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ink-muted">
              {t.verificationCenter.approveConfirmDescription}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="cursor-pointer rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.common.cancel}
              </button>

              <button
                type="button"
                onClick={handleApprove}
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={16} aria-hidden="true" />
                {isSubmitting
                  ? t.verificationCenter.processing
                  : t.verificationCenter.approve}
              </button>
            </div>
          </div>
        </div>
      )}

      {decisionModal === 'reject' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reject-dialog-title"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[480px] rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="reject-dialog-title"
              className="text-[20px] font-bold text-brand-navy"
            >
              {t.verificationCenter.rejectConfirmTitle}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ink-muted">
              {t.verificationCenter.rejectConfirmDescription}
            </p>

            <label
              htmlFor="rejection-reason"
              className="mt-5 block text-sm font-semibold text-ink"
            >
              {t.verificationCenter.rejectionReason}
            </label>

            <textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(event) => setRejectionReason(event.target.value)}
              rows={4}
              disabled={isSubmitting}
              className="mt-2 w-full resize-none rounded-lg border border-border bg-white p-3 text-sm text-ink outline-none transition-colors focus:border-brand-navy disabled:cursor-not-allowed disabled:bg-surface-1"
              placeholder={t.verificationCenter.rejectionReasonPlaceholder}
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="cursor-pointer rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.common.cancel}
              </button>

              <button
                type="button"
                disabled={!rejectionReason.trim() || isSubmitting}
                onClick={handleReject}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle size={16} aria-hidden="true" />
                {isSubmitting
                  ? t.verificationCenter.processing
                  : t.verificationCenter.reject}
              </button>
            </div>
          </div>
        </div>
      )}

      {resultModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="decision-result-title"
          onClick={() => setResultModal(null)}
        >
          <div
            className="w-full max-w-[420px] rounded-xl bg-white p-6 text-center shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                resultModal === 'success'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {resultModal === 'success' ? (
                <Check size={24} aria-hidden="true" />
              ) : (
                <XCircle size={24} aria-hidden="true" />
              )}
            </div>

            <h2
              id="decision-result-title"
              className="mt-4 text-[20px] font-bold text-brand-navy"
            >
              {resultModal === 'success'
                ? t.verificationCenter.success
                : t.verificationCenter.error}
            </h2>

            <p className="mt-2 text-sm leading-6 text-ink-muted">
              {resultMessage}
            </p>

            <button
              type="button"
              onClick={() => setResultModal(null)}
              className="mt-6 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
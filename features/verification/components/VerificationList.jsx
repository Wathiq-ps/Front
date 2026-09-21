'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search, SlidersHorizontal, BadgeCheck, Clock3 } from 'lucide-react'
import { verificationRequests } from '@/features/verification/data/verificationMock'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useLang } from '@/context/LanguageContext'
import {
  getVerificationColumns,
  getVerificationConfig,
  getTotalVerificationCount,
} from '@/features/verification/config/verification.config'

import { renderVerificationCell } from '@/features/verification/utils/verification.formatters'
import { getSearchableText } from '@/features/verification/utils/verification.formatters'

import { VerificationBreadcrumbs } from './VerificationBreadcrumbs'
import { VerificationTabs } from './VerificationTabs'

const ITEMS_PER_PAGE = 5

const SEARCH_FIELDS = {
  identity: ['id', 'documentNumber', 'email'],
  property: ['id', 'name', 'city'],
  lawyers: ['id', 'name', 'licenseNumber'],
}

export function VerificationList({ type }) {
  const { locale, t } = useLang()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const [identityRequests, setIdentityRequests] = useState([])
  const [identityMeta, setIdentityMeta] = useState({
    total: 0,
    currentPage: 1,
    lastPage: 1,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const config = getVerificationConfig(type)
  const requests =
  config.key === 'identity'
    ? identityRequests
    : (verificationRequests[config.key] ?? []).sort(
        (a, b) => new Date(a.submittedAt) - new Date(b.submittedAt),
      )
  useEffect(() => {
  if (config.key !== 'identity') return

  const fetchIdentityRequests = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/verification/identity?page=${currentPage}`,)

      if (!response.ok) {
        throw new Error(`Failed to fetch identity verification requests`)
      }

      const result = await response.json()

      console.log('IDENTITY API RESPONSE:', result)

      const items = Array.isArray(result)
        ? result
        : result.data ?? []

      if (!Array.isArray(result)) {
        setIdentityMeta({
          total: result.meta?.total ?? 0,
          currentPage: result.meta?.current_page ?? 1,
          lastPage: result.meta?.last_page ?? 1,
        })
      }

      const mappedRequests = items.map((item) => ({
        id: item.id,
        documentNumber: item.document_number,
        status: item.status,
        submittedAt: item.submitted_at,
        email: item.user?.email ?? '',
        phone: item.user?.phone ?? '',
        type: item.type,
      }))
      setIdentityRequests(mappedRequests)
    } catch (err) {
      console.error('Failed to fetch identity verification requests:', err)
      setError(err.message)
      setIdentityRequests([])

      setIdentityMeta({
        total: 0,
        currentPage: 1,
        lastPage: 1,
      })
    } finally {
      setIsLoading(false)
    }
  }
  fetchIdentityRequests()
}, [config.key, currentPage])
  const filteredRequests = requests.filter((request) => {
  const query = searchQuery.trim().toLowerCase()
  const searchFields = SEARCH_FIELDS[config.key] ?? []

  const matchesSearch =
    !query ||
    searchFields.some((field) =>
     getSearchableText(request[field]).toLowerCase().includes(query),
    )

  const matchesStatus =
    statusFilter === 'all' ||
    request.status === statusFilter

  return matchesSearch && matchesStatus
})
  const activeColumns = getVerificationColumns(config.key)
  const totalPages =
    config.key === 'identity'
      ? identityMeta.lastPage
      : Math.max(
          1,
          Math.ceil(filteredRequests.length / ITEMS_PER_PAGE),
        )

  const paginatedRequests =
    config.key === 'identity'
      ? filteredRequests
      : filteredRequests.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE,
        )
  const context = { locale, t, requests }

const pendingCount =
  config.key === 'identity'
    ? identityRequests.filter((request) => request.status === 'pending').length
    : getTotalVerificationCount()

const verifiedCount =
  config.key === 'identity'
    ? identityRequests.filter((request) => request.status === 'approved').length
    : Object.values(verificationRequests)
        .flat()
        .filter((request) => request.status === 'approved').length

  return (
    <div className="flex flex-col gap-5">
      <VerificationBreadcrumbs type={type} />

      <div>
        <h1 className="text-[26px] font-bold text-ink">
          {t.verificationCenter.title}
        </h1>
        <p className="mt-1.5 text-[13.5px] text-ink-faint">
          {t.verificationCenter.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-ink-faint">
                {t.verificationCenter.pendingSummary}
              </p>

              <p className="mt-2 text-[26px] font-bold text-ink">
                {pendingCount}
              </p>
            </div>

            <Clock3
              size={22}
              className="text-brand-gold"
            />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-ink-faint">
                  {t.verificationCenter.verifiedSummary}
                </p>

                <p className="mt-2 text-[26px] font-bold text-ink">
                  {verifiedCount}
                </p>
              </div>

              <BadgeCheck
                size={22}
                className="text-emerald-600"
              />
            </div>
        </Card>
      </div>

      <VerificationTabs />

      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 className="text-[17px] font-bold text-ink">
              {t[config.labelKey]}
            </h2>
            <p className="mt-1 text-[12px] text-ink-faint">
               {config.key === 'identity'
                ? identityMeta.total
                : config.count}{' '}
               {t.verificationCenter.pendingRequests}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <label className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute inset-inline-end-4 top-1/2 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />
              <input
                className="w-full rounded-xl border border-border bg-surface py-2.5 pe-14 ps-6 text-[12px] outline-none focus:ring-2 focus:ring-brand-navy/20 sm:w-72 lg:w-80"
                placeholder={t.verificationCenter.searchPlaceholders[config.key]}
                aria-label={t.verificationCenter.searchPlaceholders[config.key]}
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value) 
                  setCurrentPage(1) }}
              />
            </label>

            <label className="relative">
              <SlidersHorizontal
                size={15}
                className="pointer-events-none absolute inset-inline-end-4 top-1/2 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value)
                  setCurrentPage(1)
                }}
                aria-label={t.verificationCenter.filter}
                className="w-full appearance-none rounded-xl border border-border bg-surface py-2.5 pe-14 ps-6 text-[12px] text-ink outline-none focus:ring-2 focus:ring-brand-navy/20 sm:w-40"
              >
                <option value="all">
                  {t.verificationCenter.filterAll}
                </option>

                <option value="pending">
                  {t.verificationCenter.statuses.pending}
                </option>

                <option value="approved">
                  {t.verificationCenter.statuses.approved}
                </option>

                <option value="rejected">
                  {t.verificationCenter.statuses.rejected}
                </option>
              </select>
            </label>
          </div>
        </div>
        {config.key === 'identity' && isLoading && (
          <div className="px-6 py-8 text-center text-sm text-ink-faint">
            Loading...
          </div>
        )}

        {config.key === 'identity' && error && (
          <div className="px-6 py-8 text-center text-sm text-red-600">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="bg-surface">
              <tr>
                {activeColumns.map((column) => (
                  <th
                    key={column}
                    className="px-5 py-3 text-start text-[11px] text-ink-faint"
                  >
                    {t.verificationCenter.columns[config.key][column]}
                  </th>
                ))}
                <th className="w-24" aria-label={t.verificationCenter.viewDetails}/>
              </tr>
            </thead>

            <tbody>
              {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-t border-border transition-colors hover:bg-surface/60"
                    >
                      {activeColumns.map((column) => (
                        <td
                          key={column}
                          className="px-5 py-4 text-[12px] text-ink-muted"
                        >
                          {renderVerificationCell(
                            config.key,
                            column,
                            request,
                            context,
                          )}
                        </td>
                      ))}

                      <td className="px-5 py-4 text-end">
                        <Link
                          href={`${config.listHref}/${request.id}`}
                          className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-navy hover:underline"
                        >
                          {t.verificationCenter.viewDetails}
                          <ArrowUpRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeColumns.length + 1}
                      className="px-5 py-12 text-center text-[12px] text-ink-faint"
                    >
                      {t.verificationCenter.noResults}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          <span className="text-[12px] text-ink-faint">
            {t.verificationCenter.page} {currentPage} {t.verificationCenter.of} {totalPages}
          </span>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="xs"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              {t.verificationCenter.previousPage}
            </Button>

            <Button
              variant="outline"
              size="xs"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            >
              {t.verificationCenter.nextPage}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

import { IdentityVerificationDetails } from '@/features/verification/components/IdentityVerificationDetails'

export default async function IdentityVerificationDetailsPage({ params }) {
  const { id } = await params

  return <IdentityVerificationDetails id={id} />
}
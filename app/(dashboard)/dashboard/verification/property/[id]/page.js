import { PropertyVerificationDetails } from '@/features/verification/components/PropertyVerificationDetails'

export default async function PropertyVerificationDetailsPage({ params }) {
  const { id } = await params

  return <PropertyVerificationDetails id={id} />
}
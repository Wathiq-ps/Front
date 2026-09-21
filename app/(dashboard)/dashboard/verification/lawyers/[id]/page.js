import { LawyerVerificationDetails } from '@/features/verification/components/LawyerVerificationDetails'

export default async function LawyerVerificationDetailsPage({ params }) {
  const { id } = await params

  return <LawyerVerificationDetails id={id} />
}
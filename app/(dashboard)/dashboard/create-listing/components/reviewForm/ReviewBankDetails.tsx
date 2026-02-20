import styles from './ReviewBankDetails.module.scss'
import { SectionWrapper } from './SectionWrapper'
import { useParams } from 'next/navigation'

const ReviewBankDetails = () => {
  const params = useParams();
  const site = params.site as string;
  return (
    <SectionWrapper title="Bank Details" path={`/dashboard/create-listing/${site}/bank-details`}>ReviewBankDetails</SectionWrapper>
  )
}

export default ReviewBankDetails
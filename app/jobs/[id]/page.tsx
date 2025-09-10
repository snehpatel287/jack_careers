import { mockJobs } from '@/lib/api';
import JobDetailClient from './JobDetailClient';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return <JobDetailClient jobId={params.id} />;
}

export async function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}

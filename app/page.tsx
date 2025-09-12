import { JobFilters } from "@/components/jobs/JobFilters";
import { JobsList } from "@/components/jobs/JobsList";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <div className="sticky top-20">
          <JobFilters />
        </div>
      </aside>

      <section className="lg:col-span-3">
        <JobsList />
      </section>
    </div>
  );
}

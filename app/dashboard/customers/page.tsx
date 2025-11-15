import CustomersTable from '@/app/ui/customers/table';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

// This page depends on a live database call. Prevent static prerendering
// during build to avoid export/prerender errors when the DB isn't available.
export const dynamic = 'force-dynamic';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <div className="mt-6">
        <CustomersTable customers={customers} />
      </div>
    </div>
  );
}



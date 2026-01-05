"use client";
import { DashboardPagination, DashboardMenu, DashboardStat, DashboardItems } from "@/components/Dashboard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";


import LoadingState from "@/components/UI/LoadingState";

const DashboardContent = () => {
  const { data, loading, currentItems, filteredStatus, setFilterStatus, pagination } = useDashboardData();
  const { user, authLoading } = useAuth();
  const  router  = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  },[user, authLoading, router])

  if (authLoading || !user) return <LoadingState message="Loading Dashboard..." />

  if (loading) return <LoadingState message="Getting user watchlists..." />;

  return (
    <main className=" bg-gray-50 dark:bg-gray-600 p-8">
      <div className="max-w-4xl mx-auto ">
        <DashboardStat watchlist={data} />
        <div className="flex flex-wrap space-x-2 mb-6 overflow-x-auto pb-2 ">
          <DashboardMenu
            currentFilter={filteredStatus}
            onFilterChange={setFilterStatus}
          />
        </div>

        <div className="rounded-lg overflow-hidden min-h-[300px] flex flex-col justify-between px-2 py-4 md:px-6 md:py-4 ">
          <DashboardItems
            items={currentItems}
            userId={user.uid}
            filteredStatus={filteredStatus}
          />
          <DashboardPagination pagination={pagination}/>
        </div>
      </div>
    </main>
  );
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

 

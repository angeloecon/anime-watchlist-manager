"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LoadingState from "@/components/UI/LoadingState"; 

export default function GuestGuard({ children }) {
  const { user, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  if (authLoading || user) {
    return <LoadingState message="Redirecting..." className="fixed inset-0 z-[100]" />;
  }

  return <>{children}</>;
}
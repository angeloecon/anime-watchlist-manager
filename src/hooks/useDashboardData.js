'use client'
import { subscribeToWatchlist } from "@/lib/watchlist";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/authContext";

export const useDashboardData = (itemsPerPage = 5) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState (true)
  
  const { user } = useAuth();

  useEffect(() => {
    if(!user) return;
    const unsubscribe = subscribeToWatchlist(user.uid, (newData) => {
      setData(newData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  // filtering data 
  // All, Watching, Completed, Plan to Watch, Dropped
  const [filteredStatus, setFilterStatus] = useState("All")

  const filteredData = useMemo(() => {
    if (filteredStatus === "All") return data;
    return data.filter((item) => item.status === filteredStatus);
  }, [data, filteredStatus])

  
  //pagination part 
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredStatus]);

  //use useMemo
  //sliced filtered data / paginated 
  const currentItems = useMemo(() => {
    return filteredData.slice( indexOfFirstItem, indexOfLastItem )
  }, [currentPage, filteredData])

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  return {data, loading, currentItems, pagination: { currentPage, totalPages, nextPage, prevPage, hasData: filteredData.length > itemsPerPage} , filteredStatus, setFilterStatus}
}
 
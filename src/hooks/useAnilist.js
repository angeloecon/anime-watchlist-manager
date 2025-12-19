'use client'
import { useState, useEffect, use } from 'react';

export function useTopAnime(page = 1) {
  const [animeList, setAnimeList] = useState([])
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/anilist/top-anime?page=${page}`)
        if(!response.ok){
          throw new Error ('Failed to fetch anime');
        }

        const json = await response.json();
        setAnimeList(json.data);
        setPagination(json.pagination)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [page])

  return { animeList, pagination, isLoading, error}
}
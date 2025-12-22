import { useState, useEffect } from "react";

export function useAniList(type = "popular", page = 1, perPage = 10) {
  const [animeList, setAnimeList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/anilist/get-anime?type=${type}&page=${page}&perPage=${perPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime");
        }

        const json = await response.json();
        setAnimeList(json.data);
        setPagination(json.pagination);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, page]);

  return { animeList, pagination, isLoading, error };
}

export function useAnimeDetail(id) {
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAnimeDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/anilist/get-anime-detail?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anime detail");
        }
        const json = await response.json();
        setAnime(json.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  return { anime, isLoading, error };
}

export function useAnimeSearch(query, page = 1) {
  const [animeData, setAnimeData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim === "") {
      setAnimeData([]);
      return;
    }

    const timer = setTimeout(async() => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/anilist/get-search?query=${encodeURIComponent(query)}&page=${page}&perPage=30`)
        const json = await response.json();
        if(response.ok) {
          setAnimeData(json.data);
          setPagination(json.pagination);
        }
      } catch (err){
        setError(err.message);
        throw new Error("Failed to fetch anime queries", err.message)
      } finally {
        setIsLoading(false)
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, page]);

  return { animeData, pagination, isLoading, error}
}


// export function useJikan(endpoint, delay = 0, page = 1) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!endpoint) return;
//     let isMounted = true;

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (delay > 0) {
//           await new Promise((resolve) => setTimeout(resolve, delay));
//         }

//         if (!isMounted) return;

//         const res = await fetch(`/api/jikan${endpoint}?&page=${page}`);

//         if (!res.ok) {
//           throw new Error(`Error: ${res.status}`);
//         }

//         const json = await res.json();

//         if (isMounted) {
//           if (Array.isArray(json)) {
//             setData(json);
//           } else {
//             setData([]);
//           }
//         }
//       } catch (err) {
//         if (isMounted) {
//           console.error(`Hook Fetch Error (${endpoint}):`, err);
//           setError(err.message);
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [endpoint, delay, page]);

//   return { data, loading, error };
// }

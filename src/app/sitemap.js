const sitemap = async () => {
  const baseUrl = "animain.vercel.app";

  const routes = ["", "/search", "/dashboard"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  try {
    const response = await fetch("http://localhost:3000/api/anilist/get-anime?type=score&page=1&perPage=50");
    const json = await response.json();
    
    const animeUrl = (json.data || []).map(anime => ({
      url: `${baseUrl}/anime-detail/${anime.id}`,
      lastModified: new Date(),
    }));

    return [...routes, ...animeUrl];
  } catch (error) {
    console.error("Error fetching anime for sitemap:", error);
    return routes;
  }
};

export default sitemap;

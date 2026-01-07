 
const getNextSeason = () => {
  const getDate = new Date()
  const getMonth = getDate.getMonth()
  const getYear = getDate.getYear();

  const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

  const currentSeasonIndex = Math.floor(getMonth / 3)
  const nextSeasonIndex = (currentSeasonIndex + 1) % 4
  const nextYear = (currentSeasonIndex === 3 && nextSeasonIndex === 0) ? getYear + 1 : getYear;

  return {
    season: seasons[nextSeasonIndex],
    seasonYear: nextYear
  }
}

export default getNextSeason

import { gql } from "@apollo/client";

export const GET_ANIME_QUERY = gql`
  query fetchInitialAnime {
    allTimeTopAnime: Page(perPage: 15) {
      media(type: ANIME, sort: SCORE_DESC) {
        id
        averageScore
        title {
          english
          romaji
          native
        }
        bannerImage
        coverImage {
          extraLarge
          large
          medium
        }
        episodes
      }
    }

    allTimePopular: Page(perPage: 12) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        averageScore
        title {
          english
          romaji
          native
        }
        coverImage {
          extraLarge
          large
          medium
        }
        bannerImage
        seasonYear
        season
      }
    }

    topTrending: Page(perPage: 8) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        averageScore
        title {
          english
          romaji
          native
        }
        coverImage {
          extraLarge
          large
          medium
        }
        bannerImage
      }
    }

    upcomingAnime: Page(perPage: 25) {
      media(
        status: NOT_YET_RELEASED
        sort: POPULARITY_DESC
        season: SPRING
        type: ANIME
      ) {
        id
        averageScore
        title {
          english
          romaji
          native
        }
        coverImage {
          extraLarge
          large
          medium
        }
        bannerImage
      }
    }
  }
`;

export const GET_ANIME_DETAILS = gql`
  query GetAnime($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        romaji
        native
      }

      coverImage {
        extraLarge
        large
        color
      }

      studios(isMain: true) {
        nodes {
          name
        }
      }
      characters(sort: ROLE) {
        edges {
          role
          node {
            name {
              full
            }
            image {
              medium
            }
          }
        }
      }

      trailer {
        id
        site
      }

      startDate {
        year
        month
        day
      }

      description
      bannerImage
      averageScore
      episodes
      status
      genres
      season
      seasonYear
      type
      source
      recommendations(perPage: 6, sort: RATING_DESC) {
        nodes {
          mediaRecommendation {
            id
            title {
              english
              native
              romaji
            }
            coverImage {
              large
              medium
              extraLarge
            }
            averageScore
            seasonYear
            season
          }
        }
      }
      externalLinks {
        siteId
        site
        color
        icon
        id
        url
        type
        language
        isDisabled
        notes
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query SearchAnime($search: String, $page: Int) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
      }
      media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
          large
          medium
        }
        seasonYear
        season
      }
    }
  }
`;

export const BROWSE_ANIME = gql`
  query BrowseAnime($page: Int, $sort: [MediaSort], $status: MediaStatus) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        currentPage
        hasNextPage
        lastPage
      }
      media(sort: $sort, status: $status, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          medium
        }
        seasonYear
        season
      }
    }
  }
`;

export const GET_BACKGROUND_IMAGES = gql`
  query GetLoginBackground {
    Page(page: 1, perPage: 30) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        coverImage {
          extraLarge
          large
        }
      }
    }
  }
`;

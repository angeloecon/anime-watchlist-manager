import { GET_BACKGROUND_IMAGES } from "@/lib/queries"
import { getClient } from "../../../ApolloClient"

import RegisterForm from "@/components/Auth/RegisterForm"
import Marquee3D from "@/components/3dMarquee/3dMarquee"
import GuestGuard from "@/components/Auth/GuestGaurd"

const page = async() => {
  let animeList = [];
  
  try {

    const { data } = await getClient().query({ 
      query: GET_BACKGROUND_IMAGES,
      context: {
        fetchOptions: { next: { revalidate: 3600 } }  
      }
    });
    animeList = data?.Page?.media || [];
  } catch (error) {
    console.warn("Anilist background fetch failed:", error.message);
    animeList = [];  
  }
  return (
    <Marquee3D animeList={animeList}>
      <GuestGuard>
        <RegisterForm />
      </GuestGuard>
    </Marquee3D>
  )
}

export default page

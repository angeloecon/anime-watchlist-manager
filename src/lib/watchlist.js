import {
  doc,
  onSnapshot,
  setDoc,
  getDoc,
  collection,
  query,
  orderBy,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
 
import { db } from "./firebase";

export const addToWatchList = async(userId, anime, status = "Plan to Watch") => {
  try {
    const animeRef = doc(db, "users", userId, "watchlist", anime.id.toString());
    await setDoc(animeRef, { 
      id: anime.id, 
      title: anime.title.english || anime.title.romaji || anime.title.native || "Unknown Title",
      image: anime.bannerImage || anime.coverImage?.large || anime.coverImage?.medium ,
      totalEpisodes: anime.episodes || 0,
      status: status,
      progress: 0,
      score: 0,
      addedAt: new Date()
      }, { merge: true });
    return { success: true}
  } catch (error) {
    console.error("Error adding anime: ", error);
    throw error
  }
}

export const updateAnimeProgress = async (userId ,animeId, data) => {
  try {
    await updateDoc(doc(db, "users", userId, "watchlist", animeId.toString()), data);
    return { success : true}
  } catch (error) {
    console.error("Error updating anime:", error);
    throw error
  }
};

export const deleteAnimeProgress = async (userId ,animeId) => {
  try {
    await deleteDoc(doc(db, "users", userId, "watchlist", animeId.toString()));
    return { success : true}
  } catch {error} {
    console.error("Error deleting anime:", error);
    throw error
  }
};

export const subscribeToWatchlist = (userId, onDataUpdate) => {
  const q = query(collection(db, "users", userId, "watchlist"), orderBy("addedAt", "desc"))

  const unsubscribe = onSnapshot(q, (snapshot) => {
     const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
     onDataUpdate(items)
  });

  return  unsubscribe
}

export const searchAnimeWatchlist = async(userId, animeId) => {
  try {
    const animeRef = doc(db, "users", userId, "watchlist", animeId.toString());
    const docSnap = await getDoc(animeRef);
    return docSnap.exists()
  } catch (error) {
    console.error("Error failed to check:", error)
    throw error
  }
}

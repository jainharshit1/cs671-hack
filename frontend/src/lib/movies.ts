import { getCurrentUser } from "@/lib/actions";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieByIdResponse = {
  movie_results: MovieType[];
  person_results: [];
  tv_results: [];
  tv_episode_results: [];
  tv_season_results: [];
};

export const chunkArray = <T>(arr: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

export const getPopularMovies = async () => {
  const popularMovieIds = [
    "tt1375666",
    "tt1675434",
    "tt0133093",
    "tt0137523",
    "tt0111161",
    "tt0268978",
    "tt0910970",
    "tt0108052",
    "tt0109830",
    "tt0110912",
    "tt0264464",
    "tt0499549",
    "tt0073486",
    "tt0075314",
    "tt0276919",
    "tt0068646",
  ];

  // Using Promise.all to fetch all movies in parallel
  const movieResponses = await Promise.all(
    popularMovieIds.map((id) => getMovieByImdbId(id)),
  );

  // Extract movie results from responses and flatten into a single array
  return movieResponses.flatMap((response) => response.movie_results);
};

export const getMovieByImdbId = async (imdbId: string) => {
  const url = `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjM1Nzg1MDYwMDFjODZhM2FiMjNlZTQwMzkzZTE2NCIsIm5iZiI6MTc0NjI5MDE3My40Nywic3ViIjoiNjgxNjQ1ZmQ4MWE4NjZmNDAwOTA4MWU1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.kZeUcKYviCQ24dJ4KEVEXk2MFGtGrp8Kv5-4gbPbnH4",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  // TODO: Typesafe
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: MovieByIdResponse = await response.json();

  return data;
};
export const rateMovie = async ({
  movie,
  rating,
}: {
  movie: MovieType;
  rating: number;
}) => {
  const user = await getCurrentUser();
  if (!user) {
    toast.error("No user is signed in.");
    redirect("/login");
  }

  const q = query(collection(db, "accounts"), where("user_id", "==", user.uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error("No account document found for user.");
    return;
  }

  const accDoc = querySnapshot.docs[0];
  const docRef = accDoc.ref;
  const prevData = accDoc.data();

  const history = prevData.history;

  if (!Array.isArray(history)) {
    console.error("History is not an array.");
    return;
  }

  let updated = false;
  const updatedHistory = history.map((el: MovieType & { rating: number }) => {
    if (el.title === movie.title) {
      updated = true;
      return { ...movie, rating }; // overwrite with new movie data and updated rating
    }
    return el;
  });

  if (!updated) {
    updatedHistory.push({
      ...movie,
      rating,
    });
  }

  const updatedData = {
    ...prevData,
    history: updatedHistory,
  };

  try {
    await updateDoc(docRef, updatedData);
    console.log("Document updated with ID: ", docRef.id);
  } catch (e) {
    console.error("Failed to update document:", e);
  }
};

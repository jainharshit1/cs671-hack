"use client";

import React, { useEffect, useState } from "react";
import { getPlaylistRecommendations } from "@/lib/actions";
import type { MovieData } from "@/app/recommendations/page";
import { getMovieByImdbId } from "@/lib/movies";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: MovieData }) => {
  return (
    <div className="relative z-0 aspect-video w-full min-w-[400px] rounded-lg border border-zinc-100/10">
      <Image
        src={`https://image.tmdb.org/t/p/w1920/${movie.poster_path}`}
        width={1920}
        height={1080}
        alt={movie.title}
        className="h-full w-full rounded-lg object-cover opacity-50"
      />
      <div className="absolute bottom-0 left-0 z-10 flex h-full w-full items-end justify-between rounded-lg bg-gradient-to-t from-zinc-900/90 p-5">
        <Link
          href={`/movies/${movie.imdb_id}`}
          className="font-satoshi text-xl font-bold text-zinc-100 hover:underline"
        >
          {movie.title}
        </Link>
        <div className="font-satoshi text-sm font-semibold text-zinc-100/70">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

const FilmSection = () => {
  // Initialize with null to distinguish between "not loaded yet" and "loaded but empty"
  const [ids, setIds] = useState<string[] | null>(null);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);

  // First useEffect: fetch the history IDs once when component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await getPlaylistRecommendations();

        let results: string[] = [];

        // Handle different response formats
        if (data && typeof data === "object") {
          if (Array.isArray(data)) {
            // If data is already an array
            results = data as string[];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          } else if (data.results && Array.isArray(data.results)) {
            // If data has a results property that is an array
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            results = data.results as string[];
          } else {
            // Try to extract IDs from any object format
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const possibleIds = Object.values(data).filter(
              (value) => typeof value === "string" || Array.isArray(value),
            );
            if (possibleIds.length > 0) {
              results = Array.isArray(possibleIds[0])
                ? (possibleIds[0] as string[])
                : [possibleIds[0]!];
            }
          }
        }

        setIds(results);
      } catch (error) {
        console.error("Error fetching history:", error);
        setIds([]); // Set to empty array instead of null on error
      }
    };

    void fetchHistory();
  }, []); // Empty dependency array means this runs once on mount

  // Second useEffect: fetch movie data whenever ids change
  useEffect(() => {
    const fetchMovies = async () => {
      // Guard against undefined ids or empty array
      if (!ids || ids.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const movieData = await Promise.all(
          ids.map((id) => getMovieByImdbId(id)),
        );

        const filteredMovieData: MovieData[] = movieData
          .map((el, i) => {
            if (!el?.movie_results?.[0]) {
              console.log(`No results for movie ID ${ids[i]}`);
              return undefined;
            }
            return {
              ...el.movie_results[0],
              imdb_id: ids[i],
            };
          })
          .filter((item): item is MovieData => item !== undefined);
        setMovies(filteredMovieData);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchMovies();
  }, [ids]);

  return (
    <div className="relative z-0 flex w-full flex-row items-stretch gap-5 pb-24 pl-24">
      <div className="flex w-[300px] shrink-0 flex-col gap-2.5">
        <div className="font-satoshi text-2xl font-semibold">
          You might like this
        </div>
        <div className="font-hk text-base text-zinc-100/70">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          dignissimos dolorem.
        </div>
      </div>
      <div className="relative z-0 flex h-full w-full flex-row items-center justify-start gap-5 overflow-x-scroll py-5">
        {movies.map((movie, i) => (
          <MovieCard movie={movie} key={i} />
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-r from-zinc-950/0 via-zinc-950/0 to-zinc-950/50"></div>
    </div>
  );
};

export default FilmSection;

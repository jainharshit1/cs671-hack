"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMovieByImdbId, type MovieType } from "@/lib/movies";
import Image from "next/image";

const MoviePage = () => {
  const movieId = useParams().movie;
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieByImdbId(movieId as string);
        const movieData = data.movie_results[0];

        if (!movieData) {
          throw new Error("Movie not found");
        }

        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    void fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="relative -z-10 flex h-dvh w-full flex-row items-start justify-between gap-5 px-48 pt-48 pb-12">
      <Image
        src={`https://image.tmdb.org/t/p/w1920/${movie.backdrop_path}`}
        width={1920}
        height={1080}
        alt={movie.title}
        className="absolute top-0 left-0 -z-20 h-dvh w-full object-cover object-center"
      />
      <div className="absolute top-0 left-0 -z-10 h-dvh w-full bg-gradient-to-b from-zinc-950/20 to-zinc-950"></div>
      <div className="flex flex-col justify-center">
        <div className="w-fit rounded-md bg-amber-800 px-2.5 py-1 text-base font-semibold uppercase">
          {movie.vote_average.toFixed(1)}
        </div>
        <div className="font-satoshi max-w-[800px] text-6xl leading-normal font-bold tracking-[-1px]">
          {movie.title}
        </div>
        <div className="font-hk mb-12 max-w-[700px] text-base font-medium text-zinc-100/70">
          {movie.overview}
        </div>
        <div className="font-satoshi w-fit rounded-md border border-zinc-100/[0.1] bg-blue-900 px-5 py-2 text-lg font-semibold">
          Watch now
        </div>
      </div>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        width={400}
        height={600}
        alt={movie.title}
        className="max-w-[400px] rounded-xl border border-zinc-100/10 object-cover object-center"
      />
    </div>
  );
};

export default MoviePage;

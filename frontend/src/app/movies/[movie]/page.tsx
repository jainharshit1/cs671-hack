"use client";

import React from "react";
import { useParams } from "next/navigation";

const MoviePage = () => {
  const movieId = useParams().movie;
  console.log(movieId);

  return <div>hello</div>;
};

export default MoviePage;

import React from "react";
import ImgBig from "public/pic-big.jpg";
import Image from "next/image";

const TopMovie = () => {
  return (
    <div className="relative -z-10 h-[80vh] w-full">
      <Image
        src={ImgBig}
        alt={"Sample Big"}
        className="absolute top-0 left-0 -z-20 h-dvh w-full object-cover object-center"
      />
      <div className="absolute top-0 left-0 -z-10 h-dvh w-full bg-gradient-to-b from-zinc-950/20 to-zinc-950"></div>
      <div className="h-full w-full px-48 pt-24 pb-12">
        <div className="flex h-full w-full flex-col justify-center">
          <div className="w-fit rounded-md bg-amber-800 px-2.5 py-1 text-base font-semibold uppercase">
            6.7
          </div>
          <div className="font-satoshi max-w-[800px] text-6xl leading-normal font-bold tracking-[-1px]">
            Mission Impossible: Fallout
          </div>
          <div className="font-hk mb-12 max-w-[700px] text-base font-medium text-zinc-100/70">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            aliquid amet culpa esse explicabo harum illo ipsam labore omnis
            possimus provident quam quisquam quod, sequi tempora temporibus unde
            voluptatem voluptatibus!
          </div>
          <div className="font-satoshi w-fit rounded-md border border-zinc-100/[0.2] bg-blue-900 px-5 py-2 text-lg font-semibold">
            Watch now
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovie;

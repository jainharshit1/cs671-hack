import React from "react";
import ImgBig from "public/pic-big.jpg";
import Image from "next/image";

const FilmSection = () => {
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
        <Image
          src={ImgBig}
          alt={"Sample Image"}
          className="aspect-video w-[400px] rounded-lg border border-zinc-100/[0.2] object-cover"
        />
        <Image
          src={ImgBig}
          alt={"Sample Image"}
          className="aspect-video w-[400px] rounded-lg border border-zinc-100/[0.2] object-cover"
        />
        <Image
          src={ImgBig}
          alt={"Sample Image"}
          className="aspect-video w-[400px] rounded-lg border border-zinc-100/[0.2] object-cover"
        />
        <Image
          src={ImgBig}
          alt={"Sample Image"}
          className="aspect-video w-[400px] rounded-lg border border-zinc-100/[0.2] object-cover"
        />
        <Image
          src={ImgBig}
          alt={"Sample Image"}
          className="aspect-video w-[400px] rounded-lg border border-zinc-100/[0.2] object-cover"
        />
        <Image
          src={ImgBig}
          alt={"Sample Image"}
          className="aspect-video w-[400px] rounded-lg border border-zinc-100/[0.2] object-cover"
        />
      </div>
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-r from-zinc-950/0 via-zinc-950/0 to-zinc-950/50"></div>
    </div>
  );
};

export default FilmSection;

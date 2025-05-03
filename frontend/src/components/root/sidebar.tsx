"use client";

import React, { type Dispatch, type SetStateAction, useState } from "react";
import Image from "next/image";
import SmallPic from "public/pic-small.jpg";
import { motion } from "motion/react";
import { MoreVertical, Search, X } from "lucide-react";

const SidebarMenu = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed top-0 left-0 z-50 h-5 w-screen px-48 py-5">
      <div className="flex w-full items-center justify-center gap-12">
        <div
          className="font-satoshi flex shrink-0 cursor-pointer items-center justify-between gap-2.5 text-sm font-semibold uppercase"
          onClick={() => setToggle(!toggle)}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-100/[0.2] bg-zinc-950/[0.2] text-zinc-100">
            {toggle ? <X /> : <MoreVertical />}
          </div>
          {toggle ? "close" : "menu"}
        </div>
        <div className="font-satoshi flex h-full w-full items-center justify-between overflow-x-clip rounded-full border border-zinc-100/[0.2] bg-zinc-900/[0.3] text-zinc-100/[0.7] backdrop-blur-2xl">
          <div className="px-5 py-2.5 font-medium">Search phrase here woo</div>
          <div className="h-full rounded-full bg-gradient-to-bl from-rose-700 to-sky-600 px-5 py-2.5 text-base font-semibold text-zinc-100 uppercase">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <SidebarMenu toggle={toggle} setToggle={setToggle} />
      <motion.div
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          x: toggle ? 0 : -100,
          opacity: toggle ? 1 : 0,
        }}
        className="fixed z-40 flex h-dvh w-screen bg-zinc-950/[0.5] backdrop-blur-sm"
        onClick={() => setToggle(false)}
      >
        <div className="flex flex-col items-center justify-between gap-5 px-8 py-24">
          <div className="flex flex-col items-center gap-5">
            <div className="relative z-0 aspect-square w-16 overflow-clip rounded-full border border-zinc-100/[0.2]">
              <Image
                src={SmallPic}
                alt={"Sample pic"}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-12 aspect-square w-12 rounded-full bg-zinc-950/[0.7]"></div>
            <div className="aspect-square w-12 rounded-full bg-zinc-950/[0.7]"></div>
            <div className="aspect-square w-12 rounded-full bg-zinc-950/[0.7]"></div>
          </div>
          <div className="relative z-0 aspect-square w-16 overflow-clip rounded-full border border-zinc-100/[0.2]">
            <Image
              src={SmallPic}
              alt={"Sample pic"}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

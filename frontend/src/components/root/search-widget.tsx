"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "motion/react";

const SearchWidget = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="font-satoshi hidden h-full w-full items-start justify-between gap-12 overflow-x-clip rounded-2xl border border-zinc-100/[0.2] bg-zinc-900/[0.3] text-zinc-100/90 backdrop-blur-2xl md:flex">
      <motion.div
        className="w-full font-medium"
        animate={{ height: toggle ? "80vh" : "auto" }}
      >
        <textarea
          className="hidden h-min w-full px-5 py-2.5 outline-none md:block"
          rows={1}
          placeholder={"What's on your mind?"}
        ></textarea>
      </motion.div>
      <div className="h-full rounded-xl bg-gradient-to-bl from-rose-700 to-sky-600 px-5 py-2.5 text-base font-semibold text-zinc-100 uppercase">
        <Search />
      </div>
    </div>
  );
};

export default SearchWidget;

"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import VoiceRecorder from "@/components/root/voice-recorder";

const SearchWidget = () => {
  const [toggle, setToggle] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Submitted:", value);
      setValue("");
      // Trigger your submit logic here
    }
  };

  return (
    <div className="font-satoshi hidden h-full w-full flex-col items-start justify-between overflow-x-clip rounded-2xl border border-zinc-100/[0.2] bg-zinc-900/[0.3] text-zinc-100/90 backdrop-blur-2xl md:flex">
      <motion.div className="flex w-full items-start justify-between gap-12 overflow-x-clip font-medium">
        <input
          type="text"
          className="hidden h-min w-full px-5 py-2.5 outline-none md:block"
          placeholder={"What's on your mind?"}
          onFocus={() => setToggle(true)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyDown={handleSubmit}
        ></input>
        <VoiceRecorder
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setAudioURL={setAudioURL}
        />
      </motion.div>
      <motion.div
        className="w-full overflow-x-clip overflow-y-scroll"
        initial={{ height: 0 }}
        animate={{ height: toggle ? "50vh" : 0 }}
      >
        <div className="mt-5">
          {audioURL && (
            <div className="mt-4">
              <a
                href={audioURL}
                download="recording.webm"
                className="mt-2 block text-blue-600 underline"
              >
                Download
              </a>
            </div>
          )}
          <div
            onClick={() => setToggle(false)}
            className="w-fit rounded-md bg-red-500 px-5 py-2.5"
          >
            close
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchWidget;

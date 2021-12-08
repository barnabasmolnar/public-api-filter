import React from "react";
import { EmojiSadIcon } from "@heroicons/react/outline";

const NotFound = (): JSX.Element => (
  <div className="flex flex-col items-center h-full pt-12 space-y-4">
    <EmojiSadIcon className="w-20 h-20 text-purple-300" />
    <div className="text-center">No API found. Try altering your filters.</div>
  </div>
);

export default NotFound;

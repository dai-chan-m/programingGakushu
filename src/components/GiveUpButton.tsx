"use client";

import { useState } from "react";

type Props = {
  onGiveUp: () => void;
  disabled?: boolean;
};

export default function GiveUpButton({ onGiveUp, disabled = false }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  const handleClick = () => {
    if (!confirmed) {
      setConfirmed(true);
    } else {
      onGiveUp();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-5 py-2 font-bold rounded transition ${
        confirmed
          ? "bg-red-700 text-white hover:bg-red-800"
          : "bg-red-500 text-white hover:bg-red-600"
      }`}
    >
      {confirmed ? "本当にギブアップする？😭" : "💥 ギブアップする"}
    </button>
  );
}

"use client";
import { useState, useRef } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonSize = noCount * 1 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const moveNoButton = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      // Get button dimensions
      const buttonWidth = 80;
      const buttonHeight = 40;
      
      // Move No button to far edges of the container
      // Choose a random edge: left, right, top, or bottom
      const edge = Math.floor(Math.random() * 4);
      let randomX, randomY;
      
      switch(edge) {
        case 0: // Left edge
          randomX = 10;
          randomY = Math.random() * (containerHeight - buttonHeight - 20) + 10;
          break;
        case 1: // Right edge
          randomX = containerWidth - buttonWidth - 10;
          randomY = Math.random() * (containerHeight - buttonHeight - 20) + 10;
          break;
        case 2: // Top edge
          randomX = Math.random() * (containerWidth - buttonWidth - 20) + 10;
          randomY = 10;
          break;
        case 3: // Bottom edge
          randomX = Math.random() * (containerWidth - buttonWidth - 20) + 10;
          randomY = containerHeight - buttonHeight - 10;
          break;
        default:
          randomX = containerWidth - buttonWidth - 10;
          randomY = Math.random() * (containerHeight - buttonHeight - 20) + 10;
      }
      
      setNoButtonPosition({ x: randomX, y: randomY });
      setNoCount(prev => prev + 1);
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please",
      "With a chocolate rice cake on top",
      "What about a matcha frostie",
      "PLEASE POOKIE",
      "But :*(",
      "I am going to die",
      "Yep im dead",
      "ok ur talking to nathan's ghost",
      "please babe",
      ":((((",
      "PRETTY PLEASE",
      "Estoy muerto",
      "No :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          <img className="h-[250px] w-auto object-contain" src="/will-you-be-my-valentine/me.png?v=4" alt="Valentine" />
          <div className="my-4 text-4xl font-bold">YEYY!! I love you Jagi!! ;)) mwa mwa mwa mwa</div>
        </>
      ) : (
        <>
          <img
            className="h-[250px] w-auto object-contain"
            src="/will-you-be-my-valentine/me.png?v=4"
            alt="Valentine"
          />
          <h1 className="my-4 text-4xl">Will you be my Valentine?</h1>
          <div ref={containerRef} className="relative flex h-48 w-full max-w-md items-center justify-center">
            <button
              className={`rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 mr-4`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              onClick={handleNoClick}
              onMouseEnter={moveNoButton}
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              style={noButtonPosition ? {
                position: 'absolute',
                left: noButtonPosition.x,
                top: noButtonPosition.y,
                transition: 'all 0.3s ease'
              } : {}}
            >
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
}

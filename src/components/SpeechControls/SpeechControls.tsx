// Implement a component that provides basic UI options such as playing, pausing and loading new content
import type { PlayingState } from "../../lib/speech";
import "./SpeechControls.css";

interface SpeechControls {
  state?: PlayingState;
  loadMore: () => void;
  play: () => void;
  pause: () => void;
  cancel: () => void;
}

export const SpeechControls: React.FC<SpeechControls> = ({
  play,
  pause,
  state,
  loadMore,
  // cancel,
}) => {
  const isPlaying = state === "playing";
  const isPaused = state === "paused";
  return (
    <div className="speech-controls">
      <button className="btn-play" onClick={isPlaying ? pause : play}>
        <svg
          className={`play-icon ${isPlaying ? "active" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="#6565b7"
          height="40px"
          width="40px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 512 512"
        >
          <g transform="translate(1 1)">
            <g>
              <g>
                <path d="M255-1C114.2-1-1,114.2-1,255s115.2,256,256,256s256-115.2,256-256S395.8-1,255-1z M255,493.933     c-131.413,0-238.933-107.52-238.933-238.933S123.587,16.067,255,16.067S493.933,123.587,493.933,255S386.413,493.933,255,493.933     z" />
                <path
                  fill={isPaused ? "#ff6961" : "inherit"}
                  d="M331.8,186.733c-5.12,0-8.533,3.413-8.533,8.533v119.467c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533     V195.267C340.333,190.147,336.92,186.733,331.8,186.733z"
                />
                <path
                  fill={isPaused ? "#ff6961" : "inherit"}
                  d="M383,186.733c-5.12,0-8.533,3.413-8.533,8.533v119.467c0,5.12,3.413,8.533,8.533,8.533s8.533-3.413,8.533-8.533V195.267     C391.533,190.147,388.12,186.733,383,186.733z"
                />

                <path d="M293.4,187.587c-4.267-1.707-9.387-0.853-11.947,3.413l-68.267,119.467c-1.707,4.267-0.853,9.387,3.413,11.947     c1.707,0.853,2.56,0.853,4.267,0.853c2.56,0,5.973-1.707,7.68-4.267l68.267-119.467     C298.52,195.267,297.667,190.147,293.4,187.587z" />
                <path
                  fill={isPlaying ? "#50C878" : "inherit"}
                  d="M208.067,247.32l-102.4-59.733c-2.56-1.707-5.973-1.707-8.533,0s-4.267,4.267-4.267,7.68v119.467     c0,3.413,1.707,5.973,4.267,7.68c1.707,0.853,2.56,0.853,4.267,0.853s2.56,0,4.267-0.853l102.4-59.733     c2.56-1.707,4.267-4.267,4.267-7.68S210.627,249.027,208.067,247.32z M109.933,299.373v-89.6l76.8,44.373L109.933,299.373z"
                />
              </g>
            </g>
          </g>
        </svg>
      </button>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

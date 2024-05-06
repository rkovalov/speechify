import { useState, useCallback, useEffect, useRef } from "react";
import { createSpeechEngine, PlayingState } from "../lib/speech";

interface State<Data> {
  stage: "idle" | "loading" | "resolved" | "rejected";
  data: Data | null;
}

export const useLoader = <T>(
  fn: () => Promise<T>
): State<T> & { reload: () => void } => {
  const [state, setState] = useState<State<T>>({
    stage: "idle",
    data: null,
  });

  const getData = useCallback(() => {
    fn()
      .then((data) => {
        setState((prevState) => ({ ...prevState, stage: "resolved", data }));
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          stage: "rejected",
          data: null,
        }));
      });
  }, [fn]);

  useEffect(() => {
    switch (state.stage) {
      case "idle":
        return setState((prevState) => ({ ...prevState, stage: "loading" }));
      case "loading":
        return getData();
      default:
        break;
    }
  }, [state.stage]);

  const reload = useCallback(() => {
    setState((prevState) => ({ ...prevState, data: null, stage: "idle" }));
  }, []);

  return { ...state, reload };
};

export const useSpeech = (sentences: string[]) => {
  const [sentenceIndex, setSentenceIndex] = useState(-1);
  const [wordIndex, setWordIndex] = useState(-1);
  const [playingState, setPlayingState] = useState<PlayingState>();
  const sentencesRef = useRef(sentences);
  /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */
  const speechEngineRef = useRef(
    createSpeechEngine({
      onBoundary: (e: SpeechSynthesisEvent) => {
        setWordIndex((i) => i + 1);
        // console.log("[onBoundary]:", e);
      },
      onEnd: (e: SpeechSynthesisEvent) => {
        // console.log("[onEnd]:", e);
        setWordIndex(0);
        setSentenceIndex((i) => (i + 1) % sentencesRef.current.length);
      },
      onStateUpdate: (state: PlayingState) => {
        setPlayingState(state);
      },
    })
  );

  useEffect(() => {
    // getting new sentences
    setSentenceIndex(0);
    setWordIndex(0);
    sentencesRef.current = sentences;
  }, [sentences]);

  useEffect(() => {
    // load sentence
    const sentence = sentences[sentenceIndex];
    if (sentence) {
      speechEngineRef.current.load(sentence);
    }
  }, [sentenceIndex, playingState, sentences]);

  useEffect(() => {
    // continue playing next sentence
    const isNotFirst = sentenceIndex > 0;
    const isNotLast = sentenceIndex < sentencesRef.current.length;
    const continuePlaying = playingState === "ended" && isNotFirst && isNotLast;
    if (continuePlaying) {
      speechEngineRef.current.play();
    }
  }, [playingState, sentenceIndex]);

  const { play, pause, cancel } = speechEngineRef.current;

  return {
    state: playingState,
    wordIndex,
    sentenceIndex,
    play,
    pause,
    cancel,
  };
};

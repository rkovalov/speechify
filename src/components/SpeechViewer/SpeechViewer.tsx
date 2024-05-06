// Implement a component that displays the currently read word and sentence
import "./SpeechViewer.css";

interface SpeechViewerProps {
  className?: string;
  sentences: string[];
  sentenceIndex?: number;
  wordIndex?: number;
}

export const SpeechViewer: React.FC<SpeechViewerProps> = ({
  className,
  sentences,
  sentenceIndex,
  wordIndex,
}) => {
  return (
    <article className={`speech-viewer ${className}`}>
      {sentences.map((sentence, sIndex) => (
        <span
          key={sentence}
          className={sIndex === sentenceIndex ? "active-sentence" : ""}
        >
          {sentence.split(" ").map((w, wIndex) => (
            <span
              key={`${w}-${wIndex}`}
              className={`word  ${
                wIndex === wordIndex && sIndex === sentenceIndex
                  ? "active-word"
                  : ""
              }`}
            >
              {w}
            </span>
          ))}
          &nbsp;
        </span>
      ))}
    </article>
  );
};

import { useState } from "react";
import { SpeechViewer, SpeechControls } from "./components";

import { parseContentIntoSentences } from "./lib/content";
import * as DP from "./dataProvider";
import { useLoader, useSpeech } from "./hooks";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { play, pause, cancel, state, wordIndex, sentenceIndex } =
    useSpeech(sentences);

  const { stage, reload } = useLoader(() =>
    DP.fetchContent().then((data) => {
      setSentences(parseContentIntoSentences(data.content));
    })
  );

  const isReading = state === "playing" || state === "paused";

  return (
    <>
      <header className="app-header">
        <h1>Text to speech</h1>
      </header>
      <main className="app-main">
        <SpeechControls
          state={state}
          loadMore={reload}
          play={play}
          pause={pause}
          cancel={cancel}
        />
        <section className="section-content">
          {stage === "resolved" ? (
            <SpeechViewer
              className="viewer"
              sentences={sentences}
              sentenceIndex={isReading ? sentenceIndex : undefined}
              wordIndex={isReading ? wordIndex : undefined}
            />
          ) : (
            <div className="loader">loading ...</div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;

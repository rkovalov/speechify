import mockData from "./mock";

const API_URL = "http://localhost:3000";

/**
 * Fetch the content from the api
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getRandomElement = <T>(arr: Array<T>): T =>
  arr[(Math.random() * arr.length) | 0];

// export const fetchContent = async (): Promise<{ content: string }> =>
//   (await fetch(`${API_URL}/content`)).json();

export const fetchContent = async (): Promise<{ content: string }> =>
  delay(50).then(() => getRandomElement(mockData));

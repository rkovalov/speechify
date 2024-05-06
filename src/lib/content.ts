/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
export const parseContentIntoSentences = (content?: string): string[] => {
  if (!content) {
    return [];
  }
  const tags = content.match(/<s>(.*?)<\/s>/g);
  if (!tags) {
    return [];
  }
  return tags.map((s) => s.trim().replace(/<\/?s>/g, ""));
};

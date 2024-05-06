# Speechify POC

## The Setup

#### API

- The code for the api is in the `api` directory. This piece is basically responsible for sending a random response from the array defined in `data.js`.
- The api returns a response in form of a JSON object containing contents. The content string is in form of a subset of SSML that is defined later here.

#### APP

## Goal

- Create an app that calls an api to fetch SSML content and then synthesizes this content into speech and renders a sentence and word UI for the same.

### SSML

- The API returns the content in form of an SSML string. This string will only contain a subset of SSML features: `<speak>`, `<p>`, `<s>`.
- The assignment only requires focus on the `<s>`element which defines the beginning and the end of the sentences.
- To complete this assignment, you must extract all the sentences from the SSML files ignoring everything else that is invalid.

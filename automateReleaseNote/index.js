import initReleaseNotesGenerationMethod from "./src/initReleaseNotesGenerationMethod.js";

const GITHUB_TOKEN = "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";

if (GITHUB_TOKEN) {
  initReleaseNotesGenerationMethod();
} else {
  console.log('GEMINI_API_KEY is not defined. Please try again');
}
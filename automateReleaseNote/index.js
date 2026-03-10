import initReleaseNotesGenerationMethod from "./src/initReleaseNotesGenerationMethod.js";

const GITHUB_TOKEN = ""

if (GITHUB_TOKEN) {
  initReleaseNotesGenerationMethod();
} else {
  console.log('GEMINI_API_KEY is not defined. Please try again');
}

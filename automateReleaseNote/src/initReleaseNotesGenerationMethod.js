import fs from 'fs';
import generateReleaseNotes from './generateReleaseNotes.js';
import getGitChanges from './getGitChanges.js';

async function initReleaseNotesGenerationMethod() {
  let releaseNotes;
  try {
    const { diffText, filteredFiles, ticketNumber } = getGitChanges();
    if (diffText && filteredFiles) {
      releaseNotes = await generateReleaseNotes(filteredFiles, diffText, ticketNumber);
      if (releaseNotes) {
        fs.writeFileSync('notes.txt', releaseNotes);
      } else {
        console.log('No release notes generated');
      }
    } else {
      console.log('No changes to generate release notes');
    }
  } catch (error) {
    console.log('Error generating release notes:', error);
  }
}

export default initReleaseNotesGenerationMethod;
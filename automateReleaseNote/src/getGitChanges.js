import { execSync } from 'child_process';

function getGitChanges() {
  let diffText = '';
  let allFilesList = [];
  let filteredFiles = '';
  let ticketNumber = '';
  try {
    execSync('git fetch origin develop:refs/remotes/origin/develop');
    const lastCommit = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).toString().trim();
    const previousCommit = execSync('git rev-parse HEAD~1', { encoding: 'utf-8' }).toString().trim();

    const mergeCommitMessage = execSync('git log develop -1 --pretty=%s', { encoding: 'utf-8' }).trim();
    const featureBranchMatch = mergeCommitMessage.match(/DEMO-\d+/i);
    ticketNumber = featureBranchMatch ? featureBranchMatch[0] : '';

    allFilesList = execSync(`git diff --name-only ${previousCommit}..${lastCommit}`, { encoding: 'utf-8' })
      .toString()
      .trim()
      .split('\n');
    const filesToInclude = allFilesList.filter((file) => !file.endsWith('-spec.js') && file.endsWith('.js'));

    filteredFiles = filesToInclude.join(' ');
    if (filteredFiles.length > 0) {
      diffText = execSync(`git diff ${previousCommit}..${lastCommit} -- ${filteredFiles}`, { encoding: 'utf-8' });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error getting git changes:', error.message);
  }
  return { diffText, filteredFiles, ticketNumber };
}

export default getGitChanges;
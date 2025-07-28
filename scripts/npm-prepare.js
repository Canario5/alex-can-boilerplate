/*? This script prevents build failures in environments without Git caused by Lefthook. */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function hasGit() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function hasGitDir() {
  return fs.existsSync(path.join(process.cwd(), '.git'));
}

if (hasGit() && hasGitDir()) {
  console.log('Installing Lefthook hooks...');
  execSync('npx lefthook install', { stdio: 'inherit' });
} else {
  console.log('Skipping Lefthook install (not in a Git environment)');
}

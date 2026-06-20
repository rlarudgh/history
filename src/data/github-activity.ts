import { getGitHubActivity } from '../utils/github';

const activities = await getGitHubActivity(
  import.meta.env.GITHUB_USERNAME || 'rlarudgh',
  import.meta.env.GITHUB_TOKEN || ''
);

export default activities;

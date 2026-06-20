export interface GitHubActivity {
  type: 'commit' | 'pr' | 'issue';
  repo: string;
  title: string;
  url: string;
  date: Date;
  status?: 'open' | 'closed' | 'merged';
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  repository: {
    name: string;
    full_name: string;
  };
}

export interface GitHubPR {
  id: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  repository: {
    name: string;
    full_name: string;
  };
}

export interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  repository: {
    name: string;
    full_name: string;
  };
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
      html_url?: string;
    }>;
  };
}

interface GitHubSearchItem {
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  repository_url: string;
  pull_request?: {
    merged_at: string | null;
  };
}

interface GitHubSearchResponse {
  items: GitHubSearchItem[];
}

async function fetchWithAuth(url: string, token: string): Promise<Response> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('GitHub token이 유효하지 않습니다');
    } else if (response.status === 403) {
      throw new Error('GitHub API rate limit 초과');
    } else {
      throw new Error(`GitHub API 오류: ${response.status}`);
    }
  }

  return response;
}

export async function getRecentCommits(
  username: string,
  token: string,
  count: number = 10
): Promise<GitHubActivity[]> {
  try {
    const eventsUrl = `https://api.github.com/users/${username}/events/public?per_page=${count * 2}`;
    const response = await fetchWithAuth(eventsUrl, token);
    const events = await response.json();

    const pushEvents = events.filter(
      (
        event: GitHubEvent
      ): event is GitHubEvent & {
        payload: { commits: NonNullable<GitHubEvent['payload']['commits']> };
      } =>
        event.type === 'PushEvent' &&
        event.payload.commits !== undefined &&
        event.payload.commits.length > 0
    );

    return pushEvents.slice(0, count).map((event) => {
      const commit = event.payload.commits[0];
      const repoName = event.repo.name;

      return {
        type: 'commit' as const,
        repo: repoName,
        title: commit.message.split('\n')[0],
        url: commit.html_url || `https://github.com/${repoName}/commit/${commit.sha}`,
        date: new Date(event.created_at),
      };
    });
  } catch {
    return [];
  }
}

export async function getRecentPRs(
  username: string,
  token: string,
  count: number = 5
): Promise<GitHubActivity[]> {
  try {
    const searchUrl = `https://api.github.com/search/issues?q=author:${username}+type:pr+is:public&sort=updated&order=desc&per_page=${count}`;
    const response = await fetchWithAuth(searchUrl, token);
    const data = (await response.json()) as GitHubSearchResponse;

    return data.items.map((item: GitHubSearchItem) => {
      const repoName = item.repository_url.replace('https://api.github.com/repos/', '');
      const status =
        item.state === 'open'
          ? 'open'
          : item.closed_at === item.pull_request?.merged_at
            ? 'merged'
            : 'closed';

      return {
        type: 'pr' as const,
        repo: repoName,
        title: item.title,
        url: item.html_url,
        date: new Date(item.updated_at || item.created_at),
        status,
      };
    });
  } catch {
    return [];
  }
}

export async function getRecentIssues(
  username: string,
  token: string,
  count: number = 5
): Promise<GitHubActivity[]> {
  try {
    const searchUrl = `https://api.github.com/search/issues?q=author:${username}+type:issue+is:public&sort=updated&order=desc&per_page=${count}`;
    const response = await fetchWithAuth(searchUrl, token);
    const data = (await response.json()) as GitHubSearchResponse;

    return data.items.map((item: GitHubSearchItem) => {
      const repoName = item.repository_url.replace('https://api.github.com/repos/', '');

      return {
        type: 'issue' as const,
        repo: repoName,
        title: item.title,
        url: item.html_url,
        date: new Date(item.updated_at || item.created_at),
        status: item.state as 'open' | 'closed',
      };
    });
  } catch {
    return [];
  }
}

export async function getGitHubActivity(
  username: string,
  token: string
): Promise<GitHubActivity[]> {
  try {
    const [commits, prs, issues] = await Promise.all([
      getRecentCommits(username, token, 7),
      getRecentPRs(username, token, 5),
      getRecentIssues(username, token, 3),
    ]);

    const allActivities = [...commits, ...prs, ...issues];

    allActivities.sort((a, b) => b.date.getTime() - a.date.getTime());

    return allActivities.slice(0, 20);
  } catch {
    return [];
  }
}

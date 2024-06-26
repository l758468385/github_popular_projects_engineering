// ReposGrid.tsx
import React from 'react';
import Card from './Card';
import Tooltip from './Tooltip';

interface Owner {
  login: string;
  avatar_url: string;
}

interface Repo {
  name: string;
  owner: Owner;
  html_url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
}

interface ReposGridProps {
  repos: Repo[];
}

const ReposGrid: React.FC<ReposGridProps> = ({ repos }) => {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url + ('' + index)}>
            <Card header={`#${index + 1}`} avatar={avatar_url} href={html_url} name={name}>
              <ul className="card-list">
                <li>
                  <Tooltip text={name}>
                    <span
                      className="fa-fw fa-solid fa-user font-icon"
                      style={{ color: '#f7c578' }}
                    ></span>
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <span
                    className="fa-fw fa-solid fa-star font-icon"
                    style={{ color: '#ffd400' }}
                  ></span>
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <i
                    className=" fa-fw fa-solid fa-code-branch font-icon"
                    style={{ color: '#93d0f8' }}
                  ></i>
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <i
                    className="fa-fw fa-solid fa-exclamation-triangle font-icon"
                    style={{ color: '#fd8ea1' }}
                  ></i>
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default ReposGrid;
import React from 'react';
import { ProjectRow } from './ProjectRow';

const projects = [
  {
    type: 'Research paper',
    description: 'A novel approach to unsupervised learning',
    tags: ['Machine learning', 'unsupervised learning'],
    members: 1,
    stars: 1200,
    forks: 500,
    updated: '2 days ago',
  },
  {
    type: 'Open-source project',
    description: 'An interactive data visualization tool',
    tags: ['Data visualization', 'open-source'],
    members: 3,
    stars: 3000,
    forks: 800,
    updated: '1 week ago',
  },
  // ...otros proyectos
];

export const ProjectTable: React.FC = () => {
  return (
    <div className="bg-white rounded shadow">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search public projects"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4 mt-4 text-sm">
          <button className="text-blue-600 font-medium">All</button>
          <button>Featured</button>
          <button>Trending</button>
          <button>Popular</button>
          <button>Recently updated</button>
          <button>Add filter</button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-4">Project</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Members</th>
            <th>Stars</th>
            <th>Forks</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <ProjectRow key={idx} {...project} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
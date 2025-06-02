import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectProps {
  type: string;
  description: string;
  tags: string[];
  members: number;
  stars: number;
  forks: number;
  updated: string;
  likes: number;
  favorites: number;
  id: string;
}

export const ProjectRow: React.FC<ProjectProps> = ({
  id,
  type,
  description,
  tags,
  members,
  stars,
  forks,
  updated,
  likes,
  favorites,
}) => {
  const navigate = useNavigate();

  // Truncar descripción a 100 caracteres con puntos suspensivos si es más larga
  const truncatedDescription = description.length > 100
    ? description.slice(0, 100) + '...'
    : description;

  return (
    <tr
      className="border-b text-sm hover:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/project/${id}`)}
    >
      <td className="p-4 font-medium">{type}</td>
      <td>{truncatedDescription}</td>
      <td>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td>
        <div className="flex -space-x-2">
          {Array.from({ length: members }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"
            />
          ))}
        </div>
      </td>
      <td>{forks}</td>
      <td>{likes}</td>
      <td>{favorites}</td>
      <td>{updated}</td>
    </tr>
  );
};

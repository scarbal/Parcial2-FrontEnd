import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


export const EditProject: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const docRef = doc(db, 'projects', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async () => {
    if (!project || !id) return;
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, {
      description: project.description,
      tags: project.tags,
      type: project.type,
      gitLink: project.gitLink,
    });
    navigate(`/project/${project.id}`, {state: { fromProfile: true } })
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>

      <label className="block mb-2 font-semibold">Type:</label>
      <input
        type="text"
        value={project.type}
        onChange={(e) => setProject({ ...project, type: e.target.value })}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-semibold">Description:</label>
      <textarea
        value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
        className="w-full border p-2 rounded mb-4"
        rows={4}
      />

      <label className="block mb-2 font-semibold">Tags (comma-separated):</label>
      <input
        type="text"
        value={project.tags.join(', ')}
        onChange={(e) => setProject({ ...project, tags: e.target.value.split(',').map(tag => tag.trim()) })}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-semibold">GitHub Link:</label>
      <input
        type="text"
        value={project.gitLink}
        onChange={(e) => setProject({ ...project, gitLink: e.target.value })}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';



interface Project {
  id: string;
  type: string;
  description: string;
  tags: string[];
  members: string[];
  stars: number;
  forks: number;
  updated: string;
  likes: number;
  favorites: number;
  comments?: string[];
}

export const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

useEffect(() => {
  const fetchProject = async () => {
    const docRef = doc(db, 'projects', id!);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProject({ id: docSnap.id, ...docSnap.data() } as Project);
    }
  };

  fetchProject();
  fetchComments();
}, [id]);


const handleComment = async () => {
  if (!comment || !user) return;

  // Leer el documento del usuario
  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);

  let userName = 'Anonymous';
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    userName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
  } else if (user.displayName) {
    userName = user.displayName;
  } else if (user.email) {
    userName = user.email;
  }

  // Agregar comentario
  const commentRef = collection(db, 'projects', id!, 'comments');
  await addDoc(commentRef, {
    text: comment,
    userId: user.uid,
    userName,
    userPhoto: user.photoURL || '', // opcional
    createdAt: Timestamp.now(),
  });

  setComment('');
  fetchComments();
};

const [comments, setComments] = useState<any[]>([]);
const fetchComments = async () => {
  const q = query(collection(db, 'projects', id!, 'comments'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setComments(data);
};

  const handleLike = async () => {
    const docRef = doc(db, 'projects', id!);
    await updateDoc(docRef, {
      likes: increment(1),
    });
    setProject(prev => prev ? { ...prev, likes: prev.likes + 1 } : prev);
  };

  const handleFavorite = async () => {
    const docRef = doc(db, 'projects', id!);
    await updateDoc(docRef, {
      favorites: increment(1),
    });
    setProject(prev => prev ? { ...prev, favorites: prev.favorites + 1 } : prev);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{project.type}</h1>
      <p>{project.description}</p>
      <div className="mt-2">
        <strong>Tags:</strong> {project.tags.join(', ')}
      </div>
      <div className="mt-4">
        <button onClick={handleLike}>❤️ Like ({project.likes})</button>
        <button onClick={handleFavorite} className="ml-4">⭐ Favorite ({project.favorites})</button>
      </div>
        <div className="mt-6">
  <h2 className="font-bold text-lg mb-2">Comments</h2>
  {comments.map((c, idx) => (
    <div key={idx} className="flex gap-3 items-start border-b py-3">
      <img
        src={c.userPhoto || '/default-avatar.png'}
        alt={c.userName}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div>
        <div className="text-sm font-semibold">{c.userName}</div>
        <div className="text-xs text-gray-500">
          {c.createdAt?.toDate().toLocaleString()}
        </div>
        <div className="text-sm mt-1">{c.text}</div>
      </div>
    </div>
  ))}

  {user && (
    <div className="mt-4">
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleComment} className="mt-2 button-primary">Submit</button>
    </div>
  )}
</div>

    </div>
  );
};

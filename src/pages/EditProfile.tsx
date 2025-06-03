import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { doc, updateDoc, getDocs, query, collection, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const EditProfile: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setUserData({ ...snap.docs[0].data(), docId: snap.docs[0].id });
      }
    };
    fetchUser();
  }, [user]);

  const validateForm = () => {
    const errs: string[] = [];

    if (!userData.firstName?.trim()) errs.push('First Name is required');
    if (!userData.lastName?.trim()) errs.push('Last Name is required');
    if (!userData.email?.trim()) errs.push('Email is required');
    if (userData.email && !/^\S+@\S+\.\S+$/.test(userData.email)) errs.push('Email format is invalid');
    if (!userData.username?.trim()) errs.push('Username is required');

    if (cvFile && cvFile.type !== 'application/pdf') {
      errs.push('CV must be a PDF file');
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSave = async () => {
    if (!userData || !userData.docId) return;
    if (!validateForm()) return;

    let cvUrl = userData.cv || '';
    if (cvFile) {
      // Simulación: genera una URL ficticia con el nombre del archivo
      const fakeUrl = `https://fake-storage.local/cvs/${user?.uid}-${cvFile.name}`;
      cvUrl = fakeUrl;
      console.log('Simulated CV upload:', fakeUrl);
    }

    await updateDoc(doc(db, 'users', userData.docId), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
      socialLinks: userData.socialLinks || {},
      description: userData.description || '',
      cv: cvUrl,
    });

    navigate('/profile');
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  if (!user || !userData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          <ul className="list-disc list-inside">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={userData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          className="border p-2 rounded"
          placeholder="First Name"
        />
        <input
          type="text"
          value={userData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          className="border p-2 rounded"
          placeholder="Last Name"
        />
        <input
          type="email"
          value={userData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="border p-2 rounded col-span-2"
          placeholder="Email"
        />
        <input
          type="text"
          value={userData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          className="border p-2 rounded col-span-2"
          placeholder="Username"
        />
      </div>

      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={4}
        placeholder="Profile description"
        value={userData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />

      <div className="mb-4">
        <label className="block font-semibold mb-1">Social Media Links</label>
        <input
          type="url"
          placeholder="LinkedIn"
          value={userData.socialLinks?.linkedin || ''}
          onChange={(e) => setUserData((prev: any) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
          }))}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="url"
          placeholder="GitHub"
          value={userData.socialLinks?.github || ''}
          onChange={(e) => setUserData((prev: any) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, github: e.target.value }
          }))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload CV (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

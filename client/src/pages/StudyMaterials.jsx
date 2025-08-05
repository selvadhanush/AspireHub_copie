import axios from 'axios';
import { useState, useEffect } from 'react';

export default function StudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  const [newMaterial, setNewMaterial] = useState({ title: '', subject: '', link: '' });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  // ✅ Fetch materials from backend
  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/study-materials');
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
      // Dummy fallback
      const dummyMaterials = [
        { id: 1, title: 'Biology - Human Physiology', subject: 'Biology', link: '#' },
        { id: 2, title: 'Physics - Thermodynamics', subject: 'Physics', link: '#' },
        { id: 3, title: 'Chemistry - Organic Compounds', subject: 'Chemistry', link: '#' },
      ];
      setMaterials(dummyMaterials);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddOrUpdateMaterial = async () => {
    if (!newMaterial.title || !newMaterial.subject || !newMaterial.link) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (editId !== null) {
        // PUT request to update existing material
        await axios.put(`http://localhost:8000/api/study-materials/${editId}`, newMaterial, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showToast('Material updated!');
        console.log("⬆️ Token being sent:", token);

      } else {
        // POST request to add new material
        console.log("📦 Sending token:", token); // <== Add this
console.log("📦 Sending data:", newMaterial); // <== Add this

        await axios.post('http://localhost:8000/api/study-materials', newMaterial, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showToast('Material added!');
      }

      setNewMaterial({ title: '', subject: '', link: '' });
      setEditId(null);
      setShowModal(false);
      fetchMaterials(); // Refresh materials from backend

    } catch (error) {
      console.error('Error saving material:', error);
      alert(error.response?.data?.message || 'Failed to save material');
    }
  };

  const handleEdit = (material) => {
    setNewMaterial(material);
    setEditId(material._id); // backend will use _id, not id
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/study-materials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('Material deleted!');
      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('Failed to delete material');
    }
  };

  const filteredMaterials = materials.filter((mat) =>
    mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mat.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-blue-700">📚 Study Materials</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              setShowModal(true);
              setEditId(null);
              setNewMaterial({ title: '', subject: '', link: '' });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Material
          </button>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div
            key={material._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{material.title}</h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {material.subject}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(material)}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <a
              href={material.link}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Material
            </a>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editId ? 'Edit Material' : 'Add Study Material'}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newMaterial.title}
              onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Subject"
              value={newMaterial.subject}
              onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
              className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Material Link"
              value={newMaterial.link}
              onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewMaterial({ title: '', subject: '', link: '' });
                  setEditId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateMaterial}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

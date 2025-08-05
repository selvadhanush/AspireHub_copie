import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    classInfo: '',
    profilePicture: '',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //   } else {
  //     axios
  //       .get('http://localhost:5000/api/user/profile', {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         const { fullName, email, phone, classInfo, profilePicture } = res.data.user;
  //         setUser(res.data.user);
  //         setForm({ fullName, email, phone, classInfo, profilePicture });
  //       })
  //       .catch(() => {
  //         localStorage.removeItem('token');
  //         navigate('/login');
  //       });
  //   }
  // }, [token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        'http://localhost:5000/api/user/update-profile',
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Profile updated successfully!');
    } catch {
      setMessage('❌ Failed to update profile');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    try {
      await axios.put(
        'http://localhost:5000/api/user/update-password',
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setMessage('❌ Failed to update password');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 relative">
        {/* 🔘 Logout Button */}
        <button
          onClick={() => navigate('/signout')}
          className="absolute top-4 right-4 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

        <h1 className="text-2xl font-bold text-blue-700">⚙️ Account Settings</h1>

        {/* Profile Info */}
        <form onSubmit={handleProfileUpdate}>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">👤 Profile Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm">Class / Grade</label>
              <input
                type="text"
                name="classInfo"
                value={form.classInfo}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm">🖼️ Profile Picture (URL for now)</label>
            <input
              type="text"
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Update Profile
          </button>
        </form>

        {/* Security Section */}
        <form onSubmit={handlePasswordUpdate}>
          <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2">🔒 Change Password</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-sm">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Update Password
            </button>
          </div>
        </form>

        {/* Message */}
        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}

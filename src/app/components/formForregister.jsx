'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Form() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const API_BASE_URL = 'https://a2sv-application-platform-backend-team1.onrender.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          full_name: '',
          email: '',
          password: '',
          confirm_password: '',
        });
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (err) {
      const serverError = err.response?.data?.detail || 'An error occurred while registering.';
      setError(serverError);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'full_name', placeholder: 'Full name' },
    { name: 'email', placeholder: 'Email address' },
    { name: 'password', placeholder: 'Password' },
    { name: 'confirm_password', placeholder: 'Confirm password' },
  ];

  return (
    <div className="w-full flex justify-center items-start px-4 sm:px-6 lg:px-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[448px] opacity-100 rounded-[6px]"
        style={{
          backgroundColor: 'rgba(255,255,255,0.01)',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          gap: '-1px',
        }}
      >
        {fields.map(({ name, placeholder }) => (
          <div key={name} className="w-full h-[34px] sm:h-[38px]">
            <input
              name={name}
              type={name.includes('password') ? 'password' : 'text'}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="w-full h-full bg-white text-black 
                         px-[10px] sm:px-[13px] pt-[8px] sm:pt-[10px] pb-[9px] sm:pb-[11px]
                         border-t border-[#D1D5DB] 
                         opacity-100 text-sm sm:text-base"
              style={{
                borderTopLeftRadius: '6px',
                borderTopRightRadius: '6px',
              }}
            />
          </div>
        ))}

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-sm">User created successfully!</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full h-[34px] sm:h-[38px] mt-[20px] ${
            loading ? 'bg-gray-400' : 'bg-[#4F46E5]'
          } text-white 
          px-[14px] sm:px-[17px] py-[8px] sm:py-[9px] rounded-[6px] opacity-100 text-sm sm:text-base`}
        >
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

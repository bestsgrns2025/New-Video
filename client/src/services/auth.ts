import axios from 'axios';

// Dynamically picks API URL depending on environment
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn('⚠️ VITE_API_URL is not set! Falling back to localhost.');
}

const client = axios.create({
  baseURL: API_URL || 'http://localhost:5000/api/auth',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // only if backend uses cookies
});

// ---------------------- Auth API ----------------------
export const signup = async (data: any) => {
  try {
    const res = await client.post('/signup', data);
    return res.data;
  } catch (err: any) {
    console.error('Signup Error:', err.response?.data || err.message);
    throw err.response?.data || { msg: 'Unexpected error occurred' };
  }
};

export const signin = async (data: any) => {
  try {
    const res = await client.post('/signin', data);
    return res.data;
  } catch (err: any) {
    console.error('Signin Error:', err.response?.data || err.message);
    throw err.response?.data || { msg: 'Unexpected error occurred' };
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const res = await client.post('/forgot-password', data);
    return res.data;
  } catch (err: any) {
    console.error('Forgot Password Error:', err.response?.data || err.message);
    throw err.response?.data || { msg: 'Unexpected error occurred' };
  }
};

export const resetPassword = async (data: any, token: string) => {
  try {
    const res = await client.post(`/reset-password/${token}`, data);
    return res.data;
  } catch (err: any) {
    console.error('Reset Password Error:', err.response?.data || err.message);
    throw err.response?.data || { msg: 'Unexpected error occurred' };
  }
};

export const adminLogin = async (data: any) => {
  try {
    const res = await client.post('/admin/login', data);
    return res.data;
  } catch (err: any) {
    console.error('Admin Login Error:', err.response?.data || err.message);
    throw err.response?.data || { msg: 'Unexpected error occurred' };
  }
};

export const getUsers = async () => {
  try {
    const res = await client.get('/users');
    return res.data;
  } catch (err: any) {
    console.error('Get Users Error:', err.response?.data || err.message);
    throw err.response?.data || { msg: 'Unexpected error occurred' };
  }
};

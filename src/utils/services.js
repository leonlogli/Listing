import { request } from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (data) => {
  try {
    const res = await request({ url: '/user/login', method: 'post', data });

    await AsyncStorage.setItem('auth_token', res?.token);

    return res?.token;
  } catch (e) {
    console.error('login error', e);
  }
};

export const signup = async (data) => {
  try {
    const res = await request({ url: '/user/register', method: 'post', data });

    if (res) {
      const { email, password } = data;
      const loginResponse = await login({ email, password });

      return loginResponse;
    }
  } catch (e) {
    console.error('signup error', e);
  }
};

export const getProfile = async () => {
  try {
    const data = await request({ url: '/user/profile', method: 'get' });

    return data;
  } catch (e) {
    console.error('profile error', e);
  }
};

export const updateProfile = async (data) => {
  try {
    await request({ url: '/user/profile', method: 'patch', data });

    return await getProfile();
  } catch (e) {
    console.error('update profile error', e);
  }
};

export const getServices = async () => {
  try {
    const data = await request({ url: '/services', method: 'get' });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const updateService = async (id, data) => {
  try {
    await request({ url: '/services' + id, method: 'patch', data });

    return await getServices();
  } catch (e) {
    console.error('services error', e);
  }
};

export const deleteService = async (id) => {
  try {
    await request({ url: '/services' + id, method: 'delete' });

    return await getServices();
  } catch (e) {
    console.error(e);
  }
};

export const addService = async (data) => {
  try {
    const formData = new FormData();
    const objKeys = Object.keys(data);

    objKeys.forEach((key) => {
      formData.append(key, data[key]);
    });

    await request({
      url: '/services',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    });

    return await getServices();
  } catch (e) {
    console.error('add services error', e);
  }
};

import { request } from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fakeProduct from './fakeProduct.json';

const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYyMDViYzk1N2Y4NTc4MWY1MzUzMDYiLCJpYXQiOjE2NjAwMjgzNjd9.mce1PZICAC9SlzCm4bvd0KmIgZIjTjSzU01cC9etdu4';

export const login = async (values) => {
  try {
    const response = await request({
      url: '/user/login',
      method: 'post',
      data: values,
    });

    if (response?.data?.token) {
      await AsyncStorage.setItem('auth_token', response?.data?.token);

      return response?.data?.token;
    }
  } catch (e) {
    console.error('login error', e);

    return fakeToken;
  }
};

export const signup = async (values) => {
  try {
    const response = await request({
      url: '/user/register',
      method: 'post',
      data: values,
    });

    if (response) {
      const { email, password } = values;
      const loginResponse = await login({ email, password });

      return loginResponse;
    }
  } catch (e) {
    console.error('signup error', e);

    return fakeToken;
  }
};

const fakeProfile = {
  _id: '62efd2ea957f85781f5352ee',
  fullName: 'John Doe',
  email: 'johndoe@gmail.com',
  projects: [],
  role: 'User',
  registerType: 'Normal',
  createdAt: '2022-08-07T14:57:46.893Z',
  updatedAt: '2023-02-16T15:36:28.626Z',
};

export const getProfile = async () => {
  try {
    const response = await request({
      url: '/user/profile',
      method: 'get',
    });

    if (response) {
      return response?.data;
    }
  } catch (e) {
    console.error('profile error', e);

    return { data: fakeProfile };
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await request({
      url: '/user/profile',
      method: 'patch',
      data,
    });

    if (response) {
      const profile = await getProfile();
      return profile;
    }
  } catch (e) {
    console.log('update profile error', e);

    return { data: fakeProfile };
  }
};

export const getServices = async () => {
  try {
    /*
    const response = await request({
      url: '/services',
      method: 'get',
    });

    if (response) {
      return response?.data;
    }
    */

    return fakeProduct;
  } catch (e) {
    console.log('services error', e.response);

    return fakeProduct;
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await request({
      url: '/services',
      method: 'patch',
      data: {
        servicesId: id,
        ...data,
      },
    });

    if (response) {
      const services = await getServices();
      return services;
    }
  } catch (e) {
    console.log('services error', e.response);
  }
};

export const deleteService = async (id) => {
  try {
    const response = await request({
      url: '/services',
      method: 'delete',
      data: {
        servicesId: id,
      },
    });

    if (response) {
      const services = await getServices();
      return services;
    }
  } catch (e) {
    console.log('services error', e.response);
  }
};

export const addService = async (data) => {
  try {
    const formData = new FormData();
    const objKeys = Object.keys(data);
    objKeys.forEach((key) => {
      formData.append(key, data[key]);
    });
    const response = await request({
      url: '/services',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    if (response) {
      const services = await getServices();
      return services;
    }
  } catch (e) {
    console.log('add services error', e.response);
  }
};

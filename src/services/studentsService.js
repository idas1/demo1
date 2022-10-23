import api from "./api";
const list = () => api.get(api.url.students);
const get = (id) => api.get(`${api.url.students}/${id}`);
const add = (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(api.url.students, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const update = (id, data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  api.post(`${api.url.students}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const remove = (id) => api.delete(`${api.url.students}/${id}`);
const getAvatarUrl = (id) => api.get(`${api.url.students}/avatar-url/${id}`);
const getAvatarBase64 = (id) => api.get(`${api.url.students}/avatar-base64/${id}`);
const getAvatar = (id) =>
  api.get(`${api.url.students}/avatar/${id}`, {
    responseType: "blob",
  });
const downloadAvatar = (id) =>
  api.get(`${api.url.students}/download-avatar/${id}`, {
    responseType: "blob",
  });

const studentService = {
  list,
  get,
  getAvatarUrl,
  getAvatarBase64,
  getAvatar,
  add,
  update,
  delete: remove,
  downloadAvatar,
};

export default studentService;

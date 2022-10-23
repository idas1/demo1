import api from "./productApi";

const list = () => api.get(api.url.products);
const get = (id) => api.get(`${api.url.products}/${id}`);
const add = (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(api.url.products, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const update = (id, data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  api.post(`${api.url.products}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const remove = (id) => api.delete(`${api.url.products}/${id}`);
const getAvatarUrl = (id) => api.get(`${api.url.products}/avatar-url/${id}`);
const getAvatarBase64 = (id) => api.get(`${api.url.products}/avatar-base64/${id}`);
const getAvatar = (id) =>
  api.get(`${api.url.products}/avatar/${id}`, {
    responseType: "blob",
  });
const downloadAvatar = (id) =>
  api.get(`${api.url.products}/download-avatar/${id}`, {
    responseType: "blob",
  });

const productsService = {
    list,
    get,
    getAvatarUrl,
    getAvatarBase64,
    getAvatar,
    add,
    update,
    delete: remove,
    downloadAvatar,
}

export default productsService;
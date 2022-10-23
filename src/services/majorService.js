import api from "./api";
const list = () => api.get(api.url.majors);
const getPaging = (pageNum, pageLength, search) => {
  const qryString = `?page=${pageNum}&pageLength=${pageLength}&search=${search}`;
  return api.get(`${api.url.majors}/get-paging${qryString}`);
};
const get = (id) => api.get(`${api.url.majors}/${id}`);
const add = (data) => {
  delete data.id;
  return api.post(api.url.majors, data);
};
const update = (id, data) => api.put(`${api.url.majors}/${id}`, data);
const remove = (id) => api.delete(`${api.url.majors}/${id}`);

const majorService = {
  list,
  getPaging,
  get,
  add,
  update,
  delete: remove,
};

export default majorService;

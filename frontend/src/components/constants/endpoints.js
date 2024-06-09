const baseUrl = "/api/v1";
export const auth = {
  login: `${baseUrl}/auth/login`,
  register: `${baseUrl}/auth/register`,
  me: `${baseUrl}/auth/me`,
};
export const sales = {
  add: `${baseUrl}/sales`,
  read: `${baseUrl}/sales`,
  invoice: `${baseUrl}/sales/last-invoice`,
  date: `${baseUrl}/sales/last-date`,
  delete: (id) => `${baseUrl}/sales/${id}`,
  update: (id) => `${baseUrl}/sales/${id}`,
};

export const manufacturer = {
  add: `${baseUrl}/manufacturer`,
  read: `${baseUrl}/manufacturer`,
  delete: (id) => `${baseUrl}/manufacturer/${id}`,
  update: (id) => `${baseUrl}/manufacturer/${id}`,
};

export const genericName = {
  add: `${baseUrl}/generic-name`,
  read: `${baseUrl}/generic-name`,
  delete: (id) => `${baseUrl}/generic-name/${id}`,
  update: (id) => `${baseUrl}/generic-name/${id}`,
};

export const category = {
  add: `${baseUrl}/category`,
  read: `${baseUrl}/category`,
  delete: (id) => `${baseUrl}/category/${id}`,
  update: (id) => `${baseUrl}/category/${id}`,
};
export const supplier = {
  add: `${baseUrl}/supplier`,
  read: `${baseUrl}/supplier`,
  delete: (id) => `${baseUrl}/supplier/${id}`,
  update: (id) => `${baseUrl}/supplier/${id}`,
};

export const medicine = {
  add: `${baseUrl}/medicine`,
  read: `${baseUrl}/medicine`,
  delete: (id) => `${baseUrl}/medicine/${id}`,
  update: (id) => `${baseUrl}/medicine/${id}`,
};

export const batch = {
  add: `${baseUrl}/batch`,
  read: `${baseUrl}/batch`,
  delete: (id) => `${baseUrl}/batch/${id}`,
  update: (id) => `${baseUrl}/batch/${id}`,
};

export const stats = {
  admin_stats: `${baseUrl}/stats/top`,
  product_by_category: `${baseUrl}/stats/productCategory`,
};

export const users = {
  read: `${baseUrl}/user`,
  byId: (id) => `${baseUrl}/user/${id}`,
  delete: (id) => `${baseUrl}/user/${id}`,
  update: (id) => `${baseUrl}/user/${id}`,
};

export const logs = {
  add: `${baseUrl}/logs`,
  read: `${baseUrl}/logs`,
  delete: (id) => `${baseUrl}/logs/${id}`,
  update: (id) => `${baseUrl}/logs/${id}`,
};

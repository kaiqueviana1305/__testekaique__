import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const { data } = await axios.post("/api/auth/token/refresh/", { refresh });
          localStorage.setItem("access_token", data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (username: string, password: string) =>
    api.post("/auth/token/", { username, password }),
  register: (data: Record<string, string>) =>
    api.post("/auth/register/", data),
  me: () => api.get("/auth/me/"),
  updateMe: (data: Record<string, string>) =>
    api.patch("/auth/me/", data),
};

// ─── Integrations ────────────────────────────────────────────────────────────
export const integrationsApi = {
  listConnections: () => api.get("/integrations/connections/"),
  deleteConnection: (id: number) => api.delete(`/integrations/connections/${id}/`),

  getMetaOAuthUrl: () => api.get("/integrations/meta/auth/"),
  getLinkedInOAuthUrl: () => api.get("/integrations/linkedin/auth/"),
  getGoogleOAuthUrl: () => api.get("/integrations/google/auth/"),

  saveConnection: (data: Record<string, unknown>) =>
    api.post("/integrations/connections/save/", data),
  createManualConnection: (data: Record<string, unknown>) =>
    api.post("/integrations/connections/manual/", data),

  previewSheets: (data: Record<string, unknown>) =>
    api.post("/integrations/sheets/preview/", data),
};

// ─── Campaigns ───────────────────────────────────────────────────────────────
export const campaignsApi = {
  list: (params?: Record<string, string>) =>
    api.get("/campaigns/", { params }),
  detail: (id: number) => api.get(`/campaigns/${id}/`),
  sync: (data: Record<string, string>) => api.post("/campaigns/sync/", data),

  kpiSummary: (params?: Record<string, string>) =>
    api.get("/campaigns/kpis/", { params }),
  kpiByPlatform: (params?: Record<string, string>) =>
    api.get("/campaigns/kpis/by-platform/", { params }),
  timeseries: (params?: Record<string, string>) =>
    api.get("/campaigns/kpis/timeseries/", { params }),
};

// ─── Dashboards ──────────────────────────────────────────────────────────────
export const dashboardsApi = {
  list: () => api.get("/dashboards/"),
  create: (data: Record<string, unknown>) => api.post("/dashboards/", data),
  update: (id: number, data: Record<string, unknown>) =>
    api.patch(`/dashboards/${id}/`, data),
  delete: (id: number) => api.delete(`/dashboards/${id}/`),
};

export default api;

import { getApiClient } from "src/modules/axios";

export const upload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return getApiClient("multipart/form-data").post("/api/files", formData);
};

export const getData = (search: string) => {
  return getApiClient("application/json").get("/api/users", {
    params: { q: search },
  });
};

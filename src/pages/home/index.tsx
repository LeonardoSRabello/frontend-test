import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AxiosResponse, AxiosError } from "axios";

import Upload from "./components/upload";
import Viewer from "./components/viewer";
import { getData } from "src/queries/home";
import { IData } from "src/interfaces/home";

const Home: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [initial, setInitial] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string>("");
  const [data, setData] = useState<Record<string, string>[]>([]);

  const fetchData = (search: string) => {
    setLoading(true);
    getData(search)
      .then((res: AxiosResponse<IData>) => {
        setData(res.data.data);
      })
      .catch((err: AxiosError) => {
        setLoadError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        color="primary"
        sx={{ p: 3, mb: 3 }}
      >
        CSV file content viewer
      </Typography>
      <Upload
        uploading={uploading}
        setUploading={setUploading}
        setError={setUploadError}
        setInitial={setInitial}
        fetchData={fetchData}
      />
      {uploading ? (
        <Typography variant="h5" textAlign="center" fontStyle="italic">
          Uploading...
        </Typography>
      ) : uploadError ? (
        <Typography variant="h5" color="error">
          {uploadError}
        </Typography>
      ) : initial ? null : (
        <Viewer
          loading={loading}
          loadError={loadError}
          data={data}
          fetchData={fetchData}
        />
      )}
    </Box>
  );
};

export default Home;

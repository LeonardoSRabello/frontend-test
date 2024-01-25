import React, { useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AxiosError } from "axios";

import { upload } from "src/queries/home";
import { IError } from "src/interfaces/home";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface UploadProps {
  uploading: boolean;
  setUploading: (value: boolean) => void;
  setError: (value: string) => void;
  setInitial: (value: boolean) => void;
  fetchData: (search: string) => void;
}

const Upload: React.FC<UploadProps> = ({
  uploading,
  setUploading,
  setError,
  setInitial,
  fetchData,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.length ? e.target.files[0] : null);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }
    setUploading(true);
    upload(file)
      .then(() => {
        setInitial(false);
        setError("");
        fetchData("");
      })
      .catch((err: AxiosError<IError>) => {
        setError(err.response?.data.message || err.message);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 2, sm: 0 },
          mr: { xs: 0, sm: 2 },
        }}
      >
        <Button variant="contained" component="label">
          Select file
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={handleChange}
          />
        </Button>
        {!!file && (
          <Typography fontStyle="italic" sx={{ ml: 3 }}>
            {file.name}
          </Typography>
        )}
      </Box>
      <LoadingButton
        variant="contained"
        disabled={!file || uploading}
        loading={uploading}
        onClick={handleUpload}
      >
        Upload
      </LoadingButton>
    </Box>
  );
};

export default Upload;

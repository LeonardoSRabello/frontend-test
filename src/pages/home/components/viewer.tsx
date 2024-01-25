import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ItemCard from "./itemCard";

interface ViewerProps {
  loading: boolean;
  loadError: string;
  data: Record<string, string>[];
  fetchData: (search: string) => void;
}

const Viewer: React.FC<ViewerProps> = ({
  loading,
  loadError,
  data,
  fetchData,
}) => {
  const [search, setSearch] = useState<string>("");

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ bgcolor: "white", position: "sticky", top: 10, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mr: 2 }}
          />
          <LoadingButton
            variant="contained"
            onClick={() => fetchData(search)}
            sx={{ mr: 2 }}
            disabled={loading}
            loading={loading}
          >
            Search
          </LoadingButton>
          <Button variant="contained" onClick={() => setSearch("")}>
            Clear
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : loadError ? (
        <Typography variant="h5" textAlign="center" color="error">
          {loadError}
        </Typography>
      ) : !data.length ? (
        <Typography textAlign="center">There is no searched data</Typography>
      ) : (
        <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto", p: 3 }}>
          <Grid container spacing={2}>
            {data.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Viewer;

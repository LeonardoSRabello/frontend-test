import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";

interface ItemCardProps {
  item: Record<string, string>;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={4} sx={{ p: 2 }}>
        {Object.keys(item).map((key) => (
          <Box key={key} sx={{ mb: 1 }}>
            <Typography
              fontWeight="bold"
              sx={{ mr: 1 }}
            >{`${key}:`}</Typography>
            <Typography>{item[key]}</Typography>
          </Box>
        ))}
      </Paper>
    </Grid>
  );
};

export default ItemCard;

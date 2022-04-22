import { ReactNode } from "react";
import { alpha, Box, Paper, Typography } from "@mui/material";

export type StatCardProps = {
  title: string;
  value: string;
  percentage: number;
  percentageText: string;
  ChipComponent?: ReactNode;
};
const StatCard = ({
  title,
  value,
  percentage,
  percentageText,
  ChipComponent,
}: StatCardProps) => {
  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          sx={(theme) => ({
            fontSize: theme.spacing(5),
            fontWeight: 600,
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          })}
        >
          {title}
        </Typography>
        {ChipComponent}
      </Box>
      <Typography
        sx={(theme) => ({
          fontSize: theme.spacing(8.5),
          color: theme.palette.text.primary,
          mb: 3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        })}
        title={value}
      >
        {value}
      </Typography>
      {!!percentage && (
        <Typography
          sx={(theme) => ({
            fontSize: theme.spacing(3.5),
            color: theme.palette.text.secondary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          })}
        >
          <Typography
            component="span"
            sx={(theme) => ({
              padding: theme.spacing(1, 2),
              borderRadius: 100,
              bgcolor: alpha(
                percentage > 0
                  ? theme.palette.success.light
                  : theme.palette.error.light,
                0.1
              ),
              color:
                percentage > 0
                  ? theme.palette.success.dark
                  : theme.palette.error.dark,
            })}
            title={`${percentage}%`}
          >
            {percentage}%
          </Typography>
          {!!percentageText && (
            <Typography component="span"> {percentageText}</Typography>
          )}
        </Typography>
      )}
    </Paper>
  );
};

export default StatCard;

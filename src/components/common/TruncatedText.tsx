import { Typography, type TypographyProps } from "@mui/material";

interface TruncatedTextProps extends TypographyProps {
  detailed?: boolean;
  text: string;
}

export default function TruncatedText({
  detailed = false,
  text,
  sx,
  ...typographyProps
}: TruncatedTextProps) {
  return (
    <Typography
      {...typographyProps}
      sx={{
        ...(detailed
          ? {
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }
          : {
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }),
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
}

import {
  Box,
  Button,
  Modal,
  ModalProps,
  Typography,
  styled,
} from "@mui/material";

type Props = {
  onConfirm: () => void;
  text: string;
  confirmText: string;
  cancelText: string;
  reverse?: boolean;
} & Omit<ModalProps, "children">;

const GeneralModal = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiModal-backdrop": {
    "backdrop-filter": "blur(10px)",
    backgroundColor: "#4747472D",
  },
}));

export const ConfirmModal = ({
  onConfirm,
  text,
  confirmText,
  cancelText,
  onClose,
  reverse = false,
  ...rest
}: Props) => {
  return (
    <GeneralModal onClose={onClose} {...rest}>
      <Box sx={{ px: 6, py: 7, borderRadius: 5, backgroundColor: "white" }}>
        <Typography variant="body1" sx={{ fontSize: 21 }}>
          {text}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            gap: 3,
          }}
        >
          {reverse ? (
            <>
              <Button
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 3,
                  color: "black",
                  backgroundColor: "white",
                  border: "2px solid black",
                }}
                onClick={() => (onClose as any)()}
              >
                {cancelText}
              </Button>
              <Button
                sx={{
                  px: 2,
                  py: 1,
                  color: "white",
                  backgroundColor: "#5364FF",
                  borderRadius: 3,
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#5364FF",
                  },
                }}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 3,
                  color: "black",
                  backgroundColor: "white",
                  border: "2px solid black",
                }}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
              <Button
                sx={{
                  px: 2,
                  py: 1,
                  color: "white",
                  backgroundColor: "#5364FF",
                  borderRadius: 3,
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#5364FF",
                  },
                }}
                onClick={() => (onClose as any)()}
              >
                {cancelText}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </GeneralModal>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "src/api/auth";
import { AuthInput } from "src/components/templates/auth-input";
import { AuthLayout } from "src/components/templates/auth-layout";
import {
  ERROR_MESSAGE_DELAY,
  SUCCESS_MESSAGE_DELAY,
} from "src/constants/const";
import { Routes } from "src/constants/routes";
import { Texts } from "src/constants/texts";
import { sleep } from "src/utils/helpers";
import z, { TypeOf } from "zod";

const REDIRECT_DELAY = 2500;

const registerSchema = z.object({
  email: z
    .string()
    .nonempty(Texts.errors.fieldRequired)
    .email(Texts.errors.emailIsInvalid),
  name: z
    .string()
    .nonempty(Texts.errors.fieldRequired)
    .min(6, Texts.errors.minChars(6)),
  phone: z.string(),
  password: z
    .string()
    .nonempty(Texts.errors.fieldRequired)
    .min(6, Texts.errors.minChars(6))
    .max(32, Texts.errors.maxChars(32)),
});

type RegisterInputs = TypeOf<typeof registerSchema>;

export const RegisterPage = () => {
  const {
    register: registerField,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const registerMutation = useMutation(register, {
    onError() {
      toast(Texts.register.errorOccured, {
        delay: ERROR_MESSAGE_DELAY,
        rtl: true,
      });
    },
    async onSuccess() {
      toast(Texts.register.success, {
        delay: SUCCESS_MESSAGE_DELAY,
        rtl: true,
      });

      await sleep(REDIRECT_DELAY);
      navigate(Routes.Login);
    },
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (values) => {
    registerMutation.mutateAsync(values);
  };

  return (
    <AuthLayout>
      <Typography
        component="h1"
        variant="h4"
        sx={{ color: theme.general.sideBarText }}
      >
        {Texts.register.registerToTheSystem}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        sx={{ mt: 1, width: 400 }}
      >
        <AuthInput
          required
          fullWidth
          label={Texts.register.name}
          autoFocus
          error={!!errors["name"]}
          helperText={errors["name"] ? errors["name"].message : ""}
          {...registerField("name")}
        />
        <AuthInput
          required
          fullWidth
          label={Texts.register.email}
          type="email"
          error={!!errors["email"]}
          helperText={errors["email"] ? errors["email"].message : ""}
          {...registerField("email")}
        />
        <AuthInput
          fullWidth
          label={Texts.register.phone}
          error={!!errors["phone"]}
          helperText={errors["phone"] ? errors["phone"].message : ""}
          {...registerField("phone")}
        />
        <AuthInput
          required
          fullWidth
          label={Texts.register.password}
          type="password"
          error={!!errors["password"]}
          helperText={errors["password"] ? errors["password"].message : ""}
          {...registerField("password")}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {Texts.register.register}
        </Button>
        <Grid container>
          <Grid item>
            <Link href={Routes.Login} variant="body2">
              {Texts.register.login}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

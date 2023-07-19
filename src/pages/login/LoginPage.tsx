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
import { login } from "src/api/auth";
import { AuthInput } from "src/components/templates/auth-input";
import { AuthLayout } from "src/components/templates/auth-layout";
import { ERROR_MESSAGE_DELAY } from "src/constants/const";
import { Routes } from "src/constants/routes";
import { Texts } from "src/constants/texts";
import { useAuthContext } from "src/context/auth";
import z, { TypeOf } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty(Texts.errors.fieldRequired)
    .email(Texts.errors.emailIsInvalid),
  password: z
    .string()
    .nonempty(Texts.errors.fieldRequired)
    .min(6, Texts.errors.minChars(6))
    .max(32, Texts.errors.maxChars(32)),
});

type LoginInputs = TypeOf<typeof loginSchema>;

export const LoginPage = () => {
  const {
    register: registerField,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const loginMutation = useMutation(login, {
    onError() {
      toast(Texts.login.errorOccured, {
        delay: ERROR_MESSAGE_DELAY,
        rtl: true,
      });
    },
    onSuccess({ data }) {
      authContext.authUser(data);
      navigate(Routes.Home);
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = (values) => {
    loginMutation.mutateAsync(values);
  };

  return (
    <AuthLayout>
      <Typography
        component="h1"
        variant="h4"
        sx={{ color: theme.general.sideBarText }}
      >
        {Texts.login.loginToTheSystem}
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
          label={Texts.login.email}
          autoFocus
          type="email"
          error={!!errors["email"]}
          helperText={errors["email"] ? errors["email"].message : ""}
          {...registerField("email")}
        />
        <AuthInput
          required
          fullWidth
          label={Texts.login.password}
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
          {Texts.login.login}
        </Button>
        <Grid container>
          <Grid item>
            <Link href={Routes.Register} variant="body2">
              {Texts.login.register}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

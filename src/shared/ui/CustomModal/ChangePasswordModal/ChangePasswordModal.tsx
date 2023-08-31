import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { RevisionButton } from 'shared/ui/CustomButton/RevisionButton/RevisionButton';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorHint } from 'shared/ui/ErrorHint/ErrorHint';

import { Portal } from 'shared/ui/Portal/Portal';

import cls from './ChangePasswordModal.module.scss';

interface ChangePasswordModalProps {
  className?: string;
  onCloseClick: () => void;
}

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Введите текущий пароль')
    .min(1, 'Password is too short - must be at least 1 char'),
  newPassword: yup
    .string()
    .required('Введите новый пароль')
    .min(1, 'New password is too short - must be at least 1 char'),
  confirmPassword: yup
    .string()
    .required('Введите подтверждение пароля')
    .min(1, 'New password is too short - must be at least 1 char'),
});

const defaultValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const { className, onCloseClick } = props;

  const { t } = useTranslation();

  const [open, setOpen] = useState(true);

  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [error, setError] = useState(false);

  const [errorAuth, setErrorAuth] = useState(false);

  // const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
    onCloseClick();
  };

  useEffect(() => {
    setErrorAuth(!!errorAuth);
  }, [errorAuth]);

  const onSubmitAuth = async ({
    password,
    newPassword,
    confirmPassword,
  }: {
    password: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log({ password, newPassword, confirmPassword });

    if (newPassword !== confirmPassword) {
      setError(true);
    }

    // const result = await dispatch(loginByUsername({ username, password }));

    // if (result.meta.requestStatus === 'fulfilled') {
    //   // onSuccess();
    //   console.log('success');
    // } else {
    //   console.log('error');
    // }
  };

  return (
    <Portal element={document.getElementById('root') ?? document.body}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 1,
            width: '100%',
            background: '#f1f1f1',
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {t('change-password')}
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent>
          <form
            name="loginForm"
            noValidate
            className={cls.form}
            onSubmit={handleSubmit(onSubmitAuth)}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    onFocus={() => {
                      setErrorAuth(false);
                      setError(false);
                    }}
                    label={t('current-password')}
                    type="password"
                    autoFocus
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="standard"
                    required
                    fullWidth
                  />
                );
              }}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onFocus={() => {
                    setErrorAuth(false);
                    setError(false);
                  }}
                  label={t('new-password')}
                  type="password"
                  error={!!errors.newPassword}
                  helperText={errors?.newPassword?.message}
                  variant="standard"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onFocus={() => {
                    setErrorAuth(false);
                    setError(false);
                  }}
                  label={t('confirm-password')}
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors?.confirmPassword?.message}
                  variant="standard"
                  required
                  fullWidth
                />
              )}
            />
            <Box>
              {error && (
                <ErrorHint text="Новый пароль и подтверждение не совпадают." />
              )}
              {errorAuth && <span>Неправильный пароль</span>}
            </Box>

            <Box
              sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '100%',
              }}
            >
              <LoadingButton
                // loading={isLoading}
                variant="contained"
                color="secondary"
                sx={{
                  // marginTop: '20px',
                  minWidth: '95px',
                  backgroundColor: '#13406d',
                  color: '#fff',
                  '& .Mui-disabled': {
                    color: 'rgba(0, 0, 0, 0.26)',
                    boxShadow: 'none',
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&:hover': {
                    backgroundColor: '#18528d',
                  },
                }}
                aria-label="Ok"
                disabled={isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="medium"
              >
                {t('Ok')}
              </LoadingButton>
              <RevisionButton text={t('cancel')} onClick={handleClose} />
            </Box>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </Portal>
  );
};

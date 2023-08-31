import {
  memo, useState, ReactNode, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as _ from 'lodash';
import LogoIcon from 'shared/assets/icons/logo.png';
import { Tab, Tabs } from '@mui/material';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginByUsername } from 'features/AuthByUserName/model/services/loginByUserName/loginByUserName';
import { useSelector } from 'react-redux';
import { getLoginError } from 'features/AuthByUserName/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/AuthByUserName/model/selectors/getLoginIsLoading/getLoginIsLoading';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  DynamicModuleLoader,
  Reducers,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  loginActions,
  loginReducer,
} from 'features/AuthByUserName/model/slice/loginSlice';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
  className?: string;
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const schema = yup.object().shape({
  // email: yup
  //   .string()
  //   .email('You must enter a valid email')
  //   .required('You must enter a email'),
  username: yup
    .string()
    .required('Введите логин')
    .min(1, 'Username is too short - must be at least 4 chars.'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(1, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  username: '',
  password: '',
};

const initialReducers: Reducers = {
  login: loginReducer,
};

export const LoginPage = memo((props: LoginPageProps) => {
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    control, formState, handleSubmit, setError, setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const [errorAuth, setErrorAuth] = useState(false);

  // useEffect(() => {
  //   setValue('email', 'admin@parus.com', { shouldDirty: true, shouldValidate: true });
  //   setValue('password', '', { shouldDirty: true, shouldValidate: true });
  // }, [setValue]);

  useEffect(() => {
    document.title = 'ЛК ЭДО';
  }, []);

  useEffect(() => {
    setErrorAuth(!!error);
  }, [error]);

  const onSubmitAuth = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    dispatch(loginActions.setUsername(username));
    dispatch(loginActions.setPassword(password));

    const result = await dispatch(loginByUsername({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      // onSuccess();
      console.log('success login');
    } else {
      console.log('error login');
    }
  };

  const stylesPaper = {
    height: '100vh',
    padding: '40px',
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  };

  const stylesBox = {
    height: '100vh',
    width: '40%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#13406d',
    color: '#fff',
  };

  const [value, setValueTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.LoginPage, {}, [className])}>
        <Paper sx={stylesPaper}>
          <div style={{ maxWidth: 350, width: '100%', height: 300 }}>
            <div
              className={cls.login}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs"
                >
                  <Tab label={t('signin')} {...a11yProps(0)} />
                  {/* <Tab label={t('signup')} {...a11yProps(1)} /> */}
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <form
                  name="loginForm"
                  noValidate
                  className={cls.loginForm}
                  onSubmit={handleSubmit(onSubmitAuth)}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          onFocus={() => {
                            setErrorAuth(false);
                          }}
                          label={t('login')}
                          autoFocus
                          type="text"
                          error={!!errors.username}
                          helperText={errors?.username?.message}
                          variant="standard"
                          required
                          fullWidth
                        />
                      );
                    }}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onFocus={() => {
                          setErrorAuth(false);
                        }}
                        label={t('password')}
                        type="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        variant="standard"
                        required
                        fullWidth
                      />
                    )}
                  />

                  {errorAuth && <span>Неправильный логин или пароль</span>}

                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    color="secondary"
                    sx={{
                      marginTop: '20px',
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
                    aria-label="Sign in"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                    size="medium"
                  >
                    {t('login-to')}
                  </LoadingButton>
                </form>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <form
                  name="loginForm"
                  noValidate
                  className={cls.loginForm}
                  onSubmit={handleSubmit(onSubmitAuth)}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t('email')}
                        autoFocus
                        type="email"
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                        variant="standard"
                        required
                        fullWidth
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t('password')}
                        type="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        variant="standard"
                        required
                        fullWidth
                      />
                    )}
                  />

                  {/* <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // className="mb-24"
                // className={cls.marginTop10}
                // label={t('Password')}
                label="Подтверждение пароля"
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant="standard"
                required
                fullWidth
              />
            )}
          /> */}

                  <Button
                    variant="contained"
                    color="secondary"
                    // className=" w-full mt-16"
                    sx={{
                      marginTop: '20px',
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
                    aria-label="Sign in"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                    size="medium"
                  >
                    <>{t('Регистрация')}</>
                  </Button>
                </form>
              </TabPanel>
            </div>
          </div>
        </Paper>

        <Box
          sx={stylesBox}
        >
          <svg
            className={cls.svgBox}
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              component="g"
              sx={{ color: '#0054a0' }}
              className="opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle r="234" cx="196" cy="23" />
              <circle r="234" cx="790" cy="491" />
            </Box>
          </svg>

          <div className={cls.organization}>
            {/* <div className="flex items-center mt-32"> */}
            <div className={cls.avatar}>
              {/* <Avatar src={<LogoIcon />} /> */}
              {/* <LogoIcon /> */}
              <img src={LogoIcon} alt="logo-icon" width={176} height={34} />
            </div>
            {/* <div className="text-7xl font-bold leading-none text-gray-100"> */}
            {/* <div className={cls.title}>
              <div>ЛК Directum RX</div>
            </div> */}
          </div>
        </Box>
      </div>
    </DynamicModuleLoader>
  );
});

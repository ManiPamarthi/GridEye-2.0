import { Link, Navigate, useNavigate } from 'react-router-dom';
import Input from '@/components/ui/input-field';
import Body from '@/components/ui/typography/body';
import Title from '@/components/ui/typography/title';
import styles from './login.module.css';
import IllustrationLight from '@/assets/login-illustration-light.svg';
import Button from '@/components/ui/button';
import { useFormik } from 'formik';
import CheckBox from '@/components/ui/checkbox';
import FullPageLoader from '@/components/ui/loader/full-page-loader';
import { isUserLoggedInAtom, LoginValidation } from './config';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { GridEyeLogoFull } from '../../assets/grid-eye-logo-full';
import { useAuthMutation } from '../../api/lib/auth';
import Paragraph from '@/components/ui/typography/paragragh';
export const LoginPage = () => {
  const navigate = useNavigate();
  const [,setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);
  const { mutate:login, isLoading, status, data } = useAuthMutation.login();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidation,
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (props:any) => {
    login(props);
  };

  useEffect(() => {
    // console.log(status);
    if(status === 'success') {
      setIsUserLoggedIn(true);
      navigate('/');
    } 
  },[status]);

  
  return (<><div className={styles['container']}>
    <div className={styles['formWrapper']}>
      <div>
    <div className={styles['logo']}>
    <GridEyeLogoFull />
    </div>
      <Title variant='T3' className={styles['heading']}>
        Hi, Welcome to Grid Eye, Central
      </Title>
      <Body variant='B1' className={styles['subHeading']}>
        Login using your credentials or face recognition
      </Body>
      {status === 'error' && <Paragraph variant="P6" children="Login Failed, invalid email or password" className={styles['error']} /> }
      <form onSubmit={formik.handleSubmit} className={styles['formContainer']}>
        <Input
          type="email"
          label='Email Address'
          placeholder='Email Address'
          id="email"
          errorMessage={formik.errors.email}
          {...formik.getFieldProps('email')}
        />
        <Input 
          type="password" 
          label='Password' 

          placeholder='Password' id="password"
          errorMessage={formik.errors.password}
          {...formik.getFieldProps('password')}
        />
        <div className={styles['formFooter']}>
          <div><CheckBox id="remember-me" name="remember-me" label="Remember Me!" className={styles['rememberMe']} /></div>
          <div><Link className={styles['forgot-pass']} to="/forgot-password">Forgot Password?</Link></div>
        </div>
        <div>
          <Button variant='PRIMARY' type="submit" className={styles['loginBtn']}>
            LOGIN
          </Button>
        </div>
        <div>
        </div>
      </form>
      </div>
    </div>
    <div className={styles['illustrationWrapper']}>
      <img className={styles['illustration']} src={IllustrationLight} />
    </div>
  </div>
  {isLoading && <FullPageLoader /> }
  </>)
};


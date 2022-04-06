import axios from 'axios';
import React, {
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import cryptoJs from '../../utils/helpers/cryptoJs';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const LoginContext = createContext();
export const useLogin = () => useContext(LoginContext);

const LoginProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreationProcess, setIsCreationProcess] = useState(false);
  const [isGettingError, setIsGettingError] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const routes = useRouter();

  const onEmailChange = useCallback((event) => {
    setIsGettingError(false);
    setIsCreationProcess(false);
    setEmail(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event) => {
    if (event.target.value.length < 5) {
      setIsValidPassword(false);
    } else {
      setPassword(event.target.value);
      setIsValidPassword(true);
    }
  }, []);

  const checkPassword = (userPassword, password) => {
    const decyptPassword = cryptoJs.decrypt(userPassword);
    if (decyptPassword === password) return true;
    return false;
  };

  const login = async () => {
    if (!password || !email || !isValidPassword) return;
    const cryptedPassword = cryptoJs.encrypt(password);
    const userCredentials = {
      email: email,
      password: cryptedPassword,
    };

    setIsCreationProcess(true);
    const response = await axios.post(
      '/api/auth/login',
      userCredentials,
    );
    console.log(response);
    if (response.data.status === 302) {
      if (checkPassword(response.data.user.password, password)) {
        routes.push(`/discover/${response.data.user.id}`);
        setIsGettingError(false);
        setEmail('');
        setPassword('');
        setIsCreationProcess(false);
        setIsGettingError(false);
      } else {
        setIsGettingError(true);
        setIsCreationProcess(false);
      }
    } else if (response.data.status === 404) {
      setIsGettingError(true);
      setIsCreationProcess(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        onEmailChange,
        onPasswordChange,
        login,
        isCreationProcess,
        isGettingError,
        isValidPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;

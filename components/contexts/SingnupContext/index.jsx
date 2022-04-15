import axios from 'axios';
import React, {
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import cryptoJs from '../../utils/helpers/cryptoJs';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';

const SignupContext = createContext();
export const useSignup = () => useContext(SignupContext);

const SignupProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreationProcess, setIsCreationProcess] = useState(false);
  const [isGettingError, setIsGettingError] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

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

  const createAccount = async () => {
    if (!password || !email || !isValidPassword) return;
    const cryptedPassword = cryptoJs.encrypt(password);
    const userCredentials = {
      email: email,
      password: cryptedPassword,
      id: uuid(),
    };

    setIsCreationProcess(true);
    const response = await axios.post(
      '/api/auth/signup',
      userCredentials,
    );
    console.log(response);
    if (response.data.status === 201) {
      setEmail('');
      setPassword('');
      setIsCreationProcess(false);
      setIsGettingError(false);
      routes.push('/login');
    } else {
      setIsGettingError(true);
      setIsCreationProcess(false);
    }
  };

  return (
    <SignupContext.Provider
      value={{
        onEmailChange,
        onPasswordChange,
        createAccount,
        isCreationProcess,
        isGettingError,
        isValidPassword,
        email,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

SignupProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SignupProvider;

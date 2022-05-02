import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LocalStorage from '../../utils/helpers/localStorage';

const defaultContext = {
  user: [],
  isGettingError: false,
  isProcessing: true,
};

const UserContext = createContext(defaultContext);
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isGettingError, setIsGettingError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  const getuser = useCallback(async () => {
    const id = LocalStorage.get('zik-stream-user-uuid');

    setIsProcessing(true);
    const response = await axios.post('/api/query/getUser', {
      id: id,
    });

    if (response.status === 200) {
      setIsGettingError(false);
      setUser(response.data.user);
      setIsProcessing(false);
    } else {
      setIsGettingError(true);
    }
  }, []);

  useEffect(() => {
    getuser();
  }, [getuser]);

  return (
    <UserContext.Provider
      value={{ user, isGettingError, isProcessing }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;

import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import PropTypes from 'prop-types';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isSecured, setIsSecured] = useState(false);
  const route = useRouter();
  const { id } = route.query;

  const getuser = useCallback(async () => {
    if (id) {
      const response = await axios.post('/api/query/getUser', {
        id: id,
      });
      console.log(response);
      if (response.status === 200) {
        setIsSecured(true);
        setUser(response.data.user);
      } else {
        setIsSecured(false);
      }
    } else {
      setIsSecured(false);
    }
  }, [id]);

  useEffect(() => {
    getuser();
  }, [getuser]);

  return (
    <UserContext.Provider value={{ user, isSecured }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;

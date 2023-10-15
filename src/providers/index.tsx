import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as API from '@api';
import { Phone, User, UserContextValue } from '@types';

/* TODO:
Complete the UserProvider to manage user data and phone number masking.
1. Fetch user data with API.me() on provider's mount.
2. Implement a function to toggle phone number masking (you can fetch unmasked phone number with API.phone()
3. Pass down the user data and the toggle function to the context value.
*/

const UserContext = React.createContext<UserContextValue | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [maskedPhone, setMaskedPhone] = useState<string | null>(null);
  const [unmaskedPhone, setUnmaskedPhone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const user: User = await API.me();
      setUser(user);
      setMaskedPhone(user.masked_phone);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPhone = useCallback(async () => {
    setIsLoading(true);
    try {
      const phoneNumberResponse: Phone = await API.phone();
      setUnmaskedPhone(phoneNumberResponse.phone);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchPhone();
  }, [fetchUser, fetchPhone]);

  const toggleMask = useCallback(() => {
    setIsMasked(!isMasked);
    setUser({
      ...user,
      masked_phone: isMasked ? unmaskedPhone : maskedPhone,
    });
  }, [isMasked, maskedPhone, unmaskedPhone, user]);

  return (
    <UserContext.Provider value={{ user, toggleMask, isMasked, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

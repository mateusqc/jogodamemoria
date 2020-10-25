import React from 'react';

export const defaultUser = {
  id: 0,
  name: 'Anônimo Mockado',
  matchesPlayed: 0,
};

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

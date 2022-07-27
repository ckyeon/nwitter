import { useCallback, useEffect, useState } from 'react';
import AppRouter from './Router';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj(auth.currentUser);
    forceUpdate();
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : ('initializing...')}
    </>
  );
}

export default App;

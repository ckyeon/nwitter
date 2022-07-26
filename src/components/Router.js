import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route exact path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
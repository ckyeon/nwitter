import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Profile = ({ userObj, refreshUser }) => {
  const history = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = async () => {
    await signOut(auth);
    history('/');
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: String(newDisplayName) });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
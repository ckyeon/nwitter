import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import AuthForm from '../components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick}
                name="google"
                className="authBtn"
        >Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick}
                name="github"
                className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
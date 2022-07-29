import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (event) => {
    // 새로고침 방지
    event.preventDefault();
    if (nweet === '') {
      return;
    }
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(attachmentRef);
    }
    await addDoc(collection(firestore, 'nweets'), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    });
    setNweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };

    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment('');


  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input className="factoryInput__container"
               value={nweet}
               onChange={onChange}
               type="text"
               placeholder="What's on your mind?"
               maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input id="attach-file"
             type="file"
             accept="image/*"
             onChange={onFileChange}
             style={{
               opacity: 0
             }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment}
               style={{
                 backgroundImage: attachment
               }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <fontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
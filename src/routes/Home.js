import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(query(collection(firestore, 'nweets'), orderBy('createdAt', 'desc')), (snapshot) => {
      const nweetArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import fire from '../fire'

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [convo, setConvo] = useState('')


  const getMessages = (convo) => {
    fire.firestore().collection('messages/conversations/' + convo).orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {

      let new_messages = []
      querySnapshot.docChanges().forEach((change) => {

            new_messages.push({
              _id: change.doc.data()._id,
              createdAt: change.doc.data().createdAt.toDate(),
              text: change.doc.data().text,
              user: {
                _id: change.doc.data().user._id,
                name: change.doc.data().user.name,
              }
            })
        })
        setMessages(previousArr => GiftedChat.append(previousArr, new_messages));
        
      })

  }

  useEffect(() => {
    let current_uid = fire.auth().currentUser.uid
    setUid(current_uid)

    fire.firestore().collection('users').doc(current_uid).get()
      .then((doc) => {
        if (doc.exists) {
          setName(doc.data().name)
          let match_uid = doc.data().match
          let convo = [current_uid, match_uid].sort().toString()
          setConvo(convo)
          getMessages(convo)
        }})

  }, [])

  const onSend = useCallback((messages = []) => {

    for (let i = 0; i < messages.length; i++) {

      let data = {
        _id: messages[i]._id,
        text: messages[i].text,
        user: messages[i].user,
        createdAt: messages[i].createdAt
      }

      fire.firestore().collection('messages/conversations/' + convo).add(data)

    }

  }, [convo])

  

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: uid,
        name: name
      }}
    />
  )

}

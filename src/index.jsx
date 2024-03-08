import { useState } from 'react'
import './index.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

function App() {
  const [messages, setMessages] = useState([
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToLawAI(newMessages, message);
  };

  async function processMessageToLawAI(chatMessages, newChatMessage) { // messages is an array of messages


    const apiRequestBody = {
      "history":chatMessages.map((msg)=>msg.message),
      "question":newChatMessage
    }

    await fetch("https://malai-backend.up.railway.app/chat", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.text,
        sender: "LawAI"
      }]);
      setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "100%", width: "100%"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="LawAI is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App
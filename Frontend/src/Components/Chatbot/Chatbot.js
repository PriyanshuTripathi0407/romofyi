// // Chatbot.js
// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([{ sender: "Romo-Bot", text: "Hi! How can I help you?" }]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//   const userMessage = { sender: "user", text: input };
//   setMessages(prev => [...prev, userMessage]);

//   try {
//     const response = await axios.post("http://localhost:8000/api/chat/ask/", { message: input });
//     const botMessage = { sender: "Romo-Bot", text: response.data.reply };
//     setMessages(prev => [...prev, botMessage]);
//     setInput("");
//   } catch (error) {
//     console.error(error);
//     const errorMessage = { sender: "bot", text: "Sorry, something went wrong!" };
//     setMessages(prev => [...prev, errorMessage]);
//   }
// };

//   return (
//     <div style={{ width: 400, margin: "auto", marginTop: 20 }}>
//       <div style={{ border: "1px solid gray", padding: 10, height: 300, overflowY: "scroll" }}>
//         {messages.map((msg, i) => (
//           <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
//             <p><strong>{msg.sender}</strong>: {msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         onKeyPress={e => e.key === "Enter" && sendMessage()}
//         placeholder="Ask something..."
//         style={{ width: "80%", padding: 8 }}
//       />
//       <button onClick={sendMessage} style={{ padding: 8 }}>Send</button>
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState } from "react";
import axios from "axios";
import romoImg from '../../Image/BannerGirl.png'
import ReactMarkdown from "react-markdown";


const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "Romo-Bot",
      text: "Hi! How can I help you?",
      avatar: romoImg, // use your Romo-Bot image path
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      avatar: romoImg, // use your User image path
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:8000/api/chat/ask/", {
        message: input,
      });

      const botMessage = {
        sender: "Romo-Bot",
        text: response.data.reply,
        avatar: romoImg,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "Romo-Bot",
        text: "Sorry, something went wrong!",
        avatar: romoImg,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setInput("");
    }
  };

  return (
    <>
      <div style={styles.container}>
        <h6 style={styles.h6}>Romofyi AI ChatBOT</h6>
        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.messageWrapper,
                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              }}
            >
              <img src={msg.avatar} alt="avatar" style={styles.avatar} />
              <div
                style={{
                  ...styles.messageBubble,
                  backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#E8E8E8",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>

            </div>
          ))}
        </div>

        <div style={styles.inputBox}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

// 💅 Inline styles
const styles = {
  h6: {
    margin: "0px",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#183661",
    textAlign: 'center',
    fontSize: 20,
    color: 'gold',
    borderBottom: '2px solid gold',
    borderRadius: 5,
  },
  container: {
    width: 420,
    margin: "40px auto",
    fontFamily: "Roboto, sans-serif",
    border: "1px solid gold",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(24, 54, 97, 0.3)",
    backgroundColor: "#183661", // deep blue
    color: "white",
  },
  chatBox: {
    padding: 10,
    height: 400,
    overflowY: "auto",
    backgroundColor: "#183661", // very light gold
  },
  messageWrapper: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 10,
    gap: 8,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: "2px solid gold",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: "5px 10px 0 10px",
    borderRadius: "5px",
    fontSize: 12,
    lineHeight: "1.4",
    color: "#183661", // text inside bubbles
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid gold",
    padding: 10,
    backgroundColor: "#183661", // deep blue
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    borderRadius: 20,
    border: "1px solid gold",
    outline: "none",
    marginRight: 10,
    backgroundColor: "gold", // very light gold
    color: "#183661", // text color
  },
  sendButton: {
    padding: "10px 16px",
    borderRadius: 20,
    backgroundColor: "#183661",
    color: "gold",
    border: "2px solid gold",
    cursor: "pointer",
    fontWeight: "bold",
  },
};


export default Chatbot;

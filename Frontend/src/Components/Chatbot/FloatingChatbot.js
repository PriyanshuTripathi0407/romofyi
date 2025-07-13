import React, { useState } from "react";
import Chatbot from "./Chatbot"; // 👈 make sure this path is correct
import chatIcon from "../../Image/BannerGirl.png"; // 👈 your Romo-Bot icon

const FloatingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <>
            {isOpen && (
                <div style={styles.chatWindow}>
                    <Chatbot />
                </div>
            )}

            <button onClick={toggleChat} style={styles.floatingButton}>
                <img src={chatIcon} alt="Chat" style={styles.icon} />
                <h6 style={styles.chatText}>Need Help?</h6>
            </button>
        </>
    );
};

const styles = {
    floatingButton: {
        position: "fixed",
        bottom: 30,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "gold",
        border: "2px solid #183661",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        cursor: "pointer",
        zIndex: 1000,
        padding: 0,
    },
    icon: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "50%",
    },
    chatWindow: {
        position: "fixed",
        top: 47,
        right: 80,
        zIndex: 999,
    },
    chatText: {
        position: "fixed",
        bottom: 0,
        right: 0,
        borderRadius: "5px",
        backgroundColor: "gold",
        padding:'5px',
        display: "flex",
        fontSize: 10,
        color: "#183661",
        marginTop: 4,
        fontWeight: "bold",
    },

};

export default FloatingChatbot;

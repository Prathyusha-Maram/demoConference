import React from 'react';
import "../../../styles/landing.css";

function ModalContent({ closeModal, conversation, handleSubmit, userInput, setUserInput }) {
    return (
        <div className="popup-content">
          <h2>Discussion Popup</h2>
          <div className="chat-container">
            {conversation.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span className="sender">{msg.sender}</span>
                <span className="message-text">{msg.message}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
          <button onClick={closeModal}>Close</button>
        </div>
      );
}

export default ModalContent;

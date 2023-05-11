import React, { useState } from 'react';

function ReviewerChat() {
  const [reviewerMessage, setReviewerMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleReviewerSubmit = (e) => {
    e.preventDefault();
    setConversation([...conversation, { sender: 'reviewer', message: reviewerMessage }]);
    setReviewerMessage('');
  };

  return (
    <div>
      <div className="conversation">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="sender">{msg.sender}</span>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="reviewer">
        <form onSubmit={handleReviewerSubmit}>
          <input
            type="text"
            value={reviewerMessage}
            onChange={(e) => setReviewerMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewerChat;

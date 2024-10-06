const Conversation = ({ recipient }) => {
  return (
    <div className="conversation">
      <header>{recipient}</header>
      <div className="messages"></div>
      <div className="message-creation"></div>
    </div>
  );
};

export default Conversation;

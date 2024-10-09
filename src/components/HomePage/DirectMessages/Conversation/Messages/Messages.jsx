import "./Messages.css";
const Messages = ({ messages }) => {
  console.log(messages);
  const messagesList = messages.map((msg) => {
    return (
      <div className="message" key={msg.id}>
        <p></p>
        <hr />
        <p>{msg.content}</p>
      </div>
    );
  });

  return (
    <>
      <div className="messages">{messagesList}</div>
    </>
  );
};

export default Messages;

import React, { useState } from "react";
import HttpService from "../../services/http-service";
import "./MessageSection.css";
import { useStore } from "react-redux";
import moment from "moment";

function MessageSection(props) {
  const store = useStore();
  const name = store.getState().userReducer.user.name;
  const requestId = props.requestId.split("-")[1];
  const [newMessage, setNewMessage] = useState("");
  const [currentMessages, setCurrentMessages] = useState(props.comments || []);

  const myChangeHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      comment: newMessage,
      name,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
    };
    new HttpService().commentOnRequestAsManager(requestId, name, newMessage).then(() => {
      setCurrentMessages([...currentMessages, newComment]);
      setNewMessage("");
    });
  };

  const showStyleOfCard = (item, index) => {
    if (!item.name.includes('Manager')) {
      return (
        <div className="row" key={item + index}>
          <span className="style-tag-header">
            <span className="style-tag-header-resident">
              {item.name} {moment(item.createdAt).fromNow(true)}
            </span>
            <br></br>
            <span className="style-tag-resident">{item.comment}</span>
          </span>
        </div>
      );
    } else {
      return (
        <div className="row d-flex justify-content-end" key={item + index}>
          <span className="style-tag-header">
            <span className="style-tag-header-manager">
              {item.name} {moment(item.createdAt).fromNow()}
            </span>
            <br></br>
            <span className="style-tag-manager">{item.comment}</span>
          </span>
        </div>
      );
    }
  };

  const ShowMessageCard = (props) => {
    return props.comments.map((item, index) => showStyleOfCard(item, index));
  };

  return (
    <>
      <p className="titles-modal">Comments:</p>
      <ShowMessageCard comments={currentMessages} />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              className="comment-input-section input-custom-details"
              type="text"
              value={newMessage}
              onChange={myChangeHandler}
            />
          </div>
          <div className="col-2">
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-sm"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default MessageSection;

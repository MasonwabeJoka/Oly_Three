"use client";
import styles from "./Messages.module.scss";
import Input from "@/components/Input";
import Avatar from "@/components/Avatars";
import ExitButton from "@/components/ExitButton";
import TextInputBar from "@/components/TextInputBar";
import { useState } from "react";
import { messages } from "@/data/MessagesData";

const ChatBubble = ({
  message,
  isContact,
  contactName,
  isFirstContact,
  profilePicture,
  time,
}) => (
  <div
    className={
      isContact
        ? styles.contactChatBubbleContainer
        : styles.userChatBubbleContainer
    }
  >
    {isContact && (
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          avatar={profilePicture}
          avatarSize="regular"
          imageAlt={`${contactName}'s Profile Picture`}
        />
        <div className={styles.contactTime}>{time}</div>
      </div>
    )}
    <div className={styles.chatBubblesWrapper}>
      <div className={styles.bubbleWidthSetter}>
        <div
          className={
            isContact ? styles.contactChatBubble : styles.userChatBubble
          }
        >
          {isContact && isFirstContact && (
            <p className={styles.contactName}>{contactName}</p>
          )}
          <p>{message}</p>
        </div>
      </div>
    </div>
    {!isContact && (
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          avatar="/profile_images/user.jpg"
          avatarSize="regular"
          imageAlt="Your Profile Picture"
        />
        <div className={styles.contactTime}>{time}</div>
      </div>
    )}
  </div>
);

const Messages = () => {
  const [chats, setChats] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userMessages, setUserMessages] = useState([]);

  const handleChatClick = (message) => {
    setSelectedChat(message);
    setChats(true);
    setUserMessages([]); // Reset user messages for new chat
  };

  const handleSendMessage = (text) => {
    setUserMessages([...userMessages, { text, senderType: "user", time: "Now" }]);
  };

  return (
    <div className={styles.container}>
      {!chats && (
        <div className={styles.recentChats}>
          <div className={styles.headerDiv} style={{ height: "96px" }}></div>
          <div className={styles.searchBar}>
            <Input
              className={styles.search}
              inputType="text"
              inputColourType="normal"
              inputSize="medium"
              iconSrcLeft=""
              iconSrcRight="/icons/search.png"
              iconPosition="right"
              iconWidth={32}
              iconHeight={32}
              label="search-bar"
              placeholder=""
              id="search-bar"
              name="search-bar"
              ariaLabel="Search"
              autoFocus={false}
              required={true}
            />
          </div>
          <div className={styles.chats}>
            {messages.map((message) => (
              <div
                className={styles.chat}
                key={message.id}
                onClick={() => handleChatClick(message)}
              >
                <div className={styles.avatarContainer}>
                  <Avatar
                    className={styles.avatar}
                    avatar={message.profilePicture}
                    avatarSize="regular"
                  />
                </div>
                <div className={styles.textContainer}>
                  <p className={styles.name}>
                    {message.name.length > 15
                      ? message.name.slice(0, 15) + "..."
                      : message.name}
                  </p>
                  <p className={styles.message}>
                    {message.messages[0].text.length > 48
                      ? message.messages[0].text.slice(0, 48) + "..."
                      : message.messages[0].text}
                  </p>
                </div>
                <div className={styles.timeContainer}>
                  <div className={styles.timeSideSection}>
                    {message.createdAt}
                  </div>
                  <p
                    className={styles.messageCount}
                    style={
                      message.messages.length > 9
                        ? {
                            width: "auto",
                            height: "1rem",
                            borderRadius: "0.5rem",
                            padding: "0 0.7rem",
                          }
                        : {
                            width: "1rem",
                            height: "1rem",
                            borderRadius: "50%",
                            padding: "0",
                          }
                    }
                  >
                    {message.messages.length > 10
                      ? "9+"
                      : message.messages.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {chats && selectedChat && (
        <div className={styles.mainSection}>
          <div className={styles.mainSectionWrapper}>
            <div className={styles.contactChatBubbleContainer}>
              <div
                className={styles.exitButtonContainer}
                onClick={() => setChats(false)}
              >
                <ExitButton />
              </div>
              <div className={styles.avatarContainer}>
                <Avatar
                  className={styles.avatar}
                  avatar={"/profilePic.jpg"}
                  avatarSize="regular"
                />
                <div className={styles.contactTime}>10:00</div>
              </div>
              <div className={styles.chatBubblesWrapper}>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.contactChatBubble}>
                    <p className={styles.contactName}>John Doe</p>
                    <p>
                      Pulvinar pellentesque habitant morbi tristique senectus et
                      netus et malesuada fames ac turpis egestas maecenas
                      pharetra.
                    </p>
                  </div>
                </div>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.contactChatBubble}>
                    Diam volutpat commodo sed egestas.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.userChatBubbleContainer}>
              <div className={styles.chatBubblesWrapper}>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.userChatBubble}>
                    <div className={styles.userName}>Me</div>
                    Pulvinar pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas maecenas
                    pharetra.
                  </div>
                </div>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.userChatBubble}>
                    Diam volutpat commodo sed egestas.
                  </div>
                </div>
              </div>
              <div className={styles.avatarContainer}>
                <Avatar
                  className={styles.avatar}
                  avatar={"/profile_images/1.jpg"}
                  avatarSize="regular"
                />
                <div className={styles.contactTime}>10:00</div>
              </div>
            </div>

            <div className={styles.contactChatBubbleContainer}>
              <div className={styles.avatarContainer}>
                <Avatar
                  className={styles.avatar}
                  avatar={"/profilePic.jpg"}
                  avatarSize="regular"
                />
                <div className={styles.contactTime}>10:00</div>
              </div>
              <div className={styles.chatBubblesWrapper}>
                <div className={styles.bubbleWidthSetter}>
                  <p className={styles.contactChatBubble}>
                    Pulvinar pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas maecenas
                    pharetra.
                  </p>
                </div>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.contactChatBubble}>
                    Diam volutpat commodo sed egestas.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.userChatBubbleContainer}>
              <div className={styles.chatBubblesWrapper}>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.userChatBubble}>
                    Pulvinar pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas maecenas
                    pharetra.
                  </div>
                </div>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.userChatBubble}>
                    Diam volutpat commodo sed egestas.
                  </div>
                </div>
              </div>
              <div className={styles.avatarContainer}>
                <Avatar
                  className={styles.avatar}
                  avatar={"/profile_images/1.jpg"}
                  avatarSize="regular"
                />
                <div className={styles.contactTime}>10:00</div>
              </div>
            </div>

            <div className={styles.contactChatBubbleContainer}>
              <div className={styles.avatarContainer}>
                <Avatar
                  className={styles.avatar}
                  avatar={"/profilePic.jpg"}
                  avatarSize="regular"
                  imageAlt="Profile Picture"
                />
                <div className={styles.contactTime}>10:00</div>
              </div>
              <div className={styles.chatBubblesWrapper}>
                <div className={styles.bubbleWidthSetter}>
                  <p className={styles.contactChatBubble}>
                    Pulvinar pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas maecenas
                    pharetra.
                  </p>
                </div>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.contactChatBubble}>
                    Diam volutpat commodo sed egestas.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.userChatBubbleContainer}>
              <div className={styles.chatBubblesWrapper}>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.userChatBubble}>
                    Pulvinar pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas maecenas
                    pharetra.
                  </div>
                </div>
                <div className={styles.bubbleWidthSetter}>
                  <div className={styles.userChatBubble}>
                    Diam volutpat commodo sed egestas.
                  </div>
                </div>
              </div>
              <div className={styles.avatarContainer}>
                <Avatar
                  className={styles.avatar}
                  avatar={"/profile_images/1.jpg"}
                  avatarSize="regular"
                />
                <div className={styles.contactTime}>10:00</div>
              </div>
            </div>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.typingArea}>
              <div className={styles.textInputContainer}>
                <TextInputBar
                  id="textInput"
                  name="textInput"
                  onChange={(e) => console.log(e.target.value)}
                  className={styles.textInput}
                  placeholder="Type a message"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

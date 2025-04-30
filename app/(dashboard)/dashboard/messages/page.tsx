"use client";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Link from "next/link";
import Avatar from "@/components/Avatars";
import { messages } from "@/data/MessagesData";
import TypingArea from "@/features/messages/components/TypingArea";
import ChatFeed from "@/features/messages/components/ChatFeed";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import EmptyState from "@/features/messages/components/EmptyState";
import MessagesSidebar from "@/features/messages/components/MessagesSidebar";
import Chats from "@/features/messages/components/Chats";
import { useForm } from "react-hook-form";
import ExitButton from "@/components/ExitButton";
import { useState } from "react";

type FormValues = {
  "search-bar": string;
};
const Messages = () => {
  const [chats, setChats] = useState(false);
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;
  return (
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <div className={styles.container}>
        {!chats && (
          <div className={styles.recentChats}>
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
                {...register("search-bar")}
              />
            </div>
            {messages.slice(0, 6).map((message: any) => {
              return (
                <div className={styles.chat} key={message.id} onClick={()=> setChats(true)}>
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
                        ? message.name.slice(0, 30) + "..."
                        : message.name}
                    </p>
                    <p className={styles.message}>
                      {message.messages[0].length > 48
                        ? message.messages[0].slice(0, 48) + "..."
                        : message.messages[0]}
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
                              width: "0",
                              height: "1rem",
                              borderRadius: "0.5rem",
                              padding: "0 0.7rem 0 0.7rem",
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
              );
            })}
          </div>
        )}

        <div className={styles.mainSection}>
          {chats && (
            <div className={styles.mainSectionWrapper}>
              <div className={styles.contactChatBubbleContainer}>
                <div className={styles.exitButtonContainer} onClick={()=> setChats(false)}>
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
          )}
        </div>

        {/* <div className={styles.bottomSection}>
          <div className={styles.typingArea}>
            <div className={styles.textInputContainer}>
              <TypingArea />
            </div>
          </div>
        </div> */}
      </div>
    </MaxWidthWrapper>
  );
};

export default Messages;

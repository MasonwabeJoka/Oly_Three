"use client";
import useFeedStore from "@/store/feedStore";
import styles from "./Toolbar.module.scss";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
  size: keyof typeof SIZE.regular | keyof typeof SIZE.feed;
  style?: React.CSSProperties;
  className?: string;
};

const SIZE = {
  regular: {
    xxLarge: styles.xxLarge,
    xLarge: styles.xLarge,
    large: styles.large,
    medium: styles.medium,
    "": "",
  },
  feed: {
    xxLarge: styles.xxLargeFeed,
    xLarge: styles.xLargeFeed,
    large: styles.largeFeed,
    medium: styles.mediumFeed,
    "": "",
  },
};

const Toolbar = ({ editor, content, size, style, className = "" }: Props) => {
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);

  const sizeClass = isFeedOpen ? SIZE.feed[size] : SIZE.regular[size];
 
  if (!editor) {
    return null;
  }

  const getButtonClass = (isActive: boolean, additionalClass = "") => {
    return isActive ? styles.active : `${styles.inactive} ${additionalClass}`;
  };

  return (
    <div className={`${sizeClass} ${className} ${styles.toolbar}`} style={style}>
      <div className={`${styles.toolbarGroup} ${styles.toolbarGroupLg}`}>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={getButtonClass(editor.isActive("bold"), styles.button)}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={getButtonClass(editor.isActive("italic"), styles.button)}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={getButtonClass(
            editor.isActive("underline"),
            styles.button
          )}
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={getButtonClass(editor.isActive("strike"), styles.button)}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={getButtonClass(
            editor.isActive("heading", { level: 2 }),
            styles.button
          )}
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={getButtonClass(
            editor.isActive("bulletList"),
            styles.button
          )}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={getButtonClass(
            editor.isActive("orderedList"),
            styles.button
          )}
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={getButtonClass(
            editor.isActive("undo"),
            styles.hoverEffect
          )}
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={getButtonClass(
            editor.isActive("redo"),
            styles.hoverEffect
          )}
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {/* {content && (
        <button type="submit" className={styles.submitButton}>
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;

'use client'
import styles from "./RichTextEditor.module.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./Toolbar";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";
import Underline from "@tiptap/extension-underline";
import useFeedStore from "@/store/feedStore";
import { useEffect } from "react";

interface Props {
  className?: string;
  content: string;
  placeholder?: string;
  size: keyof typeof SIZE.regular | keyof typeof SIZE.feed;
  style?: React.CSSProperties;
  onChange?: (content: string) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

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

const RichTextEditor = ({
  onChange,
  content,
  className = "",
  placeholder = "Start typing...",
  size,
  style,
  onClick,
  onFocus,
  onBlur,
  onSubmit,
}: Props) => {
  const isFeedOpen = useFeedStore((state) => state.isFeedOpen);

  const sizeClass = isFeedOpen ? SIZE.feed[size] : SIZE.regular[size];

  const handleChange = (newContent: string) => {
    if (onChange) {
      onChange(newContent);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass: styles.emptyEditor,
      }),
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
   
      
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `${sizeClass} ${styles.editorContent}`,
        style: `padding: 2rem; ${styleToString(style)}`,
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div
      className={`${sizeClass} ${styles.editorContainer} ${className}`}
      style={style}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Toolbar
        className={styles.toolbar}
        editor={editor}
        content={content}
        size="large"
        style={{ backgroundColor: "white" }}
      />
      <EditorContent style={{ textAlign: "left" }} editor={editor} />
    </div>
  );
};

export default RichTextEditor;

function styleToString(style?: React.CSSProperties): string {
  if (!style) return "";
  return Object.entries(style)
    .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
    .join("; ");
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

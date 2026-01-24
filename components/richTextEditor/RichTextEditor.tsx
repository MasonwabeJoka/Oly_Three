"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from "./RichTextEditor.module.scss";
import dynamic from "next/dynamic";

// Dynamically import the editor with SSR disabled
const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface RichTextEditorProps {
  name: string;
  setValue: (value: string) => void;
  content: string;
  error?: string;
  label?: string;
  required?: boolean;
}

const RichTextEditor = ({
  name,
  setValue,
  content,
  error,
  label,
  required,
}: RichTextEditorProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasTypedContent, setHasTypedContent] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Helper to check if there's actual text content (not just empty HTML)
  const checkHasContent = (html: string): boolean => {
    if (!html) return false;
    const textContent = html.replace(/<[^>]*>/g, "").trim();
    return textContent.length > 0;
  };

  // Sync hasTypedContent if parent content changes externally
  useEffect(() => {
    setHasTypedContent(checkHasContent(content));
  }, [content]);

  useEffect(() => {
    // Only load CSS and plugins on the client side
    if (typeof window !== "undefined") {
      // Import CSS
      // @ts-ignore - Dynamic import of SCSS module
      import("./richTextEditorGlobalStyles.scss");
      import("froala-editor/css/froala_style.min.css");
      import("froala-editor/css/froala_editor.pkgd.min.css");

      // Import plugins
      import("froala-editor/js/plugins/paragraph_format.min.js");
      import("froala-editor/js/plugins/paragraph_style.min.js");
      import("froala-editor/js/plugins/lists.min.js");
      import("froala-editor/js/plugins/emoticons.min.js");
      import("froala-editor/js/plugins/char_counter.min.js");
    }

    setIsClient(true);
  }, []);

  // Track focus by detecting clicks inside/outside the editor container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editorContainerRef.current &&
        !editorContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    const handleClickInside = (event: MouseEvent) => {
      if (
        editorContainerRef.current &&
        editorContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickInside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, []);

  const config = useMemo(
    () => ({
      heightMin: 240,
      placeholderText: "Write a description for your ad.",
      listAdvancedTypes: false,
      toolbarButtons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "|",
        "subscript",
        "superscript",
        "|",
        "emoticons",
        "|",
        "formatOL",
        "formatUL",
        "spellChecker",
        "|",
        "undo",
        "redo",
      ],
      pluginsEnabled: [
        "paragraphFormat",
        "paragraphStyle",
        "lists",
        "emoticons",
        "spellChecker",
        "charCounter",
        "pastePlain",
        "wordPaste",
      ],
      charCounterCount: true,
      pastePlain: true,
      fontFamilyDefaultSelection: "Outfit",
      events: {
        initialized: function () {
          setIsEditorReady(true);
        },
        // Check for content immediately on keyup for instant label response
        keyup: function () {
          // @ts-ignore - 'this' refers to Froala editor instance
          const html = this.html.get();
          setHasTypedContent(checkHasContent(html));
        },
        // Also handle paste events
        "paste.after": function () {
          // @ts-ignore - 'this' refers to Froala editor instance
          const html = this.html.get();
          setHasTypedContent(checkHasContent(html));
        },
      },
    }),
    []
  );

  // Only render on client side (skeleton is handled by dynamic import in parent)
  if (typeof window === "undefined" || !isClient) {
    return null;
  }

  return (
    <div className={styles.container}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div
        id="editor"
        className={styles.editorContainer}
        ref={editorContainerRef}
      >
        {label && hasTypedContent && (
          <label className={styles.label}>
            <span>
              {label.length > 12 ? `${label.substring(0, 12)}...` : label}
            </span>
          </label>
        )}
        {isEditorReady && required && !hasTypedContent && !isFocused && (
          <label className={styles.required}>
            <span>Required</span>
          </label>
        )}
        <FroalaEditor
          tag="textarea"
          config={config}
          model={content || ""}
          onModelChange={(model: string) => {
            setHasTypedContent(checkHasContent(model));
            setValue(model);
          }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

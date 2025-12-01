"use client";

import React, { useEffect, useState } from "react";
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
}

const RichTextEditor = ({
  name,
  setValue,
  content,
  error,
}: RichTextEditorProps) => {
  const [isClient, setIsClient] = useState(false);

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

  const config = {
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
  };

  // Only render on client side
  if (typeof window === "undefined" || !isClient) {
    return null;
  }

  return (
    <div className={styles.container}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div id="editor" className={styles.editorContainer}>
        {/* <div className={styles.labelContainer}>{content?.length > 0 && <p>Description</p>}</div> */}
        <FroalaEditor
          tag="textarea"
          config={config}
          model={content || ""}
          onModelChange={(model: string) => setValue(model)} // Pass only the content
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

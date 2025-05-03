import React, { useEffect, useState } from "react";
import styles from "./RichTextEditor.module.scss";
import "./richTextEditorGlobalStyles.scss";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/char_counter.min.js";

interface RichTextEditorProps {
  name: string;
  setValue: (value: string) => void;
  content: string;
  error?: string;
}

const RichTextEditor = ({ name, setValue, content, error }: RichTextEditorProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
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

  return isClient ? (
    <div className={styles.container}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div id="editor" className={styles.editorContainer}>
        <FroalaEditor
          tag="textarea"
          config={config}
          model={content || ""}
          onModelChange={(model: string) => setValue(model)} // Pass only the content
        />
      </div>
    </div>
  ) : null;
};

export default RichTextEditor;
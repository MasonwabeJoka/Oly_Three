import React, { useEffect, useState } from "react";
import styles from "./RichTextEditor.module.scss";
import "./richTextEditorGlobalStyles.scss";
import { useFormContext } from "react-hook-form";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RichTextEditor = ({ name, setValue, content, error }) => {
  const { register } = useFormContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

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
      {error?.message && <p className={styles.errorMessage}>{error.message}</p>}
      <div id="editor" className={styles.editorContainer}>
        <FroalaEditor
          tag="textarea"
          config={config}
          model={content || ""} // Ensure model is never undefined
          onModelChange={(model) =>
            setValue(name, model, { shouldValidate: true })
          }
        />
      </div>
    </div>
  ) : null;
};

export default RichTextEditor;

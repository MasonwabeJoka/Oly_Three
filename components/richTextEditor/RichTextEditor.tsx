import React, { useState } from "react";
import styles from "./RichTextEditor.module.scss";
import "./richTextEditorGlobalStyles.scss";
import {UseFormRegisterReturn} from "react-hook-form";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/char_counter.min.js";

// Todo: Show message if pasted text exceeds max character count.
// Todo: Change the colour of selected buttons.
interface RichTextEditorProps {
  maxCharacters: number;
  reactHookFormProps?: UseFormRegisterReturn;
  error?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ maxCharacters, reactHookFormProps, error }) => {
  const [warningMessage, setWarningMessage] = useState("");
  const [content, setContent] = useState("");

  const handleModelChange = (model: any) => {
    setContent(model);
    if (model.length > maxCharacters) {
      setWarningMessage(`You have exceeded the maximum character limit of ${maxCharacters}.`);
    } else {
      setWarningMessage("");
    }
  };

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
      "|",
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
      'charCounter.update': function (count) {
        if (count > maxCharacters) {
          setWarningMessage(`You have exceeded the maximum character limit of ${maxCharacters}.`);
        } else {
          setWarningMessage("");
        }
      }
    }
  };

  return (
    <div id="editor" className={styles.container}>
        {warningMessage && <div className={styles.warning}>{warningMessage}</div>}
      <FroalaEditor
        tag="textarea"
        config={config}
        model={content}
        onModelChange={handleModelChange}
      />
    
    </div>
  );
};

export default RichTextEditor;

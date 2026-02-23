import React from "react";
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

// Define the validation schema with Zod
const schema = z.object({
  content: z
    .string()
    .max(5, { message: "Content must be 5 characters or less" }),
});

interface RichTextEditorProps {
  maxCharacters: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ maxCharacters }) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();

  const content = watch("content");

  console.log({ content });

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

  return (
    <div id="editor" className={styles.container}>
      {/* Show validation error */}
      {typeof errors.content?.message === "string" && (
        <div className={styles.warning}>{errors.content.message}</div>
      )}

      <FroalaEditor
        tag="textarea"
        config={config}
        model={content}
        onModelChange={(model: any) => setValue("content", model)} // Update form state

      />
    </div>
  );
};

export default RichTextEditor;

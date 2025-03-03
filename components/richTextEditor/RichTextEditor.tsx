"use client";

import React, { useEffect, useState } from "react";
import styles from "./RichTextEditor.module.scss";
import "./richTextEditorGlobalStyles.scss";
import { useFormContext } from "react-hook-form";
import dynamic from 'next/dynamic';

// Import CSS files directly
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.min.css";

// Dynamically import Froala with no SSR
const FroalaEditor = dynamic(
  async () => {
    // Import plugins
    await Promise.all([
      import("froala-editor/js/plugins/paragraph_format.min.js"),
      import("froala-editor/js/plugins/paragraph_style.min.js"),
      import("froala-editor/js/plugins/lists.min.js"),
      import("froala-editor/js/plugins/emoticons.min.js"),
      import("froala-editor/js/plugins/char_counter.min.js"),
    ]);
    
    const { default: FroalaEditorComponent } = await import("react-froala-wysiwyg");
    return FroalaEditorComponent;
  },
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>
  }
);

const RichTextEditor = ({ name, setValue, content, error }) => {
  const { register } = useFormContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    register(name, { required: true });
    setIsMounted(true);
  }, [register, name]);

  const config = {
    placeholderText: "Start typing your description...",
    charCounterCount: true,
    charCounterMax: 2000,
    heightMin: 300,
    heightMax: 500,
    toolbarButtons: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'paragraphFormat', 'paragraphStyle', 'textColor', 'backgroundColor'],
        align: 'left',
        buttonsVisible: 3
      },
      moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'indent', 'outdent'],
        align: 'left',
        buttonsVisible: 3
      },
      moreRich: {
        buttons: ['emoticons'],
        align: 'left',
        buttonsVisible: 3
      }
    },
    pluginsEnabled: [
      "paragraphFormat",
      "paragraphStyle",
      "lists",
      "emoticons",
      "charCounter",
      "pastePlain",
      "wordPaste",
    ],
    pastePlain: true,
    fontFamilyDefaultSelection: "Outfit",
  };

  if (!isMounted) {
    return <div className={styles.container}>Loading editor...</div>;
  }

  return (
    <div className={styles.container}>
      {error?.message && <p className={styles.errorMessage}>{error.message}</p>}
      <div id="editor" className={styles.editorContainer}>
        <FroalaEditor
          tag="textarea"
          config={config}
          model={content || ""}
          onModelChange={(model) =>
            setValue(name, model, { shouldValidate: true })
          }
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

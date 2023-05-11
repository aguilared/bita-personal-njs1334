import React, { useState } from "react";

// Components
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import "./WYSIWYG.scss";

const WYSIWYGEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log("PROPS ==> Editor ", props);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <React.Fragment>
      <div className="editor">
        <Editor
          placeholder="Tell a event..."
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </React.Fragment>
  );
};

export default WYSIWYGEditor;

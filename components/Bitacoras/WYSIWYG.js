import React, { useState } from "react";

// Components
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import "./WYSIWYG.scss";

const WYSIWYGEditor = (props) => {
  //const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(props.selected))
  );
  //console.log("PROPS1 ==> Editor ", props);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    //console.log("PROPS333 ==> Editor ", props);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <React.Fragment>
      <div className="editor">
        <Editor
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

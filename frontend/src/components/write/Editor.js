import React from "react";
import styled from "styled-components";
import palette from "../../libs/styles/palette";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

const TitleInput = styled.input`
  font-size: 2rem;
  font-weight: bolder;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 1rem 0;
    text-indent: 10px;
    min-height: 320px;
    font-size: 1.5rem;
    line-height: 1.5;
  }
  /* .ql-editor.ql-blank:before {
    left: 0px;
  } */
`;

function Editor({
  //onChangeBody,
  //onChangeTitle
  onChangeField,
  content,
  title,
}) {
  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const onChangeBody = (content) => {
    onChangeField({ key: "content", value: content });
  };

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };
  console.log("content", content);
  return (
    <EditorWrapper>
      <TitleInput
        value={title}
        onChange={onChangeTitle}
        placeholder="제목을 입력하세요"
      />
      <QuillWrapper>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          // onChangeBody가 한번 더 호출, 매개변수가 있으면 화살표 함수를 더 적어준다.
          onChange={(content, delta, source, editor) => {
            if (source === "user") {
              onChangeBody(editor.getHTML());
            }
          }}
        />
      </QuillWrapper>
    </EditorWrapper>
  );
}

export default Editor;

import { useState, FC, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorWindowProps {
  onChange: (fieldName: string, value: string) => void;
  language?: string;
  code?: string;
  theme?: string;
}

const CodeEditorWindow: FC<CodeEditorWindowProps> = ({
  onChange,
  language,
  code,
  theme,
}) => {
  const [value, setValue] = useState<string>(code || "");
  console.log("code in the editor", value);

  const handleEditorChange = (value: string | undefined): void => {
    setValue(value || "");
    onChange("code", value || "");
  };

  useEffect(() => {
    setValue(code || "");
  }, [code]);

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;

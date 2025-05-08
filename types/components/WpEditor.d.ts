import React from "react";
export interface WpEditorProps {
    apiKey: string;
    value: string;
    onEditorChange: (content: string) => void;
}
declare const WpEditor: React.FC<WpEditorProps>;
export default WpEditor;

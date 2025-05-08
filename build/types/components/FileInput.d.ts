import React, { ChangeEvent, MouseEvent } from "react";
interface FileInputProps {
    wrapperClass?: string;
    inputClass?: string;
    id?: string;
    type?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: MouseEvent<HTMLInputElement>) => void;
    onMouseOver?: (event: MouseEvent<HTMLInputElement>) => void;
    onMouseOut?: (event: MouseEvent<HTMLInputElement>) => void;
    onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
    proSetting?: boolean;
    imageSrc?: string;
    imageWidth?: number;
    imageHeight?: number;
    buttonClass?: string;
    onButtonClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    openUploader?: string;
    descClass?: string;
    description?: string;
}
declare const FileInput: React.FC<FileInputProps>;
export default FileInput;

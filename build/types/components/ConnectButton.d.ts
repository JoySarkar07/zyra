import React from "react";
import '../styles/web/ConnectButton.scss';
interface Task {
    action: string;
    message: string;
    cache?: "course_id" | "user_id";
}
export interface ConnectButtonProps {
    apiLink: string;
    tasks: Task[];
    appLocalizer: Record<string, any>;
}
declare const ConnectButton: React.FC<ConnectButtonProps>;
export default ConnectButton;

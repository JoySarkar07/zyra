import React from "react";
import { ModulePopupProps } from "./ModulePopup";
import '../styles/web/AdminForm.scss';
interface DependentCondition {
    key: string;
    set?: boolean;
    value?: string | number | boolean;
}
interface MultiNumOption {
    key: string;
    value: string | number;
    label: string;
    name?: string;
    type: string;
    desc: string;
}
interface Field {
    name: string;
    type: "select" | "number" | "text";
    options?: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
}
interface Task {
    action: string;
    message: string;
    cache?: "course_id" | "user_id";
}
interface InputField {
    key: string;
    id: string;
    class: string;
    name: string;
    type?: "text" | "select" | "multi-select" | "map" | "google-map" | "checkbox" | "country" | "state" | "radio-color" | "radio-select" | "stock-alert-checkbox" | "radio" | "multi-number" | "button" | "password" | "calender" | "color" | "email" | "number" | "range" | "file" | "url" | "textarea" | "normalfile" | "settingToggle" | "wpeditor" | "label" | "section" | "blocktext" | "button-customizer" | "stock-alert-form-customizer" | "form-customizer" | "catalog-customizer" | "multi-checkbox-table" | "mergeComponent" | "shortCode-table" | "syncbutton" | "sync-map" | "sso-key" | "testconnection" | "log" | "checkbox-custom-img" | "api-connect" | "from-builder";
    desc?: string;
    placeholder?: string;
    inputLabel?: string;
    rangeUnit?: string;
    min?: number;
    max?: number;
    proSetting: boolean;
    moduleEnabled?: boolean;
    parameter?: string;
    dependent?: DependentCondition | DependentCondition[];
    rowNumber?: number;
    colNumber?: number;
    value?: string;
    width?: number;
    height?: number;
    multiple?: boolean;
    range?: boolean;
    select_deselect?: boolean;
    look?: string;
    tour?: string;
    right_content?: boolean;
    dependentPlugin?: boolean;
    dependentSetting?: string;
    defaultValue?: string;
    valuename?: string;
    hint?: string;
    blocktext?: string;
    rows: {
        key: string;
        label: string;
        options?: {
            value: string | number;
            label: string;
        }[];
    }[];
    columns: {
        key: string;
        label: string;
        moduleEnabled?: string;
    }[];
    fields: Field[];
    options?: MultiNumOption;
    optionLabel?: string[];
    apilink?: string;
    interval?: number;
    statusApiLink?: string;
    syncFieldsMap?: Record<string, {
        heading: string;
        fields: Record<string, string>;
    }>;
    apiLink?: string;
    tasks: Task[];
    fetchApiLink?: string;
    downloadApiLink?: string;
    fileName?: string;
    syncDirections: {
        value: string;
        img1: string;
        img2: string;
        label: string;
    }[];
    optionKey?: string;
    selectKey?: string;
    label?: string;
    classes?: string;
    Lat?: number;
    Lng?: number;
    center: Center;
}
type Center = {
    lat: number;
    lng: number;
};
export interface SelectOption {
    value: string;
    label: string;
}
export interface SettingsType {
    modal: InputField[];
    submitUrl: string;
    id: string;
}
interface AdminFormProps {
    settings: SettingsType;
    vendorId?: string;
    announcementId?: string;
    knowladgebaseId?: string;
    proSetting: SettingsType;
    setting: any;
    updateSetting: any;
    modules: any;
    appLocalizer: Record<string, any>;
    ProPopup: React.FC;
    modulePopupFields?: ModulePopupProps;
}
declare const AdminForm: React.FC<AdminFormProps>;
export default AdminForm;

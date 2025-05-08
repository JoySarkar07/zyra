import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import Select$1 from 'react-select';
import { __ } from '@wordpress/i18n';
import { ReactSortable } from 'react-sortablejs';
import Draggable from 'react-draggable';
import ReactDragListView from 'react-drag-listview';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent as DialogContent$1, DialogContentText as DialogContentText$1 } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import { Editor } from '@tinymce/tinymce-react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import GoogleMapReact from 'google-map-react';
import Dialog$1 from '@mui/material/Dialog';
import { useReactTable, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useTour } from '@reactour/tour';

const AdminFooter = ({ supportLink, }) => {
    return (jsx("div", { className: "support-card", children: supportLink === null || supportLink === void 0 ? void 0 : supportLink.map((item, index) => (jsxs("a", { href: item.link, target: "_blank", rel: "noopener noreferrer", className: "card-item", children: [jsx("i", { className: `admin-font adminLib-${item.icon}` }), jsx("a", { href: item.link, target: "_blank", rel: "noopener noreferrer", children: item.title }), jsx("p", { children: item.description })] }, index))) }));
};

const SelectInput = ({ wrapperClass, selectDeselect, selectDeselectClass, selectDeselectValue, name, onMultiSelectDeselectChange, options, value, inputClass, type = "single-select", onChange, onClick, proSetting, description, descClass, }) => {
    // Convert options to react-select format
    const optionsData = options.map((option, index) => ({
        value: option.value,
        label: option.label,
        index,
    }));
    // Find default selected value
    const defaultValue = Array.isArray(value)
        ? optionsData.filter(opt => new Set(value).has(opt.value)) // If it's an array (multi-select), return null or handle differently
        : optionsData.find((opt) => opt.value === value) || null;
    return (jsxs("div", { className: wrapperClass, children: [selectDeselect && (jsx("button", { className: selectDeselectClass, onClick: (e) => {
                    e.preventDefault();
                    onMultiSelectDeselectChange === null || onMultiSelectDeselectChange === void 0 ? void 0 : onMultiSelectDeselectChange(e);
                }, children: selectDeselectValue })), jsx(Select$1, { name: name, className: inputClass, value: defaultValue, options: optionsData, onChange: (newValue, actionMeta) => onChange === null || onChange === void 0 ? void 0 : onChange(newValue, actionMeta), isMulti: type === "multi-select" }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), description && (jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }))] }));
};

const Label = ({ wrapperClass, descClass, description, value }) => {
    return (jsx(Fragment, { children: jsxs("div", { className: wrapperClass, children: [jsx("label", { children: value }), jsx("p", { className: descClass, children: description })] }) }));
};

const Section = ({ wrapperClass, hint, value }) => {
    return (jsx(Fragment, { children: jsxs("div", { className: wrapperClass, children: [value && jsx("span", { children: value }), hint && jsx("p", { className: "section-hint", dangerouslySetInnerHTML: { __html: hint } })] }) }));
};

const BlockText = ({ wrapperClass, blockTextClass, value }) => {
    return (jsx(Fragment, { children: jsx("div", { className: wrapperClass, children: jsx("p", { className: blockTextClass, dangerouslySetInnerHTML: { __html: value } }) }) }));
};

const Customizer = ({ onChange, setting, setHoverOn }) => {
    const [select, setSelect] = useState("");
    const [buttonLink, setButtonLink] = useState(setting.button_link || "");
    useEffect(() => {
        setButtonLink(setting.button_link || "");
    }, [setting.button_link]);
    return (jsxs(Fragment, { children: [jsx("div", { className: "btn-customizer-menu", children: [
                    { title: "Change Colors", iconClass: "color-img", type: "color" },
                    { title: "Border Style", iconClass: "adminLib-crop-free", type: "border" },
                    { title: "Text Style", iconClass: "adminLib-text-fields", type: "font" },
                    { title: "Change Size", iconClass: "adminLib-resize", type: "size" },
                    { title: "Add Url", iconClass: "adminLib-link", type: "link" },
                    { title: "Settings", iconClass: "adminLib-setting", type: "setting" }
                ].map(({ title, iconClass, type }) => (jsx("div", { title: title, className: "btn-customizer-menu-items", onClick: () => setSelect(type), children: jsx("i", { className: `admin-font ${iconClass}` }) }, type))) }), select && (jsxs("div", { className: "customizer-setting-wrapper", children: [jsx("button", { onClick: () => setSelect(""), className: "wrapper-close", children: jsx("i", { className: "admin-font adminLib-cross" }) }), select === "color" && (jsxs("div", { className: "section-wrapper color", children: [jsx("div", { className: "simple", children: [
                                    { label: __("Background Color", "catalogx"), key: "button_background_color" },
                                    { label: __("Font Color", "catalogx"), key: "button_text_color" }
                                ].map(({ label, key }) => (jsxs("div", { className: "section", children: [jsx("span", { className: "label", children: label }), jsxs("div", { className: "property-section", children: [jsx("input", { type: "color", value: setting[key] || "#000000", onChange: (e) => onChange(key, e.target.value) }), jsx("input", { type: "text", value: setting[key] || "#000000", onChange: (e) => onChange(key, e.target.value) })] })] }, key))) }), jsx("div", { className: "hover", onMouseEnter: () => setHoverOn(true), onMouseLeave: () => setHoverOn(false), children: [
                                    { label: __("Background Color On Hover", "catalogx"), key: "button_background_color_onhover" },
                                    { label: __("Font Color On Hover", "catalogx"), key: "button_text_color_onhover" }
                                ].map(({ label, key }) => (jsxs("div", { className: "section", children: [jsx("span", { className: "label", children: label }), jsxs("div", { className: "property-section", children: [jsx("input", { type: "color", value: setting[key] || "#000000", onChange: (e) => onChange(key, e.target.value) }), jsx("input", { type: "text", value: setting[key] || "#000000", onChange: (e) => onChange(key, e.target.value) })] })] }, key))) })] })), select === "link" && (jsxs("div", { className: "section-wrapper link", children: [jsx("div", { className: "simple", children: jsxs("div", { className: "link-box", children: [jsx("input", { className: "link-input", type: "text", value: buttonLink, onChange: (e) => setButtonLink(e.target.value), placeholder: "Paste your URL/link" }), jsx("button", { onClick: (e) => {
                                                e.preventDefault();
                                                onChange("button_link", buttonLink);
                                            }, children: jsx("i", { className: "admin-font adminLib-send" }) })] }) }), jsxs("p", { children: [jsx("span", { children: "*" }), " Keep it blank for default button behavior"] })] })), select === "setting" && (jsx("div", { className: "section-wrapper settings", children: jsxs("div", { className: "section", children: [jsx("span", { className: "label", children: __("System settings", "catalogx") }), jsx("div", { className: "property-section", children: jsx("button", { onClick: (e) => {
                                            e.preventDefault();
                                            onChange("", {}, true);
                                        }, children: "Restore default" }) })] }) }))] }))] }));
};
const ButtonCustomizer = ({ onChange, setting = {}, className, text }) => {
    const [hoverOn, setHoverOn] = useState(false);
    const [buttonHoverOn, setButtonHoverOn] = useState(false);
    const buttonRef = useRef(null);
    // Set button styles based on hover state
    const style = {
        border: "1px solid transparent",
        backgroundColor: buttonHoverOn ? setting.button_background_color_onhover : setting.button_background_color,
        color: buttonHoverOn ? setting.button_text_color_onhover : setting.button_text_color,
        borderColor: buttonHoverOn ? setting.button_border_color_onhover : setting.button_border_color,
        borderRadius: setting.button_border_radious ? `${setting.button_border_radious}px` : "0px",
        borderWidth: setting.button_border_size ? `${setting.button_border_size}px` : "0px",
        fontSize: setting.button_font_size,
        fontWeight: setting.button_font_width,
        padding: setting.button_padding ? `${setting.button_padding}px` : "0px",
        margin: setting.button_margin ? `${setting.button_margin}px` : "0px",
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            var _a;
            if (!((_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                setHoverOn(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (jsxs("div", { ref: buttonRef, className: `${className ? `${className} ` : ""}btn-wrapper`, children: [jsx("button", { onClick: (e) => {
                    e.preventDefault();
                    setHoverOn(!hoverOn);
                }, className: `btn-preview ${hoverOn ? "active" : ""}`, style: style, onMouseEnter: () => setButtonHoverOn(true), onMouseLeave: () => setButtonHoverOn(false), children: text }), hoverOn && (jsx("div", { className: "btn-customizer", children: jsx(Customizer, { onChange: onChange, setHoverOn: setButtonHoverOn, setting: setting }) }))] }));
};

const FormCustomizer = ({ buttonText = 'Submit', setting, proSetting, onChange }) => {
    const [currentHoverOn, setCurrentHoverOn] = useState('');
    const [currentEditSection, setCurrentEditSection] = useState('');
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setCurrentHoverOn('');
                setCurrentEditSection('');
            }
        };
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (jsx("div", { className: "formcustomizer-wrapper", children: jsxs("div", { className: "wrapper-content", children: [jsx("div", { className: "label-section", children: jsx("input", { ref: currentHoverOn === 'description' ? inputRef : null, className: currentHoverOn === 'description' ? 'active' : '', onClick: () => setCurrentHoverOn('description'), onChange: (e) => onChange('alert_text', e.target.value), value: (setting === null || setting === void 0 ? void 0 : setting.alert_text) || '' }) }), jsxs("div", { className: "form-section", children: [jsxs("div", { ref: currentHoverOn === 'email_input' ? buttonRef : null, className: "input-section", children: [jsx("input", { readOnly: true, onClick: () => setCurrentHoverOn('email_input'), className: currentHoverOn === 'email_input' ? 'active' : '', type: "email", placeholder: (setting === null || setting === void 0 ? void 0 : setting.email_placeholder_text) || '' }), currentHoverOn === 'email_input' && (jsxs("div", { className: "input-editor", onClick: () => setCurrentEditSection('text'), children: [jsx("p", { children: "Edit" }), jsx("span", { children: jsx("i", { className: "admin-font adminLib-edit" }) })] })), currentHoverOn === 'email_input' && currentEditSection === 'text' && (jsxs("div", { className: "setting-wrapper", children: [jsx("div", { className: "setting-nav", children: "..." }), jsx("button", { onClick: (e) => {
                                                e.preventDefault();
                                                setCurrentEditSection('');
                                            }, className: "wrapper-close", children: jsx("i", { className: "admin-font adminLib-cross" }) }), jsxs("div", { className: "setting-section-dev", children: [jsx("span", { className: "label", children: "Placeholder text" }), jsx("div", { className: "property-section", children: jsx("input", { type: "text", value: (setting === null || setting === void 0 ? void 0 : setting.email_placeholder_text) || '', onChange: (e) => onChange('email_placeholder_text', e.target.value) }) })] })] }))] }), jsx("div", { className: "button-section", children: jsx(ButtonCustomizer, { text: buttonText, proSetting: proSetting, setting: setting === null || setting === void 0 ? void 0 : setting.customize_btn, onChange: (key, value, isRestoreDefaults = false) => {
                                    const previousSetting = (setting === null || setting === void 0 ? void 0 : setting.customize_btn) || {};
                                    if (isRestoreDefaults) {
                                        onChange('customize_btn', value);
                                    }
                                    else {
                                        onChange('customize_btn', Object.assign(Object.assign({}, previousSetting), { [key]: value }));
                                    }
                                } }) })] })] }) }));
};

const SubTabSection = ({ menuitem, currentTab, setCurrentTab, setting }) => {
    return (jsx("div", { className: 'tab-section', children: menuitem.map((menu) => (jsxs("div", { className: `tab-section-menu ${menu.id === currentTab.id ? 'active' : ''} ${menu.id}-tab`, onClick: () => setCurrentTab(menu), children: [jsx("span", { children: jsx("i", { className: `admin-font ${menu.icon}` }) }), menu.name] }, menu.id))) }));
};

const Elements = ({ selectOptions, onClick }) => {
    return (jsxs("aside", { className: "elements-section", children: [jsx("div", { className: "section-meta", children: jsx("h2", { children: "Form fields" }) }), jsx("main", { className: "section-container", children: selectOptions.map((option) => (jsxs("article", { className: "elements-items", onClick: () => onClick(option.value), children: [option.icon && jsx("i", { className: option.icon }), jsx("p", { className: "list-title", children: option.label })] }, option.value))) })] }));
};

const FormFieldSelect = ({ inputTypeList, formField, onTypeChange }) => (jsx(FieldWrapper, { label: "Type", children: jsx("select", { onChange: (event) => onTypeChange === null || onTypeChange === void 0 ? void 0 : onTypeChange(event.target.value), value: formField.type, children: inputTypeList.map((inputType) => (jsx("option", { value: inputType.value, children: inputType.label }, inputType.value))) }) }));
const FieldWrapper = ({ label, children, className }) => (jsxs("article", { className: `modal-content-section-field ${className || ""}`, onClick: (e) => e.stopPropagation(), children: [jsx("p", { children: label }), children] }));
const InputField = ({ label, type = "text", value, onChange, className }) => (jsx(FieldWrapper, { label: label, className: className, children: jsx("input", { type: type, value: value || "", onChange: (e) => onChange(e.target.value) }) }));
const SettingMetaBox = ({ formField, inputTypeList, onChange, onTypeChange, opened }) => {
    const [hasOpened, setHasOpened] = useState(opened.click);
    const isValidSiteKey = (key) => /^6[0-9A-Za-z_-]{39}$/.test(key);
    const [isSiteKeyEmpty, setIsSiteKeyEmpty] = useState(formField.type === "recaptcha" && !isValidSiteKey(formField.sitekey || ""));
    useEffect(() => {
        if (formField.type === "recaptcha") {
            onChange("disabled", isSiteKeyEmpty);
        }
    }, [isSiteKeyEmpty]);
    useEffect(() => {
        setHasOpened(opened.click);
    }, [opened]);
    // Renders conditional fields based on `formField.type`.
    const renderConditionalFields = () => {
        const commonFields = (jsxs(Fragment, { children: [jsx(InputField, { label: "Placeholder", value: formField.placeholder, onChange: (value) => onChange("placeholder", value) }), jsx(InputField, { label: "Character Limit", type: "number", value: formField.charlimit, onChange: (value) => onChange("charlimit", value) })] }));
        switch (formField.type) {
            case "text":
            case "email":
            case "url":
            case "textarea":
                return (jsxs(Fragment, { children: [commonFields, formField.type === "textarea" && (jsxs(Fragment, { children: [jsx(InputField, { label: "Row", type: "number", value: formField.row, onChange: (value) => onChange("row", value) }), jsx(InputField, { label: "Column", type: "number", value: formField.column, onChange: (value) => onChange("column", value) })] }))] }));
            case "recaptcha":
                return (jsxs(Fragment, { children: [jsx(InputField, { label: "Site Key", value: formField.sitekey, className: isSiteKeyEmpty ? "highlight" : "", onChange: (value) => {
                                onChange("sitekey", value);
                                setIsSiteKeyEmpty(!isValidSiteKey(value));
                            } }), jsxs("p", { children: ["Register your site with your Google account to obtain the", ' ', jsx("a", { href: "https://www.google.com/recaptcha", target: "_blank", rel: "noopener noreferrer", children: "reCAPTCHA script" }), "."] })] }));
            case "attachment":
                return (jsx(InputField, { label: "Maximum File Size", type: "number", value: formField.filesize, onChange: (value) => onChange("filesize", value) }));
            default:
                return null;
        }
    };
    return (jsxs("div", { onClick: () => setHasOpened((prevState) => !prevState), children: [jsx("i", { className: "admin-font adminLib-menu" }), hasOpened && (jsx(Draggable, { children: jsxs("section", { className: "meta-setting-modal", children: [jsx("button", { className: "meta-setting-modal-button", onClick: (event) => {
                                event.stopPropagation();
                                setHasOpened(false);
                            }, children: jsx("i", { className: "admin-font adminLib-cross" }) }), jsxs("main", { className: "meta-setting-modal-content", children: [jsx("h3", { children: "Input Field Settings" }), jsxs("div", { className: "setting-modal-content-section", children: [jsx(FormFieldSelect, { inputTypeList: inputTypeList, formField: formField, onTypeChange: onTypeChange }), jsx(InputField, { label: "Name", value: formField.name, onChange: (value) => onChange("name", value) }), renderConditionalFields()] }), jsxs("div", { className: "setting-modal-content-section", children: [jsx(FieldWrapper, { label: "Visibility", children: jsx("div", { className: "visibility-control-container", children: jsxs("div", { className: "tabs", children: [jsx("input", { checked: formField.type === 'recaptcha' ? !isSiteKeyEmpty : !formField.disabled, onChange: (e) => onChange('disabled', !e.target.checked), type: "radio", id: "visible", name: "tabs" }), jsx("label", { className: "tab", htmlFor: "visible", children: "Visible" }), jsx("input", { checked: formField.type === 'recaptcha' ? isSiteKeyEmpty : formField.disabled, onChange: (e) => onChange('disabled', e.target.checked), type: "radio", id: "hidden", name: "tabs" }), jsx("label", { className: "tab", htmlFor: "hidden", children: "Hidden" }), jsx("span", { className: "glider" })] }) }) }), jsx(FieldWrapper, { label: "Required", children: jsx("input", { type: "checkbox", checked: formField.required, onChange: (e) => onChange("required", e.target.checked) }) })] })] })] }) }))] }));
};

const HoverInputRender = ({ label, placeholder, onLabelChange, renderStaticContent, renderEditableContent, }) => {
    const [showTextBox, setShowTextBox] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const hoverTimeout = useRef(null);
    useEffect(() => {
        const closePopup = (event) => {
            if (event.target.closest(".meta-setting-modal, .react-draggable")) {
                return;
            }
            setIsClicked(false);
            setShowTextBox(false);
        };
        document.body.addEventListener("click", closePopup);
        return () => {
            document.body.removeEventListener("click", closePopup);
        };
    }, []);
    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => setShowTextBox(true), 300);
    };
    const handleMouseLeave = () => {
        if (hoverTimeout.current)
            clearTimeout(hoverTimeout.current);
        if (!isClicked)
            setShowTextBox(false);
    };
    return (jsxs(Fragment, { children: [!showTextBox && (jsx("div", { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: { cursor: "pointer" }, children: renderStaticContent({ label, placeholder }) })), showTextBox && (jsx("div", { className: "main-input-wrapper", onClick: () => setIsClicked(true), onMouseLeave: handleMouseLeave, children: renderEditableContent({ label, onLabelChange, placeholder }) }))] }));
};

const SimpleInput = ({ formField, onChange }) => {
    return (jsx(HoverInputRender, { label: formField.label, placeholder: formField.placeholder, onLabelChange: (newLabel) => onChange("label", newLabel), renderStaticContent: ({ label, placeholder }) => (jsxs("div", { className: "edit-form-wrapper", children: [jsx("p", { children: label }), jsx("div", { className: "settings-form-group-radio", children: jsx("input", { className: "input-text-section simpleInput-text-input", type: "text", placeholder: placeholder }) })] })), renderEditableContent: ({ label, onLabelChange, placeholder }) => (jsxs(Fragment, { children: [jsx("input", { className: "input-label simpleInput-label", type: "text", value: label, onChange: (event) => onLabelChange(event.target.value) }), jsx("input", { className: "input-text-section simpleInput-text-input", type: "text", readOnly: true, placeholder: placeholder })] })) }));
};

const OptionMetaBox = ({ option, onChange, setDefaultValue, hasOpen }) => {
    const [hasOpened, setHasOpened] = useState(hasOpen);
    const modalRef = useRef(null); // Use HTMLDivElement instead of HTMLElement
    useEffect(() => {
        setHasOpened(hasOpen);
    }, [hasOpen]);
    return (jsxs("div", { onClick: (event) => {
            setHasOpened(true);
            event.stopPropagation();
        }, children: [jsx("i", { className: "admin-font adminLib-menu" }), hasOpened && (jsx(Draggable, { nodeRef: modalRef, children: jsxs("div", { ref: modalRef, className: "meta-setting-modal", children: [" ", jsx("button", { className: "meta-setting-modal-button", onClick: (event) => {
                                event.stopPropagation();
                                setHasOpened(false);
                            }, children: jsx("i", { className: "admin-font adminLib-cross" }) }), jsxs("main", { className: "meta-setting-modal-content", children: [jsx("h3", { children: "Input Field Settings" }), jsxs("div", { className: "setting-modal-content-section", children: [jsxs("article", { className: "modal-content-section-field", children: [jsx("p", { children: "Value" }), jsx("input", { type: "text", value: option.value, onChange: (e) => onChange("value", e.target.value) })] }), jsxs("article", { className: "modal-content-section-field", children: [jsx("p", { children: "Label" }), jsx("input", { type: "text", value: option.label, onChange: (e) => onChange("label", e.target.value) })] })] }), jsx("div", { className: "setting-modal-content-section", children: jsxs("article", { className: "modal-content-section-field", children: [jsx("p", { children: "Set default" }), jsx("input", { type: "checkbox", checked: option.isdefault || false, onChange: () => setDefaultValue() })] }) })] })] }) }))] }));
};

const MultipleOptions = ({ formField, onChange, type }) => {
    const settingHasChanged = useRef(false);
    const firstTimeRender = useRef(true);
    const [openOption, setOpenOption] = useState(null);
    const [options, setOptions] = useState(() => {
        return Array.isArray(formField.options) && formField.options.length ? formField.options : [];
    });
    const renderInputFields = (type) => {
        switch (type) {
            case "radio":
                return options.map((option, idx) => (jsxs("div", { className: "radio-input-label-wrap", children: [jsx("input", { type: "radio", id: `radio-${idx}`, value: option.value }), jsx("label", { htmlFor: `radio-${idx}`, children: option.label })] }, idx)));
            case "checkboxes":
                return options.map((option, idx) => (jsxs("div", { className: "radio-input-label-wrap", children: [jsx("input", { type: "checkbox", id: `checkbox-${idx}`, value: option.value }), jsx("label", { htmlFor: `checkbox-${idx}`, children: option.label })] }, idx)));
            case "dropdown":
            case "multiselect":
                return (jsx("section", { className: "select-input-section merge-components", children: jsxs("select", { children: [jsx("option", { children: "Select..." }), options.map((option, idx) => (jsx("option", { value: option.value, children: option.label }, idx)))] }) }));
            default:
                return jsx("p", { children: "Unsupported input type" });
        }
    };
    const handleOptionFieldChange = (index, key, value) => {
        const newOptions = [...options];
        newOptions[index] = Object.assign(Object.assign({}, newOptions[index]), { [key]: value });
        setOptions(newOptions);
        onChange("options", newOptions);
    };
    const handleInsertOption = () => {
        const newOptions = [
            ...options,
            { id: crypto.randomUUID(), label: "Option value", value: "value" }, // Generate a unique ID
        ];
        setOptions(newOptions);
        onChange("options", newOptions);
    };
    const handleDeleteOption = (index) => {
        if (options.length <= 1)
            return;
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        onChange("options", newOptions);
    };
    return (jsx(HoverInputRender, { label: formField.label, onLabelChange: (newLabel) => onChange("label", newLabel), renderStaticContent: ({ label }) => (jsxs("div", { className: "edit-form-wrapper", children: [jsx("p", { children: label }), jsx("div", { className: "settings-form-group-radio", children: renderInputFields(type) })] })), renderEditableContent: ({ label, onLabelChange }) => (jsxs(Fragment, { children: [jsx("input", { className: "input-label multipleOption-label", type: "text", value: label, onChange: (event) => onLabelChange(event.target.value) }), jsxs(ReactSortable, { className: "multiOption-wrapper", list: options, setList: (newList) => {
                        if (firstTimeRender.current) {
                            firstTimeRender.current = false;
                            return;
                        }
                        setOptions(newList);
                        onChange("options", newList);
                    }, handle: ".drag-handle-option", children: [options.map((option, index) => (jsxs("div", { className: "option-list-wrapper drag-handle-option", children: [jsx("div", { className: "option-label", children: jsx("input", { type: "text", value: option.label, onChange: (event) => {
                                            settingHasChanged.current = true;
                                            handleOptionFieldChange(index, "label", event.target.value);
                                        }, readOnly: true, onClick: (event) => {
                                            setOpenOption(index);
                                            event.stopPropagation();
                                        } }) }), jsxs("div", { className: "option-control-section", children: [jsx("div", { onClick: () => {
                                                settingHasChanged.current = true;
                                                handleDeleteOption(index);
                                            }, children: "Delete" }), jsx(OptionMetaBox, { hasOpen: openOption === index, option: option, onChange: (key, value) => {
                                                settingHasChanged.current = true;
                                                handleOptionFieldChange(index, key, value);
                                            }, setDefaultValue: () => {
                                                let defaultValueIndex = null;
                                                options.forEach((option, idx) => {
                                                    if (option.isdefault)
                                                        defaultValueIndex = idx;
                                                });
                                                if (defaultValueIndex !== null) {
                                                    settingHasChanged.current = true;
                                                    handleOptionFieldChange(defaultValueIndex, "isdefault", false);
                                                }
                                                handleOptionFieldChange(index, "isdefault", true);
                                            } })] })] }, index))), jsxs("div", { className: "add-more-option-section", onClick: handleInsertOption, children: ["Add new options ", jsx("span", { children: jsx("i", { className: "admin-font adminLib-plus-circle-o" }) })] })] })] })) }));
};

const TemplateTextarea = ({ formField, onChange }) => {
    return (jsx(HoverInputRender, { label: formField.label, placeholder: formField.placeholder, onLabelChange: (newLabel) => onChange("label", newLabel), renderStaticContent: ({ label, placeholder }) => (jsxs("div", { className: "edit-form-wrapper", children: [jsx("p", { children: label }), jsx("div", { className: "settings-form-group-radio", children: jsx("input", { className: "input-text-section textArea-text-input", type: "text", value: placeholder, readOnly: true }) })] })), renderEditableContent: ({ label, onLabelChange, placeholder }) => (jsxs(Fragment, { children: [jsx("input", { className: "input-label textArea-label", type: "text", value: label, onChange: (event) => onLabelChange(event.target.value) }), jsx("input", { className: "input-text-section textArea-text-input", type: "text", placeholder: placeholder, readOnly: true })] })) }));
};

const Attachment = ({ formField, onChange }) => {
    return (jsxs("div", { className: "main-input-wrapper", children: [jsx("input", { className: "input-label textArea-label", type: "text", value: formField.label, placeholder: formField.placeholder, onChange: (event) => onChange("label", event.target.value) }), jsx("div", { className: "attachment-section", children: jsx("label", { htmlFor: "dropzone-file", className: "attachment-label", children: jsxs("div", { className: "wrapper", children: [jsx("i", { className: "adminLib-cloud-upload" }), jsxs("p", { className: "heading", children: [jsx("span", { children: __("Click to upload", "catalogx") }), " ", __("or drag and drop", "catalogx")] })] }) }) })] }));
};

const Recaptcha = ({ formField }) => {
    return (jsx("div", { className: `main-input-wrapper ${!formField.sitekey ? "recaptcha" : ""}`, children: jsx("p", { children: "reCAPTCHA has been successfully added to the form." }) }));
};

const Datepicker = ({ formField, onChange }) => {
    return (jsx(HoverInputRender, { label: formField.label, placeholder: "Select date", onLabelChange: (newLabel) => onChange("label", newLabel), renderStaticContent: ({ label }) => (jsxs("div", { className: "edit-form-wrapper", children: [jsx("p", { children: label }), jsx("div", { className: "settings-form-group-radio", children: jsx("input", { type: "date", readOnly: true }) })] })), renderEditableContent: ({ label, onLabelChange, placeholder }) => (jsxs(Fragment, { children: [jsx("input", { className: "input-label textArea-label", type: "text", value: label, placeholder: placeholder, onChange: (event) => onLabelChange(event.target.value) }), jsx("input", { type: "date", readOnly: true })] })) }));
};

const Timepicker = ({ formField, onChange }) => {
    return (jsx(HoverInputRender, { label: formField.label, placeholder: "Select time", onLabelChange: (newLabel) => onChange("label", newLabel), renderStaticContent: ({ label }) => (jsxs("div", { className: "edit-form-wrapper", children: [jsx("p", { children: label }), jsx("div", { className: "settings-form-group-radio", children: jsx("input", { type: "time", readOnly: true }) })] })), renderEditableContent: ({ label, onLabelChange }) => (jsxs(Fragment, { children: [jsx("input", { className: "input-label textArea-label", type: "text", value: label, onChange: (event) => onLabelChange(event.target.value) }), jsx("input", { type: "time", readOnly: true })] })) }));
};

const Divider = () => {
    return (jsx("div", { className: "section-divider-container", children: "Section Divider" }));
};

const TemplateSection = ({ formField, onChange }) => {
    return (jsx("div", { className: "main-input-wrapper", children: jsx("input", { className: "input-label textArea-label", type: "text", value: formField.label, placeholder: "I am label", onChange: (event) => onChange("label", event.target.value) }) }));
};

// Default values for input options
const DEFAULT_OPTIONS = [
    { id: "1", label: 'Manufacture', value: 'manufacture' },
    { id: "2", label: 'Trader', value: 'trader' },
    { id: "3", label: 'Authorized Agent', value: 'authorized_agent' }
];
// Utility functions for default placeholders and labels
const DEFAULT_PLACEHOLDER = (type) => `${type}`;
const DEFAULT_LABEL_SIMPLE = (type) => `Enter your ${type}`;
const DEFAULT_LABEL_SELECT = 'Nature of Business';
const DEFAULT_FORM_TITLE = 'Demo Form';
// Select options list
const selectOptions = [
    { icon: 'adminLib-t-letter-bold icon-form-textbox', value: 'text', label: 'Textbox' },
    { icon: 'adminLib-unread icon-form-email', value: 'email', label: 'Email' },
    { icon: 'adminLib-text icon-form-textarea', value: 'textarea', label: 'Textarea' },
    { icon: 'adminLib-checkbox icon-form-checkboxes', value: 'checkboxes', label: 'Checkboxes' },
    { icon: 'adminLib-multi-select icon-form-multi-select', value: 'multiselect', label: 'Multi Select' },
    { icon: 'adminLib-radio icon-form-radio', value: 'radio', label: 'Radio' },
    { icon: 'adminLib-dropdown-checklist icon-form-dropdown', value: 'dropdown', label: 'Dropdown' },
    { icon: 'adminLib-captcha-automatic-code icon-form-recaptcha', value: 'recaptcha', label: 'reCaptcha v3' },
    { icon: 'adminLib-submission-message icon-form-attachment', value: 'attachment', label: 'Attachment' },
    { icon: 'adminLib-form-section icon-form-section', value: 'section', label: 'Section' },
    { icon: 'adminLib-calendar icon-form-store-description', value: 'datepicker', label: 'Date Picker' },
    { icon: 'adminLib-alarm icon-form-address01', value: 'timepicker', label: 'Time Picker' },
    { icon: 'adminLib-divider icon-form-address01', value: 'divider', label: 'Divider' }
];
/**
 * Component that renders an action section for adding new items.
 */
const AddNewBtn = ({ onAddNew, large }) => {
    return (jsx(Fragment, { children: large ? (jsxs("div", { className: "addnew", children: [jsx("div", { onClick: () => onAddNew === null || onAddNew === void 0 ? void 0 : onAddNew(), children: jsx("i", { className: "admin-font adminLib-move" }) }), jsx("p", { children: 'Click to add next text field' })] })) : (jsx("div", { className: "add-new-sections", onClick: () => onAddNew === null || onAddNew === void 0 ? void 0 : onAddNew(), children: jsx("div", { children: jsx("span", { children: jsx("i", { className: "admin-font adminLib-move" }) }) }) })) }));
};
/**
 * Component that renders a delete button section.
 */
const DeleteBtn = ({ onDelete, hideDelete }) => {
    return (jsx("div", { className: `delete ${hideDelete ? 'disable' : ''}`, onClick: () => onDelete === null || onDelete === void 0 ? void 0 : onDelete(), children: jsx("i", { className: "admin-font adminLib-close" }) }));
};
// props value 
// 1. formTitlePlaceholder
// 2. formTitleDescription
// 3. formFieldTypes
const CustomFrom = ({ onChange, name, proSettingChange, setting, formTitlePlaceholder }) => {
    var _a;
    ////////////// Define state variable here /////////////////
    const formSetting = setting[name] || {};
    const settingHasChanged = useRef(false);
    const firstTimeRender = useRef(true);
    // Contain list of selected form fields.
    const [formFieldList, setFormFieldList] = useState(() => {
        // Form field list can't be empty it should contain atlest form title.
        // This action prevent any backend action for empty form field list.
        let inputList = formSetting['formfieldlist'] || [];
        if (!Array.isArray(inputList) || inputList.length <= 0) {
            return [{
                    id: 1,
                    type: 'title',
                    label: DEFAULT_FORM_TITLE,
                    required: true,
                }];
        }
        return inputList;
    });
    const [buttonSetting, setButtonSetting] = useState(formSetting['butttonsetting'] || {});
    // State for hold id of opend input section.
    const [opendInput, setOpendInput] = useState(null);
    const [isInputBoxClick, SetIsInputBoxClick] = useState({ click: false });
    // State variable for a random maximum id
    const [randMaxId, setRendMaxId] = useState(0);
    useEffect(() => {
        const closePopup = (event) => {
            if (event.target.closest('.meta-menu, .meta-setting-modal, .react-draggable')) {
                return;
            }
            SetIsInputBoxClick({ click: false });
            setOpendInput(null);
        };
        document.body.addEventListener("click", closePopup);
        return () => {
            document.body.removeEventListener("click", closePopup);
        };
    }, []);
    // Prepare random maximum id
    useEffect(() => {
        setRendMaxId(formFieldList.reduce((maxId, field) => Math.max(maxId, field.id), 0) + 1);
    }, []);
    // Save button setting and formfieldlist setting
    useEffect(() => {
        if (settingHasChanged.current) {
            settingHasChanged.current = false;
            onChange({
                'formfieldlist': formFieldList,
                'butttonsetting': buttonSetting
            });
        }
    }, [buttonSetting, formFieldList]);
    ////////////// Define functionality here /////////////////
    const getUniqueName = () => {
        return Date.now().toString(36); // Convert timestamp to base 36
    };
    /**
     * Function generate a empty form field and return it.
     * By default it set the type to simple text
     */
    const getNewFormField = (type = 'text') => {
        const newFormField = {
            id: randMaxId !== null && randMaxId !== void 0 ? randMaxId : 0, // Ensure randMaxId is a number (or fallback to 0)
            type: type,
            label: '',
            required: false,
            name: `${type}-${getUniqueName()}`
        };
        if (['multiselect', 'radio', 'dropdown', 'checkboxes'].includes(type)) {
            newFormField.label = DEFAULT_LABEL_SELECT;
            newFormField.options = DEFAULT_OPTIONS;
        }
        else {
            newFormField.label = DEFAULT_LABEL_SIMPLE(type);
            newFormField.placeholder = DEFAULT_PLACEHOLDER(type);
        }
        // update randMaxId by 1
        setRendMaxId((prev) => (prev !== null && prev !== void 0 ? prev : 0) + 1);
        return newFormField;
    };
    /**
     * Function that append a new form field after a perticular index.
     * If form field list is empty it append at begining of form field list.
     */
    const appendNewFormField = (index, type = 'text') => {
        if (proSettingChange())
            return;
        const newField = getNewFormField(type);
        // Create a new array with the new element inserted
        const newFormFieldList = [
            ...formFieldList.slice(0, index + 1),
            newField,
            ...formFieldList.slice(index + 1)
        ];
        // Update the state with the new array
        settingHasChanged.current = true;
        setFormFieldList(newFormFieldList);
        return newField;
    };
    /**
     * Function that delete a particular form field
     * @param {*} index
     */
    const deleteParticularFormField = (index) => {
        if (proSettingChange())
            return;
        // Create a new array without the element at the specified index
        const newFormFieldList = formFieldList.filter((_, i) => i !== index);
        // Update the state with the new array
        settingHasChanged.current = true;
        setFormFieldList(newFormFieldList);
    };
    /**
     * Function handle indivisual form field changes
     */
    const handleFormFieldChange = (index, key, value) => {
        if (proSettingChange())
            return;
        // copy the form field before modify
        const newFormFieldList = [...formFieldList];
        // Update the new form field list
        newFormFieldList[index] = Object.assign(Object.assign({}, newFormFieldList[index]), { [key]: value });
        // Update the state variable
        settingHasChanged.current = true;
        setFormFieldList(newFormFieldList);
    };
    /**
     * Function that handle type change for a particular form field
     * @param {*} index
     * @param {*} newType
     */
    const handleFormFieldTypeChange = (index, newType) => {
        if (proSettingChange())
            return;
        // Get the input which one is selected
        const selectedFormField = formFieldList[index];
        // Check if selected type is previously selected type  
        if (selectedFormField.type == newType) {
            return;
        }
        // Create a empty form field for that position
        const newFormField = getNewFormField(newType);
        newFormField.id = selectedFormField.id;
        // Replace the newly created form field with old one
        const newFormFieldList = [...formFieldList];
        newFormFieldList[index] = newFormField;
        settingHasChanged.current = true;
        setFormFieldList(newFormFieldList);
    };
    return (
    // Render Registration form here
    jsxs("div", { className: "registrationFrom-main-wrapper-section", children: [jsx(Elements, { selectOptions: selectOptions, onClick: (type) => {
                    const newInput = appendNewFormField(formFieldList.length - 1, type);
                    setOpendInput(newInput);
                } }), jsxs("div", { className: "registration-form-main-section", children: [jsxs("div", { className: "form-heading", children: [jsx("input", { type: "text", placeholder: formTitlePlaceholder, value: (_a = formFieldList[0]) === null || _a === void 0 ? void 0 : _a.label, onChange: (event) => { handleFormFieldChange(0, 'label', event.target.value); } }), jsx(AddNewBtn, { onAddNew: () => {
                                    const newInput = appendNewFormField(0);
                                    setOpendInput(newInput);
                                } })] }), jsx(ReactSortable, { list: formFieldList, setList: (newList) => {
                            if (firstTimeRender.current) {
                                firstTimeRender.current = false;
                                return;
                            }
                            if (proSettingChange())
                                return;
                            settingHasChanged.current = true;
                            setFormFieldList(newList);
                        }, handle: ".drag-handle", children: formFieldList.length > 0 &&
                            formFieldList.map((formField, index) => {
                                if (index === 0) {
                                    return jsx("div", { style: { display: 'none' } });
                                }
                                return (jsxs("main", { className: `form-field ${(opendInput === null || opendInput === void 0 ? void 0 : opendInput.id) == formField.id ? 'active' : ''}`, children: [(opendInput === null || opendInput === void 0 ? void 0 : opendInput.id) == formField.id &&
                                            jsx("div", { className: "bth-move drag-handle", children: jsx("i", { className: "admin-font adminLib-move" }) }), (opendInput === null || opendInput === void 0 ? void 0 : opendInput.id) == formField.id &&
                                            jsxs("section", { className: "meta-menu", children: [jsx("div", { className: "btn-delete", children: jsx(DeleteBtn, { onDelete: () => {
                                                                deleteParticularFormField(index);
                                                                setOpendInput(null);
                                                            } }) }), jsx(SettingMetaBox, { formField: formField, opened: isInputBoxClick, onChange: (key, value) => handleFormFieldChange(index, key, value), onTypeChange: (newType) => handleFormFieldTypeChange(index, newType), inputTypeList: selectOptions })] }), jsxs("section", { className: `${(opendInput === null || opendInput === void 0 ? void 0 : opendInput.id) != formField.id ? 'hidden-list' : ''} form-field-container-wrapper`, onClick: (event) => {
                                                event.stopPropagation();
                                                SetIsInputBoxClick({
                                                    click: true
                                                });
                                                if ((opendInput === null || opendInput === void 0 ? void 0 : opendInput.id) != formField.id) {
                                                    setOpendInput(formField);
                                                }
                                            }, children: [(formField.type == 'text' ||
                                                    formField.type == 'email' ||
                                                    formField.type == 'number') &&
                                                    jsx(SimpleInput, { formField: formField, onChange: (key, value) => handleFormFieldChange(index, key, value) }), (formField.type == 'checkboxes' ||
                                                    formField.type == 'multiselect' ||
                                                    formField.type == 'radio' ||
                                                    formField.type == 'dropdown') &&
                                                    jsx(MultipleOptions, { formField: formField, type: formField.type, selected: (opendInput === null || opendInput === void 0 ? void 0 : opendInput.id) === formField.id, onChange: (key, value) => handleFormFieldChange(index, key, value) }), formField.type == 'textarea' &&
                                                    jsx(TemplateTextarea, { formField: formField, onChange: (key, value) => handleFormFieldChange(index, key, value) }), formField.type == 'attachment' &&
                                                    jsx(Attachment, { formField: formField, onChange: (key, value) => handleFormFieldChange(index, key, value) }), formField.type == 'recaptcha' &&
                                                    jsx(Recaptcha, { formField: formField, onChange: (key, value) => handleFormFieldChange(index, key, value) }), formField.type == 'datepicker' &&
                                                    jsx(Datepicker, { formField: formField, onChange: (key, value) => handleFormFieldChange(index, key, value) }), formField.type == 'timepicker' &&
                                                    jsx(Timepicker, { formField: formField, onChange: (key, value) => handleFormFieldChange(index, key, value) }), formField.type == 'section' &&
                                                    jsx(TemplateSection, { formField: formField, onChange: (key, value) => handleFormFieldChange(index, key, value) }), formField.type == 'divider' &&
                                                    jsx(Divider, {})] }), jsx(AddNewBtn, { onAddNew: () => {
                                                const newInput = appendNewFormField(index);
                                                setOpendInput(newInput);
                                            } })] }));
                            }) }), jsx("section", { className: "settings-input-content", children: jsx(ButtonCustomizer, { text: buttonSetting.button_text && buttonSetting.button_text || 'Submit', setting: buttonSetting, onChange: (key, value, isRestoreDefaults = false) => {
                                if (proSettingChange())
                                    return;
                                settingHasChanged.current = true;
                                const previousSetting = buttonSetting || {};
                                if (isRestoreDefaults) {
                                    setButtonSetting(value);
                                }
                                else {
                                    setButtonSetting(Object.assign(Object.assign({}, previousSetting), { [key]: value }));
                                }
                            } }) }), jsx(AddNewBtn, { large: true, onAddNew: () => {
                            const newInput = appendNewFormField(formFieldList.length - 1);
                            setOpendInput(newInput);
                        } })] })] }));
};

// FormCustomizer Component
const FreeProFormCustomizer = ({ setting, proSettingChange, moduleEnabledChange, onChange }) => {
    const settingChange = useRef(false);
    // Initialize state
    const [formFieldsData, setFormFieldsData] = useState((setting === null || setting === void 0 ? void 0 : setting.freefromsetting) || []);
    useEffect(() => {
        if (settingChange.current) {
            onChange('freefromsetting', formFieldsData);
            settingChange.current = false;
        }
    }, [formFieldsData, onChange]);
    const getFields = (fieldKey) => {
        return formFieldsData.find(({ key }) => key === fieldKey);
    };
    const activeDeactiveFields = (fieldKey, activeStatus) => {
        if (moduleEnabledChange())
            return;
        settingChange.current = true;
        setFormFieldsData((prevData) => {
            const existingField = prevData.find(({ key }) => key === fieldKey);
            if (existingField) {
                return prevData.map((data) => data.key === fieldKey ? Object.assign(Object.assign({}, data), { active: activeStatus }) : data);
            }
            else {
                return [...prevData, { key: fieldKey, label: '', active: activeStatus }];
            }
        });
    };
    const updateFieldLabel = (fieldKey, labelValue) => {
        if (moduleEnabledChange())
            return;
        settingChange.current = true;
        setFormFieldsData((prevData) => {
            const existingField = prevData.find(({ key }) => key === fieldKey);
            if (existingField) {
                return prevData.map((data) => data.key === fieldKey ? Object.assign(Object.assign({}, data), { label: labelValue }) : data);
            }
            else {
                return [...prevData, { key: fieldKey, label: labelValue, active: false }];
            }
        });
    };
    const formFields = [
        { key: 'name', desc: 'Name' },
        { key: 'email', desc: 'Email' },
        { key: 'phone', desc: 'Phone' },
        { key: 'address', desc: 'Address' },
        { key: 'subject', desc: 'Enquiry about' },
        { key: 'comment', desc: 'Enquiry details' },
        { key: 'fileupload', desc: 'File upload' },
        { key: 'filesize-limit', desc: 'File upload size limit (in MB)' },
        { key: 'captcha', desc: 'Captcha' },
    ];
    const [menu, setMenu] = useState([
        { name: "Free", link: "hi", id: "2", icon: 'adminLib-info' },
        { name: "Pro", link: "hi", id: "1", icon: 'adminLib-cart' },
    ]);
    const [currentTab, setCurrentTab] = useState(menu[0]);
    // Read-only field state
    const [readonlyFields, setReadonlyFields] = useState(formFields.map((_, index) => { var _a; return ((_a = formFieldsData[index]) === null || _a === void 0 ? void 0 : _a.active) === true ? false : true; }));
    return (jsxs(Fragment, { children: [jsx(SubTabSection, { menuitem: menu, currentTab: currentTab, setCurrentTab: setCurrentTab }), currentTab.id === "1" ? (jsx(CustomFrom, { setting: setting, name: "formsettings", proSettingChange: proSettingChange, onChange: (value) => onChange('formsettings', value) })) : (jsxs("div", { children: [jsxs("div", { className: "fields-header", children: [jsx("h3", { className: "name", children: 'Field Name' }), jsx("h3", { className: "set-name", children: 'Set new field name' })] }), jsx("div", { className: "registrationFrom-main-wrapper-section", children: jsx("div", { className: "form-field", children: formFields.map((fields, index) => {
                                var _a;
                                return (jsxs("div", { className: "edit-form-wrapper free-form", children: [jsx("div", { className: "form-label", style: { opacity: readonlyFields[index] ? "0.3" : "1" }, children: fields.desc }), jsx("div", { className: "settings-form-group-radio", children: jsx("input", { type: "text", onChange: (e) => updateFieldLabel(fields.key, e.target.value), value: ((_a = getFields(fields.key)) === null || _a === void 0 ? void 0 : _a.label) || '', readOnly: readonlyFields[index], style: { opacity: readonlyFields[index] ? "0.3" : "1" } }) }), jsx("div", { className: "button-visibility", onClick: () => {
                                                setReadonlyFields((prev) => prev.map((readonly, i) => i === index ? !readonly : readonly));
                                                activeDeactiveFields(fields.key, readonlyFields[index]);
                                            }, children: jsx("i", { className: `admin-font ${readonlyFields[index] ? 'adminLib-eye-blocked enable-visibility' : 'adminLib-eye'}` }) })] }, index));
                            }) }) })] }))] }));
};

const CatalogCustomizer = ({ onChange, proSetting, setting, Sample_Product, pro_url }) => {
    const [localSetting, _setLocalSetting] = useState(setting);
    const setSetting = (key, value) => {
        _setLocalSetting(Object.assign(Object.assign({}, localSetting), { [key]: value }));
        onChange(key, value);
    };
    const shopPagePossitionSetting = localSetting['shop_page_possition_setting'] || [];
    const buttonPossitionSetting = localSetting['shop_page_button_position_setting'] || [];
    const [menu, setMenu] = useState([
        { name: "Enquiry", id: 'enquiry', icon: 'adminLib-inquiry' },
        { name: "Quote", id: 'quote', icon: 'adminLib-price-quote-icon' },
        { name: "Catalog", id: 'catalog', icon: 'adminLib-catalog' },
    ]);
    const [currentTab, setCurrentTab] = useState(menu[0]);
    // Create draggable items state with type annotations
    const [dragableItems, setDragableItems] = useState([
        {
            id: 'price_section',
            content: () => {
                const [hideProductPrice, setHideProductPrice] = useState(setting['hide_product_price']);
                return (jsxs("div", { className: 'price-section toggle-visibility', children: [jsx("div", { onClick: () => {
                                setHideProductPrice(!hideProductPrice);
                                setSetting('hide_product_price', !hideProductPrice);
                            }, className: 'button-visibility', children: jsx("i", { className: 'admin-font adminLib-support' }) }), jsxs("p", { className: 'product-price', style: { opacity: hideProductPrice ? "0.3" : "1" }, children: [jsx("span", { className: 'strikethrough', children: "$20.00" }), " $18.00"] })] }));
            },
            defaultPosition: 0,
            dragable: false,
        },
        {
            id: 'product_description',
            content: () => {
                const [hideProductDesc, setHideProductDesc] = useState(setting['hide_product_desc']);
                return (jsxs("div", { className: 'description-section toggle-visibility', children: [jsx("div", { onClick: () => {
                                setHideProductDesc(!hideProductDesc);
                                setSetting('hide_product_desc', !hideProductDesc);
                            }, className: 'button-visibility', children: jsx("i", { className: 'admin-font adminLib-support' }) }), jsx("p", { className: 'product-description', style: { opacity: hideProductDesc ? "0.3" : "1" }, children: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." })] }));
            },
            defaultPosition: 1,
            dragable: false,
        },
        {
            id: 'additional_input',
            defaultPosition: 2,
            dragable: !!proSetting, // Converts truthy/falsy to boolean
        },
        {
            id: 'add_to_cart',
            content: () => (jsxs("section", { className: 'catalog-add-to-cart-section', children: [jsx("div", { className: 'catalog-add-to-cart-quantity', children: "1" }), jsx("div", { className: 'main-btn btn-purple catalog-add-to-cart-btn', children: "Add to cart" })] })),
            defaultPosition: 3,
            dragable: false,
        },
        {
            id: 'sku_category',
            content: () => (jsxs("div", { className: 'product-sku-category', children: [jsxs("p", { children: ["SKU: ", jsx("span", { children: "WOO-ALBUM" })] }), jsxs("p", { children: ["Category: ", jsx("span", { children: "Music" })] })] })),
            defaultPosition: 4,
            dragable: false,
        },
        {
            id: 'custom_button',
            content: 'buttonDND',
            defaultPosition: 5,
            dragable: !!proSetting,
        },
    ]);
    // Create button items state with type annotations
    const [buttonItems, setButtonItems] = useState([
        { id: 'enquiry_button' },
        { id: 'quote_button' },
        { id: 'enquery_cart_button' },
    ]);
    /**
     * Get the index of a list item by its id.
     * @param list - An array of objects that must have an 'id' property.
     * @param id - The id to search for.
     * @returns The index of the found item, or -1 if not found.
     */
    const getIndex = (list, id) => {
        let foundItemIndex = -1;
        list.forEach((item, index) => {
            if (item.id === id) {
                foundItemIndex = index;
            }
        });
        return foundItemIndex;
    };
    /**
     * Reorders elements in an array.
     * @param list - The array to reorder.
     * @param startIndex - The index of the item to move.
     * @param endIndex - The index where the item should be moved.
     * @returns A new array with the reordered elements.
     */
    const reorder = (list, startIndex, endIndex) => {
        if (startIndex === endIndex)
            return list; // No need to reorder if indices are the same
        const result = [...list]; // Creates a shallow copy of the array
        const [removed] = result.splice(startIndex, 1);
        if (removed !== undefined) {
            result.splice(endIndex, 0, removed);
        }
        return result;
    };
    /**
     * Updates draggable items based on the previously set sequence.
     */
    useEffect(() => {
        if (!shopPagePossitionSetting)
            return;
        let positionSetting = shopPagePossitionSetting || {};
        let items = [...dragableItems];
        // Convert position settings into an array of tuples
        const positionEntries = Object.entries(positionSetting);
        // Check if all items are being moved to the same position
        let samePosition = true;
        let positionToMove = null;
        positionEntries.forEach(([willMove, moveAfter]) => {
            if (positionToMove !== null && positionToMove !== moveAfter) {
                samePosition = false;
            }
            positionToMove = moveAfter;
        });
        // Reorder items based on position settings
        positionEntries.forEach(([willMove, moveAfter]) => {
            const startIndex = getIndex(items, willMove);
            let endIndex = getIndex(items, moveAfter) + 1;
            if (samePosition && positionToMove !== null) {
                endIndex = items.length; // Move to last position if all are at the same position
            }
            items = reorder(items, startIndex, endIndex);
        });
        // Handle elements that were moved to the same position
        if (samePosition && positionToMove !== null) {
            const movedElements = items.splice(items.length - 2, 2);
            // Find the correct index where the moved elements should be inserted
            const movedIndex = getIndex(items, positionEntries[0][1]) + 1;
            // Create a new sequence of items
            items = [...items.slice(0, movedIndex), ...movedElements, ...items.slice(movedIndex)];
        }
        setDragableItems(items);
    }, []);
    /**
     * Sets button draggable items to their previously saved sequence.
     */
    useEffect(() => {
        setButtonItems((prevButtonItems) => {
            return [...prevButtonItems].sort((a, b) => buttonPossitionSetting.indexOf(a.id) - buttonPossitionSetting.indexOf(b.id));
        });
    }, []);
    /**
     * Function after drag end. Updates settings and reorders items.
     * @param startIndex - The starting index of the dragged item.
     * @param endIndex - The ending index where the item is dropped.
     */
    const onDragEnd = (startIndex, endIndex) => {
        if (endIndex === undefined || endIndex === null || endIndex === 0) {
            return;
        }
        const newItems = reorder(dragableItems, startIndex, endIndex);
        // Define the type for shopPageBuildersPosition
        const shopPageBuildersPosition = {};
        let positionAfter = '';
        newItems.forEach((item) => {
            if (item.dragable) {
                shopPageBuildersPosition[item.id] = positionAfter;
            }
            else {
                positionAfter = item.id;
            }
        });
        setSetting('shop_page_possition_setting', shopPageBuildersPosition);
        setDragableItems(newItems);
    };
    /**
     * Handles button drag end event and updates settings.
     * @param startIndex - The starting index of the dragged button.
     * @param endIndex - The ending index where the button is dropped.
     */
    const onButtonDragEnd = (startIndex, endIndex) => {
        if (endIndex === undefined || endIndex === null || endIndex === 0) {
            return;
        }
        const newItems = reorder(buttonItems, startIndex, endIndex);
        // Calculate position for draggable items.
        const position = newItems.map((item) => item.id);
        setSetting('shop_page_button_position_setting', position);
        setButtonItems(newItems);
    };
    /**
     * Handles submenu change when a new tab is selected.
     * @param newTab - The new tab object.
     */
    const handleSubMenuChange = (newTab) => {
        if (currentTab.id === newTab.id)
            return;
        setCurrentTab(Object.assign({}, newTab));
        const mainWrapper = document.getElementById('catelog-customizer-main-wrapper');
        if (!mainWrapper)
            return;
        window.scrollTo(0, 0);
        mainWrapper.classList.add(newTab.id);
        mainWrapper.classList.add('change-tab');
        setTimeout(() => {
            mainWrapper.classList.remove('change-tab');
            setTimeout(() => {
                mainWrapper.classList.remove(newTab.id);
            }, 300);
        }, 500);
    };
    return (jsxs(Fragment, { children: [jsx(SubTabSection, { menuitem: menu, currentTab: currentTab, setCurrentTab: setCurrentTab, setting: localSetting }), jsxs("main", { className: "catelog-customizer-main-wrapper", id: "catelog-customizer-main-wrapper", children: [jsxs("section", { className: "catelog-customizer", children: [jsx("div", { className: "product-img", children: jsx("img", { src: Sample_Product, alt: "Sample Product" }) }), jsxs("div", { className: "product-data", children: [jsx("h1", { className: "product-name", children: "Sample Product" }), jsx("div", { className: "drag-drop-component", children: jsx(ReactDragListView, { nodeSelector: ".shop-page-draggable", handleSelector: ".should-move", lineClassName: "dragLine", ignoreSelector: ".ignore-drag", onDragEnd: onDragEnd, children: dragableItems.map((item, index) => (jsx("div", { className: `${item.dragable ? "should-move" : ""} shop-page-draggable`, children: item.content === "buttonDND" ? (jsx("div", { className: "button-wrapper", children: jsx(ReactDragListView, { nodeSelector: ".shop-page-button-draggable", lineClassName: "dragLine", handleSelector: proSetting ? ".shop-page-button-draggable" : "none", onDragEnd: proSetting ? onButtonDragEnd : () => { }, children: buttonItems.map((btn) => {
                                                            var _a, _b;
                                                            return (jsxs("div", { className: "shop-page-button-draggable", children: [btn.id === "enquiry_button" && (jsx("div", { onClick: () => handleSubMenuChange(menu[0]), className: `button-main-container toggle-visibility ${currentTab.id === "enquiry" ? "" : "disable"} enquiry-btn`, children: jsx(ButtonCustomizer, { className: "ignore-drag", text: ((_a = localSetting === null || localSetting === void 0 ? void 0 : localSetting.enquiry_button) === null || _a === void 0 ? void 0 : _a.button_text) || "Enquiry", setting: localSetting === null || localSetting === void 0 ? void 0 : localSetting.enquiry_button, onChange: (key, value, isRestoreDefaults = false) => {
                                                                                setSetting("enquiry_button", isRestoreDefaults ? value : Object.assign(Object.assign({}, localSetting.enquiry_button), { [key]: value }));
                                                                            } }) })), btn.id === "cart_button" && (jsx(ButtonCustomizer, { text: "Add to cart", setting: localSetting === null || localSetting === void 0 ? void 0 : localSetting.cart_button, onChange: (key, value, isRestoreDefaults = false) => {
                                                                            setSetting("cart_button", isRestoreDefaults ? value : Object.assign(Object.assign({}, localSetting.cart_button), { [key]: value }));
                                                                        } })), btn.id === "quote_button" && (jsx("div", { onClick: () => handleSubMenuChange(menu[1]), className: `button-main-container toggle-visibility ${currentTab.id === "quote" ? "" : "disable"}`, children: jsx(ButtonCustomizer, { text: ((_b = localSetting === null || localSetting === void 0 ? void 0 : localSetting.quote_button) === null || _b === void 0 ? void 0 : _b.button_text) || "Add to quote", setting: localSetting === null || localSetting === void 0 ? void 0 : localSetting.quote_button, onChange: (key, value, isRestoreDefaults = false) => {
                                                                                setSetting("quote_button", isRestoreDefaults ? value : Object.assign(Object.assign({}, localSetting.quote_button), { [key]: value }));
                                                                            } }) }))] }, btn.id));
                                                        }) }) })) : item.id === "additional_input" ? (jsx("div", { onClick: () => handleSubMenuChange(menu[2]), className: `additional-input toggle-visibility ${currentTab.id === "catalog" ? "" : "disable"}`, children: jsx("input", { placeholder: "Additional input (optional)", type: "text", value: (localSetting === null || localSetting === void 0 ? void 0 : localSetting.additional_input) || "", onChange: (e) => setSetting("additional_input", e.target.value) }) })) : (typeof item.content === "function" && React.createElement(item.content, { currentTab, setCurrentTab })) }, index))) }) }), !proSetting && (jsxs("article", { className: "pro-banner", children: [jsx("p", { children: "Upgrade to pro for endless customization" }), jsx("a", { href: pro_url, className: "main-btn btn-purple", target: "_blank", rel: "noopener noreferrer", children: "Upgrade now" })] }))] })] }), jsxs("section", { className: "single-product-page-description", children: [jsx("div", { className: "option", children: jsxs("ul", { children: [jsxs("li", { className: "active", children: ["Description ", jsx("span", { children: jsx("i", { className: "admin-font adminLib-keyboard-arrow-down" }) })] }), jsx("li", { children: "Additional Information" }), jsx("li", { children: "Review" })] }) }), jsxs("div", { className: "description", children: [jsx("h2", { children: "Description" }), jsx("p", { children: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo." })] })] })] })] }));
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const SelectedOptionDisplay = ({ selectedValues, clearSelectedValues, removeSelectedValues, setPopupOpend, popupOpend, }) => {
    // Get the renderable selected value for all selected values
    const renderableSelectedValue = popupOpend ? selectedValues : selectedValues.slice(0, 1);
    return (jsxs("div", { className: "selected-container", children: [jsx("div", { className: "selected-items-container", children: renderableSelectedValue.map((value) => (jsxs("div", { className: "selected-items", children: [jsx("span", { children: value.label }), jsx("div", { className: "", onClick: () => removeSelectedValues(value), children: jsx("i", { className: "admin-font adminLib-close" }) })] }, value.value))) }), jsxs("div", { className: "container-items-controls", children: [!popupOpend && selectedValues.length > 1 && (jsxs("div", { className: "open-modal items-controls", onClick: () => setPopupOpend(true), children: ["+", selectedValues.length - 1] })), jsx("div", { className: "clear-all-data items-controls", onClick: clearSelectedValues, children: jsx("i", { className: "admin-font adminLib-close" }) })] })] }));
};
const SearchOptionDisplay = ({ options, filter, setFilter, insertSelectedValues, searchStarted, }) => {
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const setModalClose = () => {
            setModalOpen(false);
        };
        document.addEventListener("click", setModalClose);
        return () => {
            document.removeEventListener("click", setModalClose);
        };
    }, []);
    return (jsxs(Fragment, { children: [jsxs("div", { className: "selected-input", children: [jsx("input", { className: "", placeholder: "Select...", value: filter, onChange: (event) => {
                            setModalOpen(true);
                            setFilter(event.target.value);
                        }, onClick: (e) => {
                            e.stopPropagation();
                            setModalOpen(true);
                        } }), jsx("span", { children: jsx("i", { className: "admin-font adminLib-keyboard-arrow-down" }) })] }), modalOpen && (jsx("div", { className: "option-container", children: !searchStarted ? (options.map((option) => (jsx("div", { className: "options-item", onClick: () => {
                        insertSelectedValues(option);
                        setModalOpen(false);
                    }, children: option.label }, option.value)))) : (jsx("div", { children: "Searching" })) }))] }));
};
const Select = ({ values = [], onChange, option = [], asyncGetOptions, asyncFetch = false, isMulti = true, }) => {
    // State to store selected values
    const [selectedValues, setSelectedValues] = useState(values);
    // State to store options
    const [options, setOptions] = useState(option);
    // State for modal open/close
    const [popupOpened, setPopupOpened] = useState(false);
    // State to track search
    const [searchStarted, setSearchStarted] = useState(false);
    // State for filtering options
    const [filter, setFilter] = useState("");
    // Ref to track setting changes
    const settingChanged = useRef(false);
    // Fetch options (sync or async)
    const getOptions = () => __awaiter(void 0, void 0, void 0, function* () {
        let allOptions = option;
        if (asyncFetch && asyncGetOptions) {
            setSearchStarted(true);
            allOptions = yield asyncGetOptions(filter);
            setSearchStarted(false);
        }
        return allOptions.filter((opt) => !selectedValues.some((sel) => sel.value === opt.value));
    });
    /**
     * Insert a new selected value.
     */
    const insertSelectedValues = (value) => {
        settingChanged.current = true;
        setSelectedValues((prev) => [...prev, value]);
    };
    /**
     * Remove a selected value.
     */
    const removeSelectedValues = (value) => {
        settingChanged.current = true;
        setSelectedValues((prev) => prev.filter((prevValue) => prevValue.value !== value.value));
    };
    /**
     * Clear all selected values.
     */
    const clearSelectedValues = () => {
        settingChanged.current = true;
        setSelectedValues([]);
    };
    /**
     * Get filtered options.
     */
    const getFilteredOptionValue = () => __awaiter(void 0, void 0, void 0, function* () {
        let allOptions = yield getOptions();
        return asyncFetch || !filter
            ? allOptions
            : allOptions.filter((opt) => opt.value.toString().includes(filter) || opt.label.includes(filter));
    });
    // Trigger onChange event when selected values change
    useEffect(() => {
        if (settingChanged.current) {
            settingChanged.current = false;
            onChange(selectedValues);
        }
    }, [selectedValues, onChange]);
    // Update options when dependencies change
    useEffect(() => {
        getFilteredOptionValue().then(setOptions);
    }, [filter, option, selectedValues]);
    Modal.setAppElement("#admin-main-wrapper");
    return (jsx("main", { className: "grid-table-main-container", id: "modal-support", children: jsxs("section", { className: "main-container", children: [!popupOpened && (jsxs(Fragment, { children: [jsx(SelectedOptionDisplay, { popupOpend: popupOpened, setPopupOpend: setPopupOpened, selectedValues: selectedValues, clearSelectedValues: clearSelectedValues, removeSelectedValues: removeSelectedValues }), jsx(SearchOptionDisplay, { options: options, filter: filter, setFilter: setFilter, insertSelectedValues: insertSelectedValues, searchStarted: searchStarted })] })), popupOpened && (jsxs(Modal, { isOpen: popupOpened, onRequestClose: () => setPopupOpened(false), contentLabel: "Select Modal", className: "exclusion-modal", children: [jsx("div", { className: "modal-close-btn", onClick: () => setPopupOpened(false), children: jsx("i", { className: "admin-font adminLib-cross" }) }), jsx(SelectedOptionDisplay, { popupOpend: popupOpened, setPopupOpend: setPopupOpened, selectedValues: selectedValues, clearSelectedValues: clearSelectedValues, removeSelectedValues: removeSelectedValues }), jsx(SearchOptionDisplay, { options: options, filter: filter, setFilter: setFilter, insertSelectedValues: insertSelectedValues, searchStarted: searchStarted })] }))] }) }));
};
const MultiCheckboxTable = ({ rows, columns, onChange, setting, proSetting, modules, moduleChange, }) => {
    return (jsxs(Fragment, { children: [proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), jsxs("table", { className: "grid-table", children: [jsx("thead", { children: jsxs("tr", { children: [jsx("th", {}), columns.map((column) => (jsx("th", { children: column.label }, column.key)))] }) }), jsx("tbody", { children: rows.map((row) => (jsxs("tr", { children: [jsx("td", { children: row.label }), columns.map((column) => {
                                    const key = `${column.key}_${row.key}`;
                                    const value = setting[key] || [];
                                    return (jsx("td", { id: "grid-table-cell", className: "grid-table-cell-class", children: row.options ? (jsx(Select, { values: value, onChange: (newValue) => onChange(key, newValue), option: row.options, isMulti: true })) : (jsx("input", { placeholder: "select", type: "checkbox", checked: Array.isArray(setting[column.key]) && setting[column.key].includes(row.key), onChange: (e) => {
                                                if (column.moduleEnabled && !modules.includes(column.moduleEnabled)) {
                                                    moduleChange(column.moduleEnabled);
                                                    return;
                                                }
                                                const selectedKeys = Array.isArray(setting[column.key]) ? setting[column.key] : [];
                                                const updatedSelection = e.target.checked
                                                    ? [...selectedKeys, row.key] // Add key
                                                    : selectedKeys.filter((key) => key !== row.key); // Remove key
                                                onChange(column.key, updatedSelection);
                                            } })) }, `${column.key}_${row.key}`));
                                })] }, row.key))) })] })] }));
};

const MergeComponent = ({ wrapperClass = "", descClass = "", description, onChange, value, proSetting = false, fields = [], }) => {
    const firstRender = useRef(true);
    // Initialize state dynamically based on field names
    const initialState = fields.reduce((acc, field) => {
        acc[field.name] = value[field.name] || "";
        return acc;
    }, {});
    const [data, setData] = useState(initialState);
    const handleOnChange = (key, value) => {
        setData((prev) => (Object.assign(Object.assign({}, prev), { [key]: value })));
    };
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return; // Skip the initial render
        }
        onChange(data);
    }, [data]);
    return (jsxs("main", { className: wrapperClass, children: [jsx("section", { className: "select-input-section merge-components", children: fields.map((field, index) => {
                    const { name, type, options = [], placeholder = "Enter a value" } = field;
                    if (type === "select") {
                        return (jsxs("select", { id: name, value: data[name], onChange: (e) => handleOnChange(name, e.target.value), children: [jsx("option", { value: "", children: "Select" }), options.map((option) => (jsx("option", { value: option.value, children: option.label }, option.value)))] }, name));
                    }
                    else if (type === "number") {
                        return (jsx("input", { type: type, id: name, placeholder: placeholder, value: data[name], min: 1, onChange: (e) => handleOnChange(name, Number(e.target.value)) }, name));
                    }
                    return null; // Return null for unsupported types
                }) }), description && jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" })] }));
};

const ShortCodeTable = (props) => {
    const { wrapperClass, descClass, description, options, optionLabel } = props;
    return (jsxs("main", { className: wrapperClass, children: [jsxs("table", { className: 'shortcode-table', children: [jsx("thead", { children: jsx("tr", { children: optionLabel && optionLabel.length > 0 ? (optionLabel.map((label, index) => (jsx("th", { children: label }, index)))) : (jsx("th", { children: "No Labels" }) // Fallback if no labels exist
                            ) }) }), jsx("tbody", { children: options && options.length > 0 ? (options.map((option, index) => (jsxs("tr", { children: [jsx("td", { children: jsx("code", { children: option.label }) }), jsx("td", { children: option.desc })] }, index)))) : (jsx("tr", { children: jsx("td", { colSpan: 2, children: "No Options Available" }) }) // Fallback if no options exist
                        ) })] }), description && (jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }))] }));
};

// declare const appLocalizer: { apiUrl: string; restUrl: string; nonce: string };
/**
 * Get response from REST API.
 * @param url - API URL
 * @param headers - Request headers
 * @returns API response data or null in case of an error
 */
const getApiResponse = (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, headers = {}) {
    try {
        const result = yield axios.get(url, headers);
        return result.data;
    }
    catch (error) {
        console.error(`❌ Error fetching data from ${url}`, error);
        return null;
    }
});
/**
 * Send response to REST API.
 * @param url - API URL
 * @param data - Data to send
 * @param headers - Request headers
 * @returns API response data or null in case of an error
 */
const sendApiResponse = (appLocalizer_1, url_1, data_1, ...args_1) => __awaiter(void 0, [appLocalizer_1, url_1, data_1, ...args_1], void 0, function* (appLocalizer, url, data, headers = {}) {
    try {
        const config = Object.assign({ headers: Object.assign({ "X-WP-Nonce": appLocalizer.nonce }, headers.headers) }, headers);
        const result = yield axios.post(url, data, config);
        return result.data;
    }
    catch (error) {
        console.error(`❌ Error sending data to ${url}`, error);
        return null;
    }
});
/**
 * Generate API endpoint URL.
 * @param endpoint - API endpoint
 * @param namespace - API namespace (optional)
 * @param rootUrl - API root URL (optional)
 * @returns Complete API URL
 */
const getApiLink = (appLocalizer, endpoint, namespace, rootUrl) => {
    return `${rootUrl || appLocalizer.apiUrl}/${namespace || appLocalizer.restUrl}/${endpoint}`;
};

const SyncNow = ({ appLocalizer, interval, proSetting, proSettingChanged, value, description, apilink, statusApiLink }) => {
    const [syncStarted, setSyncStarted] = useState(false);
    const [syncStatus, setSyncStatus] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const fetchStatusRef = useRef(null);
    useEffect(() => {
        if (syncStarted) {
            fetchStatusRef.current = setInterval(fetchSyncStatus, interval);
        }
        return () => {
            if (fetchStatusRef.current)
                clearInterval(fetchStatusRef.current);
        };
    }, [syncStarted, interval]);
    useEffect(() => {
        fetchSyncStatus();
    }, []);
    const fetchSyncStatus = () => {
        axios({
            method: "post",
            url: getApiLink(appLocalizer, statusApiLink),
            headers: { "X-WP-Nonce": window.appLocalizer.nonce },
        }).then((response) => {
            const syncData = response.data;
            setSyncStarted(syncData.running);
            setSyncStatus(syncData.status);
        });
    };
    const handleSync = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        if (proSettingChanged())
            return;
        setSyncStarted(true);
        setButtonClicked(true);
        axios({
            method: "post",
            url: getApiLink(appLocalizer, apilink),
            headers: { "X-WP-Nonce": window.appLocalizer.nonce },
        }).then((response) => {
            if (response.data) {
                setSyncStarted(false);
                fetchSyncStatus();
            }
        });
    });
    return (jsxs("div", { className: "section-synchronize-now", children: [jsxs("div", { className: "loader-wrapper", children: [jsx("button", { className: "btn-purple btn-effect synchronize-now-button", onClick: handleSync, children: value }), syncStarted && (jsxs("div", { className: "loader", children: [jsx("div", { className: "three-body__dot" }), jsx("div", { className: "three-body__dot" }), jsx("div", { className: "three-body__dot" })] }))] }), syncStarted && jsx("div", { className: "fetch-display-output success", children: "Synchronization started, please wait." }), jsx("p", { className: "settings-metabox-description", dangerouslySetInnerHTML: { __html: description } }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), syncStatus.length > 0 &&
                syncStatus.map((status, index) => (jsxs("div", { className: "details-status-row sync-now", children: [status.action, jsxs("div", { className: "status-meta", children: [jsx("span", { className: "status-icons", children: jsx("i", { className: "admin-font adminLib-icon-yes" }) }), jsxs("span", { children: [status.current, " / ", status.total] })] }), jsx("span", { style: { width: `${(status.current / status.total) * 100}%` }, className: "progress-bar" })] }, index)))] }));
};

const SyncMap = ({ value = [], onChange, proSetting, proSettingChanged, description, syncFieldsMap, }) => {
    const systems = Object.keys(syncFieldsMap);
    const formattedValue = Array.isArray(value) && value.every(Array.isArray) ? value : [];
    const [selectedFields, setSelectedFields] = useState(formattedValue);
    const [availableFields, setAvailableFields] = useState({});
    const [btnAllow, setBtnAllow] = useState(false);
    const settingChanged = useRef(false);
    useEffect(() => {
        const updatedAvailableFields = {};
        systems.forEach((system) => {
            updatedAvailableFields[system] = Object.keys(syncFieldsMap[system].fields).filter((field) => !selectedFields.some(([selectedFieldA, selectedFieldB]) => selectedFieldA === field || selectedFieldB === field));
        });
        setAvailableFields(updatedAvailableFields);
    }, [selectedFields, syncFieldsMap, systems]);
    const changeSelectedFields = (fieldIndex, value, systemIndex) => {
        setSelectedFields((prevFields) => prevFields.map((fieldPair, index) => {
            if (index === fieldIndex) {
                const newPair = [...fieldPair];
                newPair[systemIndex] = value;
                return newPair;
            }
            return fieldPair;
        }));
    };
    const removeSelectedFields = (fieldIndex) => {
        setSelectedFields((prevFields) => prevFields.filter((_, index) => index !== fieldIndex));
        setBtnAllow(false);
    };
    const insertSelectedFields = () => {
        if (availableFields[systems[0]].length && availableFields[systems[1]].length) {
            const systemAField = availableFields[systems[0]].shift();
            const systemBField = availableFields[systems[1]].shift();
            setSelectedFields((prevFields) => [...prevFields, [systemAField, systemBField]]);
            setBtnAllow(availableFields[systems[0]].length === 0 && availableFields[systems[1]].length === 0);
        }
        else {
            alert("Unable to add sync fields");
        }
    };
    useEffect(() => {
        if (settingChanged.current) {
            settingChanged.current = false;
            onChange(selectedFields);
        }
    }, [selectedFields, onChange]);
    return (jsxs("div", { className: "sync-map-container", children: [jsxs("div", { className: "container-wrapper", children: [jsxs("div", { className: "main-wrapper", children: [jsxs("div", { className: "main-wrapper-heading", children: [jsx("span", { children: syncFieldsMap[systems[0]].heading }), jsx("span", { children: syncFieldsMap[systems[1]].heading })] }), jsxs("div", { className: "map-content-wrapper", children: [jsx("select", { disabled: true, children: jsx("option", { value: "email", children: "Email" }) }), jsx("span", { className: "connection-icon", children: "\u21CC" }), jsx("select", { disabled: true, children: jsx("option", { value: "email", children: "Email" }) })] }), selectedFields.map(([systemAField, systemBField], index) => {
                                var _a, _b;
                                return (jsxs("div", { className: "map-content-wrapper", children: [jsxs("select", { value: systemAField, onChange: (e) => {
                                                if (!proSettingChanged()) {
                                                    settingChanged.current = true;
                                                    changeSelectedFields(index, e.target.value, 0);
                                                }
                                            }, children: [jsx("option", { value: systemAField, children: syncFieldsMap[systems[0]].fields[systemAField] }), (_a = availableFields[systems[0]]) === null || _a === void 0 ? void 0 : _a.map((option) => (jsx("option", { value: option, children: syncFieldsMap[systems[0]].fields[option] }, option)))] }), jsx("span", { className: "connection-icon", children: "\u21CC" }), jsxs("select", { value: systemBField, onChange: (e) => {
                                                if (!proSettingChanged()) {
                                                    settingChanged.current = true;
                                                    changeSelectedFields(index, e.target.value, 1);
                                                }
                                            }, children: [jsx("option", { value: systemBField, children: syncFieldsMap[systems[1]].fields[systemBField] }), (_b = availableFields[systems[1]]) === null || _b === void 0 ? void 0 : _b.map((option) => (jsx("option", { value: option, children: syncFieldsMap[systems[1]].fields[option] }, option)))] }), jsxs("button", { className: "btn-purple remove-mapping", onClick: (e) => {
                                                e.preventDefault();
                                                if (!proSettingChanged()) {
                                                    settingChanged.current = true;
                                                    removeSelectedFields(index);
                                                }
                                            }, children: [jsx("span", { className: "text", children: "Clear" }), jsx("span", { className: "icon adminLib-close" })] })] }, index));
                            })] }), jsx("div", { className: "btn-container", children: jsxs("div", { className: "add-mapping-container", children: [jsxs("button", { className: `btn-purple add-mapping ${btnAllow ? "not-allow" : ""}`, onClick: (e) => {
                                        e.preventDefault();
                                        if (!proSettingChanged()) {
                                            settingChanged.current = true;
                                            insertSelectedFields();
                                        }
                                    }, children: [jsx("span", { className: "text", children: "Add" }), jsx("i", { className: "adminLib-vendor-form-add" })] }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" })] }) })] }), description && jsx("p", { className: "settings-metabox-description", dangerouslySetInnerHTML: { __html: description } })] }));
};

const ToggleSetting = ({ description, options, wrapperClass = "", descClass = "", value, onChange, proSetting = false }) => {
    return (jsxs("section", { className: wrapperClass, children: [jsx("div", { className: "toggle-setting-container", children: jsx("ul", { children: options.map((option) => (jsxs("li", { onClick: () => onChange(option.value), children: [jsx("input", { className: "toggle-setting-form-input", type: "radio", id: option.key, name: "approve_vendor", value: option.value, checked: value === option.value, readOnly // Prevents React warning for controlled components
                                : true }), jsx("label", { htmlFor: option.key, children: option.label })] }, option.key))) }) }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), description && (jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }))] }));
};

const ConnectButton = ({ appLocalizer, apiLink, tasks }) => {
    const connectTaskStarted = useRef(false);
    const additionalData = useRef({});
    const taskNumber = useRef(0);
    const [loading, setLoading] = useState(false);
    const [taskSequence, setTaskSequence] = useState([]);
    const [testStatus, setTestStatus] = useState("");
    // Sleep for a given time.
    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };
    const startConnectionTask = () => __awaiter(void 0, void 0, void 0, function* () {
        if (connectTaskStarted.current)
            return;
        connectTaskStarted.current = true;
        setLoading(true);
        setTaskSequence([]);
        yield doSequentialTask();
        connectTaskStarted.current = false;
        setLoading(false);
    });
    const doSequentialTask = () => __awaiter(void 0, void 0, void 0, function* () {
        if (taskNumber.current >= tasks.length) {
            setTestStatus("Test Successful");
            return;
        }
        const currentTask = tasks[taskNumber.current];
        setTaskSequence((tasks) => [
            ...tasks,
            { name: currentTask.action, message: currentTask.message, status: "running" },
        ]);
        yield sleep(2500);
        const response = yield sendApiResponse(appLocalizer, getApiLink(appLocalizer, apiLink), Object.assign({ action: currentTask.action }, additionalData.current));
        let taskStatus = "success";
        if (currentTask.cache === "course_id") {
            // const validCourse = response?.courses?.[1];
            const validCourse = response;
            if (!validCourse) {
                taskStatus = "failed";
            }
            else {
                // additionalData.current["course_id"] = validCourse.id;
                additionalData.current["course_id"] = validCourse;
            }
        }
        else if (currentTask.cache === "user_id") {
            // const validUser = response?.data?.users?.[0];
            const validUser = response;
            if (!validUser) {
                taskStatus = "failed";
            }
            else {
                // additionalData.current["user_id"] = validUser.id;
                additionalData.current["user_id"] = validUser;
            }
            // } else if (!response.success) {
        }
        else if (!response) {
            taskStatus = "failed";
        }
        setTaskSequence((tasks) => {
            const updatedTask = [...tasks];
            updatedTask[updatedTask.length - 1].status = taskStatus;
            return updatedTask;
        });
        if (taskStatus === "failed") {
            setTestStatus("Failed");
            return;
        }
        taskNumber.current++;
        yield doSequentialTask();
    });
    return (jsxs("div", { className: "connection-test-wrapper", children: [jsxs("div", { className: "loader-wrapper", children: [jsx("button", { className: "btn-purple btn-effect", onClick: (e) => {
                            e.preventDefault();
                            startConnectionTask();
                        }, children: "Start test" }), loading && (jsxs("div", { className: "loader", children: [jsx("div", { className: "three-body__dot" }), jsx("div", { className: "three-body__dot" }), jsx("div", { className: "three-body__dot" })] }))] }), jsx("div", { className: "fetch-details-wrapper", children: taskSequence.map((task, index) => (jsxs("div", { className: `${task.status} details-status-row`, children: [task.message, " ", task.status !== "running" && (jsx("i", { className: `admin-font ${task.status === "failed" ? "adminLib-cross" : "adminLib-icon-yes"}` }))] }, index))) }), testStatus && (jsx("div", { className: `fetch-display-output ${testStatus === "Failed" ? "failed" : "success"}`, children: testStatus === "Failed" ? (jsxs("p", { children: [__('Test connection failed. Check further details in', 'catalogx'), " ", ' ', jsx(Link, { className: "errorlog-link", to: '?page=moowoodle#&tab=settings&subtab=log', children: __('error log', 'catalogx') }), "."] })) : (__('Test connection successful', 'catalogx')) }))] }));
};

const BasicInput = ({ wrapperClass, inputLabel, inputClass, id, type = "text", name = "basic-input", value, placeholder, min, max, onChange, onClick, onMouseOver, onMouseOut, onFocus, parameter, proSetting, description, descClass, rangeUnit, disabled = false }) => {
    return (jsxs("div", { className: wrapperClass, children: [inputLabel && jsx("label", { htmlFor: id, children: inputLabel }), jsx("input", Object.assign({ className: ["basic-input", inputClass].join(" "), id: id, type: type, name: name, placeholder: placeholder }, (type !== "file" && onChange ? { value } : {}), (type === "number" || type === "range" ? { min, max } : {}), { onChange: onChange, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut, onFocus: onFocus, disabled: disabled })), parameter && jsx("span", { className: "parameter", dangerouslySetInnerHTML: { __html: parameter } }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), description && jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }), type === "range" && (jsxs("output", { className: descClass, children: [value ? value : 0, rangeUnit] }))] }));
};

const TextArea = ({ wrapperClass, inputClass, id, key, name, value, maxLength, placeholder, rowNumber = 4, colNumber = 50, proSetting, description, descClass, onChange, onClick, onMouseOver, onMouseOut, onFocus, }) => {
    return (jsxs("div", { className: wrapperClass, children: [jsx("textarea", { className: inputClass, id: id, name: name, value: value, maxLength: maxLength, placeholder: placeholder, rows: rowNumber, cols: colNumber, onChange: onChange, onClick: onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut, onFocus: onFocus }, key), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), description && (jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }))] }));
};

const FileInput = (props) => {
    return (jsx(Fragment, { children: jsxs("div", { className: props.wrapperClass, children: [jsxs("div", { className: "file-uploader", children: [jsx("input", { className: props.inputClass, id: props.id, type: props.type || "file", name: props.name || "file-input", value: props.value, placeholder: props.placeholder, onChange: (e) => { var _a; return (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e); }, onClick: (e) => { var _a; return (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e); }, onMouseOver: (e) => { var _a; return (_a = props.onMouseOver) === null || _a === void 0 ? void 0 : _a.call(props, e); }, onMouseOut: (e) => { var _a; return (_a = props.onMouseOut) === null || _a === void 0 ? void 0 : _a.call(props, e); }, onFocus: (e) => { var _a; return (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e); } }), props.proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), jsx("img", { src: props.imageSrc, width: props.imageWidth, height: props.imageHeight, alt: "Uploaded Preview" }), jsx("button", { className: props.buttonClass, type: "button", onClick: (e) => { var _a; return (_a = props.onButtonClick) === null || _a === void 0 ? void 0 : _a.call(props, e); }, children: props.openUploader })] }), props.description && (jsx("p", { className: props.descClass, dangerouslySetInnerHTML: { __html: props.description } }))] }) }));
};

const CalendarInput = (props) => {
    let formattedDate;
    const dates = props.value.split(",");
    if (dates.length === 1 && !dates[0].includes(" - ")) {
        formattedDate = new Date(dates[0].trim());
    }
    else {
        formattedDate = dates.map((date) => {
            if (date.includes(" - ")) {
                const rangeDates = date.split(" - ");
                const startDate = new Date(rangeDates[0].trim());
                const endDate = new Date(rangeDates[1].trim());
                return [startDate, endDate];
            }
            else {
                return new Date(date.trim());
            }
        });
    }
    const [selectedDate, setSelectedDate] = useState(formattedDate || "");
    const handleDateChange = (e) => {
        var _a;
        setSelectedDate(e);
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e);
    };
    return (jsxs("div", { className: props.wrapperClass, children: [jsx(DatePicker, { className: props.inputClass, format: props.format || "YYYY-MM-DD", multiple: props.multiple, range: props.range, value: selectedDate, placeholder: "YYYY-MM-DD", onChange: handleDateChange }), props.proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" })] }));
};

const MultiNumInput = ({ parentWrapperClass, childWrapperClass, options, value = [], inputWrapperClass, innerInputWrapperClass, inputLabelClass, inputClass, idPrefix = "multi-num", keyName, proSetting, description, descClass, onChange, }) => {
    return (jsxs("div", { className: parentWrapperClass, children: [jsx("div", { className: childWrapperClass, children: options.map((option, index) => {
                    var _a, _b;
                    const selectedValue = (_b = (_a = value.find((val) => val.key === option.key)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
                    return (jsx("div", { className: inputWrapperClass, children: jsxs("div", { className: innerInputWrapperClass, children: [jsx("div", { className: inputLabelClass, children: option.label }), jsx("input", { id: `${idPrefix}-${option.key}`, className: inputClass, type: option.type, name: option.name, value: selectedValue, onChange: (e) => onChange === null || onChange === void 0 ? void 0 : onChange(e, keyName, option.key, index) }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" })] }) }, option.key));
                }) }), description && (jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }))] }));
};

const RadioInput = (props) => {
    return (jsxs("div", { className: props.wrapperClass, children: [props.options.map((option) => {
                const checked = props.value === option.value;
                return (jsxs("div", { className: `${props.inputWrapperClass} ${checked ? props.activeClass : ""}`, children: [jsx("input", { className: props.inputClass, id: `${props.idPrefix}-${option.key}`, type: "radio", name: option.name, checked: checked, value: option.value, onChange: (e) => { var _a; return (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e); } }), jsxs("label", { htmlFor: `${props.idPrefix}-${option.key}`, className: props.type === "radio-select" ? props.radiSelectLabelClass : "", children: [option.label, props.type === "radio-color" && (jsx("p", { className: "color-palette", children: Array.isArray(option.color) &&
                                        option.color.map((color, index) => (jsx("div", { style: { backgroundColor: color }, children: " \u00A0 " }, index))) })), props.type === "radio-select" && typeof option.color === "string" && (jsxs(Fragment, { children: [jsx("img", { src: option.color, alt: option.label, className: props.labelImgClass }), jsx("div", { className: props.labelOverlayClass, children: props.labelOverlayText })] }))] }), props.proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" })] }, option.key));
            }), props.description && (jsx("p", { className: props.descClass, dangerouslySetInnerHTML: { __html: props.description } }))] }));
};

const MultiCheckBox = (props) => {
    return (jsxs("div", { className: props.wrapperClass, children: [props.selectDeselect && (jsx("button", { className: props.selectDeselectClass, onClick: (e) => {
                    var _a;
                    e.preventDefault();
                    (_a = props.onMultiSelectDeselectChange) === null || _a === void 0 ? void 0 : _a.call(props, e);
                }, children: props.selectDeselectValue })), jsx("div", { className: "wrapper", children: props.options.map((option) => {
                    var _a, _b;
                    const checked = (_b = (_a = props.value) === null || _a === void 0 ? void 0 : _a.includes(option.value)) !== null && _b !== void 0 ? _b : false;
                    return (jsxs("div", { className: props.inputWrapperClass, children: [props.rightContent && (jsx("p", { className: props.rightContentClass, dangerouslySetInnerHTML: { __html: option.label } })), jsxs("div", { className: props.inputInnerWrapperClass, "data-tour": props.tour, children: [jsx("input", { className: props.inputClass, id: `${props.idPrefix}-${option.key}`, type: props.type || "checkbox", name: option.name || "basic-input", value: option.value, checked: checked, onChange: (e) => {
                                            var _a, _b;
                                            if (option.proSetting) {
                                                (_a = props.proChanged) === null || _a === void 0 ? void 0 : _a.call(props);
                                            }
                                            else {
                                                (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, e);
                                            }
                                        } }), jsx("label", { htmlFor: `${props.idPrefix}-${option.key}` })] }), props.proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), !props.rightContent && (jsx("p", { className: props.rightContentClass, dangerouslySetInnerHTML: { __html: option.label } })), option.proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), option.hints && (jsx("span", { className: props.hintOuterClass, dangerouslySetInnerHTML: { __html: option.hints } }))] }, option.key));
                }) }), props.description && (jsx("p", { className: props.descClass, dangerouslySetInnerHTML: { __html: props.description } }))] }));
};

const WpEditor = ({ apiKey, value, onEditorChange }) => {
    return (jsx(Fragment, { children: jsx(Editor, { apiKey: apiKey, value: value, init: {
                height: 200,
                plugins: "media",
            }, onEditorChange: (content) => onEditorChange(content) }) }));
};

const AutoGeneratedDefaultInput = ({ value, proSetting, onChange, description }) => {
    const [copied, setCopied] = useState(false);
    const generateRandomKey = (length = 8) => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            key += characters.charAt(randomIndex);
        }
        return key;
    };
    const generateSSOKey = (e) => {
        e.preventDefault();
        const key = generateRandomKey(8);
        onChange(key);
    };
    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
        });
        setTimeout(() => {
            setCopied(false);
        }, 10000);
    };
    const handleClear = (e) => {
        e.preventDefault();
        onChange("");
    };
    return (jsxs(Fragment, { children: [jsxs("div", { className: "sso-key-section", children: [jsxs("div", { className: "input-section", children: [jsx("input", { type: "text", value: value, onChange: (e) => onChange(e.target.value) }), value !== "" && (jsx("button", { onClick: handleClear, className: "clear-btn", children: jsx("i", { className: "adminLib-delete" }) }))] }), value !== "" ? (jsx("button", { className: "copy-btn", onClick: handleCopy, children: jsxs("span", { className: "svgIcon", children: [jsx("i", { className: "adminLib-vendor-form-copy" }), jsxs("span", { className: !copied ? 'tooltip tool-clip' : 'tooltip', children: [!copied ? '' : jsx("i", { className: "adminLib-success-notification" }), !copied ? 'Copy to clipboard' : 'Copied'] })] }) })) : (jsxs("button", { className: "btn-purple generate-btn", onClick: generateSSOKey, children: [jsx("i", { className: "adminLib-star_icon" }), jsx("span", { className: "text", children: __("Generate", "catalogx") })] })), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" })] }), description && (jsx("p", { className: "settings-metabox-description", dangerouslySetInnerHTML: { __html: description } }))] }));
};

const Log = ({ fetchApiLink, downloadApiLink, downloadFileName, appLocalizer }) => {
    const [logData, setLogData] = useState([]);
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        axios
            .post(getApiLink(appLocalizer, fetchApiLink), { logcount: 100 }, { headers: { "X-WP-Nonce": appLocalizer === null || appLocalizer === void 0 ? void 0 : appLocalizer.nonce } })
            .then((response) => {
            setLogData(response.data);
        });
    }, [fetchApiLink]);
    const handleDownloadLog = (event) => {
        event.preventDefault();
        axios({
            url: getApiLink(appLocalizer, downloadApiLink),
            method: "POST",
            headers: { "X-WP-Nonce": appLocalizer.nonce },
            data: { file: downloadFileName },
            responseType: "blob",
        })
            .then((response) => {
            const blob = new Blob([response.data], { type: response.headers["content-type"] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", downloadFileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
            .catch((error) => console.error("Error downloading file:", error));
    };
    const handleClearLog = (event) => {
        event.preventDefault();
        axios
            .post(getApiLink(appLocalizer, fetchApiLink), { logcount: 100, clear: true }, { headers: { "X-WP-Nonce": appLocalizer.nonce } })
            .then(() => {
            setLogData([]);
        });
    };
    const handleCopyToClipboard = (event) => {
        event.preventDefault();
        const logText = logData
            .map((log) => {
            const regex = /^([^:]+:[^:]+:[^:]+):(.*)$/;
            const match = log.match(regex);
            return match ? `${match[1].trim()} : ${match[2].trim()}` : log;
        })
            .join("\n");
        navigator.clipboard
            .writeText(logText)
            .then(() => setCopied(true))
            .catch((error) => {
            setCopied(false);
            console.error("Error copying logs to clipboard:", error);
        });
        setTimeout(() => setCopied(false), 10000);
    };
    return (jsxs("div", { className: "section-log-container", children: [jsxs("div", { className: "button-section", children: [jsx("button", { onClick: handleDownloadLog, className: "btn-purple download-btn", children: "Download" }), jsxs("button", { className: "btn-purple button-clear", onClick: handleClearLog, children: [jsx("span", { className: "text", children: "Clear" }), jsx("i", { className: "adminLib-close" })] })] }), jsxs("div", { className: "log-container-wrapper", children: [jsxs("div", { className: "wrapper-header", children: [jsxs("p", { className: "log-viewer-text", children: [appLocalizer.tab_name, " - log viewer"] }), jsx("div", { className: "click-to-copy", children: jsxs("button", { className: "copy-btn", onClick: handleCopyToClipboard, children: [jsx("i", { className: "adminLib-vendor-form-copy" }), jsxs("span", { className: !copied ? "tooltip tool-clip" : "tooltip", children: [!copied ? "Copy to clipboard" : jsx("i", { className: "adminLib-success-notification" }), !copied ? "" : "Copied"] })] }) })] }), jsx("div", { className: "wrapper-body", children: logData.map((log, index) => {
                            const regex = /^([^:]+:[^:]+:[^:]+):(.*)$/;
                            const match = log.match(regex);
                            if (match) {
                                return (jsxs("div", { className: "log-row", children: [jsxs("span", { className: "log-creation-date", children: [match[1].trim(), " :"] }), jsx("span", { className: "log-details", children: match[2].trim() })] }, index));
                            }
                            return null;
                        }) })] })] }));
};

const CheckboxCustomImg = ({ value = [], onChange, syncDirections, description, proSetting, }) => {
    const handleCheckboxChange = (directionValue, isChecked) => {
        let updatedValue = [...value];
        updatedValue = updatedValue.filter((element) => element !== directionValue);
        if (isChecked) {
            updatedValue.push(directionValue);
        }
        onChange(updatedValue);
    };
    return (jsxs(Fragment, { children: [jsxs("div", { className: "custom-sync-section", children: [syncDirections.map((direction, index) => (jsxs("div", { className: "sync-direction-items", children: [jsx("input", { type: "checkbox", checked: value.includes(direction.value), onChange: (e) => handleCheckboxChange(direction.value, e.target.checked) }), jsxs("div", { className: "sync-meta-wrapper", children: [jsx("img", { src: direction.img1, alt: "" }), jsx("i", { className: "admin-font adminLib-arrow-right" }), jsx("img", { src: direction.img2, alt: "" })] }), jsx("p", { className: "sync-label", children: direction.label })] }, index))), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" })] }), description && (jsx("p", { className: "settings-metabox-description", dangerouslySetInnerHTML: { __html: description } }))] }));
};

const InputMailchimpList = ({ appLocalizer, setting, updateSetting, mailchimpKey, optionKey, settingChanged, apiLink, proSettingChanged, onChange, selectKey, value }) => {
    // State variables
    // const { setting, updateSetting } = useSetting();
    const [selectOption, setSelectOption] = useState(setting[optionKey] || []);
    const [loading, setLoading] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [mailchimpErrorMessage, setMailchimpErrorMessage] = useState("");
    const updateSelectOption = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!setting[mailchimpKey]) {
            setMailchimpErrorMessage("Kindly use a proper MailChimp key.");
        }
        else {
            setLoading(true);
            setMailchimpErrorMessage("");
            try {
                const options = (_a = (yield getApiResponse(getApiLink(appLocalizer, apiLink)))) !== null && _a !== void 0 ? _a : []; // ✅ Ensure it's always an array
                settingChanged.current = true;
                updateSetting(optionKey, options);
                setSelectOption(options);
                setShowOption(true);
            }
            catch (error) {
                console.error("Error fetching Mailchimp list:", error);
                setMailchimpErrorMessage("Failed to fetch MailChimp list.");
            }
            finally {
                setLoading(false);
            }
        }
    });
    return (jsxs("div", { className: "connect-main-wrapper", children: [jsx(BasicInput, { wrapperClass: "setting-form-input", descClass: "settings-metabox-description", type: "text", value: setting[mailchimpKey], proSetting: false, onChange: (e) => {
                    if (!proSettingChanged()) {
                        onChange(e, mailchimpKey);
                    }
                } }), jsxs("div", { className: "loader-wrapper", children: [jsx("button", { className: "btn-purple btn-effect", onClick: (e) => {
                            e.preventDefault();
                            if (!proSettingChanged()) {
                                updateSelectOption();
                            }
                        }, children: "Fetch List" }), loading && (jsxs("div", { className: "loader", children: [jsx("div", { className: "three-body__dot" }), jsx("div", { className: "three-body__dot" }), jsx("div", { className: "three-body__dot" })] }))] }), (selectOption.length > 0 || showOption) && (jsx(SelectInput, { onChange: (e) => {
                    if (!proSettingChanged() && e && "value" in e) {
                        onChange({ target: { value: e.value } }, selectKey);
                    }
                }, options: selectOption, value: value }))] }));
};

const ModulePopup = ({ moduleName, settings, plugin, moduleMessage, moduleButton, pluginDescription, SettingMessage, pluginMessage, pluginButton, SettingDescription, pluginUrl, modulePageUrl }) => {
    return (jsx(DialogContent, { children: jsx(DialogContentText, { children: jsx("div", { className: "admin-module-dialog-content", children: jsx("div", { className: "admin-image-overlay", children: jsxs("div", { className: "admin-overlay-content", children: [jsx("div", { className: "admin-banner-content", children: moduleName && (jsxs(Fragment, { children: [jsx("h2", { children: moduleMessage }), jsx("a", { className: "admin-go-pro-btn", href: modulePageUrl, children: moduleButton })] })) }), settings && (jsxs(Fragment, { children: [jsx("h2", { children: SettingMessage }), jsx("p", { id: "description", children: SettingDescription })] })), plugin && (jsxs("div", { children: [jsx("h2", { children: pluginMessage }), jsx("p", { id: "description", children: pluginDescription }), jsx("a", { className: "admin-go-pro-btn", target: "_blank", href: pluginUrl, children: pluginButton })] }))] }) }) }) }) }));
};

const AnyReactComponent = ({ text }) => (jsx("img", { src: text, width: "38", height: "50", alt: "marker" }));
const AutoComplete = ({ map, mapApi, addPlace, placeholder }) => {
    const [autoComplete, setAutoComplete] = useState(null);
    const inputRef = useRef(null);
    useEffect(() => {
        if ((mapApi === null || mapApi === void 0 ? void 0 : mapApi.places) && inputRef.current) {
            const options = { types: ["address"] };
            const autoCompleteInstance = new mapApi.places.Autocomplete(inputRef.current, options);
            autoCompleteInstance.addListener("place_changed", handleOnPlaceChanged);
            autoCompleteInstance.bindTo("bounds", map);
            setAutoComplete(autoCompleteInstance);
        }
    }, [mapApi, map]);
    const handleOnPlaceChanged = () => {
        if (!autoComplete)
            return;
        const place = autoComplete.getPlace();
        if (!place.geometry)
            return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        }
        else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        addPlace(place);
        inputRef.current.blur();
    };
    const clearSearchBox = () => {
        if (inputRef.current)
            inputRef.current.value = "";
    };
    return (jsx("input", { className: "search-input", ref: inputRef, type: "text", onFocus: clearSearchBox, placeholder: placeholder }));
};
const GoogleMap = (props) => {
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState(props.center);
    const [draggable, setDraggable] = useState(true);
    const [address, setAddress] = useState();
    const [position, setPosition] = useState({
        lat: "",
        lng: "",
    });
    const [mapApi, setMapApi] = useState(null);
    const [mapApiLoaded, setMapApiLoaded] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            });
        }
    }, []);
    const handleOnChange = ({ center, zoom }) => {
        setZoom(zoom);
        setCenter(center);
    };
    const handleOnClick = (value) => {
        setPosition({ lat: value.lat, lng: value.lng });
    };
    const onMarkerInteraction = (_, __, mouse) => {
        setDraggable(false);
        setPosition({ lat: mouse.lat, lng: mouse.lng });
    };
    const onMarkerInteractionMouseUp = () => {
        setDraggable(true);
        generateAddress();
    };
    const apiHasLoaded = (map, maps) => {
        setMapApiLoaded(true);
        setMapInstance(map);
        setMapApi(maps);
        generateAddress();
    };
    const addPlace = (place) => {
        if (!place.geometry)
            return;
        setPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        });
        generateAddress();
    };
    const generateAddress = () => {
        if (!mapApi || !position.lat || !position.lng)
            return;
        const geocoder = new mapApi.Geocoder();
        geocoder.geocode({ location: { lat: +position.lat, lng: +position.lng } }, (results, status) => {
            if (status === "OK" && (results === null || results === void 0 ? void 0 : results[0])) {
                setZoom(12);
                setAddress(results[0].formatted_address);
            }
            else {
                window.alert("Geocoder failed due to: " + status);
            }
        });
    };
    return (jsxs("div", { className: props.wrapperClass, children: [mapApiLoaded && mapInstance && (jsx(AutoComplete, { map: mapInstance, mapApi: mapApi, addPlace: addPlace, placeholder: props.placeholder })), jsx("div", { style: { height: "50vh", width: "50%" }, children: jsx(GoogleMapReact, { zoom: zoom, center: center, draggable: draggable, onClick: handleOnClick, onChange: handleOnChange, onChildMouseMove: onMarkerInteraction, onChildMouseDown: onMarkerInteraction, onChildMouseUp: onMarkerInteractionMouseUp, bootstrapURLKeys: {
                        key: 'appLocalizer.google_api', // Ensure `appLocalizer` is properly typed
                        libraries: ["places", "geometry"],
                    }, yesIWantToUseGoogleMapApiInternals: true, onGoogleApiLoaded: ({ map, maps }) => apiHasLoaded(map, maps), children: jsx(AnyReactComponent, { text: '{appLocalizer.marker_icon}' }) }) })] }));
};

const LazyMapsInput = lazy(() => Promise.resolve().then(function () { return MapsInput$1; }));
const PENALTY$1 = 10;
const COOLDOWN$1 = 1;
const AdminForm = ({ setting, updateSetting, modules, appLocalizer, settings, vendorId, announcementId, knowladgebaseId, ProPopup, modulePopupFields }) => {
    const { modal, submitUrl, id } = settings;
    const settingChanged = useRef(false);
    const counter = useRef(0);
    const counterId = useRef(0);
    const [successMsg, setSuccessMsg] = useState("");
    const [modelOpen, setModelOpen] = useState(false);
    // const { setting, updateSetting } = useSetting();
    const [modelModuleOpen, setModelModuleOpen] = useState(false);
    const [countryState, setCountryState] = useState([]);
    const [modulePopupData, setModulePopupData] = useState({
        moduleName: '',
        settings: '',
        plugin: '',
    });
    // const { modules } = useModules();
    useEffect(() => {
        if (settingChanged.current) {
            settingChanged.current = false;
            // Set counter by penalty
            counter.current = PENALTY$1;
            // Clear previous counter
            if (counterId.current) {
                clearInterval(counterId.current);
            }
            // Create new interval
            const intervalId = setInterval(() => {
                counter.current -= COOLDOWN$1;
                // Cooldown complete, time for DB request
                if (counter.current < 0) {
                    sendApiResponse(appLocalizer, getApiLink(appLocalizer, submitUrl), {
                        setting,
                        settingName: id,
                        vendor_id: vendorId || "",
                        announcement_id: announcementId || "",
                        knowladgebase_id: knowladgebaseId || "",
                    }).then((response) => {
                        // Set success message for 2 seconds
                        setSuccessMsg(response.error);
                        setTimeout(() => setSuccessMsg(""), 2000);
                        // Redirect if the response has a redirect link
                        if (response.redirect_link) {
                            window.location.href = response.redirect_link;
                        }
                    });
                    clearInterval(intervalId);
                    counterId.current = 0;
                }
            }, 50);
            // Store the interval ID
            counterId.current = intervalId;
        }
    }, [setting]);
    const isProSetting = (proDependent) => {
        return proDependent && !(appLocalizer === null || appLocalizer === void 0 ? void 0 : appLocalizer.khali_dabba);
    };
    const proSettingChanged = (isProSetting) => {
        if (isProSetting && !(appLocalizer === null || appLocalizer === void 0 ? void 0 : appLocalizer.khali_dabba)) {
            setModelOpen(true);
            return true;
        }
        return false;
    };
    const moduleEnabledChanged = (moduleEnabled, dependentSetting = "", dependentPlugin = false) => {
        let popupData = {
            moduleName: "",
            settings: "",
            plugin: "",
        };
        if (moduleEnabled && !modules.includes(moduleEnabled)) {
            popupData.moduleName = moduleEnabled;
        }
        if (dependentSetting &&
            Array.isArray(setting[dependentSetting]) &&
            setting[dependentSetting].length === 0) {
            popupData.settings = dependentSetting;
        }
        if (dependentPlugin) {
            popupData.plugin = "notifima";
        }
        if (popupData.moduleName || popupData.settings || popupData.plugin) {
            setModulePopupData(popupData);
            setModelModuleOpen(true);
            return true;
        }
        return false;
    };
    const handleChange = (event, key, type = 'single', fromType = 'simple', arrayValue = []) => {
        settingChanged.current = true;
        if (type === 'single') {
            if (fromType === 'simple') {
                updateSetting(key, event.target.value);
            }
            else if (fromType === 'calender') {
                let formattedDate;
                if (Array.isArray(event)) {
                    // Check if all elements are date ranges (start and end)
                    if (event.every((item) => Array.isArray(item) && item.length === 2)) {
                        formattedDate = event
                            .map((range) => {
                            var _a, _b;
                            const startDate = (_a = range[0]) === null || _a === void 0 ? void 0 : _a.toString();
                            const endDate = (_b = range[1]) === null || _b === void 0 ? void 0 : _b.toString();
                            return `${startDate} - ${endDate}`;
                        })
                            .join(', ');
                    }
                    else {
                        formattedDate = event.map((item) => item.toString()).join(','); // Multiple dates format
                    }
                }
                else {
                    formattedDate = event.toString();
                }
                updateSetting(key, formattedDate);
            }
            else if (fromType === 'select') {
                updateSetting(key, arrayValue[event.index]);
            }
            else if (fromType === 'multi-select' || fromType === 'wpeditor') {
                updateSetting(key, event);
            }
            else if (fromType === 'country') {
                updateSetting(key, arrayValue[event.index]);
                const countryData = JSON.parse(appLocalizer.countries.replace(/&quot;/g, '"'))[event.value];
                const countryListArray = Object.keys(countryData).map((key_country) => ({
                    label: key_country,
                    value: countryData[key_country],
                }));
                setCountryState(countryListArray);
            }
        }
        else {
            let prevData = setting[key] || [];
            if (!Array.isArray(prevData)) {
                prevData = [String(prevData)];
            }
            prevData = prevData.filter((data) => data !== event.target.value);
            if (event.target.checked) {
                prevData.push(event.target.value);
            }
            updateSetting(key, prevData);
        }
    };
    const handleMultiNumberChange = (e, key, optionKey, index) => {
        if (!key || !optionKey || index === undefined) {
            console.error("Missing required parameters in handleMultiNumberChange");
            return;
        }
        settingChanged.current = true;
        const multipleOptions = setting[key] || {};
        multipleOptions[index] = {
            key: optionKey,
            value: e.target.value,
        };
        updateSetting(key, multipleOptions);
    };
    const handlMultiSelectDeselectChange = (key, options, type = '') => {
        settingChanged.current = true;
        if (Array.isArray(setting[key]) && setting[key].length > 0) {
            updateSetting(key, []);
        }
        else {
            const newValue = options
                .filter((option) => type === 'multi-select' || !isProSetting(option.proSetting))
                .map(({ value }) => value);
            updateSetting(key, newValue);
        }
    };
    const runUploader = (key) => {
        settingChanged.current = true;
        // Create a new media frame
        const frame = wp.media({
            title: "Select or Upload Media Of Your Chosen Persuasion",
            button: {
                text: "Use this media",
            },
            multiple: false, // Set to true to allow multiple files to be selected
        });
        frame.on("select", function () {
            // Get media attachment details from the frame state
            const attachment = frame.state().get("selection").first().toJSON();
            updateSetting(key, attachment.url);
        });
        // Finally, open the modal on click
        frame.open();
    };
    const onSelectChange = (newValue, actionMeta) => {
        settingChanged.current = true;
        if (Array.isArray(newValue)) {
            // Multi-select case
            const values = newValue.map((val) => val.value);
            updateSetting(actionMeta.name, values);
        }
        else if (newValue !== null && "value" in newValue) {
            // Single-select case (ensures 'newValue' is an object with 'value')
            updateSetting(actionMeta.name, newValue.value);
        }
        else {
            console.log("Selection cleared.");
        }
    };
    const isContain = (key, value = null) => {
        const settingValue = setting[key];
        // If settingValue is an array
        if (Array.isArray(settingValue)) {
            // If value is null and settingValue has elements, return true
            if (value === null && settingValue.length > 0) {
                return true;
            }
            return settingValue.includes(value);
        }
        // If settingValue is not an array
        if (value === null && Boolean(settingValue)) {
            return true;
        }
        return settingValue === value;
    };
    const shouldRender = (dependent) => {
        if (dependent.set === true && !isContain(dependent.key)) {
            return false;
        }
        if (dependent.set === false && isContain(dependent.key)) {
            return false;
        }
        if (dependent.value !== undefined && !isContain(dependent.key, dependent.value)) {
            return false;
        }
        return true;
    };
    const handleSubmit = (e) => {
        console.log("hiii");
    };
    const renderForm = () => {
        return modal.map((inputField, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
            let value = (_a = setting[inputField.key]) !== null && _a !== void 0 ? _a : "";
            let input = null;
            // Filter dependent conditions
            if (Array.isArray(inputField.dependent)) {
                for (let dependent of inputField.dependent) {
                    if (!shouldRender(dependent)) {
                        return null;
                    }
                }
            }
            else if (inputField.dependent) {
                if (!shouldRender(inputField.dependent)) {
                    return null;
                }
            }
            // Set input field based on type
            switch (inputField.type) {
                case "text":
                case "url":
                case "password":
                case "email":
                case "number":
                case "range":
                    input = (jsx(BasicInput, { wrapperClass: "setting-form-input", descClass: "settings-metabox-description", description: inputField.desc, id: inputField.id, name: inputField.name, type: inputField.type, placeholder: inputField.placeholder, inputLabel: inputField.inputLabel, rangeUnit: inputField.rangeUnit, min: (_b = inputField.min) !== null && _b !== void 0 ? _b : 0, max: (_c = inputField.max) !== null && _c !== void 0 ? _c : 50, value: value, proSetting: isProSetting((_d = inputField.proSetting) !== null && _d !== void 0 ? _d : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        }, parameter: inputField.parameter }, inputField.key));
                    break;
                case "textarea":
                    input = (jsx(TextArea, { wrapperClass: "setting-from-textarea", inputClass: inputField.class || "form-input", descClass: "settings-metabox-description", description: inputField.desc, id: inputField.id, name: inputField.name, placeholder: inputField.placeholder, rowNumber: inputField.rowNumber, colNumber: inputField.colNumber, value: value, proSetting: isProSetting((_e = inputField.proSetting) !== null && _e !== void 0 ? _e : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        } }, inputField.key));
                    break;
                case "normalfile":
                    input = (jsx(BasicInput, { inputClass: "setting-form-input", type: "file", name: inputField.name, value: value, proSetting: isProSetting((_f = inputField.proSetting) !== null && _f !== void 0 ? _f : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        } }, inputField.key));
                    break;
                case "file":
                    input = (jsx(FileInput, { wrapperClass: "setting-file-uploader-class", descClass: "settings-metabox-description", description: inputField.desc, inputClass: `${inputField.key} form-input`, imageSrc: value !== undefined ? String(value) : appLocalizer === null || appLocalizer === void 0 ? void 0 : appLocalizer.default_logo, imageWidth: inputField.width, imageHeight: inputField.height, buttonClass: "btn btn-purple", openUploader: appLocalizer === null || appLocalizer === void 0 ? void 0 : appLocalizer.open_uploader, type: "hidden", name: inputField.name, value: value !== undefined ? String(value) : "", proSetting: isProSetting((_g = inputField.proSetting) !== null && _g !== void 0 ? _g : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        }, onButtonClick: (e) => {
                            runUploader(inputField.key);
                        } }, inputField.key));
                    break;
                case "color":
                    input = (jsx(BasicInput, { wrapperClass: "settings-color-picker-parent-class", inputClass: "setting-color-picker", descClass: "settings-metabox-description", description: inputField.desc, id: inputField.id, name: inputField.name, type: inputField.type, value: value || "#000000", proSetting: isProSetting((_h = inputField.proSetting) !== null && _h !== void 0 ? _h : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        } }, inputField.key));
                    break;
                case "calender":
                    input = (jsx(CalendarInput, { wrapperClass: "settings-calender", inputClass: "teal", multiple: inputField.multiple || false, range: inputField.range || false, value: setting[inputField.key] || "", proSetting: isProSetting((_j = inputField.proSetting) !== null && _j !== void 0 ? _j : false), onChange: (e) => {
                            var _a, _b, _c;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key, "single", ["calender", "select", "multi-select", "wpeditor", "country"].includes((_c = inputField.type) !== null && _c !== void 0 ? _c : "")
                                    ? inputField.type
                                    : "simple" // Default for unsupported types
                                );
                            }
                        } }));
                    break;
                case "map":
                    input = (jsx(Suspense, { fallback: jsx("div", { children: "Loading map..." }), children: jsx(LazyMapsInput, { wrapperClass: "settings-basic-input-class", descClass: "settings-metabox-description", description: inputField.desc, containerId: "store-maps", containerClass: "store-maps gmap", proSetting: isProSetting(inputField.proSetting), Lat: inputField.Lat, Lng: inputField.Lng }) }));
                    break;
                case "google-map":
                    input = (jsx(GoogleMap, { wrapperClass: "settings-basic-input-class", placeholder: "Enter location", center: inputField.center }));
                    break;
                case "button":
                    input = (jsxs("div", { className: "form-button-group", children: [jsx("div", { className: "setting-section-divider", children: "\u00A0" }), jsx("label", { className: "settings-form-label" }), jsx("div", { className: "settings-input-content", children: jsx(BasicInput, { wrapperClass: "settings-basic-input-class", inputClass: "btn default-btn", descClass: "settings-metabox-description", description: inputField.desc, type: inputField.type, placeholder: inputField.placeholder, proSetting: isProSetting((_k = inputField.proSetting) !== null && _k !== void 0 ? _k : false) }) })] }));
                    break;
                case "multi-number":
                    input = (jsx(MultiNumInput, { parentWrapperClass: "settings-basic-input-class", childWrapperClass: "settings-basic-child-wrap", inputWrapperClass: "settings-basic-input-child-class", innerInputWrapperClass: "setting-form-input", inputLabelClass: "setting-form-input-label", idPrefix: "setting-integer-input", keyName: inputField.key, inputClass: inputField.class, value: setting[inputField.key], options: Array.isArray(inputField.options) ? inputField.options : inputField.options ? [] : [], onChange: handleMultiNumberChange, proSetting: isProSetting((_l = inputField.proSetting) !== null && _l !== void 0 ? _l : false) }));
                    break;
                case "radio":
                    input = (jsx(RadioInput, { wrapperClass: "settings-form-group-radio", inputWrapperClass: "radio-input-label-wrap", inputClass: "setting-form-input", descClass: "settings-metabox-description", activeClass: "radio-select-active", description: inputField.desc, value: typeof value === "number" ? value.toString() : value, name: inputField.name, keyName: inputField.key, options: Array.isArray(value) ? value : [], proSetting: isProSetting((_m = inputField.proSetting) !== null && _m !== void 0 ? _m : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        } }));
                    break;
                // for radio select button with image hover
                case "radio-select":
                    input = (jsx(RadioInput, { wrapperClass: "form-group-radio-select", inputWrapperClass: "radioselect-class", inputClass: "setting-form-input", radiSelectLabelClass: "radio-select-under-label-class", labelImgClass: "section-img-fluid", labelOverlayClass: "radioselect-overlay-text", labelOverlayText: "Select your Store", idPrefix: "radio-select-under", descClass: "settings-metabox-description", activeClass: "radio-select-active", description: inputField.desc, type: "radio-select", value: typeof value === "number" ? value.toString() : value, name: inputField.name, keyName: inputField.key, options: Array.isArray(value) ? value : [], proSetting: isProSetting((_o = inputField.proSetting) !== null && _o !== void 0 ? _o : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        } }));
                    break;
                // for radio color input 
                case "radio-color":
                    input = (jsx(RadioInput, { wrapperClass: "form-group-radio-color", inputWrapperClass: "settings-radio-color ", inputClass: "setting-form-input", idPrefix: "radio-color-under", activeClass: "radio-color-active", descClass: "settings-metabox-description", description: inputField.desc, type: "radio-color", value: typeof value === "number" ? value.toString() : value, name: inputField.name, keyName: inputField.key, options: Array.isArray(value) ? value : [], proSetting: isProSetting((_p = inputField.proSetting) !== null && _p !== void 0 ? _p : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key);
                            }
                        } }));
                    break;
                // Normal select box
                case "select":
                    input = (jsx(SelectInput, { wrapperClass: "form-select-field-wrapper", descClass: "settings-metabox-description", name: inputField.name, description: inputField.desc, inputClass: inputField.key, options: Array.isArray(value) ? value : [], value: typeof value === "number" ? value.toString() : value, proSetting: isProSetting((_q = inputField.proSetting) !== null && _q !== void 0 ? _q : false), onChange: onSelectChange }));
                    break;
                // for multiple select box with select/deselect button
                case "multi-select":
                    input = (jsx(SelectInput, { name: inputField.name, wrapperClass: "settings-from-multi-select", descClass: "settings-metabox-description", selectDeselectClass: "btn-purple select-deselect-trigger", selectDeselect: inputField.select_deselect, selectDeselectValue: "Select / Deselect All", description: inputField.desc, inputClass: inputField.key, options: Array.isArray(value) ? value : [], type: "multi-select", value: typeof value === "number" ? value.toString() : value, proSetting: isProSetting((_r = inputField.proSetting) !== null && _r !== void 0 ? _r : false), onChange: onSelectChange, onMultiSelectDeselectChange: (e) => handlMultiSelectDeselectChange(inputField.key, Array.isArray(inputField.options) ? inputField.options : [], // Ensure options is always an array
                        "multi-select") }));
                    break;
                case "country":
                    input = (jsx(SelectInput, { name: inputField.name, wrapperClass: "country-choice-class", descClass: "settings-metabox-description", description: inputField.desc, inputClass: inputField.key, options: Array.isArray(value) ? value : [], value: typeof value === "number" ? value.toString() : value, proSetting: isProSetting((_s = inputField.proSetting) !== null && _s !== void 0 ? _s : false), onChange: (selectedOption) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(selectedOption, inputField.key, "single", "country", Array.isArray(selectedOption) ? selectedOption : [selectedOption]);
                            }
                        } }));
                    break;
                case "state":
                    input = (jsx(SelectInput, { name: inputField.name, wrapperClass: "state-choice-class", descClass: "settings-metabox-description", description: inputField.desc, inputClass: inputField.key, options: countryState, value: typeof value === "number" ? value.toString() : value, proSetting: isProSetting((_t = inputField.proSetting) !== null && _t !== void 0 ? _t : false), onChange: (selectedOption) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(selectedOption, inputField.key, "single", "select", Array.isArray(selectedOption) ? selectedOption : [selectedOption]);
                            }
                        } }));
                    break;
                // For single or multiple checkbox (free / pro or some free some pro)
                case "checkbox":
                    input = (jsx(MultiCheckBox, { wrapperClass: "checkbox-list-side-by-side", descClass: "settings-metabox-description", description: inputField.desc, selectDeselectClass: "btn-purple select-deselect-trigger", inputWrapperClass: "toggle-checkbox-header", inputInnerWrapperClass: inputField.look == 'toggle' ? "toggle-checkbox" : "default-checkbox", inputClass: inputField.class, tour: inputField.tour, hintOuterClass: "checkbox-description", hintInnerClass: "hover-tooltip", idPrefix: "toggle-switch", selectDeselect: inputField.select_deselect, selectDeselectValue: "Select / Deselect All", rightContentClass: "settings-checkbox-description", rightContent: inputField.right_content, options: Array.isArray(inputField.options) ? inputField.options : [], value: Array.isArray(value) ? value : typeof value === "string" ? [value] : [], proSetting: isProSetting((_u = inputField.proSetting) !== null && _u !== void 0 ? _u : false), onChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key, "multiple");
                            }
                        }, onMultiSelectDeselectChange: (e) => handlMultiSelectDeselectChange(inputField.key, Array.isArray(inputField.options) ? inputField.options : []), proChanged: () => setModelOpen(true) }));
                    break;
                // For particular plugin required checkbox ( like if stock-alert plugin not active the checkbox not open)
                case "stock-alert-checkbox":
                    input = (jsx(MultiCheckBox, { wrapperClass: "checkbox-list-side-by-side", descClass: "settings-metabox-description", description: inputField.desc, selectDeselectClass: "btn-purple select-deselect-trigger", inputWrapperClass: "toggle-checkbox-header", inputInnerWrapperClass: "toggle-checkbox", inputClass: inputField.class, hintOuterClass: "dashicons dashicons-info", hintInnerClass: "hover-tooltip", idPrefix: "toggle-switch", selectDeselect: inputField.select_deselect, selectDeselectValue: "Select / Deselect All", rightContentClass: "settings-metabox-description", rightContent: inputField.right_content, options: Array.isArray(inputField.options) ? inputField.options : [], value: Array.isArray(value) ? value : typeof value === "string" ? [value] : [], proSetting: isProSetting((_v = inputField.proSetting) !== null && _v !== void 0 ? _v : false), onChange: (e) => {
                            var _a, _b;
                            const dependentPlugin = inputField.dependentPlugin;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""), inputField.dependentSetting, dependentPlugin)) {
                                if (inputField.dependentPlugin) {
                                    handleChange(e, inputField.key, "multiple");
                                }
                            }
                        }, onMultiSelectDeselectChange: (e) => handlMultiSelectDeselectChange(inputField.key, Array.isArray(inputField.options)
                            ? inputField.options.map(({ value, proSetting }) => ({
                                value: String(value), // Convert to string
                                proSetting
                            }))
                            : [] // Default to an empty array if it's not an array
                        ) }));
                    break;
                // Rectangle radio toggle button
                case "settingToggle":
                    input = (jsx(ToggleSetting, { wrapperClass: `setting-form-input`, descClass: "settings-metabox-description", description: inputField.desc, options: Array.isArray(inputField.options) ? inputField.options : [], value: String((_w = value !== null && value !== void 0 ? value : inputField.defaultValue) !== null && _w !== void 0 ? _w : ""), proSetting: isProSetting((_x = inputField.proSetting) !== null && _x !== void 0 ? _x : false), onChange: (data) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                settingChanged.current = true;
                                updateSetting(inputField.key, data);
                            }
                        } }, inputField.key));
                    break;
                case "wpeditor":
                    input = (jsx(WpEditor, { apiKey: String((appLocalizer === null || appLocalizer === void 0 ? void 0 : appLocalizer.mvx_tinymce_key) || ""), value: String(value), onEditorChange: (e) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                handleChange(e, inputField.key, "single", "wpeditor");
                            }
                        } }));
                    break;
                case "label":
                    input = (jsx(Label, { wrapperClass: "form-group-only-label", descClass: "settings-metabox-description", value: String(inputField.valuename), description: inputField.desc }));
                    break;
                // For separation (if you want heading in line then put desc or add some description then add hint)
                case "section":
                    input = (jsx(Section, { wrapperClass: "setting-section-divider", value: inputField.label, hint: inputField.hint }));
                    break;
                case "blocktext":
                    input = (jsx(BlockText, { wrapperClass: "blocktext-class", blockTextClass: "settings-metabox-description-code", value: String(inputField.blocktext) }));
                    break;
                // Special input type project specific
                // customize button
                case "button-customizer":
                    input = (jsx(ButtonCustomizer, { text: ((_y = setting[inputField.key]) === null || _y === void 0 ? void 0 : _y.button_text) || 'Button Text', proSetting: isProSetting((_z = inputField.proSetting) !== null && _z !== void 0 ? _z : false), setting: setting[inputField.key], onChange: (key, value, isRestoreDefaults = false) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                settingChanged.current = true;
                                if (isRestoreDefaults) {
                                    updateSetting(inputField.key, value);
                                }
                                else {
                                    updateSetting(inputField.key, Object.assign(Object.assign({}, setting[inputField.key]), { [key]: value }));
                                }
                            }
                        } }));
                    break;
                case "stock-alert-form-customizer":
                    input = (jsx(FormCustomizer, { value: String(value), buttonText: setting.customize_btn && setting.customize_btn.button_text || 'Submit', setting: setting[inputField.key], proSetting: isProSetting((_0 = inputField.proSetting) !== null && _0 !== void 0 ? _0 : false), onChange: (e, key) => {
                            var _a;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false)) {
                                settingChanged.current = true;
                                updateSetting(e, key);
                            }
                        } }));
                    break;
                // custom from with free-pro tab
                case "form-customizer":
                    input = (jsx(FreeProFormCustomizer, { setting: setting, proSetting: isProSetting((_1 = inputField.proSetting) !== null && _1 !== void 0 ? _1 : false), proSettingChange: () => { var _a; return proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false); }, moduleEnabledChange: () => { var _a; return moduleEnabledChanged(String((_a = inputField.moduleEnabled) !== null && _a !== void 0 ? _a : "")); }, onChange: (key, value) => {
                            settingChanged.current = true;
                            updateSetting(key, value);
                        } }, inputField.key));
                    break;
                // shop page builder( use in catalogx )
                case "catalog-customizer":
                    input = (jsx(CatalogCustomizer, { setting: setting, proSetting: (_2 = appLocalizer === null || appLocalizer === void 0 ? void 0 : appLocalizer.khali_dabba) !== null && _2 !== void 0 ? _2 : false, onChange: (key, value) => {
                            settingChanged.current = true;
                            updateSetting(key, value);
                        }, Sample_Product: "#", pro_url: "#" }));
                    break;
                // for Grid-table input with multiple checkbox
                case "multi-checkbox-table":
                    input = (jsx(MultiCheckboxTable, { rows: inputField.rows, columns: inputField.columns, description: String(inputField.desc), setting: setting, proSetting: isProSetting((_3 = inputField.proSetting) !== null && _3 !== void 0 ? _3 : false), modules: modules, onChange: (key, value) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                settingChanged.current = true;
                                updateSetting(key, value);
                            }
                        }, moduleChange: (moduleEnabled) => {
                            setModelModuleOpen(true);
                            setModulePopupData({
                                moduleName: moduleEnabled,
                                settings: '',
                                plugin: '',
                            });
                        } }));
                    break;
                case "mergeComponent":
                    input = (jsx(MergeComponent, { wrapperClass: `setting-form-input`, descClass: "settings-metabox-description", description: inputField.desc, value: typeof value === "object" && value !== null ? value : {}, fields: Array.isArray(inputField.fields) ? inputField.fields : [], proSetting: isProSetting((_4 = inputField.proSetting) !== null && _4 !== void 0 ? _4 : false), onChange: (data) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                settingChanged.current = true;
                                updateSetting(inputField.key, data);
                            }
                        } }));
                    break;
                // for shortcode name and description
                case "shortCode-table":
                    input = (jsx(ShortCodeTable, { wrapperClass: `setting-form-input`, descClass: "settings-metabox-description", description: inputField.desc, options: Array.isArray(inputField.options) ? inputField.options : [], optionLabel: inputField.optionLabel }, inputField.key));
                    break;
                // Synchronize button (Changes later)
                case "syncbutton":
                    input = jsx(SyncNow, { appLocalizer: appLocalizer, buttonKey: inputField.key, apilink: String(inputField.apilink), value: String(inputField.value), description: String(inputField.desc), proSetting: isProSetting((_5 = inputField.proSetting) !== null && _5 !== void 0 ? _5 : false), proSettingChanged: () => { var _a; return proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false); }, interval: Number(inputField.interval), statusApiLink: String(inputField.statusApiLink) });
                    break;
                // attribute mapping
                case "sync-map":
                    input = jsx(SyncMap, { description: inputField.desc, proSetting: isProSetting((_6 = inputField.proSetting) !== null && _6 !== void 0 ? _6 : false), proSettingChanged: () => { var _a; return proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false); }, value: Array.isArray(value) ? value : [["key", String(value)]], syncFieldsMap: (_7 = inputField.syncFieldsMap) !== null && _7 !== void 0 ? _7 : {}, onChange: (value) => {
                            var _a;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && true) {
                                settingChanged.current = true;
                                updateSetting(inputField.key, value);
                            }
                        } });
                    break;
                case "sso-key":
                    input = jsx(AutoGeneratedDefaultInput, { value: String(value), description: inputField.desc, proSetting: isProSetting((_8 = inputField.proSetting) !== null && _8 !== void 0 ? _8 : false), onChange: (value) => {
                            var _a;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && true) {
                                settingChanged.current = true;
                                updateSetting(inputField.key, value);
                            }
                        } });
                    break;
                // Test connection button
                case "testconnection":
                    input = jsx(ConnectButton, { appLocalizer: appLocalizer, apiLink: String(inputField.apiLink), tasks: (_9 = inputField.tasks) !== null && _9 !== void 0 ? _9 : [] }); // all tasks for test connection
                    break;
                case "log":
                    input = jsx(Log, { appLocalizer: appLocalizer, fetchApiLink: String(inputField.fetchApiLink), downloadApiLink: String(inputField.downloadApiLink), downloadFileName: String(inputField.fileName) }); // log file name
                    break;
                // Checkbox with custom image
                case "checkbox-custom-img":
                    input = jsx(CheckboxCustomImg, { proSetting: isProSetting((_10 = inputField.proSetting) !== null && _10 !== void 0 ? _10 : false), description: inputField.desc, value: Array.isArray(value) ? value : [String(value)], syncDirections: inputField.syncDirections, onChange: (data) => {
                            var _a, _b;
                            if (!proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false) && !moduleEnabledChanged(String((_b = inputField.moduleEnabled) !== null && _b !== void 0 ? _b : ""))) {
                                settingChanged.current = true;
                                updateSetting(inputField.key, data);
                            }
                        } });
                    break;
                // For mailchimp list
                case "api-connect":
                    input = (jsx(InputMailchimpList, { appLocalizer: appLocalizer, setting: setting, updateSetting: updateSetting, mailchimpKey: inputField.key, selectKey: String(inputField.selectKey), optionKey: String(inputField.optionKey), onChange: handleChange, proSettingChanged: () => { var _a; return proSettingChanged((_a = inputField.proSetting) !== null && _a !== void 0 ? _a : false); }, settingChanged: settingChanged, apiLink: String(inputField.apiLink) }));
                    break;
            }
            return inputField.type === "section" || inputField.label === "no_label" ? (input) : (jsxs("div", { className: `form-group ${inputField.classes ? inputField.classes : ''}`, children: [inputField.type !== "catalog-customizer" && inputField.type !== "from-builder" && inputField.type !== "form-customizer" && (jsx("label", { className: "settings-form-label", htmlFor: inputField.key, children: jsx("p", { children: inputField.label }) }, "l" + inputField.key)), jsx("div", { className: "settings-input-content", children: input })] }, "g" + inputField.key));
        });
    };
    const handleModelClose = () => {
        setModelOpen(false);
    };
    const handleModulePopupClose = () => {
        setModelModuleOpen(false);
    };
    return (jsx(Fragment, { children: jsxs("div", { className: "dynamic-fields-wrapper", children: [jsxs(Dialog, { className: "admin-module-popup", open: modelOpen, onClose: handleModelClose, "aria-labelledby": "form-dialog-title", children: [jsx("span", { className: "admin-font adminLib-cross", onClick: handleModelClose }), jsx(ProPopup, {})] }), jsxs(Dialog, { className: "admin-module-popup", open: modelModuleOpen, onClose: handleModulePopupClose, "aria-labelledby": "form-dialog-title", children: [jsx("span", { className: "admin-font adminLib-cross", onClick: handleModulePopupClose }), jsx(ModulePopup, { moduleName: String(modulePopupData.moduleName), settings: modulePopupData.settings, plugin: modulePopupData.plugin, moduleMessage: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.moduleMessage, moduleButton: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.moduleButton, pluginDescription: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.pluginDescription, SettingMessage: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.SettingMessage, pluginMessage: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.pluginMessage, pluginButton: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.pluginButton, SettingDescription: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.SettingDescription, pluginUrl: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.pluginUrl, modulePageUrl: modulePopupFields === null || modulePopupFields === void 0 ? void 0 : modulePopupFields.modulePageUrl })] }), successMsg && (jsxs("div", { className: "admin-notice-display-title", children: [jsx("i", { className: "admin-font adminLib-icon-yes" }), successMsg] })), jsx("form", { className: "dynamic-form", onSubmit: (e) => {
                        handleSubmit();
                    }, children: renderForm() })] }) }));
};

const ProPopup = (props) => {
    var _a;
    const safeProUrl = props.proUrl || "#";
    return (jsx(DialogContent$1, { children: jsx(DialogContentText$1, { children: jsx("div", { className: "admin-module-dialog-content", children: jsx("div", { className: "admin-image-overlay", children: jsxs("div", { className: "admin-overlay-content", children: [jsxs("h1", { className: "banner-header", children: ["Unlock ", jsx("span", { className: "banner-pro-tag", children: "Pro" })] }), jsxs("div", { className: "admin-banner-content", children: [jsx("strong", { children: props.title }), jsx("p", { children: "\u00A0" }), (_a = props.messages) === null || _a === void 0 ? void 0 : _a.map((message, index) => (jsx("p", { children: `${index + 1}. ${message}` }, index)))] }), jsx("a", { className: "admin-go-pro-btn", target: "_blank", rel: "noopener noreferrer", href: safeProUrl, children: "Upgrade to Pro" })] }) }) }) }) }));
};

const Banner = ({ is_pro, products, pro_url, }) => {
    // Ensure localStorage is initialized correctly
    if (localStorage.getItem('banner') !== 'false') {
        localStorage.setItem("banner", "true");
    }
    const [modal, setModal] = useState(false);
    const [banner, setBanner] = useState(localStorage.getItem('banner') === 'true');
    const handleCloseBanner = () => {
        localStorage.setItem('banner', 'false');
        setBanner(false);
    };
    const handleClose = () => {
        setModal(false);
    };
    const handleOpen = () => {
        setModal(true);
    };
    useEffect(() => {
        var _a, _b;
        if (!banner)
            return;
        const carouselItems = document.querySelectorAll('.carousel-item');
        const totalItems = carouselItems.length;
        if (!totalItems)
            return;
        let currentIndex = 0;
        let interval;
        // Function to show the current slide and hide others
        const showSlide = (index) => {
            carouselItems.forEach(item => item.classList.remove('active'));
            carouselItems[index].classList.add('active');
        };
        // Function to go to the next slide
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalItems;
            showSlide(currentIndex);
        };
        // Function to go to the previous slide
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            showSlide(currentIndex);
        };
        // Start the auto-slide interval
        const startAutoSlide = () => {
            interval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
        };
        // Stop the auto-slide interval
        const stopAutoSlide = () => {
            clearInterval(interval);
        };
        // Initialize the carousel
        showSlide(currentIndex);
        startAutoSlide();
        // Handle next button click
        (_a = document.getElementById('nextBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        (_b = document.getElementById('prevBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }, [banner]);
    return (jsx(Fragment, { children: !is_pro ? (banner ? (jsxs("div", { className: "custom-banner", children: [jsxs(Dialog$1, { className: "admin-module-popup", open: modal, onClose: handleClose, "aria-labelledby": "form-dialog-title", children: [jsx("span", { className: "admin-font adminLib-cross stock-manager-popup-cross", onClick: handleClose }), jsx(ProPopup, {})] }), jsxs("div", { className: "admin-carousel-container", children: [jsxs("div", { className: "carousel-container", children: [jsx("div", { className: "admin-font adminLib-cross pro-slider-cross", onClick: handleCloseBanner }), jsx("div", { className: "why-go-pro-tag", onClick: handleOpen, children: "Why Premium" }), jsx("ul", { className: "carousel-list", children: products === null || products === void 0 ? void 0 : products.map((product, i) => {
                                        return (jsx("li", { className: `carousel-item ${i == 0 ? 'active' : ''}`, children: jsxs("div", { className: "admin-pro-txt-items", children: [jsx("h3", { children: product.title }), jsx("p", { children: product.description }), jsx("a", { href: pro_url, target: '_blank', className: "admin-btn btn-red", children: "View Pricing" })] }) }, i));
                                    }) })] }), jsxs("div", { className: "carousel-controls", children: [jsx("button", { id: "prevBtn", children: jsx("i", { className: 'admin-font adminLib-arrow-left' }) }), jsx("button", { id: "nextBtn", children: jsx("i", { className: 'admin-font adminLib-arrow-right' }) })] })] })] })) : null) : null }));
};

const Button = ({ wrapperClass, inputClass, type = "button", value, onClick, proSetting, description, descClass }) => {
    return (jsxs("div", { className: wrapperClass, children: [jsx("input", { className: inputClass, type: type, value: value, onClick: (e) => onClick === null || onClick === void 0 ? void 0 : onClick(e) }), proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), description && (jsx("p", { className: descClass, dangerouslySetInnerHTML: { __html: description } }))] }));
};

const Card = ({ title, children, width = '300px', elevation = 'medium', }) => {
    return (jsxs("div", { className: `card card-elevation-${elevation}`, style: { width }, children: [title && jsx("div", { className: "card-title", children: title }), jsx("div", { className: "card-content", children: children })] }));
};

const PENALTY = 28;
const COOLDOWN = 1;
const TableCell = ({ title, fieldValue, children, type = '', header, onChange, }) => {
    const [cellData, setCellData] = useState(fieldValue);
    const timeoutRef = useRef(null);
    useEffect(() => {
        setCellData(fieldValue);
    }, [fieldValue]);
    let content;
    if ((header === null || header === void 0 ? void 0 : header.editable) === false) {
        type = "";
    }
    switch (type) {
        case 'product':
        case 'text':
        case 'number':
            content = (jsxs("td", { className: `table-row ${header.class}`, children: [type === 'product' && children, jsx("div", { className: "table-data-container", children: jsx(BasicInput, { inputClass: "table-input", type: "text", value: type === 'number' ? String(cellData || 0) : cellData, proSetting: false, onChange: (e) => {
                                const newValue = e.target.value;
                                setCellData((prev) => (prev === "0" ? newValue.slice(-1) : newValue));
                                // Clear previous timeout if still waiting
                                if (timeoutRef.current) {
                                    clearTimeout(timeoutRef.current);
                                }
                                // Debounce the onChange call
                                timeoutRef.current = setTimeout(() => {
                                    if (onChange) {
                                        onChange(e);
                                    }
                                }, 2000);
                            } }) })] }));
            break;
        case "checkbox":
            content = (jsx("input", { type: "checkbox", className: "toggle-checkbox", name: title, checked: cellData, onChange: (e) => {
                    setCellData(e.target.checked ? "true" : "false");
                    onChange && onChange(e);
                } }));
            break;
        case "dropdown":
            const optionsVal = Object.entries(header.options).map(([key, val]) => ({
                key: key,
                value: key,
                label: String(val),
            }));
            content = (jsx(SelectInput, { inputClass: header.class, options: optionsVal, value: fieldValue, proSetting: false, onChange: (e) => {
                    onChange && onChange(e);
                } }));
            break;
        default:
            content = (jsxs("div", { title: fieldValue, className: "order-status table-row-custom", children: [jsx("h4", { className: "hide-title", children: title }), children] }));
    }
    return (jsx(Fragment, { children: jsx("td", { title: title, children: content }) }));
};
// Loading table component
const LoadingTable = () => (jsx("table", { className: "load-table", children: jsx("tbody", { children: Array.from({ length: 10 }).map((_, rowIndex) => (jsx("tr", { children: Array.from({ length: 5 }).map((_, cellIndex) => (jsx("td", { className: "load-table-td", children: jsx("div", { className: "line" }) }, cellIndex))) }, rowIndex))) }) }));
const CustomTable = ({ data, columns, rowSelection = {}, onRowSelectionChange, defaultRowsPerPage = 10, bulkActionComp, realtimeFilter, pageCount, pagination, onPaginationChange, typeCounts, autoLoading, handlePagination, perPageOption, successMsg }) => {
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState({});
    // Counter variable for cooldown effect
    const counter = useRef(0);
    const counterId = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // Hide some columns if screen is small
    const isSmallScreen = windowWidth < 768;
    // Assume first column is 'select', keep that always
    const visibleColumns = isSmallScreen
        ? columns.slice(0, 3)
        : columns;
    const getHiddenColumns = (row) => {
        return row.getVisibleCells().filter((cell) => !visibleColumns.find(col => col.id === cell.column.id || col.header === cell.column.id));
    };
    // Function that handles filter changes.
    const handleFilterChange = (key, value) => {
        setFilterData((prevData) => (Object.assign(Object.assign({}, prevData), { [key]: value })));
    };
    useEffect(() => {
        // Check if filter data is empty then this effect is for first time rendering.
        // Do nothing in this case.
        if (Object.keys(filterData).length === 0) {
            return;
        }
        // Set counter by penalti
        counter.current = PENALTY;
        // Clear previous counter.
        if (counterId.current) {
            clearInterval(counterId.current);
        }
        // Create new interval
        const intervalId = setInterval(() => {
            counter.current -= COOLDOWN;
            // Cooldown compleate time for db request.
            if (counter.current < 0) {
                // Set the loading
                if (autoLoading) {
                    setLoading(true);
                }
                // Call filter function
                handlePagination === null || handlePagination === void 0 ? void 0 : handlePagination(defaultRowsPerPage, 1, filterData);
                // Set current page to one.
                // setCurrentPage(1);
                // Clear the interval.
                clearInterval(intervalId);
                counterId.current = null;
            }
        }, 50);
        // Store the interval id.
        counterId.current = intervalId;
    }, [filterData]);
    useEffect(() => {
        setLoading(data === null);
    }, [data]);
    const table = useReactTable({
        data: data || [],
        columns,
        state: { rowSelection, pagination },
        enableRowSelection: true,
        manualPagination: true,
        pageCount,
        onPaginationChange,
        onRowSelectionChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });
    const typeCountActive = filterData.typeCount || 'all';
    return (jsxs("div", { children: [jsx("div", { className: "admin-table-wrapper-filter", children: typeCounts &&
                    typeCounts.map((countInfo, index) => (jsxs("div", { onClick: (e) => {
                            setFilterData({ typeCount: countInfo.key });
                        }, className: countInfo.key === typeCountActive ? 'type-count-active' : '', children: [`${countInfo.name} (${countInfo.count})`, index !== typeCounts.length - 1 && ' |', " "] }, index))) }), jsxs("div", { className: "filter-wrapper", children: [jsx("div", { className: "wrap-bulk-all-date", children: realtimeFilter &&
                            realtimeFilter.map((filter) => (filter.render(handleFilterChange, filterData[filter.name]) // 
                            )) }), bulkActionComp && bulkActionComp()] }), loading ? (jsx(LoadingTable, {})) :
                (jsxs(Fragment, { children: [(data === null || data === void 0 ? void 0 : data.length) === 0 && (jsx("div", { className: "no-data", children: jsx("p", { children: "There are no records to display" }) })), (data === null || data === void 0 ? void 0 : data.length) > 0 && jsxs("div", { children: [jsxs("table", { className: "react-table", children: [jsx("thead", { className: "rdt_TableHead", children: table.getHeaderGroups().map((headerGroup) => (jsxs("tr", { className: "rdt_TableHeadRow", children: [headerGroup.headers.filter(header => visibleColumns.find(col => col.id === header.column.id || col.header === header.column.id)).map((header) => (jsx("th", { className: "rdt_TableCol", children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id))), isSmallScreen && jsx("th", {})] }, headerGroup.id))) }), jsx("tbody", { className: "rdt_TableBody", children: table.getRowModel().rows.map((row) => (jsxs("tr", { className: "rdt_TableRow", children: [row.getVisibleCells().filter(cell => visibleColumns.find(col => col.id === cell.column.id || col.header === cell.column.id))
                                                        .map((cell) => (jsx("td", { className: "rdt_TableCell", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))), isSmallScreen && (jsx("td", { children: jsxs("details", { children: [jsx("summary", { children: "More" }), jsx("ul", { className: "text-sm", children: getHiddenColumns(row)
                                                                        .map((cell) => (jsx("li", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) })] }) }))] }, row.id))) })] }), jsxs("div", { className: "rdt_Pagination", children: [jsxs("div", { children: ["Rows per page:", jsx("select", { value: table.getState().pagination.pageSize, onChange: (e) => table.setPageSize(Number(e.target.value)), children: perPageOption.map((size) => (jsx("option", { value: size, children: size }, size))) })] }), jsxs("div", { className: "Pagination-arrow", children: [jsx("button", { onClick: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage(), children: '<<' }), jsx("button", { onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), children: '<' }), jsxs("span", { style: { margin: '0 1rem' }, children: ["Page ", table.getState().pagination.pageIndex + 1, " of ", pageCount] }), jsx("button", { onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), children: '>' }), jsx("button", { onClick: () => table.setPageIndex(pageCount - 1), disabled: !table.getCanNextPage(), children: '>>' })] })] })] }), successMsg && (jsxs("div", { className: "admin-notice-display-title", children: [jsx("i", { className: "admin-font adminLib-icon-yes" }), successMsg] }))] }))] }));
};

const DefaultMeta = ({ defaultvalue, name, deactive, onChange, hideDefaultValue, hideName, hideDeactive }) => {
    return (jsxs(Fragment, { children: [!hideDeactive &&
                jsxs("div", { className: "deactive", children: [jsx("span", { children: "Deactive" }), jsx("input", { type: "checkbox", checked: deactive, onChange: (event) => { onChange('deactive', !event.target.checked); } })] }), !hideName &&
                jsxs("div", { className: "name", children: [jsx("span", { children: "Set name" }), jsx("input", { type: "text", value: name, onChange: (event) => { onChange('name', !event.target.name); } })] }), !hideDefaultValue &&
                jsxs("div", { className: "default-value", children: [jsx("span", { children: "Set Defaut Value" }), jsx("input", { type: "text", value: defaultvalue, onChange: (event) => { onChange('defaultvalue', !event.target.name); } })] })] }));
};

const DisplayButton = ({ customStyle, children, onClick }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const style = {
        border: `${(_a = customStyle.button_border_size) !== null && _a !== void 0 ? _a : 1}px solid ${(_b = customStyle.button_border_color) !== null && _b !== void 0 ? _b : '#000000'}`,
        backgroundColor: (_c = customStyle.button_background_color) !== null && _c !== void 0 ? _c : '#ffffff',
        color: (_d = customStyle.button_text_color) !== null && _d !== void 0 ? _d : '#000000',
        borderRadius: `${(_e = customStyle.button_border_radious) !== null && _e !== void 0 ? _e : 0}px`,
        fontSize: `${(_f = customStyle.button_font_size) !== null && _f !== void 0 ? _f : 20}px`,
        fontWeight: `${(_g = customStyle.button_font_width) !== null && _g !== void 0 ? _g : 1}rem`,
        margin: `${(_h = customStyle.button_margin) !== null && _h !== void 0 ? _h : 0}px`,
        padding: `${(_j = customStyle.button_padding) !== null && _j !== void 0 ? _j : 0}px`,
    };
    const hoverStyle = {
        border: `1px solid ${(_k = customStyle.button_border_color_onhover) !== null && _k !== void 0 ? _k : '#000000'}`,
        color: (_l = customStyle.button_text_color_onhover) !== null && _l !== void 0 ? _l : '#000000',
        backgroundColor: (_m = customStyle.button_background_color_onhover) !== null && _m !== void 0 ? _m : '#ffffff',
    };
    const [hovered, setHovered] = useState(false);
    return (jsx("button", { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), style: hovered ? hoverStyle : style, onClick: onClick, children: customStyle.button_text || children }));
};

const Checkboxes = ({ options, onChange }) => {
    const [checkedItems, setCheckedItems] = useState(options.filter(({ isdefault }) => isdefault));
    useEffect(() => {
        onChange(checkedItems.map(item => item.value));
    }, [checkedItems]);
    const handleChange = (option, checked) => {
        const newCheckedItems = checkedItems.filter(item => item.value !== option.value);
        if (checked)
            newCheckedItems.push(option);
        setCheckedItems(newCheckedItems);
    };
    return (jsx("div", { className: 'multiselect-container items-wrapper', children: options.map(option => (jsxs("div", { className: 'select-items', children: [jsx("input", { type: "checkbox", id: option.value, checked: !!checkedItems.find(item => item.value === option.value), onChange: e => handleChange(option, e.target.checked) }), jsx("label", { htmlFor: option.value, children: option.label })] }, option.value))) }));
};
const FromViewer = ({ formFields, onSubmit }) => {
    const [inputs, setInputs] = useState({});
    const formList = formFields.formfieldlist || [];
    const buttonSetting = formFields.butttonsetting || {};
    const [captchaToken, setCaptchaToken] = useState(null);
    const [captchaError, setCaptchaError] = useState(false);
    const recaptchaField = formList.find(field => field.type === 'recaptcha');
    const siteKey = (recaptchaField === null || recaptchaField === void 0 ? void 0 : recaptchaField.sitekey) || null;
    useEffect(() => {
        if (!siteKey)
            return;
        const loadRecaptcha = () => {
            var _a;
            (_a = window.grecaptcha) === null || _a === void 0 ? void 0 : _a.ready(() => {
                var _a;
                (_a = window.grecaptcha) === null || _a === void 0 ? void 0 : _a.execute(siteKey, { action: "form_submission" }).then(token => setCaptchaToken(token)).catch(() => setCaptchaError(true));
            });
        };
        if (!window.grecaptcha) {
            const script = document.createElement("script");
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.onload = loadRecaptcha;
            script.onerror = () => setCaptchaError(true);
            document.body.appendChild(script);
        }
        else {
            loadRecaptcha();
        }
    }, [siteKey]);
    const handleChange = (name, value) => {
        setInputs(prevData => (Object.assign(Object.assign({}, prevData), { [name]: value })));
    };
    const handleSubmit = () => {
        // e.preventDefault();
        const data = new FormData();
        Object.keys(inputs).forEach(key => data.append(key, inputs[key]));
        onSubmit(data);
    };
    return (jsxs("main", { className: 'catalogx-enquiry-pro-form', children: [formList.map(field => {
                if (field.disabled)
                    return null;
                switch (field.type) {
                    case 'text':
                        return (jsxs("section", { className: 'form-text form-pro-sections', children: [jsx("label", { children: field.label }), jsx("input", { type: "text", name: field.name, placeholder: field.placeholder, onChange: e => handleChange(field.name, e.target.value) })] }, field.name));
                    case 'checkboxes':
                        return (jsxs("section", { className: 'form-pro-sections', children: [jsx("label", { children: field.label }), jsx(Checkboxes, { options: field.options || [], onChange: data => handleChange(field.name, data) })] }, field.name));
                    default:
                        return null;
                }
            }), jsx("section", { className: 'popup-footer-section', children: jsx(DisplayButton, { customStyle: buttonSetting, onClick: () => handleSubmit(), children: "Submit" }) })] }));
};

const Heading = ({ wrapperClass, blocktext }) => {
    return (jsx("div", { className: wrapperClass, children: blocktext && jsx("h5", { dangerouslySetInnerHTML: { __html: blocktext } }) }));
};

const IconList = () => {
    return (jsx(Fragment, { children: jsx("div", { className: "icon-list", children: jsxs("div", { className: "icon-wrapper", children: [jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-person" }), jsx("span", { className: "mls", children: " adminLib-person" }), jsx("span", { children: "(e520)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-tools" }), jsx("span", { className: "mls", children: " adminLib-tools" }), jsx("span", { children: "(e700)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-supervised-user-circle" }), jsx("span", { className: "mls", children: " adminLib-supervised-user-circle" }), jsx("span", { children: "(e702)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-vpn-key" }), jsx("span", { className: "mls", children: " adminLib-vpn-key" }), jsx("span", { children: "(e704)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-user-circle" }), jsx("span", { className: "mls", children: " adminLib-user-circle" }), jsx("span", { children: "(e800)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-error" }), jsx("span", { className: "mls", children: " adminLib-error" }), jsx("span", { children: "(e802)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-security" }), jsx("span", { className: "mls", children: " adminLib-security" }), jsx("span", { children: "(e803)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-storefront" }), jsx("span", { className: "mls", children: " adminLib-storefront" }), jsx("span", { children: "(e804)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-editor-list-ul" }), jsx("span", { className: "mls", children: " adminLib-editor-list-ul" }), jsx("span", { children: "(e805)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-search" }), jsx("span", { className: "mls", children: " adminLib-search" }), jsx("span", { children: "(e806)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-info" }), jsx("span", { className: "mls", children: " adminLib-info" }), jsx("span", { children: "(e807)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-check" }), jsx("span", { className: "mls", children: " adminLib-check" }), jsx("span", { children: "(e809)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-smile-o" }), jsx("span", { className: "mls", children: " adminLib-smile-o" }), jsx("span", { children: "(e80a)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-close" }), jsx("span", { className: "mls", children: " adminLib-close" }), jsx("span", { children: "(e810)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-captcha" }), jsx("span", { className: "mls", children: " adminLib-captcha" }), jsx("span", { children: "(e820)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-checkbox" }), jsx("span", { className: "mls", children: " adminLib-checkbox" }), jsx("span", { children: "(e822)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-divider" }), jsx("span", { className: "mls", children: " adminLib-divider" }), jsx("span", { children: "(e828)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-radio" }), jsx("span", { className: "mls", children: " adminLib-radio" }), jsx("span", { children: "(e84e)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-toggle" }), jsx("span", { className: "mls", children: " adminLib-toggle" }), jsx("span", { children: "(e869)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-text" }), jsx("span", { className: "mls", children: " adminLib-text" }), jsx("span", { children: "(e86d)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-section" }), jsx("span", { className: "mls", children: " adminLib-section" }), jsx("span", { children: "(e898)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-book" }), jsx("span", { className: "mls", children: " adminLib-book" }), jsx("span", { children: "(e8f0)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-plus-circle-o" }), jsx("span", { className: "mls", children: " adminLib-plus-circle-o" }), jsx("span", { children: "(e8f7)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-centralized-connections" }), jsx("span", { className: "mls", children: " adminLib-centralized-connections" }), jsx("span", { children: "(e900)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-desktop-pc-valuation" }), jsx("span", { className: "mls", children: " adminLib-desktop-pc-valuation" }), jsx("span", { children: "(e901)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-dynamic-pricing" }), jsx("span", { className: "mls", children: " adminLib-dynamic-pricing" }), jsx("span", { children: "(e902)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-uniE903" }), jsx("span", { className: "mls", children: " adminLib-uniE903" }), jsx("span", { children: "(e903)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-social-media-content" }), jsx("span", { className: "mls", children: " adminLib-social-media-content" }), jsx("span", { children: "(e906)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-user-network-icon" }), jsx("span", { className: "mls", children: " adminLib-user-network-icon" }), jsx("span", { children: "(e907)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-price" }), jsx("span", { className: "mls", children: " adminLib-price" }), jsx("span", { children: "(e908)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-catalog" }), jsx("span", { className: "mls", children: " adminLib-catalog" }), jsx("span", { children: "(e909)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-contact-form" }), jsx("span", { className: "mls", children: " adminLib-contact-form" }), jsx("span", { children: "(e90a)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-exclude" }), jsx("span", { className: "mls", children: " adminLib-exclude" }), jsx("span", { children: "(e90b)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-inquiry" }), jsx("span", { className: "mls", children: " adminLib-inquiry" }), jsx("span", { children: "(e90c)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-price-quote-icon" }), jsx("span", { className: "mls", children: " adminLib-price-quote-icon" }), jsx("span", { children: "(e90d)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-warehousing-icon" }), jsx("span", { className: "mls", children: " adminLib-warehousing-icon" }), jsx("span", { children: "(e90e)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-web-page-website" }), jsx("span", { className: "mls", children: " adminLib-web-page-website" }), jsx("span", { children: "(e90f)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-wholesale" }), jsx("span", { className: "mls", children: " adminLib-wholesale" }), jsx("span", { children: "(e910)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-mailchimp" }), jsx("span", { className: "mls", children: " adminLib-mailchimp" }), jsx("span", { children: "(e911)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-mail" }), jsx("span", { className: "mls", children: " adminLib-mail" }), jsx("span", { children: "(e912)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-file-submission" }), jsx("span", { className: "mls", children: " adminLib-file-submission" }), jsx("span", { children: "(e913)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-submission-message" }), jsx("span", { className: "mls", children: " adminLib-submission-message" }), jsx("span", { children: "(e914)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-settings" }), jsx("span", { className: "mls", children: " adminLib-settings" }), jsx("span", { children: "(e915)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-cross" }), jsx("span", { className: "mls", children: " adminLib-cross" }), jsx("span", { children: "(e916)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-icon-yes" }), jsx("span", { className: "mls", children: " adminLib-icon-yes" }), jsx("span", { children: "(e917)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-arrow-right" }), jsx("span", { className: "mls", children: " adminLib-arrow-right" }), jsx("span", { children: "(e918)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-calendar" }), jsx("span", { className: "mls", children: " adminLib-calendar" }), jsx("span", { children: "(e919)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-arrow-left" }), jsx("span", { className: "mls", children: " adminLib-arrow-left" }), jsx("span", { children: "(e91a)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-arrow-up" }), jsx("span", { className: "mls", children: " adminLib-arrow-up" }), jsx("span", { children: "(e91b)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-arrow-down" }), jsx("span", { className: "mls", children: " adminLib-arrow-down" }), jsx("span", { children: "(e91c)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-menu" }), jsx("span", { className: "mls", children: " adminLib-menu" }), jsx("span", { children: "(e91d)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-send" }), jsx("span", { className: "mls", children: " adminLib-send" }), jsx("span", { children: "(e91e)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-link" }), jsx("span", { className: "mls", children: " adminLib-link" }), jsx("span", { children: "(e91f)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-resize" }), jsx("span", { className: "mls", children: " adminLib-resize" }), jsx("span", { children: "(e920)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-crop-free" }), jsx("span", { className: "mls", children: " adminLib-crop-free" }), jsx("span", { children: "(e921)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-text-fields" }), jsx("span", { className: "mls", children: " adminLib-text-fields" }), jsx("span", { children: "(e922)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-support" }), jsx("span", { className: "mls", children: " adminLib-support" }), jsx("span", { children: "(e923)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-create" }), jsx("span", { className: "mls", children: " adminLib-create" }), jsx("span", { children: "(e924)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-keyboard-arrow-down" }), jsx("span", { className: "mls", children: " adminLib-keyboard-arrow-down" }), jsx("span", { children: "(e925)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-button-appearance" }), jsx("span", { className: "mls", children: " adminLib-button-appearance" }), jsx("span", { children: "(e926)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-enquiry-form-tab" }), jsx("span", { className: "mls", children: " adminLib-enquiry-form-tab" }), jsx("span", { children: "(e927)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-exclusion-tab" }), jsx("span", { className: "mls", children: " adminLib-exclusion-tab" }), jsx("span", { children: "(e928)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-general-tab" }), jsx("span", { className: "mls", children: " adminLib-general-tab" }), jsx("span", { children: "(e929)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-live-preview-tab" }), jsx("span", { className: "mls", children: " adminLib-live-preview-tab" }), jsx("span", { children: "(e92a)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-pro-tab" }), jsx("span", { className: "mls", children: " adminLib-pro-tab" }), jsx("span", { children: "(e92b)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-next" }), jsx("span", { className: "mls", children: " adminLib-next" }), jsx("span", { children: "(e92c)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-previous" }), jsx("span", { className: "mls", children: " adminLib-previous" }), jsx("span", { children: "(e92d)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-select" }), jsx("span", { className: "mls", children: " adminLib-select" }), jsx("span", { children: "(e92e)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-success-notification" }), jsx("span", { className: "mls", children: " adminLib-success-notification" }), jsx("span", { children: "(e92f)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-drop-down" }), jsx("span", { className: "mls", children: " adminLib-drop-down" }), jsx("span", { children: "(e930)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-vendor-form-delete" }), jsx("span", { className: "mls", children: " adminLib-vendor-form-delete" }), jsx("span", { children: "(e931)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-vendor-form-copy" }), jsx("span", { className: "mls", children: " adminLib-vendor-form-copy" }), jsx("span", { children: "(e932)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-vendor-form-add" }), jsx("span", { className: "mls", children: " adminLib-vendor-form-add" }), jsx("span", { children: "(e933)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-select-question-type" }), jsx("span", { className: "mls", children: " adminLib-select-question-type" }), jsx("span", { children: "(e934)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-url" }), jsx("span", { className: "mls", children: " adminLib-form-url" }), jsx("span", { children: "(e935)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-textbox" }), jsx("span", { className: "mls", children: " adminLib-form-textbox" }), jsx("span", { children: "(e936)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-textarea" }), jsx("span", { className: "mls", children: " adminLib-form-textarea" }), jsx("span", { children: "(e937)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-address01" }), jsx("span", { className: "mls", children: " adminLib-form-address01" }), jsx("span", { children: "(e938)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-address02" }), jsx("span", { className: "mls", children: " adminLib-form-address02" }), jsx("span", { children: "(e939)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-attachment" }), jsx("span", { className: "mls", children: " adminLib-form-attachment" }), jsx("span", { children: "(e93a)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-checkboxes" }), jsx("span", { className: "mls", children: " adminLib-form-checkboxes" }), jsx("span", { children: "(e93b)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-paint-brush" }), jsx("span", { className: "mls", children: " adminLib-paint-brush" }), jsx("span", { children: "(e93c)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-city" }), jsx("span", { className: "mls", children: " adminLib-form-city" }), jsx("span", { children: "(e93d)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-country" }), jsx("span", { className: "mls", children: " adminLib-form-country" }), jsx("span", { children: "(e93e)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-dropdown" }), jsx("span", { className: "mls", children: " adminLib-form-dropdown" }), jsx("span", { children: "(e93f)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-email" }), jsx("span", { className: "mls", children: " adminLib-form-email" }), jsx("span", { children: "(e940)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-multi-select" }), jsx("span", { className: "mls", children: " adminLib-form-multi-select" }), jsx("span", { children: "(e941)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-paypal-email" }), jsx("span", { className: "mls", children: " adminLib-form-paypal-email" }), jsx("span", { children: "(e942)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-phone" }), jsx("span", { className: "mls", children: " adminLib-form-phone" }), jsx("span", { children: "(e943)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-postcode" }), jsx("span", { className: "mls", children: " adminLib-form-postcode" }), jsx("span", { children: "(e944)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-radio" }), jsx("span", { className: "mls", children: " adminLib-form-radio" }), jsx("span", { children: "(e945)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-recaptcha" }), jsx("span", { className: "mls", children: " adminLib-form-recaptcha" }), jsx("span", { children: "(e946)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-section" }), jsx("span", { className: "mls", children: " adminLib-form-section" }), jsx("span", { children: "(e947)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-state" }), jsx("span", { className: "mls", children: " adminLib-form-state" }), jsx("span", { children: "(e948)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-star_icon" }), jsx("span", { className: "mls", children: " adminLib-star_icon" }), jsx("span", { children: "(e949)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-form-store-description" }), jsx("span", { className: "mls", children: " adminLib-form-store-description" }), jsx("span", { children: "(e94a)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-folder-open" }), jsx("span", { className: "mls", children: " adminLib-folder-open" }), jsx("span", { children: "(e94b)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-undo" }), jsx("span", { className: "mls", children: " adminLib-undo" }), jsx("span", { children: "(e94c)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-dropdown-checklist" }), jsx("span", { className: "mls", children: " adminLib-dropdown-checklist" }), jsx("span", { children: "(e94d)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-multi-select" }), jsx("span", { className: "mls", children: " adminLib-multi-select" }), jsx("span", { children: "(e94e)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-captcha-automatic-code" }), jsx("span", { className: "mls", children: " adminLib-captcha-automatic-code" }), jsx("span", { children: "(e94f)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-cloud-upload" }), jsx("span", { className: "mls", children: " adminLib-cloud-upload" }), jsx("span", { children: "(e950)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-help" }), jsx("span", { className: "mls", children: " adminLib-help" }), jsx("span", { children: "(e951)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-t-letter-bold" }), jsx("span", { className: "mls", children: " adminLib-t-letter-bold" }), jsx("span", { children: "(e952)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-clock2" }), jsx("span", { className: "mls", children: " adminLib-clock2" }), jsx("span", { children: "(e953)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-alarm" }), jsx("span", { className: "mls", children: " adminLib-alarm" }), jsx("span", { children: "(e954)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-thumbs-ok" }), jsx("span", { className: "mls", children: " adminLib-thumbs-ok" }), jsx("span", { children: "(e955)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-preview" }), jsx("span", { className: "mls", children: " adminLib-preview" }), jsx("span", { children: "(e956)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-paid" }), jsx("span", { className: "mls", children: " adminLib-paid" }), jsx("span", { children: "(e957)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-order" }), jsx("span", { className: "mls", children: " adminLib-order" }), jsx("span", { children: "(e958)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-multiple-inputs" }), jsx("span", { className: "mls", children: " adminLib-multiple-inputs" }), jsx("span", { children: "(e959)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-global-community" }), jsx("span", { className: "mls", children: " adminLib-global-community" }), jsx("span", { children: "(e95a)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-experiment-results" }), jsx("span", { className: "mls", children: " adminLib-experiment-results" }), jsx("span", { children: "(e95b)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-copy" }), jsx("span", { className: "mls", children: " adminLib-copy" }), jsx("span", { children: "(e95c)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-cogs-on-wheels" }), jsx("span", { className: "mls", children: " adminLib-cogs-on-wheels" }), jsx("span", { children: "(e95d)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-blocks" }), jsx("span", { className: "mls", children: " adminLib-blocks" }), jsx("span", { children: "(e95e)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-analytics" }), jsx("span", { className: "mls", children: " adminLib-analytics" }), jsx("span", { children: "(e95f)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-unread" }), jsx("span", { className: "mls", children: " adminLib-unread" }), jsx("span", { children: "(e9ba)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-eye" }), jsx("span", { className: "mls", children: " adminLib-eye" }), jsx("span", { children: "(e9ce)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-eye-blocked" }), jsx("span", { className: "mls", children: " adminLib-eye-blocked" }), jsx("span", { children: "(e9d1)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-text-fields" }), jsx("span", { className: "mls", children: " adminLib-text-fields" }), jsx("span", { children: "(e5201)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-move" }), jsx("span", { className: "mls", children: " adminLib-move" }), jsx("span", { children: "(e5402)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-delete" }), jsx("span", { className: "mls", children: " adminLib-delete" }), jsx("span", { children: "(e5800)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-more-vertical" }), jsx("span", { className: "mls", children: " adminLib-more-vertical" }), jsx("span", { children: "(e8051)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-attachment" }), jsx("span", { className: "mls", children: " adminLib-attachment" }), jsx("span", { children: "(e8598)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-dots-three-horizontal" }), jsx("span", { className: "mls", children: " adminLib-dots-three-horizontal" }), jsx("span", { children: "(e8eee)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-credit-card" }), jsx("span", { className: "mls", children: " adminLib-credit-card" }), jsx("span", { children: "(e9502)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-pin" }), jsx("span", { className: "mls", children: " adminLib-pin" }), jsx("span", { children: "(e963)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-star-fill" }), jsx("span", { className: "mls", children: " adminLib-star-fill" }), jsx("span", { children: "(e962)" })] }), jsxs("div", { className: "icon-box", children: [jsx("span", { className: "adminLib-star" }), jsx("span", { className: "mls", children: " adminLib-star" }), jsx("span", { children: "(e961)" })] })] }) }) }));
};

const MapsInput = (props) => {
    const [Lat, setLat] = useState(props.Lat || 22.5726); // Default to Kolkata coordinates
    const [Lng, setLng] = useState(props.Lng || 88.3639);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    useEffect(() => {
        if (!mapContainerRef.current)
            return;
        // Initialize Mapbox
        mapboxgl.accessToken = appLocalizer.mapbox_api;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [Lng, Lat],
            zoom: 12,
        });
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            marker: false,
            mapboxgl: mapboxgl, // Temporarily bypass type error
        });
        // Add geocoder control to the map
        map.addControl(geocoder);
        // Create a marker and set it to the current location
        markerRef.current = new mapboxgl.Marker({ color: "red" })
            .setLngLat([Lng, Lat])
            .addTo(map);
        // Handle result from geocoder and update marker position
        geocoder.on("result", (ev) => {
            var _a;
            const { center } = ev.result;
            if (center) {
                setLat(center[1]);
                setLng(center[0]);
                (_a = markerRef.current) === null || _a === void 0 ? void 0 : _a.setLngLat(center);
            }
        });
        // Cleanup on component unmount
        return () => map.remove();
    }, []);
    useEffect(() => {
        // Update the marker position when coordinates change
        if (markerRef.current) {
            markerRef.current.setLngLat([Lng, Lat]);
        }
    }, [Lat, Lng]);
    return (jsxs("div", { className: props.wrapperClass, children: [jsx("div", { ref: mapContainerRef, id: props.containerId || "maps-container", className: props.containerClass || "maps-container", style: { width: "100%", height: "300px" } }), props.proSetting && jsx("span", { className: "admin-pro-tag", children: "pro" }), props.description && (jsx("p", { className: props.descClass, dangerouslySetInnerHTML: { __html: props.description } }))] }));
};

var MapsInput$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MapsInput
});

const Modules = ({ insertModule = () => { }, removeModule = () => { }, modulesArray = [], appLocalizer }) => {
    const [modelOpen, setModelOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const isModuleAvailable = (moduleId) => {
        var _a;
        const module = modulesArray.find((module) => module.id === moduleId);
        return (module === null || module === void 0 ? void 0 : module.pro_module) ? (_a = appLocalizer.khali_dabba) !== null && _a !== void 0 ? _a : false : true;
    };
    const handleOnChange = (event, moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!isModuleAvailable(moduleId)) {
            setModelOpen(true);
            return;
        }
        const action = event.target.checked ? "activate" : "deactivate";
        if (action === "activate") {
            insertModule === null || insertModule === void 0 ? void 0 : insertModule(moduleId);
        }
        else {
            removeModule === null || removeModule === void 0 ? void 0 : removeModule(moduleId);
        }
        yield sendApiResponse(appLocalizer, getApiLink(appLocalizer, "modules"), { id: moduleId, action });
        setSuccessMsg("Module activated");
        setTimeout(() => setSuccessMsg(""), 2000);
    });
    return (jsxs("div", { className: "module-container", children: [jsxs(Dialog$1, { className: "admin-module-popup", open: modelOpen, onClose: () => setModelOpen(false), children: [jsx("span", { className: "admin-font adminLib-cross", onClick: () => setModelOpen(false) }), jsx(ProPopup, {})] }), successMsg && (jsxs("div", { className: "admin-notice-display-title", children: [jsx("i", { className: "admin-font adminLib-icon-yes" }), successMsg] })), jsx("div", { className: "tab-name", children: jsx("h1", { children: "Modules" }) }), jsx("div", { className: "module-option-row", children: modulesArray.map((module) => (jsxs("div", { className: "module-list-item", children: [module.pro_module && !appLocalizer.khali_dabba && jsx("span", { className: "admin-pro-tag", children: "Pro" }), jsx("div", { className: "module-icon", children: jsx("i", { className: `font ${module.icon}` }) }), jsxs("div", { className: "card-meta", children: [jsx("div", { className: "meta-name", children: module.name }), jsx("p", { className: "meta-description", dangerouslySetInnerHTML: { __html: module.desc } })] }), jsxs("div", { className: "card-footer", children: [jsxs("div", { className: "card-support", children: [jsx("a", { href: module.doc_link, className: "main-btn btn-purple card-support-btn", children: "Docs" }), jsx("a", { href: module.settings_link, className: "main-btn btn-purple card-support-btn", children: "Setting" })] }), jsxs("div", { className: "toggle-checkbox-content", "data-showcase-tour": `${module.id}-showcase-tour`, children: [jsx("input", { type: "checkbox", className: "woo-toggle-checkbox", id: `toggle-switch-${module.id}`, onChange: (e) => handleOnChange(e, module.id) }), jsx("label", { htmlFor: `toggle-switch-${module.id}`, className: "toggle-switch-is_hide_cart_checkout" })] })] })] }, module.id))) })] }));
};

const NestedInput = (props) => {
    return (jsx("div", { className: props.wrapperClass, children: props.value &&
            props.value.map((option, index) => (jsx("div", { className: props.ParentWrapperClass, children: props.parentOptions.map((parentOption, i) => (jsxs("div", { className: props.innerParentWrapperClass, children: [jsx("label", { className: props.parentLabelClass, children: jsx("p", { children: parentOption.label }) }), parentOption.type === "text" ||
                            parentOption.type === "number" ? (jsx(BasicInput, { inputClass: props.parentInputClass, type: parentOption.type, value: option[parentOption.key], onChange: (e) => props.parentOnchage(e) }))
                            // : parentOption.type === "checkbox" ? (
                            //     <CheckBox
                            //         inputClass={props.parentInputClass}
                            //         type="text"
                            //         value="true"
                            //         checked={option[parentOption.key]}
                            //         onChange={(e) => props.parentOnchage(e)}
                            //     />
                            // ) 
                            // : parentOption.type === "select" ||
                            //   parentOption.type === "select2nd" ||
                            //   parentOption.type === "country" ? (
                            //     <SelectInput
                            //         inputClass={props.parentInputClass}
                            //         value={option[parentOption.key]}
                            //         options={parentOption.options}
                            //         onChange={(e, opt) => props.parentOnchage(e, opt)}
                            //     />
                            // ) 
                            : null] }, i))) }, index))) }));
};

const Support = ({ title = "Thank you for [plugin name]", subTitle = "Plugin support subheading", url = "#", faqData, }) => {
    const [faqs, setFaqs] = useState(faqData);
    const toggleFAQ = (index) => {
        setFaqs((prevFaqs) => prevFaqs === null || prevFaqs === void 0 ? void 0 : prevFaqs.map((faq, i) => (Object.assign(Object.assign({}, faq), { open: i === index ? !faq.open : false }))));
    };
    return (jsx("div", { className: "dynamic-fields-wrapper", children: jsxs("div", { className: "support-container", children: [jsxs("div", { className: "support-header-wrapper", children: [jsx("h1", { className: "support-heading", children: title }), jsx("p", { className: "support-subheading", children: subTitle })] }), jsxs("div", { className: "video-faq-wrapper", children: [jsx("div", { className: "video-section", children: jsx("iframe", { src: url, title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin", allowFullScreen: true }) }), jsx("div", { className: "faq-section", children: jsx("div", { className: "faqs", children: faqs === null || faqs === void 0 ? void 0 : faqs.map((faq, index) => (jsxs("div", { className: `faq ${faq.open ? "open" : ""}`, onClick: () => toggleFAQ(index), children: [jsx("div", { className: "faq-question", children: faq.question }), jsx("div", { className: "faq-answer", dangerouslySetInnerHTML: { __html: faq.answer } })] }, index))) }) })] })] }) }));
};

const Tabs = ({ tabData, currentTab, getForm, prepareUrl, HeaderSection, BannerSection, horizontally, appLocalizer, brandImg, smallbrandImg, supprot, Link }) => {
    const [menuCol, setMenuCol] = useState(false);
    const [openedSubtab, setOpenedSubtab] = useState("");
    const showTabSection = (tab) => {
        return tab.link ? (jsxs("a", { href: tab.link, children: [jsx("div", { children: tab.icon && jsx("i", { className: `admin-font ${tab.icon}` }) }), jsxs("div", { children: [jsx("p", { className: "menu-name", children: menuCol ? null : tab.name }), jsx("p", { className: "menu-desc", children: menuCol ? null : tab.desc })] })] })) : (jsxs(Link, { className: currentTab === tab.id ? "active-current-tab" : "", to: prepareUrl(tab.id), children: [jsxs("div", { children: [tab.icon && jsx("i", { className: ` admin-font ${tab.icon} ` }), menuCol
                            ? null
                            : !appLocalizer.khali_dabba &&
                                tab.proDependent && jsx("span", { className: "admin-pro-tag", children: "Pro" })] }), jsxs("div", { children: [jsx("p", { className: "menu-name", children: menuCol ? null : tab.name }), jsx("p", { className: "menu-desc", children: menuCol ? null : tab.desc })] })] }));
    };
    const showHideMenu = (tab) => {
        return (jsxs(Link, { className: currentTab === tab.id ? "active-current-tab" : "", onClick: (e) => {
                e.preventDefault();
                if (openedSubtab == tab.id) {
                    setOpenedSubtab("");
                }
                else {
                    setOpenedSubtab(tab.id);
                }
            }, to: "#", children: [jsx("div", { children: tab.icon && jsx("i", { className: ` admin-font ${tab.icon} ` }) }), jsxs("div", { className: "drop-down-section", children: [jsxs("div", { children: [jsx("p", { className: "menu-name", children: menuCol ? null : tab.name }), jsx("p", { className: "menu-desc", children: menuCol ? null : tab.desc })] }), menuCol ? null : openedSubtab == tab.id ? (jsx("p", { className: "tab-menu-dropdown-icon active", children: jsx("i", { className: "admin-font adminLib-keyboard-arrow-down" }) })) : (jsx("p", { className: "tab-menu-dropdown-icon", children: jsx("i", { className: "admin-font adminLib-keyboard-arrow-down" }) }))] })] }));
    };
    // Get the description of the current tab.
    const getTabDescription = (tabData) => {
        return tabData === null || tabData === void 0 ? void 0 : tabData.map(({ content, type }) => {
            if (type === "file") {
                return (content.id === currentTab &&
                    content.id !== "support" && (jsx("div", { className: "tab-description-start", children: jsxs("div", { className: "child", children: [jsx("p", { children: jsx("i", { className: `admin-font ${content.icon}` }) }), jsxs("div", { children: [jsx("div", { className: "tab-name", children: content.name }), jsx("div", { className: "tab-desc", children: content.desc })] })] }) })));
            }
            else if (type === "folder") {
                // Get tab description from child by recursion
                return getTabDescription(content);
            }
        });
    };
    const handleMenuShow = () => {
        setMenuCol(!menuCol);
    };
    return (jsx(Fragment, { children: jsxs("div", { className: ` general-wrapper `, children: [HeaderSection && jsx(HeaderSection, {}), BannerSection && jsx(BannerSection, {}), jsx("div", { className: `middle-container-wrapper ${horizontally ? "horizontal-tabs" : "vertical-tabs"}`, children: jsxs("div", { className: `${menuCol ? "showMenu" : ""} middle-child-container`, children: [jsxs("div", { id: "current-tab-lists", className: "current-tab-lists", children: [jsxs("div", { className: "brand", children: [jsx("img", { className: "logo", src: menuCol ? smallbrandImg : brandImg, alt: "Logo" }), jsx("img", { className: "logo-small", src: smallbrandImg, alt: "Logo" })] }), jsxs("div", { className: "current-tab-lists-container", children: [tabData === null || tabData === void 0 ? void 0 : tabData.map(({ type, content }) => {
                                                var _a;
                                                if (type !== "folder") {
                                                    return showTabSection(content);
                                                }
                                                // Tab has child tabs
                                                return (jsxs("div", { className: "tab-wrapper", children: [showHideMenu(content[0].content), jsx("div", { className: `subtab-wrapper ${menuCol ? "show" : ""} ${openedSubtab ===
                                                                content[0].content.id
                                                                ? "active"
                                                                : ""}`, children: (_a = content.slice(1)) === null || _a === void 0 ? void 0 : _a.map(({ content }) => showTabSection(content)) })] }));
                                            }), jsxs("div", { className: "main-btn menu-coll-btn", onClick: handleMenuShow, children: [jsx("span", { children: jsx("i", { className: "admin-font adminLib-arrow-left" }) }), menuCol ? null : "Collapse"] })] })] }), jsxs("div", { className: "tab-content", children: [getTabDescription(tabData), getForm(currentTab)] })] }) }), jsx(AdminFooter, { supportLink: supprot })] }) }));
};

const appLocalizer$1 = {
    enquiry_form_settings_url: "string",
    module_page_url: "string",
    settings_page_url: "string",
    customization_settings_url: "string",
    apiUrl: "string",
};
const Tour = () => {
    const { setIsOpen, setSteps, setCurrentStep } = useTour();
    const [isNavigating, setIsNavigating] = useState(false);
    const waitForElement = (selector) => new Promise((resolve) => {
        const checkElement = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            }
            else {
                setTimeout(checkElement, 100);
            }
        };
        // Ensure the page is fully loaded before checking for the element
        if (document.readyState === 'complete') {
            checkElement();
        }
        else {
            window.addEventListener('load', checkElement, { once: true });
        }
    });
    const navigateTo = (url, step, selector) => __awaiter(void 0, void 0, void 0, function* () {
        setIsNavigating(true);
        setIsOpen(false); // Close the tour
        window.location.href = url; // Navigate to the new page
        // Wait for the element to load
        yield waitForElement(selector);
        // Ensure a short delay to handle rendering latencies
        setTimeout(() => {
            setCurrentStep(step); // Move to the next step
            setIsOpen(true); // Reopen the tour
            setIsNavigating(false);
        }, 500); // Adjust delay as needed
    });
    const finishTour = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsOpen(false); // Close the tour
        try {
            yield axios.post(`${appLocalizer$1.apiUrl}/catalogx/v1/tour`, { active: false });
            console.log("Tour marked as complete.");
        }
        catch (error) {
            console.error("Error updating tour flag:", error);
        }
    });
    const settingsTourSteps = [
        {
            selector: '[data="catalog-showcase-tour"]',
            placement: "top",
            content: () => (jsxs("div", { className: "tour-box", children: [jsx("h3", { children: "Enable Catalog Mode" }), jsx("h4", { children: "Activate Catalog mode to display your site as a product catalog, removing the \"Add to Cart\" button and optionally hiding prices." }), jsxs("div", { className: "tour-footer", children: [jsx("button", { className: "btn-purple", onClick: () => setCurrentStep(1), children: "Next" }), jsx("button", { className: "btn-purple end-tour-btn", onClick: () => finishTour(), children: "End Tour" })] })] })),
        },
        {
            selector: '[data="enquiry-showcase-tour"]',
            content: () => (jsxs("div", { className: "tour-box", children: [jsx("h3", { children: "Enable Enquiry Mode" }), jsx("h4", { children: "Turn on Enquiry mode to add an \"Enquiry\" button for customers, allowing direct communication via submitted forms, viewable in the admin dashboard or via email." }), jsxs("div", { className: "tour-footer", children: [jsx("button", { className: "btn-purple", onClick: () => {
                                    const checkbox = document.querySelector(`[id="toggle-switch-enquiry"]`);
                                    if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
                                        navigateTo(appLocalizer$1.enquiry_form_settings_url, 2, ".button-visibility");
                                    }
                                    else {
                                        setCurrentStep(3);
                                    }
                                }, children: "Next" }), jsx("button", { className: "btn-purple end-tour-btn", onClick: () => finishTour(), children: "End Tour" })] })] })),
        },
        {
            selector: ".button-visibility .adminLib-eye-blocked",
            content: () => (jsxs("div", { className: "tour-box", children: [jsx("h3", { children: "Customize Enquiry Form" }), jsx("h4", { children: "Head to the Enquiry Form Builder to enable the fields customers need to fill out when submitting product inquiries." }), jsxs("div", { className: "tour-footer", children: [jsx("button", { className: "btn-purple", onClick: () => navigateTo(appLocalizer$1.module_page_url, 3, '[data="quote-showcase-tour"]'), children: "Next" }), jsx("button", { className: "btn-purple end-tour-btn", onClick: () => finishTour(), children: "End Tour" })] })] })),
        },
        {
            selector: '[data="quote-showcase-tour"]',
            content: () => (jsxs("div", { className: "tour-box", children: [jsx("h3", { children: "Enable Quote Module" }), jsx("h4", { children: "Activate the Quote module to let customers request personalized product quotations. Admins can review the quotes and provide tailored pricing for customers to proceed with purchases." }), jsxs("div", { className: "tour-footer", children: [jsx("button", { className: "btn-purple", onClick: () => {
                                    const checkbox = document.querySelector(`[id="toggle-switch-quote"]`);
                                    if (checkbox === null || checkbox === void 0 ? void 0 : checkbox.checked) {
                                        navigateTo(appLocalizer$1.settings_page_url, 4, '[data="quote-permission"]');
                                    }
                                    else {
                                        navigateTo(appLocalizer$1.customization_settings_url, 5, ".enquiry-btn");
                                    }
                                }, children: "Next" }), jsx("button", { className: "btn-purple end-tour-btn", onClick: () => finishTour(), children: "End Tour" })] })] })),
        },
        {
            selector: '[data="quote-permission"]',
            content: () => (jsxs("div", { className: "tour-box", children: [jsx("h3", { children: "Configure Quote Settings" }), jsx("h4", { children: "Set up your quotation settings by defining whether to limit quote requests to logged-in users only." }), jsxs("div", { className: "tour-footer", children: [jsx("button", { className: "btn-purple", onClick: () => navigateTo(appLocalizer$1.customization_settings_url, 5, ".enquiry-btn"), children: "Next" }), jsx("button", { className: "btn-purple end-tour-btn", onClick: () => finishTour(), children: "End Tour" })] })] })),
        },
        {
            selector: ".enquiry-btn",
            content: () => {
                return (jsxs("div", { className: "tour-box", children: [jsx("h3", { children: "Arrange Enquiry Button" }), jsx("img", { 
                            // src={gif}
                            alt: "Guide", width: "160" }), jsx("h4", { children: "With the Enquiry tab selected, drag and drop to position the Enquiry button and customize its look." }), jsx("div", { className: "tour-footer", children: jsx("button", { className: "btn-purple", onClick: () => finishTour(), children: "Finish" }) })] }));
            },
            placement: "auto", // Adjust dynamically based on space
        },
    ];
    useEffect(() => {
        // Fetch tour status API call
        const fetchTourState = () => __awaiter(void 0, void 0, void 0, function* () {
            if (window.location.href === appLocalizer$1.module_page_url) {
                try {
                    const response = yield axios.get(`${appLocalizer$1.apiUrl}/catalogx/v1/tour`);
                    console.log(response);
                    if (response.data.active !== '') {
                        if (setSteps) {
                            setSteps(settingsTourSteps);
                        }
                        setIsOpen(true); // Start the tour
                    }
                }
                catch (error) {
                    console.error("Error fetching tour flag:", error);
                }
            }
        });
        if (!isNavigating) {
            fetchTourState();
        }
    }, [isNavigating, setSteps]);
    return null;
};

/**
 * Get settings objects as array sorted by priority.
 */
const getSettingsByPriority = (settings) => {
    if (Array.isArray(settings)) {
        settings.sort((firstSet, secondSet) => {
            let firstPriority = 0;
            let secondPriority = 0;
            if (firstSet.type === 'folder') {
                firstSet.content = getSettingsByPriority(firstSet.content);
                const firstChild = firstSet.content[0];
                firstPriority = (firstChild.content.priority || 0);
            }
            else {
                firstPriority = firstSet.content.priority;
            }
            if (secondSet.type === 'folder') {
                secondSet.content = getSettingsByPriority(secondSet.content);
                const firstChild = secondSet.content[0];
                secondPriority = (firstChild.content.priority || 0);
            }
            else {
                secondPriority = secondSet.content.priority;
            }
            return firstPriority - secondPriority;
        });
    }
    return settings;
};
/**
 * Get settings filtered by ID array.
 */
const filterSettingByIds = (settings, ids) => {
    const filterSettings = [];
    if (Array.isArray(settings) && Array.isArray(ids)) {
        for (const setting of settings) {
            if (setting.type === 'folder') {
                const settingContent = filterSettingByIds(setting.content, ids);
                if (settingContent.length) {
                    filterSettings.push(Object.assign(Object.assign({}, setting), { content: settingContent }));
                }
                continue;
            }
            if (ids.includes(setting.content.id)) {
                filterSettings.push(setting);
            }
        }
    }
    return filterSettings;
};
/**
 * Get default (free) settings.
 */
const getDefaultSettings = (settings) => {
    const filterSettings = [];
    if (Array.isArray(settings)) {
        settings.forEach(setting => {
            if (setting.type === 'folder') {
                setting.content = getDefaultSettings(setting.content);
                if (setting.content.length) {
                    filterSettings.push(setting);
                }
                return;
            }
            const content = setting.content;
            if (!content.pro_dependent && !content.module_dependent) {
                filterSettings.push(setting);
            }
        });
    }
    return filterSettings;
};
/**
 * Get available settings (free + based on ID).
 */
const getAvailableSettings = (settings, ids = []) => {
    return getSettingsByPriority([
        ...getDefaultSettings(settings),
        ...filterSettingByIds(settings, ids),
    ]);
};
/**
 * Get a setting by ID.
 */
const getSettingById = (settings, settingId) => {
    if (Array.isArray(settings)) {
        for (const setting of settings) {
            if (setting.type === 'folder') {
                const found = getSettingById(setting.content, settingId);
                if (Object.keys(found).length > 0) {
                    return found;
                }
                continue;
            }
            if (setting.content.id === settingId) {
                return setting.content;
            }
        }
    }
    return {};
};
/**
 * Check if a setting is active.
 */
const isActiveSetting = (setting, proActive, ids) => {
    if (!setting.module_dependent)
        return true;
    if (ids.includes(setting.id)) {
        if (!setting.pro_dependent)
            return true;
        if (proActive)
            return true;
    }
    return false;
};

export { AdminFooter, AdminForm, Attachment, AutoGeneratedDefaultInput, Banner, BasicInput, BlockText, Button, ButtonCustomizer, CalendarInput, Card, CatalogCustomizer, CheckboxCustomImg, ConnectButton, CustomFrom, CustomTable, Datepicker, DefaultMeta, DisplayButton, Divider, Elements, FileInput, FormCustomizer, FreeProFormCustomizer, FromViewer, GoogleMap, Heading, HoverInputRender, IconList, InputMailchimpList, Label, Log, MapsInput, MergeComponent, ModulePopup, Modules, MultiCheckBox, MultiCheckboxTable, MultiNumInput, MultipleOptions, NestedInput, OptionMetaBox, ProPopup, RadioInput, Recaptcha, Section, SelectInput, SettingMetaBox, ShortCodeTable, SimpleInput, SubTabSection, Support, SyncMap, SyncNow, TableCell, Tabs, TemplateSection, TemplateTextarea, TextArea, Timepicker, ToggleSetting, Tour, WpEditor, filterSettingByIds, getApiLink, getApiResponse, getAvailableSettings, getDefaultSettings, getSettingById, getSettingsByPriority, isActiveSetting, sendApiResponse };
//# sourceMappingURL=index.js.map

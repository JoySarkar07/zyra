/**
 * Type definitions
 */
export type SettingContent = {
    id: string;
    priority: number;
    pro_dependent?: boolean;
    module_dependent?: boolean;
    modal: any;
    submitUrl: string;
};
type Setting = {
    type: 'folder' | string;
    content: Setting[] | SettingContent;
};
/**
 * Get settings objects as array sorted by priority.
 */
declare const getSettingsByPriority: (settings: Setting[]) => Setting[];
/**
 * Get settings filtered by ID array.
 */
declare const filterSettingByIds: (settings: Setting[], ids: string[]) => Setting[];
/**
 * Get default (free) settings.
 */
declare const getDefaultSettings: (settings: Setting[]) => Setting[];
/**
 * Get available settings (free + based on ID).
 */
declare const getAvailableSettings: (settings: Setting[], ids?: string[]) => Setting[];
/**
 * Get a setting by ID.
 */
declare const getSettingById: (settings: Setting[], settingId: string) => SettingContent | {};
/**
 * Check if a setting is active.
 */
declare const isActiveSetting: (setting: SettingContent, proActive: boolean, ids: string[]) => boolean;
export { getAvailableSettings, getSettingById, isActiveSetting, getDefaultSettings, filterSettingByIds, getSettingsByPriority, };

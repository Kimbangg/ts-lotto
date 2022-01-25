export const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => document.querySelectorAll(selector);

export const clearInputValue = ($target: HTMLInputElement) => ($target.value = '');

export const disable = ($target: HTMLInputElement | HTMLButtonElement) => ($target.disabled = true);

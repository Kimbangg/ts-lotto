export const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => document.querySelectorAll(selector);

export const clearInputValue = ($target: HTMLInputElement) => ($target.value = '');

export const show = ($target: HTMLElement) => $target.classList.remove('d-none');
export const hide = ($target: HTMLElement) => $target.classList.add('d-none');

export const disable = ($target: HTMLInputElement | HTMLButtonElement) => ($target.disabled = true);
export const enable = ($target: HTMLInputElement | HTMLButtonElement) => ($target.disabled = false);

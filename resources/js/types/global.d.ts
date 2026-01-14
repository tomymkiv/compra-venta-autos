import { Ziggy } from 'ziggy-js';

declare global {
    interface Window {
        Ziggy: Ziggy;
    }
}

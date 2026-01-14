import {route} from 'ziggy-js';

export default function ziggy(
    name: string,
    params?: any,
    absolute?: boolean
) {
    // @ts-ignore
    return route(name, params, absolute, window.Ziggy);
}

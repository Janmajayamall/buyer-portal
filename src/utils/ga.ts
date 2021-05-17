// @ts-nocheck
export function gaEvent(action: string, params: Object) {
	window.gtag("event", action, params);
}

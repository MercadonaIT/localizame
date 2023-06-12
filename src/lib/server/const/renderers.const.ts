import type { RendererInterface } from '../interfaces/renderer.interface';
import { generateAndroid } from '$lib/server//renderers/android/android.renderer';
import { generateIos } from '$lib/server/renderers/ios/ios.renderer';

export const RENDERERS: RendererInterface[] = [
	{ platform: 'android', renderer: generateAndroid },
	{ platform: 'ios', renderer: generateIos }
];

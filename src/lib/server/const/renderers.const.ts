import type { RendererInterface } from '../interfaces/renderer.interface';
import { generateAndroid } from '$lib/server//renderers/android/android.renderer';
import { generateAngular } from '$lib/server/renderers/angular/angular.renderer';
import { generateIos } from '$lib/server/renderers/ios/ios.renderer';

export const RENDERERS: RendererInterface[] = [
	{ platform: 'angular', renderer: generateAngular },
	{ platform: 'android', renderer: generateAndroid },
	{ platform: 'ios', renderer: generateIos }
];

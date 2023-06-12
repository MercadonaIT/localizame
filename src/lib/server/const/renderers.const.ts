import type { RendererInterface } from '../interfaces/renderer.interface';
import { generateAndroid } from '../renderers/android/android.renderer';

export const RENDERERS: RendererInterface[] = [{ platform: 'android', renderer: generateAndroid }];

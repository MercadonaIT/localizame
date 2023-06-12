import type { RawDataType } from './raw-data.interface';

export interface RendererInterface {
	platform: string;
	renderer: (data: RawDataType[], path: string) => Promise<void>;
}

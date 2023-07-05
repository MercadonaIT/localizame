import { join } from 'node:path';
import type { RawDataType } from '../interfaces/raw-data.interface';
import type { RendererInterface } from '../interfaces/renderer.interface';

export function processAllRenderers(
	renderers: RendererInterface[],
	platforms: string[],
	xlsx: RawDataType[],
	workspace: string
) {
	return Promise.all(
		renderers
			.filter((renderer) => platforms.some((platform) => platform === renderer.platform))
			.map(({ renderer, platform }) => renderer(xlsx, join(workspace, platform)))
	);
}

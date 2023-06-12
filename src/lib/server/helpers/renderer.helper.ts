import { RENDERERS } from '../const/renderers.const';
import { join } from 'node:path';
import type { RawDataType } from '../interfaces/raw-data.interface';

export function processAllRenderers(platforms: string[], xlsx: RawDataType[], workspace: string) {
	return Promise.all(
		RENDERERS.filter((renderer) =>
			platforms.some((platform) => platform === renderer.platform)
		).map(({ renderer, platform }) => renderer(xlsx, join(workspace, platform)))
	);
}

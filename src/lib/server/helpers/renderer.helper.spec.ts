import { beforeEach, describe, expect, it, vi } from 'vitest';
import { processAllRenderers } from './renderer.helper';
import type { RendererInterface } from '../interfaces/renderer.interface';

describe('Process all renderers', () => {
	let renderers: RendererInterface[];

	beforeEach(() => {
		renderers = [
			{
				platform: 'android',
				renderer: vi.fn()
			},
			{
				platform: 'ios',
				renderer: vi.fn()
			}
		];
	});

	it('should call android renderer', async () => {
		const platforms = ['renderer1', 'renderer2', 'android'];
		const xlsx = [{ example: 'test' }];
		const workspace = 'tmp/example';

		await processAllRenderers(renderers, platforms, xlsx, workspace);

		expect(renderers[0].renderer).toBeCalledWith(xlsx, `${workspace}/android`);
	});

	it('should call ios renderer', async () => {
		const platforms = ['renderer1', 'ios', 'renderer3'];
		const xlsx = [{ example: 'test' }];
		const workspace = 'tmp/example';

		await processAllRenderers(renderers, platforms, xlsx, workspace);

		expect(renderers[1].renderer).toBeCalledWith(xlsx, `${workspace}/ios`);
	});

	it('should call ios and android renderer', async () => {
		const platforms = ['android', 'ios'];
		const xlsx = [{ example: 'test' }];
		const workspace = 'tmp/example';

		await processAllRenderers(renderers, platforms, xlsx, workspace);

		expect(renderers[0].renderer).toBeCalledWith(xlsx, `${workspace}/android`);
		expect(renderers[1].renderer).toBeCalledWith(xlsx, `${workspace}/ios`);
	});

	it('should call no rendererers', async () => {
		const platforms = ['renderer1', 'renderer2', 'renderer3'];
		const xlsx = [{ example: 'test' }];
		const workspace = 'tmp/example';

		await processAllRenderers(renderers, platforms, xlsx, workspace);

		expect(renderers[0].renderer).not.toBeCalled();
		expect(renderers[1].renderer).not.toBeCalled();
	});
});

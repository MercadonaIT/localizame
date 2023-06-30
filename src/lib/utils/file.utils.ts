import type { MessageInterface } from '$lib/interfaces/message.interface';
import { openToast } from './swal.utils';

export function downloadFile(blob: Blob, name: string) {
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.setAttribute('style', 'display: none');
	a.href = url;
	a.download = name;
	a.click();
	window.URL.revokeObjectURL(url);
	a.remove();
}

export async function uploadFile(file: File, platforms: string[]) {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch(`/localizame/api/upload-file?platforms=${platforms.join()}`, {
		method: 'POST',
		body: formData
	}).catch();

	if (!response) {
		openToast('Unexpected error', 'error');
	} else if (response.ok) {
		const zipFile = await response.blob();
		downloadFile(zipFile, `zipped-i18n-${new Date().toJSON()}.zip`);
	} else {
		const data: MessageInterface = await response.json();
		openToast(data.message, 'error');
	}
}

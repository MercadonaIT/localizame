<script lang="ts">
	import Upload from '$lib/components/upload.svelte';
	import Actions from '$lib/components/actions.svelte';
	import { fileStore } from '$lib/stores/file.store';
	import { platformStore } from '$lib/stores/platform.store';
	import { uploadFile } from '$lib/utils/file.utils';

	async function convertFile() {
		const file = $fileStore as File;
		const platforms = $platformStore;
		uploadFile(file, platforms);
	}
</script>

<svelte:head>
	<title>Localízame | Mercadona IT</title>
	<meta property="og:title" content="Localizame | Mercadona IT" />
	<meta
		property="og:image"
		content="https://opensource.mercadona.com/localizame/images/screenshot.png"
	/>
	<meta property="og:description" content="From xlsx to native i18n for your platform" />
	<meta property="og:url" content="https://opensource.mercadona.com/localizame" />
</svelte:head>

<div class="main">
	<div class="main__upload">
		<Upload />
	</div>
	<div class="main__actions">
		<Actions on:download={convertFile} />
	</div>
</div>

<style lang="scss">
	.main {
		box-sizing: border-box;
		height: 100%;
		padding: 24px;
		display: flex;
		gap: 24px;

		@media (max-width: 1125px) {
			flex-direction: column;
		}

		& > div {
			width: 100%;
		}
	}
</style>

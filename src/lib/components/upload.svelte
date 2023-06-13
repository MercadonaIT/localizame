<script lang="ts">
	import { fileStore } from '../stores/file.store';

	let isFileOver = false;
	let inputElement: HTMLInputElement;

	$: imageUrl = $fileStore
		? 'images/uploaded-file.svg'
		: isFileOver
		? 'images/upload-file-dark.svg'
		: 'images/upload-file.svg';

	function selectFile(file?: File) {
		fileStore.select(file);
		isFileOver = false;
	}
</script>

<div
	on:dragenter|preventDefault={() => (isFileOver = true)}
	on:dragleave|preventDefault={() => (isFileOver = false)}
	on:dragover|preventDefault={() => (isFileOver = true)}
	on:drop|preventDefault={(event) => selectFile(event.dataTransfer?.files[0])}
	class="upload"
	class:upload-over={isFileOver}
>
	<div class="upload__outline">
		<img alt="Upload file illustration" src={imageUrl} />
		{#if $fileStore}
			<span>{$fileStore.name}</span>
			<input value="Upload another file" type="button" on:click={fileStore.reset} />
		{:else}
			<span>Drag and drop <span class="upload__outline__highlight">.xlsx</span> file</span>
			<span>or</span>
			<input value="Select file" type="button" on:click={() => inputElement.click()} />
		{/if}
		<input
			id="uploadInput"
			bind:this={inputElement}
			type="file"
			on:change={() => selectFile(inputElement.files?.[0])}
			accept=".xlsx,.xls"
		/>
	</div>
</div>

<style lang="scss">
	.upload {
		box-sizing: border-box;
		height: 100%;
		background-color: white;
		border-radius: 24px;
		padding: 24px;

		&__outline {
			height: 100%;
			border: 2px dashed var(--main-color);
			border-radius: 24px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20px;
			font-family: 'Roboto Flex Variable', sans-serif;
			pointer-events: none;

			&__highlight {
				color: var(--main-color);
			}

			& > img {
				height: 40%;
				margin-bottom: 14px;
			}

			& > span {
				font-weight: 200;
				font-size: 20px;
			}

			& > input {
				font-family: 'Roboto Flex Variable', sans-serif;
				background-color: var(--main-color);
				color: white;
				font-weight: 400;
				font-size: 16px;
				padding: 18px 36px;
				cursor: pointer;
				border-radius: 10px;
				pointer-events: auto;
				border: none;
			}

			& > input[type='file'] {
				display: none;
			}
		}
	}

	.upload-over {
		background-color: var(--main-color);

		.upload__outline {
			border: 2px dashed white;

			& > span {
				color: white;
			}

			& > input {
				background-color: var(--secondary-color);
				color: white;
			}

			&__highlight {
				color: var(--secondary-color);
			}
		}
	}
</style>

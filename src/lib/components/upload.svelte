<script lang="ts">
	let isFileOver = false;
</script>

<div
	on:dragenter|preventDefault={() => (isFileOver = true)}
	on:dragleave|preventDefault={() => (isFileOver = false)}
	on:dragover|preventDefault={() => (isFileOver = true)}
	on:drop|preventDefault={() => (isFileOver = false)}
	class="upload"
	class:upload-over={isFileOver}
>
	<div class="upload__outline">
		<img
			alt="Upload file illustration"
			src={isFileOver ? 'images/upload-file-dark.svg' : 'images/upload-file.svg'}
		/>
		<span>Drag and drop <span class="upload__outline__highlight">.xlsx</span> file</span>
		<span>or</span>
		<div class="upload__outline__button">Select file</div>
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

			&__button {
				background-color: var(--main-color);
				color: white;
				font-weight: 400;
				padding: 18px 36px;
				cursor: pointer;
				border-radius: 10px;
				pointer-events: auto;
			}

			& > img {
				height: 40%;
				margin-bottom: 14px;
			}

			& > span {
				font-weight: 200;
				font-size: 20px;
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

			&__highlight {
				color: var(--secondary-color);
			}

			&__button {
				background-color: var(--secondary-color);
				color: white;
			}
		}
	}
</style>

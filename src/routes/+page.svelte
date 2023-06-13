<script lang="ts">
	import Upload from '$lib/components/upload.svelte';
</script>

<div class="main">
	<div class="main__upload">
		<Upload />
	</div>
	<div class="main__actions"></div>
</div>

<style lang="scss">
	.main {
		box-sizing: border-box;
		height: 100%;
		padding: 24px;
		display: flex;
		gap: 24px;

		& > div {
			width: 100%;
		}
	}
</style>

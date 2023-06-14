<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import '@fontsource-variable/roboto-flex';
</script>

<div class="app">
	<Header />
	<div class="app__content">
		<slot />
	</div>
</div>

<style lang="scss">
	:global(body) {
		margin: 0;
		--main-color: #009960;
		--background-color: #eaeaea;
		--secondary-color: #444444;
		--light-background-color: #f6f5fa;
	}

	:global(.alert__title) {
		font-family: 'Roboto Flex Variable', sans-serif;
	}

	.app {
		display: flex;
		flex-direction: column;
		background-color: var(--background-color);
		height: 100vh;

		&__content {
			height: 100%;
			overflow: auto;
		}
	}
</style>

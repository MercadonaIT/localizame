<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title = '';
	export let selectedUrl = '';
	export let unselectedUrl = '';
	export let disabled = false;

	let selected = false;
	$: dispatch('selected', selected);

	$: imgStyle = `background-image: url('${selected ? selectedUrl : unselectedUrl}')`;
</script>

<div on:click={() => (selected = !selected)} class:disabled class="platform-card" style={imgStyle}>
	<span class="platform-card__title">{title}</span>
	<span class="platform-card__description"><slot /></span>
</div>

<style lang="scss">
	.platform-card {
		height: 100%;
		width: 100%;
		padding: 48px 25px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		background-color: var(--light-background-color);
		border-radius: 24px;
		font-family: 'Roboto Flex Variable', sans-serif;
		box-sizing: border-box;
		background-position: bottom;
		background-size: contain;
		background-repeat: no-repeat;
		cursor: pointer;

		&__title {
			font-weight: 800;
			font-size: 36px;
		}

		&__description {
			font-weight: 300;
			font-size: 24px;
		}
	}

	.disabled {
		cursor: not-allowed;
		opacity: 0.3;
	}

	.selected {
	}
</style>

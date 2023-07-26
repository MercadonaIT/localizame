<script lang="ts">
	import PlatformCard from '$lib/components/platform-card.svelte';
	import { createEventDispatcher } from 'svelte';
	import { platformStore } from '../stores/platform.store';
	import { fileStore } from '../stores/file.store';

	const dispatch = createEventDispatcher();

	function addPlatform(platform: string) {
		platformStore.addPlatform(platform);
	}

	function removePlatform(platform: string) {
		platformStore.removePlatform(platform);
	}
</script>

<div class="actions">
	<div class="actions__generate">
		<div class="actions__generate__platforms">
			<PlatformCard
				title="Android"
				unselectedUrl="images/android-background.svg"
				selectedUrl="images/android-active-background.svg"
				on:selected={({ detail }) => (detail ? addPlatform('android') : removePlatform('android'))}
			>
				Generate <strong>XML translate</strong> files for your projects.
			</PlatformCard>
			<PlatformCard
				title="iOS"
				unselectedUrl="images/ios-background.svg"
				selectedUrl="images/ios-active-background.svg"
				on:selected={({ detail }) => (detail ? addPlatform('ios') : removePlatform('ios'))}
			>
				Generate <strong>Swift</strong> files for your projects.
			</PlatformCard>
			<PlatformCard
				title="Angular"
				unselectedUrl="images/angular-background.svg"
				selectedUrl="images/angular-background.svg"
				disabled={true}
			>
				Generate <strong>JSON</strong> files for your projects.
			</PlatformCard>
		</div>
		<div class="actions__generate__download">
			<img src="images/download-person.svg" alt="Person downloading illustration" />
			<div class="actions__generate__download__action">
				<button
					on:click={() => dispatch('download')}
					class:disabled={!$platformStore.length || !$fileStore}>Download</button
				>
			</div>
		</div>
	</div>
	<div class="actions__links">
		<div class="actions__links__card">
			<span>Send us your feedback</span>
			<a href="mailto:opensource@mercadona.com">Send</a>
		</div>
		<div class="actions__links__card">
			<span>Work with us</span>
			<a
				href="https://mercadona.avature.net/es_ES/Careers/SearchJobs/IT?3_60_3=243"
				target="_blank"
			>
				Send
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.actions {
		height: 100%;
		display: flex;
		flex-direction: column;
		font-family: 'Roboto Flex Variable', sans-serif;
		gap: 24px;

		&__generate {
			height: 100%;
			background-color: white;
			border-radius: 24px;
			padding: 24px;
			display: flex;
			flex-direction: column;
			gap: 24px;

			&__platforms {
				height: 100%;
				display: flex;
				gap: 24px;

				@media (max-width: 1125px) {
					flex-direction: column;
				}
			}

			&__download {
				padding-top: 38px;
				position: relative;
				& > img {
					position: absolute;
					top: 0;
					left: 30px;

					@media (max-width: 1125px) {
						display: none;
					}
				}

				&__action {
					border-radius: 24px;
					padding: 55px 222px;
					display: flex;
					justify-content: flex-end;
					background-color: var(--light-background-color);
					background-image: url('/images/download-background.svg');
					background-size: cover;

					@media (max-width: 1125px) {
						padding: 55px;
						justify-content: center;
					}

					& > button {
						background-color: var(--main-color);
						font-family: 'Roboto Flex Variable', sans-serif;
						font-weight: 400;
						font-size: 20px;
						color: white;
						padding: 18px 35px;
						border-radius: 10px;
						border: none;
						cursor: pointer;

						&.disabled {
							background-color: var(--background-color);
							color: white;
							cursor: not-allowed;
						}
					}
				}
			}
		}

		&__links {
			display: flex;
			gap: 24px;

			@media (max-width: 1125px) {
				flex-direction: column;
			}

			&__card {
				width: 100%;
				background-color: white;
				border-radius: 24px;
				display: flex;
				flex-direction: column;
				gap: 13px;
				padding: 28px 48px;
				justify-content: flex-end;

				@media (max-width: 1125px) {
					padding: 28px;
					width: auto;
				}

				&:nth-child(1) {
					background-image: url('/images/feedback-background.svg');
				}

				&:nth-child(2) {
					background-image: url('/images/jobs-background.svg');
				}

				background-size: contain;
				background-position: right;
				background-repeat: no-repeat;

				& > span {
					font-weight: 700;
					font-size: 24px;
				}

				& > a {
					font-family: 'Roboto Flex Variable', sans-serif;
					font-weight: 400;
					padding: 18px 57px;
					border-radius: 10px;
					font-size: 20px;
					border: none;
					background-color: var(--background-color);
					width: fit-content;
					color: black;
					text-decoration: none;
				}
			}
		}
	}
</style>

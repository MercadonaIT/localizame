<div class="actions">
	<div class="actions__generate" />
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
		}

		&__links {
			display: flex;
			gap: 24px;

			&__card {
				width: 100%;
				background-color: white;
				border-radius: 24px;
				display: flex;
				flex-direction: column;
				gap: 13px;
				padding: 28px 48px;
				justify-content: flex-end;

				&:nth-child(1) {
					background-image: url('images/feedback-background.svg');
				}

				&:nth-child(2) {
					background-image: url('images/jobs-background.svg');
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

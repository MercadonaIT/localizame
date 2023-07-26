<div class="header">
	<div class="header__info">
		<img alt="Mercadona IT logo" src="images/mercadona-it.svg" />
		<div class="header__info__spacer" />
		<span class="header__info__title">Localízame</span>
	</div>
	<div class="header__links">
		<a href="https://github.com/MercadonaIT/localizame" target="_blank">
			<img alt="Github logo" src="images/github.svg" />
		</a>
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		padding: 22px 24px;
		border-top: 8px solid var(--main-color);
		background-color: white;

		&__info {
			display: flex;
			gap: 40px;

			&__spacer {
				height: 30px;
				width: 1px;
				background-color: black;

				@media (max-width: 1125px) {
					display: none;
				}
			}

			&__title {
				display: flex;
				align-items: center;
				font-family: 'Roboto Flex Variable', sans-serif;
				font-size: 24px;
				font-weight: 700;

				@media (max-width: 1125px) {
					display: none;
				}
			}
		}

		&__links {
			display: flex;
			align-items: center;

			& > a {
				height: 30px;
				width: 30px;
			}
		}
	}
</style>

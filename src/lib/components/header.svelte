<div class="header">
	<img alt="Mercadona IT logo" src="/images/mercadona-it.svg" />
	<div class="header__spacer"></div>
	<span>Localízame</span>
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		gap: 40px;
		padding: 22px 24px;
		border-top: 8px solid var(--main-color);
		background-color: white;

		&__spacer {
			height: 30px;
			width: 1px;
			background-color: black;
		}

		& > span {
			font-family: 'Roboto Flex Variable', sans-serif;
			font-size: 24px;
			font-weight: 700;
		}
	}
</style>

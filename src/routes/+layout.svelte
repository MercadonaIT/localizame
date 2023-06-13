<div class="app">
    <Header></Header>
    <div class="app__content">
        <slot></slot>
    </div>
</div>

<script lang="ts">
    import Header from '$lib/components/header.svelte'
    import "@fontsource-variable/roboto-flex"
</script>

<style lang="scss">
    :global(body) {
        margin: 0;
        --main-color: #009960;
        --background-color: #EAEAEA;
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
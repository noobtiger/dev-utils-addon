<div class="root">
	<nav>
		<slot name="navigation">
		</slot>
	</nav>

	<main>
		<slot name="header">
		</slot>
		<slot name="main">
		</slot>
	</main>
</div>

<style>
  .root {
    height: 100%;
    display: grid;
    grid-template-columns: 200px 1fr;
  }
	.root main {
		height: 100vh;
		background-color: var(--neutral-layer-2);
	}
</style>
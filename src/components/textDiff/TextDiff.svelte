<script lang="ts">
  import { MonacoDiffEditor } from '../common';
  let isComparing = false;
  let value1 = '';
  let value2 = '';

  const handleCompareClick = () => {
    isComparing = true;
  };

  const handleResetClick = () => {
    isComparing = false;
    value1 = '';
    value2 = '';
  };
</script>

<header class="button-container">
  <fast-button appearance="stealth" on:click={handleCompareClick}
    >Compare</fast-button
  >
	<fast-button appearance="stealth" on:click={handleResetClick}
		>Reset</fast-button
	>
</header>

{#if !isComparing}
  <div class="root">
    <textarea placeholder="Paste your text here." bind:value={value1}></textarea>
    <textarea placeholder="Paste your another text here." bind:value={value2}></textarea>
  </div>
{:else}
  <div class="diff-container">
    <MonacoDiffEditor value1={value1} value2={value2} />
  </div>
{/if}

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 10px;
  }

  .root textarea {
    border-color: var(--accent-fill-rest);
    width: 100%;
    height: 500px;
    border-radius: 2px;
  }

  .button-container {
    border-bottom: 1px solid lightgray;
  }
  .button-container > fast-button {
    margin: 0 5px;
  }

  .diff-container {
    height: calc(100vh - 5em);
  }
</style>
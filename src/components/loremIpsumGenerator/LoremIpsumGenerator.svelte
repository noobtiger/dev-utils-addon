<script lang="ts">
  import {loremIpsumSegments} from './utils';
  let loremIpsumText = [loremIpsumSegments[0]];
  let numberOfParagraphs = 1;
  let numberOfCharacters = 120;
  const handleCopyClick = async () => {
    let textToCopy = loremIpsumText.join('\n');
    if (numberOfCharacters) {
      const splitRegex = new RegExp('.{1,' + (numberOfCharacters ?? 0) + '}', 'g');
      textToCopy = textToCopy.match(splitRegex).join('\n');
    }
    await navigator.clipboard.writeText(textToCopy);
  };
  const handleGenerateClick = () => {
    loremIpsumText = loremIpsumSegments.slice(0, numberOfParagraphs);
  };
</script>

<header class="button-container">
  <fast-button appearance="lightweight" on:click={handleGenerateClick}
    >Generate</fast-button
  >
  <input type="number" placeholder="Paragraphs" title="Number of paragraphs to generate"  bind:value={numberOfParagraphs} min={1} max={20} />
  <fast-button appearance="lightweight" on:click={handleCopyClick}>Copy</fast-button
  >
  <input type="number" placeholder="Line length" title="Number of characters per line to copy" bind:value={numberOfCharacters} min={1} />
</header>
<div class="container">
  {#each loremIpsumText as text}
    <p>
      {text}
    </p>
  {/each}
</div>

<style>
  .container {
    height: calc(100% - 6em);
    overflow: auto;
    color: var(--neutral-foreground-rest);
  }
  .button-container {
    display: flex;
    align-items: center;
  }
  .button-container > fast-button {
    margin: 0 5px;
  }
  .button-container > input {
    border-color: var(--accent-foreground-rest);
    border-radius: 2px;
    height: 1.5em;
    width: 100px;
    background: transparent;
    color: var(--neutral-foreground-rest);
  }
  .container p {
    width: 94%;
    text-align: justify;
    margin: 10px 3%;
  }
</style>

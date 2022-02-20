<script lang="ts">
  import {loremIpsumSegments} from './utils';
  let loremIpsumText = [loremIpsumSegments[0]];
  let numberOfParagraphs;
  let numberOfCharacters;
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
  <input type="number" placeholder="Paragraphs"  bind:value={numberOfParagraphs} min={1} max={20} />
  <fast-button appearance="stealth" on:click={handleGenerateClick}
    >Generate</fast-button
  >
  <fast-button appearance="stealth" on:click={handleCopyClick}>Copy</fast-button
  >
  <input type="number" placeholder="Line length"  bind:value={numberOfCharacters} min={1} />
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
  }
  .button-container {
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
  }
  .button-container > fast-button {
    margin: 0 5px;
  }
  .button-container > input {
    border-color: var(--accent-fill-rest);
    border-radius: 4px;
    height: 2em;
    width: 100px;
  }
  .container p {
    width: 94%;
    text-align: justify;
    margin: 10px 3%;
  }
</style>

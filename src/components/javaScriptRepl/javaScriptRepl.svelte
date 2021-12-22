<script lang="ts">
  import { MonacoEditor } from '../common';
  import IframeContainer from './IframeContainer.svelte';

  let consoleContainerElement;
  let iframeContainerChild;
  let consoleMessages = [];
  let editorContentValue = [
    'function foo() {',
    '\tconsole.log("Hello world!");',
    '}',
  ].join('\n');

  const handleRunClick = () => {
    iframeContainerChild.runScript();
    // consoleMessages = [...consoleMessages, { text: 'New run!', isBoldClass: true }];
  };

  const handleDraggableMouseDown = (event) => {
    event.preventDefault();
    document.onmouseup = handleDocumentMouseUp;
    document.onmousemove = handleDocumentMouseMove;
  };

  const handleDocumentMouseMove = (event) => {
    event.preventDefault();
    consoleContainerElement.style[
      'height'
    ] = `clamp(100px, 100vh - ${event.clientY}px, 80vh)`;
  };

  const handleDocumentMouseUp = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const handleEditorUpdate = (event) => {
    editorContentValue = event.detail.value;
  };

  const handleEditorMessage = (event) => {
    consoleMessages = [ ...consoleMessages, {text: JSON.stringify(event.detail.value, undefined, 2)} ];
  };

  const handleClearMessages = (event) => {
    event.preventDefault();
    consoleMessages = [];
  };
</script>

<div class="container">
  <section class="button-container">
    <fast-button appearance="stealth" on:click={handleRunClick}>Run</fast-button
    >
  </section>
  <MonacoEditor bind:value={editorContentValue} on:update={handleEditorUpdate} />
</div>

<section class="console-container" bind:this={consoleContainerElement}>
  <header on:mousedown={handleDraggableMouseDown}>
    <div>Console</div>
    <fast-button appearance="lightweight" on:click={handleClearMessages}>Clear</fast-button>
  </header>
  <section class="console-messages-container">
    {#each consoleMessages as message}
      <article class={message.isBoldClass ? 'message-bold' : ''}>{message.text}</article>
    {/each}
  </section>
</section>

<IframeContainer bind:value={editorContentValue} bind:this={iframeContainerChild} on:editormessage={handleEditorMessage} />

<style>
  .container {
    height: calc(100% - 6em);
  }
  .button-container {
    display: flex;
    border-bottom: 1px solid lightgray;
    justify-content: flex-start;
  }
  .button-container > fast-button {
    width: 100px;
  }
  .console-container {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: calc(100% - 200px);
    border-top: 2px solid var(--accent-fill-rest);
    height: 250px;
    background-color: var(--fill-color);
    overflow: auto;
  }
  .console-container > header {
    font-size: 1.1rem;
    font-weight: 400;
    padding: 2px 5px;
    position: fixed;
    height: 30px;
    line-height: 25px;
    width: calc(100% - 200px);
    background-color: var(--fill-color);
    display: grid;
    grid-template-columns: 1fr 100px;
    border-top: 2px solid transparent;
  }
  .console-container > header:hover {
    border-top: 2px solid var(--accent-fill-focus);
    cursor: row-resize;
  }

  .console-container > header fast-button {
    height: 26px;
  }

  .console-messages-container {
    margin-top: 30px;
  }

  .console-messages-container > article {
    font-size: 0.9rem;
    border-bottom: 1px solid lightgray;
    padding: 0 10px;
  }

  .console-messages-container > article.message-bold {
    font-weight: 700;
    padding: 5px 10px;
    border-top: 1px solid darkgray;
  }
</style>

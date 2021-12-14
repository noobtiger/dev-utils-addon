<script lang="ts">
  import { MonacoEditor } from '../common';

  let consoleContainerElement;

  const handleRunClick = () => {};

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
</script>

<div class="container">
  <section class="button-container">
    <fast-button appearance="stealth" on:click={handleRunClick}>Run</fast-button
    >
  </section>
  <MonacoEditor />
</div>

<section class="console-container" bind:this={consoleContainerElement}>
  <header on:mousedown={handleDraggableMouseDown}>Console</header>
  <article />
</section>

<style>
  .container {
    height: calc(100% - 6em);
  }
  .button-container {
    border-bottom: 1px solid lightgray;
  }
  .console-container {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: calc(100% - 200px);
    border-top: 0.5px solid var(--accent-fill-rest);
    height: 250px;
    background-color: var(--fill-color);
    overflow: auto;
  }
  .console-container > header {
    font-size: 1.1em;
    font-weight: 400;
    padding: 2px 5px;
    box-sizing: border-box;
    text-decoration: underline;
  }
  .console-container > header:hover {
    border-top: 3px solid var(--accent-fill-focus);
    cursor: row-resize;
  }

  .console-container > article {
    padding: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--accent-fill-rest);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>

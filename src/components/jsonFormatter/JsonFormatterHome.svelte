<script lang="ts">
  import JsonTreeItem from './JsonTreeItem.svelte';
  import { MonacoEditor } from '../common';

  let jsonString = '';
  let containerElement;

  const handleUpdate = (event) => {
    jsonString = event.detail.value;
  };

  $: jsonObject = {};

  $: {
    try {
      jsonObject = JSON.parse(jsonString);
    } catch (ex) {
      jsonObject = {};
    }
  }

  const handleDocumentMouseMove = (event) => {
    event.preventDefault();
    containerElement.style[
      'grid-template-columns'
    ] = `clamp(230px, ${event.clientX}px, 80%) 10px 1fr`;
  };

  const handleDocumentMouseUp = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const handleDraggableMouseDown = (event) => {
    event.preventDefault();
    document.onmouseup = handleDocumentMouseUp;
    document.onmousemove = handleDocumentMouseMove;
  };

  const handleFormatClick = () => {
    jsonString = JSON.stringify(jsonObject, undefined, 2);
  };

	const handleMinifyClick = () => {
    jsonString = JSON.stringify(jsonObject, undefined, 0);
	};

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(jsonString);
  };

  const handleDownloadClick = () => {
    function downloadObjectAsJson(exportObj, exportName) {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(exportObj, undefined, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', exportName + '.json');
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
    downloadObjectAsJson(jsonObject, 'download');
  };
</script>

<header class="button-container">
  <fast-button appearance="stealth" on:click={handleFormatClick}
    >Beautify</fast-button
  >
	<fast-button appearance="stealth" on:click={handleMinifyClick}
		>Minify</fast-button
	>
  <fast-button appearance="stealth" on:click={handleDownloadClick}
    >Download</fast-button
  >
  <fast-button appearance="stealth" on:click={handleCopyClick}>Copy</fast-button
  >
</header>
<article class="container" bind:this={containerElement}>
  <section class="text-area-container">
    Paste your JSON data here:
    <MonacoEditor
      language="json"
      bind:value={jsonString}
      on:update={handleUpdate}
    />
    <!-- <textarea on:input={handleJsonStringChange} placeholder={`{}`} bind:value={jsonString} /> -->
  </section>
  <section class="draggable" on:mousedown={handleDraggableMouseDown}>
    <div />
  </section>
  <section class="json-tree-view">
    {#if jsonString}
      <fast-tree-view expanded={true}>
        <JsonTreeItem json={jsonObject} rootKey="" />
      </fast-tree-view>
    {/if}
  </section>
</article>

<style>
  .container {
    display: grid;
    grid-template-columns: 2fr 10px 1fr;
    height: calc(100% - 6em);
    gap: 5px;
    padding: 5px;
  }
  .button-container {
    border-bottom: 1px solid lightgray;
  }
  .button-container > fast-button {
    margin: 0 5px;
  }

  .text-area-container {
    height: calc(100% - 2em);
  }

  .json-tree-view {
    border: 1px solid darkgray;
    border-radius: calc(var(--control-corner-radius) * 1px);
    overflow: auto;
    height: calc(100vh - 6em);
  }

  .draggable {
    height: 100%;
    cursor: col-resize;
    box-sizing: border-box;
  }

  .draggable:hover {
    height: 100%;
    border: 3px solid darkgray;
    background-color: lightgray;
  }

  .draggable > div {
    margin: 0 3px;
    height: 100%;
    background-color: lightgray;
  }
</style>

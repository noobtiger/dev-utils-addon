<script lang="ts">
  import JsonTreeItem from './JsonTreeItem.svelte';
  import { MonacoEditor, VerticalDragComponent } from '../common';

  let jsonString = '';

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

<div class="container">
  <VerticalDragComponent>
    <section class="text-area-container" slot="left">
      Paste your JSON data here:
      <MonacoEditor
        language="json"
        bind:value={jsonString}
        on:update={handleUpdate}
      />
    </section>
    <section class="json-tree-view" slot="right">
      {#if jsonString}
        <fast-tree-view expanded={true}>
          <JsonTreeItem json={jsonObject} rootKey="" />
        </fast-tree-view>
      {/if}
    </section>
  </VerticalDragComponent>
</div>


<style>
  .container {
    height: calc(100% - 6em);
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
</style>

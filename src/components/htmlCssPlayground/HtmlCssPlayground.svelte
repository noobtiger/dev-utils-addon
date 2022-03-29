<script lang="ts">
  import { MonacoEditor, VerticalDragComponent } from '../common';
  import IframeElement from './IframeElement.svelte';

  let htmlContentValue;
  let cssContentValue;
  const handleHtmlUpdate = () => {

  };

  const handleCssUpdate = () => {

  };
</script>

<div class="container">
  <VerticalDragComponent>
    <section class="playground-editor" slot="left">
      <div>
        <div class="editor-label html">HTML</div>
        <MonacoEditor bind:value={htmlContentValue} on:update={handleHtmlUpdate} language="html" />
      </div>
      <div>
        <div class="editor-label css">CSS</div>
        <MonacoEditor bind:value={cssContentValue} on:update={handleCssUpdate} language="css" />
      </div>
    </section>
    <section slot="right">
      <div class="output-container">
        <IframeElement bind:cssContent={cssContentValue}  bind:htmlContent={htmlContentValue} />
      </div>
    </section>
  </VerticalDragComponent>
</div>

<style>
  .container {
    height: calc(100vh - 3em);
  }
  .playground-editor {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }
  .playground-editor > div {
    border-bottom: 1px solid var(--accent-fill-rest);
    position: relative;
  }
  .editor-label {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
  }
  .html {
    background-color: #ff3c41;
  }
  .css {
    background-color: #0ebeff;
  }
  .output-container {
    border: 1px solid var(--neutral-stroke-rest);
    height: 100%;
  }
</style>

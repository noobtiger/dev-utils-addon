<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  export let htmlContent = '';
  export let cssContent = '';

  let iframeContainerChild;
  let iframeDocument;

  onMount(() => {
    iframeDocument = iframeContainerChild.contentWindow.document;
    writeContentToWrite(htmlContent, cssContent, iframeDocument);
  });

  afterUpdate(() => {
    writeContentToWrite(htmlContent, cssContent, iframeDocument);
	});

  function writeContentToWrite(htmlContentValue, cssContentValue, iframeDocumentEl) {
    const contentToWrite = htmlContentValue;
    iframeDocumentEl.open();
    iframeDocumentEl.write(contentToWrite);
    iframeDocumentEl.close(); 
  }
</script>

<iframe title="output container for Html and CSS playground"  bind:this={iframeContainerChild}>
</iframe> 


<style>
  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
</style>
<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  export let htmlContent = '';
  export let cssContent = '';

  let iframeContainerChild;
  let iframeDocument;

  onMount(() => {
    iframeDocument = iframeContainerChild.contentWindow.document;
  });

  afterUpdate(() => {
    if (iframeDocument) {
      iframeDocument.body.innerHTML = '';
      iframeDocument.body.innerHTML = htmlContent;
      let styleElement = iframeDocument.head.querySelector('style');
      if (!styleElement) {
        styleElement = iframeDocument.createElement('style');
        iframeDocument.head.appendChild(styleElement);
      }
      styleElement.innerHTML = cssContent;
    }
  });
</script>

<iframe
  title="output container for Html and CSS playground"
  bind:this={iframeContainerChild}
/>

<style>
  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
</style>

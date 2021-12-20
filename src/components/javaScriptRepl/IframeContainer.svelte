<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  export let value;

  const EDITOR_CONSOLE_MESSAGE_ID = 'editormessage';
  const customIframeScript = `
    const updatedConsole = (function(currentConsole, window) {
      return {
        ...currentConsole,
        log: function(message) {
          window.parent.postMessage(message);
          currentConsole.log(message);
        }
      };
    }(window.console, window));

    window.console = updatedConsole;
  `;

  let iframeSrcDoc: string = '';
  let iframeElement: HTMLIFrameElement;

  const dispatch = createEventDispatcher();
  
  export const runScript = () => {
    iframeSrcDoc = `
    <html>
          <script>
            'use strict;'
            ${customIframeScript}
            ${value}
          <\/script>
      <\/html>
    `;
    iframeElement.contentWindow.location.reload();
  };

  onMount(() => {
    window.addEventListener('message', (event) => {
      dispatch(EDITOR_CONSOLE_MESSAGE_ID, {
        value: event.data,
      });
    });
  });

</script>

<iframe title="Iframe container" style="display: none;" srcdoc={iframeSrcDoc} bind:this={iframeElement} />

<style>
</style>
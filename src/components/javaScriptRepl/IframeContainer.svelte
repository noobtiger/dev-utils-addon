<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  export let value;

  const EDITOR_SCRIPT_ID = 'editor-script';
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

  let iframeElement: HTMLIFrameElement;

  const dispatch = createEventDispatcher();
  
  export const runScript = () => {
    const iframeBodyElement = iframeElement.contentDocument.body;
    const scriptElement = document.createElement('script');
    scriptElement.textContent = `
      'use strict;'
      ${customIframeScript}
      ${value}
    `;
    scriptElement.id = EDITOR_SCRIPT_ID;
    iframeBodyElement.append(scriptElement);
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

<iframe title="Iframe container" style="display: none;" bind:this={iframeElement}>
  <script id={EDITOR_SCRIPT_ID}></script>
</iframe>

<style>
</style>
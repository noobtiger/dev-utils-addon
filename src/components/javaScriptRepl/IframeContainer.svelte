<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  export let value;
  let originalConsole;
  const EDITOR_CONSOLE_MESSAGE_ID = 'editormessage';

  onMount(() => {
    const updatedConsole = (function (currentConsole, window) {
      return {
        ...currentConsole,
        log: function (message) {
          dispatch(EDITOR_CONSOLE_MESSAGE_ID, {
            value: message,
          });
          currentConsole.log(message);
        },
      };
    })(window.console, window);
    originalConsole = window.console;
    window.console = updatedConsole;
  });

  const dispatch = createEventDispatcher();

  export const runScript = () => {
    Function(value)();
  };

  onDestroy(() => {
    window.console = originalConsole;
  });
</script>

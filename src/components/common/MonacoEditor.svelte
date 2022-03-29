<script lang="ts">
  import type monaco from 'monaco-editor';
  import { onMount, createEventDispatcher, afterUpdate } from 'svelte';
  import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

  export let language = 'javascript';
  export let value = '';

  const dispatch = createEventDispatcher();
  let divEl: HTMLDivElement = null;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let Monaco;

  onMount(async () => {
    // @ts-ignore
    self.MonacoEnvironment = {
      getWorker: function (_moduleId: any, label: string) {
        if (label === 'json') {
          return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker();
        }
        return new EditorWorker();
      },
    };

    Monaco = await import('monaco-editor');
    editor = Monaco.editor.create(divEl, {
      value: value,
      language,
      minimap: {
        enabled: false,
      },
      automaticLayout: true,
      theme: 'vs-dark',
    });

    editor.onDidChangeModelContent(event => {
      value = editor.getModel().getValue();
      dispatch('update', {
        value,
      });
    });

    return () => {
      editor.dispose();
    };
  });

  afterUpdate(() => {
    if (editor && value !== editor.getModel().getValue()) {
      editor.getModel().setValue(value);
    }
  });
</script>

<div bind:this={divEl} class="monaco-editor-container" />

<style>
  .monaco-editor-container {
    height: 100%;
  }
</style>

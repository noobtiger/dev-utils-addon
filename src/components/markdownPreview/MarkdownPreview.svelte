<script lang="ts">
  import { marked } from 'marked';
  import { afterUpdate } from 'svelte';
  import { VerticalDragComponent } from '../common';

  let markdownValue;
  let markdownHtml = '<p />';

  afterUpdate(() => {
    if (markdownValue) {
      markdownHtml = marked.parse(markdownValue);
    } else {
      markdownHtml = '<p />'
    }
  });
</script>


<div class="container">
  <VerticalDragComponent>
    <section class="markdown-editor" slot="left">
      <textarea placeholder="Paste your markdown here." bind:value={markdownValue}></textarea>
    </section>
    <section class="markdown-preview" slot="right">
      {@html markdownHtml}
    </section>
  </VerticalDragComponent>
</div>

<style>
  .container {
    height: calc(100% - 4em);
  }

  .container textarea {
    border-color: transparent;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: var(--neutral-layer-4);
  }

  .markdown-preview {
    padding: 0 10px;
    overflow: auto;
  }
</style>
<script lang="ts">
  export function isValueString(value: unknown): value is string {
    return typeof value === 'string';
  }

  export function isValueObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object';
  }

  export function isValueArray(value: unknown): value is Array<unknown> {
    return Array.isArray(value);
  }

  export let json;
  export let rootKey = '';
</script>

{#if isValueArray(json)}
  <fast-tree-item  expanded={true}>
    <span>{rootKey ? `${rootKey}:` : ''}</span>&nbsp;&nbsp;[
    {#each json as jsonArrayItem}
      <svelte:self json={jsonArrayItem}/>
		{/each}
  </fast-tree-item>
  <fast-tree-item>],</fast-tree-item>
{:else if isValueObject(json)}
  <fast-tree-item  expanded={true}>
    {`{`}
    {#each Object.keys(json) as jsonKey}
      <svelte:self json={json[jsonKey]} rootKey={jsonKey} />
    {/each}
  </fast-tree-item>
  <fast-tree-item>},</fast-tree-item>
{:else if isValueString(json)}
  <fast-tree-item>
    {#if rootKey}
      <span>{rootKey}</span>:&nbsp;&nbsp;
    {/if}
    <span class="string-color">"{json.toString()}"</span>,
  </fast-tree-item>
{:else}
  <fast-tree-item>
    {#if rootKey}
      <span>{rootKey}</span>:&nbsp;&nbsp;
    {/if}
    <span class="number-color">{json.toString()}</span>,
  </fast-tree-item>
{/if}

<style>
  .string-color {
    color: #ce9178;
  }
  .number-color {
    color: #b5cea8;
  }
  fast-tree-item::part(positioning-region) {
    height: auto;
  }
  fast-tree-item::part(content-region) {
    height: 1rem;
    line-height: 1rem;
  }
  fast-tree-item span {
    color: #9cdcfe;
  }
</style>
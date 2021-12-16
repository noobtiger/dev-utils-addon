<script lang="ts">
  import { Link, useLocation } from 'svelte-navigator';

  import { appLinks } from '../../utils/appConfig';

  const location = useLocation();
  $: locationPath = $location.pathname.split('/')[1];
</script>

<fast-tree-view class="container">
  {#each appLinks as { key, title, icon }}
    <div class="wrapper">
      <Link to={key} class="link">
        <fast-tree-item class="tree-item" selected={key === locationPath}>
          <img class="link-icon" src={icon} alt={title} />
          <span class="title">{title}</span>
        </fast-tree-item>
      </Link>
    </div>
  {/each}
  <div class="tree-item gap-container"></div>
</fast-tree-view>

<style>
  .container {
    height: 100%;
  }
  .gap-container {
    height: 100%;
  }
  .link-icon {
    height: 15px;
    width: 15px;
    margin-right: 10px;
  }
  .tree-item {
    background-color: rgba(255, 255, 255, .3);
    backdrop-filter: blur(5px);
  }
  .wrapper :global(.link) {
    text-decoration: none;
    color: inherit;
  }
  .title {
    font-weight: 500;
  }
</style>

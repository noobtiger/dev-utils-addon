<script lang="ts">
  import { Link, useLocation } from 'svelte-navigator';
  import { appLinks } from '../../utils/appConfig';

  const location = useLocation();
  $: locationPath = $location.pathname.split('/')[1];
  $: appTitle = appLinks.find(appLink => appLink.key === locationPath)?.title || 'Home';
</script>

<div class="root">
  {appTitle}
</div>

<style>
  .root {
    text-align: center;
    font-size: 1.2rem;
    line-height: 2rem;
    width: 100%;
    border-bottom: 0.5px solid var(--accent-fill-rest);
  }
</style>
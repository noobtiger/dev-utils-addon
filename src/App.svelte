<script lang="ts">
  import './global.css';
  import { Router, Route } from 'svelte-navigator';
  import { AppBody, Navigation, Header } from './components/common';
  import { appLinks } from './utils/appConfig';
  import { registerFastComponents } from './utils/registerFastComponents';

  registerFastComponents();
</script>

<Router>
  <AppBody>
    <svelte:fragment slot="navigation">
      <Navigation />
    </svelte:fragment>
    <svelte:fragment slot="header">
      <Header />
    </svelte:fragment>
    <svelte:fragment slot="main">
      <!-- <Route path={`/${AppKeyEnum.JsonFormatter}`}>
				<JsonFormatterHome />
			</Route> -->
      {#each appLinks as { key, component }}
        <Route path={`/${key}`}>
          <svelte:component this={component} />
        </Route>
      {/each}
    </svelte:fragment>
  </AppBody>
</Router>

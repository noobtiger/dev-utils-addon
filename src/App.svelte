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
        <Route path={`/${key}`} primary={false}>
          <svelte:component this={component} />
        </Route>
      {/each}
      <Route path="">
        Please select a tool in the left.
      </Route>
    </svelte:fragment>
  </AppBody>
</Router>

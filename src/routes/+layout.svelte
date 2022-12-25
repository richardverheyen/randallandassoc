<script>
  import { Toaster } from "svelte-french-toast";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
  <Toaster />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

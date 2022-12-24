<script>
	import { Toaster } from 'svelte-french-toast';
  import Header from './Header.svelte';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<footer>
		<p>📞 03 8880 9919</p>
		<p>✉️ holler@goodcallcopywriting.com</p>
	</footer>
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

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px 0;
		padding: 12px;
	}

</style>

<script>
	import { page } from '$app/stores';
</script>

<header>
	<nav class="gutters">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/property-and-conveyancing' ? 'page' : undefined}>
				<a href="/property-and-conveyancing">Property &amp; Conveyancing</a>
			</li>
			<li aria-current={$page.url.pathname === '/personal-injury' ? 'page' : undefined}>
				<a href="/personal-injury">Personal Injury</a>
			</li>
			<li aria-current={$page.url.pathname === '/wills-and-estates' ? 'page' : undefined}>
				<a href="/wills-and-estates">Wills &amp; Estates</a>
			</li>
			<li aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: center;
		background: #282e3c;

		nav {
			display: flex;
			justify-content: center;

			ul {
				position: relative;
				padding: 0;
				margin: 0;
				height: 3em;
				display: flex;
				justify-content: center;
				align-items: center;
				list-style: none;
				background-size: contain;
				
				li {
					position: relative;
					height: 100%;

					&[aria-current="page"] {
						background-color: var(--color-theme-2);
					}
				}
			}

			a {
				display: flex;
				height: 100%;
				align-items: center;
				padding: 0 0.5rem;
				color: var(--color-text);
				font-weight: 700;
				font-size: 0.8rem;
				text-transform: uppercase;
				letter-spacing: 0.1em;
				text-decoration: none;
				transition: color 0.2s linear;

				&:hover {
					color: var(--color-theme-1);
				}
			}
		}
	}
</style>

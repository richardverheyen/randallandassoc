<script>
	import { page } from '$app/stores';
	import logo from "$lib/logo.svg";
</script>

<header>
	<nav class="gutters">
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" class='logo'>
					<img src={logo} alt="logo" />
				</a>
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
		background: #282e3c;

		nav {
			display: flex;

			ul {
				position: relative;
				padding: 0;
				margin: 0;
				height: 8em;
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
				font-weight: 700;
				font-size: 0.8rem;
				text-transform: uppercase;
				letter-spacing: 0.1em;
				text-decoration: none;
				transition: color 0.2s linear;
				color: white;

				&.logo {
					width: 210px;
					position: relative;
					overflow: hidden;
				}

				> img {
					position: absolute;
					top: 46%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: auto;
					height: 190px;
				}

				&:hover {
					color: var(--color-theme-1);
					color: darken(white, 50%);

				}
			}
		}
	}
</style>

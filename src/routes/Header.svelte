<script>
  import { page } from "$app/stores";
  import logo from "$lib/logo.svg";

  import IconButton from "@smui/icon-button";
  import { Icon } from "@smui/common";

  import Drawer, { Content, Scrim } from "@smui/drawer";

  let open = false;
</script>

<Scrim fixed={false} />
<header>
  <nav class="gutters">
    <a href="/" class="logo">
      <img src={logo} alt="logo" />
    </a>

    <ul>
      <li
        aria-current={$page.url.pathname === "/property-and-conveyancing"
          ? "page"
          : undefined}
      >
        <a href="/property-and-conveyancing">Property &amp; Conveyancing</a>
      </li>
      <li
        aria-current={$page.url.pathname === "/personal-injury"
          ? "page"
          : undefined}
      >
        <a href="/personal-injury">Personal Injury</a>
      </li>
      <li
        aria-current={$page.url.pathname === "/wills-and-estates"
          ? "page"
          : undefined}
      >
        <a href="/wills-and-estates">Wills &amp; Estates</a>
      </li>
      <li aria-current={$page.url.pathname === "/contact" ? "page" : undefined}>
        <a href="/contact">Contact</a>
      </li>
    </ul>
    <div id="hamburger">
      <IconButton
        on:click={() => {
          open = !open;
        }}
        ><Icon class="material-icons" style="color: white;"
          >{open ? "close" : "menu"}</Icon
        ></IconButton
      >
    </div>
  </nav>
</header>

<Drawer
  variant="modal"
  fixed={false}
  style="background: #282d3c; width: 500px; max-width: calc(100vw - 80px)"
  bind:open
>
  <Content style="width: 500px; max-width: calc(100vw - 80px)">
    <ul class="mobile-nav">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        aria-current={$page.url.pathname === "/"
          ? "page"
          : undefined}
        on:click={() => {
          open = false;
        }}
      >
        <h2 class="mdc-typography--heading2">
          <a href="/property-and-conveyancing">Home</a>
        </h2>
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        aria-current={$page.url.pathname === "/property-and-conveyancing"
          ? "page"
          : undefined}
        on:click={() => {
          open = false;
        }}
      >
        <h2 class="mdc-typography--heading2">
          <a href="/property-and-conveyancing">Property &amp; Conveyancing</a>
        </h2>
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        aria-current={$page.url.pathname === "/personal-injury"
          ? "page"
          : undefined}
        on:click={() => {
          open = false;
        }}
      >
        <h2 class="mdc-typography--heading2">
          <a href="/personal-injury">Personal Injury</a>
        </h2>
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        aria-current={$page.url.pathname === "/wills-and-estates"
          ? "page"
          : undefined}
        on:click={() => {
          open = false;
        }}
      >
        <h2 class="mdc-typography--heading2">
          <a href="/wills-and-estates">Wills &amp; Estates</a>
        </h2>
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        aria-current={$page.url.pathname === "/contact" ? "page" : undefined}
        on:click={() => {
          open = false;
        }}
      >
        <h2 class="mdc-typography--heading2">
          <a href="/contact">Contact</a>
        </h2>
      </li>
    </ul>

    <a href="/" class="logo"
    on:click={() => {
      open = false;
    }}>
      <img src={logo} alt="logo" />
    </a>
  </Content>
</Drawer>

<style lang="scss">
  header {
    background: #282e3c;

    nav {
      display: flex;
      align-items: center;
      width: 100%;

      ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 8em;
        width: 100%;
        display: flex;
        align-items: center;
        list-style: none;
        background-size: contain;

        @media (max-width: 1000px) {
          display: none;
        }

        li {
          position: relative;
          height: 100%;
          margin-left: 1em;

          &[aria-current="page"] {
            background-color: var(--color-theme-2);
          }
        }
      }

      #hamburger {
        margin-left: auto;
        @media (min-width: 1001px) {
          display: none;
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
          width: 240px;
          height: 8em;
          position: relative;
          overflow: hidden;
          @media (max-width: 420px) {
            width: 180px;
            height: 7em;
          }
        }

        > img {
          position: absolute;
          top: 46%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: auto;
          height: 190px;

          @media (max-width: 420px) {
            height: 160px;
          }
        }

        &:hover {
          color: var(--color-theme-1);
          color: darken(white, 50%);
        }
      }
    }
  }

  ul.mobile-nav {
    display: flex;
    flex-direction: column;
    padding: 3em;

    li {
      list-style: none;
      h2 a,
      h2 a:link,
      h2 a:visited {
        color: white;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      &[aria-current="page"] h2 a {
        text-decoration: underline;
      }
    }
  }
</style>

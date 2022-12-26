<script>
  import Testimonials from "./Testimonials.svelte";
  import { goto } from '$app/navigation';

  import Button, { Label, Icon } from '@smui/button';

  import banner2 from "$lib/images/home-banner2.webp";
  import banner1 from "$lib/images/home-banner1.webp";
  import bannerFull from "$lib/images/home-banner-full.jpg";

  import logo from "$lib/logo.svg";
</script>

<svelte:head>
  <title>Randall and Associates</title>
  <meta
    name="Randall and Associates"
    content="Joshua Randall is the Director/Principal Lawyer of Randall & Associates, a law firm providing legal services focusing in Property & Conveyancing, Personal Injury, and Wills & Estate matters."
  />
</svelte:head>

<section>
  <div class="hero">
    <picture>
      <source type="image/webp" srcset={banner1} media="(max-width: 1200px)" />
      <source
        type="image/webp"
        srcset={banner2}
        media="(min-resolution: 50dpi)"
      />
      <source type="image/webp" srcset={banner1} />

      <img src={bannerFull} alt="A work station with coffee" />
    </picture>
    <div class="logo">
      <img src={logo} alt="Randall and Associates" />
    </div>
  </div>
</section>

<section>
  <div class="gutters about">
    <div class="left">
      <h2 class="mdc-typography--heading2">
        Sydney Lawyers & Conveyancers<br /> you can count on.
      </h2>
    </div>
    <div class="right">
      <p class="about mdc-typography--body1">
        For over twenty years Joshua Randall has represented and supported the
        legal interests of a diverse range of individuals and companies
        throughout New South Wales. Putting YOU first is crucial as we develop
        realistic and sustainable legal solutions that work when you most need
        it.
      </p>
    </div>
  </div>
</section>

<section style="background: #E8D6B3;">
  <div class="gutters services">
    <h2 class="mdc-typography--headline2">
      Services we offer
    </h2>
    <ul>
      <li>Property and Conveyancing</li>
      <li>Personal Injury</li>
      <li>Wills and Estates</li>
    </ul>
    
  </div>
</section>

<Testimonials />

<section>
  <div class="gutters contact-us">
    <h2 class="mdc-typography--heading2">
      Contact us.<br /> Get in touch today for a fast responce within 24hrs.
    </h2>
    <p class="about mdc-typography--body1">
      Randall and Associates are ready to assit you with your legal matters.
      Contact us for fast, easy and affordable service.
    </p>
    <Button on:click={() => goto('/contact')} variant="unelevated" style="height: 44px; min-width: 250px;">
      <Icon class="material-symbols-rounded">mail</Icon>
      <Label>Enquire Online</Label>
    </Button>
  </div>
</section>


<style lang="scss">
  .logo {
    position: absolute;
    width: 400px;
    max-width: calc(100vw - 2em);
    height: 180px;
    max-height: calc((100vw - 2em) / 2.5);
    overflow: hidden;

    > img {
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      width: 125%;
    }
  }

  .about {
    display: flex;
    justify-content: center;
    padding: 2em 0;

    @media (max-width: 1000px) {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }

    > div {
      display: flex;
      align-items: center;
      max-width: 500px;
      padding: 0 2em;
    }
  }

  .services {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em 0;

    ul {
      padding: 0;
      text-align: center;
      
      > li {
        list-style: none;
      }
    }
  }

  .contact-us {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 6em;

    p {
      padding: 0;
      margin-top: 0;
    }
}
</style>

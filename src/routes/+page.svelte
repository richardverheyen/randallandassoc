<script>
  import Testimonials from "./Testimonials.svelte";
  import { goto } from "$app/navigation";

  import Button, { Label, Icon } from "@smui/button";
  import Card, { Content, Media, PrimaryAction } from "@smui/card";
  let clicked = 0;

  import banner2 from "$lib/images/home-banner2.webp";
  import banner1 from "$lib/images/home-banner1.webp";
  import bannerFull from "$lib/images/home-banner-full.jpg";

  import logo from "$lib/logo.svg";
  let vars = `background-image: url(${banner2});`;
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

      <img src={bannerFull} alt="A city scape" />
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
        realistic and sustainable legal solutions that work when you need it
        most.
      </p>
    </div>
  </div>
</section>

<section style="background: #E8D6B3;">
  <div class="gutters services">
    <!-- <h2 class="mdc-typography--headline2">Services we offer</h2> -->
    <ul class="card-container">
      <li>
        <a href="/property-and-conveyancing" style="text-decoration: none;">
          <Card>
            <PrimaryAction>
              <Media
                class="card-media-16x9"
                aspectRatio="16x9"
                style="background: #484c5a;position: relative"
                ><span class="material-symbols-outlined icon">
                  real_estate_agent
                </span>
              </Media>
              <Content>Property and Conveyancing</Content>
            </PrimaryAction>
          </Card>
        </a>
      </li>
      <li>
        <a href="/personal-injury" style="text-decoration: none;">
          <Card>
            <PrimaryAction>
              <Media
                class="card-media-16x9"
                aspectRatio="16x9"
                style="background: #484c5a;position: relative"
                ><span class="material-symbols-outlined icon">
                  personal_injury
                </span>
              </Media>
              <Content>Personal Injury</Content>
            </PrimaryAction>
          </Card>
        </a>
      </li>
      <li>
        <a href="/wills-and-estates" style="text-decoration: none;">
          <Card>
            <PrimaryAction>
              <Media
                class="card-media-16x9"
                aspectRatio="16x9"
                style="background: #484c5a;position: relative"
                ><span class="material-symbols-outlined icon">
                  history_edu
                </span></Media
              >
              <Content>Wills and Estates</Content>
            </PrimaryAction>
          </Card>
        </a>
      </li>
    </ul>
  </div>
</section>

<Testimonials />

<section id="contact-us" style={vars}>
  <div class="gutters">
    <h2 class="mdc-typography--heading2">
      Contact us.<br /> Get in touch today for a fast responce within 24hrs.
    </h2>
    <p class="about mdc-typography--body1">
      Randall and Associates are ready to assit you with your legal matters.<br
      />
      Contact us for fast, easy and affordable service.
    </p>
    <div>
      <!-- <Button
        on:click={() => goto("/contact")}
        variant="unelevated"
        style="height: 44px; min-width: 250px; margin-bottom: 10px;"
      >
        <Icon class="material-symbols-rounded">forum</Icon>
        <Label>Get a Quote</Label>
      </Button> -->
      <Button
        on:click={() => goto("/contact")}
        variant="unelevated"
        style="height: 44px; min-width: 250px; margin-bottom: 10px;"
      >
        <Icon class="material-symbols-rounded">mail</Icon>
        <Label>Enquire Online</Label>
      </Button>
    </div>
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
        margin: 50px 50px;

        @media (max-width: 1170px) {
          margin: 25px 25px;
        }

        @media (max-width: 1025px) {
          margin: 10px 10px;
        }
      }
    }
  }

  .card-container {
    display: flex;
    @media (max-width: 925px) {
      flex-direction: column;
    }

    > li {
      margin: 10px 10px;
      min-width: 290px;

      a {
        text-decoration: none;
        color: black;

        &:hover {
          text-decoration: underline;
        }
      }

      .card-media-16x9 {
        background-image: url({banner2});

        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 80px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }

  #contact-us {
    background-image: url({banner2});

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5em 0;

      @media (max-width: 920px) {
        background-color: #e8d6b3;
        padding: 45px 45px;
      }

      p {
        padding: 0;
        margin-top: 0;
      }
    }
  }
</style>

<script>
  // @ts-ignore
  import { Parallax, ParallaxLayer } from "svelte-parallax";

  import hero2 from "$lib/images/hero@2x.webp";
  import herotab2 from "$lib/images/hero-tab@2x.webp";
  import heromob2 from "$lib/images/hero-mob@2x.webp";
  import hero1 from "$lib/images/hero@1x.webp";
  import herotab1 from "$lib/images/hero-tab@1x.webp";
  import heromob1 from "$lib/images/hero-mob@1x.webp";
  import hero2jpeg from "$lib/images/hero@2x.jpg";
  import herotab2jpeg from "$lib/images/hero-tab@2x.jpg";
  import heromob2jpeg from "$lib/images/hero-mob@2x.jpg";
  import hero1jpeg from "$lib/images/hero@1x.jpg";
  import herotab1jpeg from "$lib/images/hero-tab@1x.jpg";
  import heromob1jpeg from "$lib/images/hero-mob@1x.jpg";
</script>

<section>
  <Parallax
    config={{ stiffness: 1, damping: 1 }}
    threshold={{ top: 0, bottom: 0 }}
    sections={0.5}
  >
    <ParallaxLayer
      rate={0.1}
      offset={-0.25}
      style="display: flex;flex-direction: column;align-items: center;justify-content: center;"
    >
      <picture>
        <!-- desktop -->
        <source
          type="image/webp"
          srcset={hero2}
          media="(min-resolution: 50dpi) and (min-width: 1200px)"
        />
        <source type="image/webp" srcset={hero1} media="(min-width: 1200px)" />
        <source
          type="image/jpg"
          srcset={hero2jpeg}
          media="(min-resolution: 50dpi) and (min-width: 1200px)"
        />
        <source
          type="image/jpg"
          srcset={hero1jpeg}
          media="(min-width: 1200px)"
        />

        <!-- tablet -->
        <source
          type="image/webp"
          srcset={herotab2}
          media="(min-resolution: 50dpi) and (min-width: 767px)"
        />
        <source
          type="image/webp"
          srcset={herotab1}
          media="(min-width: 767px)"
        />
        <source
          type="image/jpg"
          srcset={herotab2jpeg}
          media="(min-resolution: 50dpi) and (min-width: 767px)"
        />
        <source
          type="image/jpg"
          srcset={herotab1jpeg}
          media="(min-width: 767px)"
        />

        <!-- mobile -->
        <source
          type="image/webp"
          srcset={heromob2}
          media="(min-resolution: 50dpi)"
        />
        <source type="image/webp" srcset={heromob1} />
        <source
          type="image/jpg"
          srcset={heromob2jpeg}
          media="(min-resolution: 50dpi)"
        />
        <source type="image/jpg" srcset={heromob1jpeg} />

        <img src={hero1jpeg} alt="A person working at a computer" />
      </picture>
    </ParallaxLayer>
  </Parallax>
</section>

<style>
	section {
		width: 100%;
		height: 40vw;
		background-color: aqua;
		overflow: hidden;
	}

  img,
  picture {
    width: auto;
    margin: auto 0;
    min-width: 100%;
    min-height: 600px;
  }
</style>

<script>
  import banner2 from "$lib/images/injury-banner2.webp";
  import banner1 from "$lib/images/injury-banner1.webp";
  import bannerFull from "$lib/images/injury-banner.jpg";
</script>

<section id="terms-and-conditions">
  <div class="hero">
    <picture>
      <source type="image/webp" srcset={banner1} media="(max-width: 1200px)" />
      <source
        type="image/webp"
        srcset={banner2}
        media="(min-resolution: 50dpi)"
      />
      <source type="image/webp" srcset={banner1} />

      <img src={bannerFull} alt="An xray" />
    </picture>
    <h1 class="mdc-typography--headline1">
      Personal Injury
    </h1>
  </div>

  <div class="gutters">
    <h2 class="mdc-typography--headline2">
      Injury Law
    </h2>
    <p>Have you suffered an injury in NSW</p>
    <p>Was your injury caused because of the actions or negligence of somebody else, during a motor vehicle accident, or during the course of your employment?</p>
    <h2 class="mdc-typography--headline2">
      Randall &amp; Associates assist injured people with claims for:
    </h2>

    <ul>
      <li>Workers Compensation</li>
      <li>Heading loss/industrial deafness</li>
      <li>Motor Vehicle Injury</li>
      <li>Personal Injury</li>
    </ul>

    <p>If you would like us to review the circumstances surrounding your injury for a free no obligation check of your potential entitlements, contact us on <a href='phone:0283787698'>(02) 8378 7698</a> or <a href="mailto:mail@randallandassoc.com">mail@randallandassoc.com</a></p>
  </div>
</section>

<style lang="scss">
  #terms-and-conditions {
    > .gutters {

      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 2em;

      h2 {
        text-align: center;
        margin-top: 3em;
        margin-bottom: 1em;
      }
      p {
        margin-bottom: 2em;
        max-width: 850px;
        text-align: center;
      }

      ul {
        padding-left: 0;
        > li {
          list-style-type: "\2713"; 
        }
      }
    }
  }
</style>




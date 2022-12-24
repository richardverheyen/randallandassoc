<script>
  import banner2 from "$lib/images/contact-banner2.webp";
  import banner1 from "$lib/images/contact-banner1.webp";
  import bannerFull from "$lib/images/contact-banner-full.jpg";
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

      <img src={bannerFull} alt="A work station with coffee" />
    </picture>
    <h1 class="mdc-typography--headline4">
      Terms and Conditions
    </h1>
  </div>

  <div class="gutters">
    <h2 class="mdc-typography--headline2">
      Terms and Conditions
    </h2>
    <p>The information and material on Randall & Associates' website is intended and provided as a general guide only and is not a substitute for legal advice. The use of this website and communication of information via the website does not give rise to a Lawyer/Client relationship between you, Randall & Associates or anyone else.</p>
    <p>Randall & Associates makes every effort to keep the website up-to-date, however, we will not be responsible for any incorrect information contained on the website.</p>
    <p>By using this website you agree that Randall & Associates will not be held liable for any damages (including direct, indirect, consequential, incidental and exemplary) in the event that this site is unavailable to users (by virtue of interruption, suspension or termination) for any reason and we will be under no liability to users in respect of any loss or damage (including consequential loss or damage) which may be suffered or incurred or which may arise directly or indirectly by the use of this site.</p>
    <p>In respect of links to other websites contained on our website (if any), Randall & Associates do not make any representation or warranty as to the information contained on those sites, including the accuracy of that information.</p>
  </div>
</section>

<style lang="scss">
  #terms-and-conditions {
    h2 {
      text-align: center;
      margin-top: 100px;
      margin-bottom: 50px;
    }
    p {
      margin-bottom: 50px;
    }
  }
</style>




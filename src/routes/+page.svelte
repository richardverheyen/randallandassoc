<script>
  import Logo from "./Logo.svelte";
  import Services from "./Services.svelte";
  import Testimonials from "./Testimonials.svelte";
</script>

<svelte:head>
  <title>Randall and Associates</title>
  <meta
    name="Randall and Associates"
    content="Joshua Randall is the Director/Principal Lawyer of Randall & Associates, a law firm providing legal services focusing in Property & Conveyancing, Personal Injury, and Wills & Estate matters."
  />
</svelte:head>

<Logo />
<section>
  <div class="gutters">
    <p class="about mdc-typography--body1">
      We are a team of experienced and skilled writers dedicated to creating
      compelling and effective copy for our clients. Our services range from
      website content and product descriptions to marketing emails and social
      media posts. Whether you're a small business owner, a marketing manager,
      or a content creator, we have the expertise and creativity to elevate your
      brand and drive results.
    </p>
  </div>
</section>
<Services />
<Testimonials />

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;

    .about {
      max-width: 600px;
      margin: 2em auto 5em;
    }
  }
</style>

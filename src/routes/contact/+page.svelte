<script>
  import Textfield from "@smui/textfield";
  import CircularProgress from "@smui/circular-progress";
  import Button from "@smui/button";
  import toast from "svelte-french-toast";
  import Select, { Option } from "@smui/select";

  import banner2 from "$lib/images/contact-banner2.webp";
  import banner1 from "$lib/images/contact-banner1.webp";
  import bannerFull from "$lib/images/contact-banner.jpg";
  import ContactFooter from "./ContactFooter.svelte";

  let name = "";
  let email = "";
  let areaOfEnquiry = "";
  let message = "";

  let loading = false;
  let messageSent = false;

  let options = [
    "Property & Conveyancing",
    "Personal Injury",
    "Wills and Estates",
    "Other",
  ];

  async function postContact() {
    console.log("foo");
    loading = true;

    fetch(
      "https://australia-southeast1-randallandassoc.cloudfunctions.net/contactUsFormFinal",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          areaOfEnquiry,
          message,
        }),
      }
    )
      .then(() => {
        toast.success("Message Sent, we'll be in touch shortly", {
          duration: 4000,
          position: "bottom-center",
        });
        loading = false;
        messageSent = true;
      })
      .catch(() => {
        toast.error("That didn't work! Please try emailing us instead", {
          duration: 4000,
          position: "bottom-center",
        });
        messageSent = true;
        loading = false;
      })
      .finally(() => {
        loading = false;
      });
  }
</script>

<section id="contact">
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
    <h1 class="mdc-typography--headline4">Contact Us</h1>
  </div>

  <div class="gutters">
    <form on:submit|preventDefault={postContact}>
      <h4 class="mdc-typography--headline4">Contact Us</h4>
      <fieldset>
        <Textfield
          bind:value={name}
          label="Your Name"
          style="width: 100%;"
          required
          input$autocomplete="name"
        />
      </fieldset>
      <fieldset>
        <Textfield
          bind:value={email}
          label="Your Email"
          type="email"
          style="width: 100%;"
          required
          input$autocomplete="email"
        />
      </fieldset>
      <fieldset>
        <Select
          bind:value={areaOfEnquiry}
          label="Area of Enquiry"
          style="width: 100%;"
        >
          {#each options as area}
            <Option value={area}>{area}</Option>
          {/each}
        </Select>
      </fieldset>
      <fieldset>
        <Textfield
          bind:value={message}
          label="Your Message"
          style="width: 100%;"
          input$rows={4}
          input$cols={800}
          input$resizable={false}
          textarea
          required
        />
      </fieldset>

      <Button
        type="submit"
        variant="unelevated"
        disabled={messageSent || loading}
        style="height: 44px; min-width: 250px; margin: auto"
      >
        {#if loading}
          <CircularProgress style="height: 24px; width: 24px;" indeterminate />
        {:else}
          {messageSent ? "Enquiry Sent" : "Enquire"}
        {/if}
      </Button>
    </form>
  </div>
</section>
<ContactFooter />

<style lang="scss">
  #contact {
    background-color: white;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    margin: 4em auto;

    > fieldset {
      margin-bottom: 1rem;
    }
  }
</style>

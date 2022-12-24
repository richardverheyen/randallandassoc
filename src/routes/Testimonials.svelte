<script lang="ts">
  import Drawer, { AppContent, Content } from "@smui/drawer";
  import List, {
    Graphic,
    Item,
    Text,
    PrimaryText,
    SecondaryText,
  } from "@smui/list";
  import { spring } from "svelte/motion";

  let count = 0;
  const displayed_count = spring(0, {
    stiffness: 0.08,
  });
  $: displayed_count.set(count);
  $: offset = modulo($displayed_count, 1);

  function modulo(n: number, m: number) {
    // handle negative numbers
    return ((n % m) + m) % m;
  }

  let options = [
    {
      name: "Bruce Willis",
      company: "Smith Creative Solutions",
      jobTitle: "Advertising Director",
      testimonial:
        '"Good Call Copywriting significantly increased our website traffic and conversions with their skilled and effective copywriting. Their team truly understands our business and delivers results. Highly recommend."',
    },
    {
      name: "Peter Johnson",
      company: "Davis Public Relations",
      jobTitle: "Marketing Coordinator",
      testimonial:
        '"Good Call Copywriting has been an invaluable asset to our business. Their copywriting skills have contributed to a noticeable increase in website traffic and conversions. The team at Good Call takes the time to understand our unique voice and needs, leading to exceptional results. We highly recommend their services."',
    },
    {
      name: "Emily Johnson",
      company: "Brown Advertising Agency",
      jobTitle: "Branding Specialist ",
      testimonial:
        '"I recently worked with Nick at the copywriting business and was blown away by the speed and efficiency of his service. He was a pleasure to work with and I highly recommend him for anyone in need of top-notch copywriting assistance."',
    },
  ];
</script>

<section id="testimonials">
  <div class="gutters">
    <h2 class="mdc-typography--headline4">Testimonials</h2>
    <div class="drawer-container">
      <Drawer
        style="border-right: 0; background: none; margin-right: 3em; width: 350px"
      >
        <Content>
          <List twoLine avatarList>
            {#each options as item, index}
              <Item
                selected={index === count}
                href="javascript:void(0)"
                style="margin: 2em"
                on:click={() => (count = index)}
              >
                <Graphic
                  style="background-image: url(https://place-hold.it/40x40?text={item.name
                    .split(' ')
                    .map((val) => val.substring(0, 1))
                    .join('')}&fontsize=16);"
                />
                <Text>
                  <PrimaryText>{item.name}</PrimaryText>
                  <SecondaryText>{item.company}</SecondaryText>
                </Text>
              </Item>
            {/each}
          </List>
        </Content>
      </Drawer>

      <AppContent class="app-content">
        <main class="main-content">
          <!-- $displayed_count counts from 0 to 1, or 2 to 1 very quickly. -->
          <!-- we always display 2 articles at a time, but one is always hidden -->
          <!-- offset is smart enough to animate in the right direction -->
          <div
            class="testimonial-display"
            style="transform: translate(0, {-100 * offset}%)"
          >
            <article
              class="hidden"
              aria-hidden="true"
              style="opacity: {offset};"
            >
              {options[Math.floor($displayed_count + 1)]?.testimonial}
            </article>
            <article style="opacity: {1 - offset};">
              {options[Math.floor($displayed_count)]?.testimonial}
            </article>
          </div>
        </main>
      </AppContent>
    </div>
  </div>
</section>

<style lang="scss">
  section {
    margin: 4em 0;
  }
  h2 {
    text-align: center;
  }

  .drawer-container {
    position: relative;
    display: flex;
    overflow: hidden;
    z-index: 0;
  }

  .main-content {
    height: 100%;
    box-sizing: border-box;
    width: 100%;
    min-width: 500px;
    height: 100%;
    overflow: hidden;
    text-align: center;
    position: relative;
    // mask-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 8%, rgba(0, 0, 0, 1) 92%, rgba(0, 0, 0, 0));
    // -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 8%, rgba(0, 0, 0, 1) 92%, rgba(0, 0, 0, 0));
  }

  article {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--color-theme-1);
    align-items: center;
    justify-content: center;
  }

  .testimonial-display {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .hidden {
    top: 100%;
    user-select: none;
  }
</style>

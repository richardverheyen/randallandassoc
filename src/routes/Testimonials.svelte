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
  import IconButton from "@smui/icon-button";
  import { Icon } from "@smui/common";

  import avatar1 from "$lib/images/avatar1.webp";
  import avatar1alt from "$lib/images/avatar1.png";
  import avatar2 from "$lib/images/avatar2.webp";
  import avatar2alt from "$lib/images/avatar2.png";
  import avatar3 from "$lib/images/avatar3.webp";
  import avatar3alt from "$lib/images/avatar3.png";

  let innerWidth: number;
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

  const prev = () => {
    if (count > 0) {
      count--;
    }
  };
  const next = () => {
    if (count < reviews.length - 1) {
      count++;
    }
  };

  let reviews = [
    {
      name: "Zac Corn-on-a-Cobb",
      company: "Property Client",
      avatar: avatar1,
      avatarFallback: avatar1alt,
      jobTitle: "Property Client",
      rating: ["star", "star", "star", "star", "star"],
      text: '"Very thorough and great communication throughout the entire process from the time we made our offer on the property right up until settlement. Would definitely recommend!"',
    },
    {
      name: "Emily Johnson",
      company: "Wills and Estate Client",
      avatar: avatar2,
      avatarFallback: avatar2alt,
      jobTitle: "Wills and Estate Client",
      rating: ["star", "star", "star", "star", "star_half"],
      text: '"I recently used Randall and Associates to draft a new will and update my estate plan. The process was smooth and efficient, and the staff was knowledgeable and professional. They answered all of my questions and made sure I understood everything before moving forward. I was very satisfied with the final result and would highly recommend Joshua Randall to anyone in need of these services."',
    },
    {
      name: "Tom Davis",
      company: "Personal Injury Client",
      avatar: avatar3,
      avatarFallback: avatar3alt,
      jobTitle: "Personal Injury Client ",
      rating: ["star", "star", "star", "star", "star"],
      text: "\"After my recent car accident a friend recommended Randall and Associates to me and I'm so glad I called them. I spoke to Joshua Randall and he was really understanding and helpful. The whole team at Randall and Associates was amazing and they did a great job handling my case. I'm really happy with the outcome and would definitely recommend them to anyone who needs help with a personal injury claim.\"",
    },
  ];
</script>

<svelte:window bind:innerWidth />

<section id="testimonials">
  <div class="gutters">
    <h2 class="mdc-typography--headline2">Feedback from our clients</h2>
  </div>
  <div class="testimonials">
    <div class="desktop-navigation">
      <Drawer style="border-right: 0; background: none; width: 350px">
        <Content style="display: flex;">
          <List twoLine avatarList style="margin: auto">
            {#each reviews as item, index}
              <Item
                selected={index === count}
                href="javascript:void(0)"
                style="margin: 2em"
                on:click={() => (count = index)}
              >
                <Graphic
                  style="background-image: url({item.avatar});background-size: 40px;"
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
    </div>

    <AppContent>
      <main class="main-content">
        <!-- $displayed_count counts from 0 to 1, or 2 to 1 very quickly. -->
        <!-- we always display 2 articles at a time, but one is always hidden -->
        <!-- offset is smart enough to animate in the right direction -->
        <div
          class="testimonial-display"
          style="transform: translate({innerWidth <= 750
            ? -100 * offset
            : 0}%, {innerWidth > 750 ? -100 * offset : 0}%)"
        >
          <article class="hidden" aria-hidden="true" style="opacity: {offset};">
            <div>
              {#each reviews[Math.floor($displayed_count + 1)]?.rating || [] as icon}
                <Icon class="material-icons">{icon}</Icon>
              {/each}
            </div>
            <p>{reviews[Math.floor($displayed_count + 1)]?.text}</p>
            <p class="name">
              {reviews[Math.floor($displayed_count + 1)]?.name} - {reviews[
                Math.floor($displayed_count + 1)
              ]?.company}
            </p>
          </article>
          <article style="opacity: {1 - offset};">
            <div>
              {#each reviews[Math.floor($displayed_count)]?.rating || [] as icon}
                <Icon class="material-icons">{icon}</Icon>
              {/each}
            </div>
            <p>{reviews[Math.floor($displayed_count)]?.text}</p>
            <p class="name">
              {reviews[Math.floor($displayed_count)]?.name} - {reviews[
                Math.floor($displayed_count)
              ]?.company}
            </p>
          </article>
        </div>

        <div class="carousel-icons">
          <IconButton
            disabled={count === 0}
            on:click={prev}
            style="position: absolute; left: 0; top: 50%; transform: translate(0, -50%);"
          >
            <Icon class="material-icons">chevron_left</Icon>
          </IconButton>
          <IconButton
            disabled={count === reviews.length - 1}
            on:click={next}
            style="position: absolute; right: 0; top: 50%; transform: translate(0, -50%);"
            ><Icon class="material-icons">chevron_right</Icon>
          </IconButton>
        </div>
      </main>
    </AppContent>
  </div>
</section>

<style lang="scss">
  section {
    margin: 4em 0;
  }
  h2 {
    text-align: center;
  }

  .testimonials {
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    z-index: 0;

    .desktop-navigation {
      @media (max-width: 750px) {
        display: none;
      }
    }

    .main-content {
      height: 100%;
      box-sizing: border-box;
      width: 100%;
      min-width: 500px;
      overflow: hidden;
      text-align: center;
      position: relative;
      padding: 0 3em;
      height: 300px;

      @media (max-width: 850px) and (min-width: 751px) {
        min-width: 400px;
      }

      @media (min-width: 751px) {
        height: 350px;
        mask-image: linear-gradient(
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 1) 8%,
          rgba(0, 0, 0, 1) 92%,
          rgba(0, 0, 0, 0)
        );
        -webkit-mask-image: linear-gradient(
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 1) 8%,
          rgba(0, 0, 0, 1) 92%,
          rgba(0, 0, 0, 0)
        );
      }

      @media (max-width: 750px) {
        min-width: calc(100vw - 1em);
      }

      @media (max-width: 500px) {
        height: 420px;
      }

      .testimonial-display {
        width: 100%;
        height: 100%;
        margin-left: -2em;
        width: calc(100% + 4em);
      }
    }

    .carousel-icons {
      @media (min-width: 751px) {
        display: none;
      }
    }

    article {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: var(--color-theme-1);
      align-items: center;
      justify-content: center;
      padding: 0 2em;
      box-sizing: border-box;

      @media (min-width: 751px) {
        p.name {
          display: none;
        }
      }
    }

    .hidden {
      top: 100%;
      left: 0%;
      user-select: none;
      @media (max-width: 750px) {
        left: 100%;
        top: 0%;
      }
    }
  }
</style>

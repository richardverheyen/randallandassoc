<script>
  import banner2 from "$lib/images/property-banner2.webp";
  import banner1 from "$lib/images/property-banner1.webp";
  import bannerFull from "$lib/images/property-banner.jpg";
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

      <img src={bannerFull} alt="A modern building" />
    </picture>
    <h1 class="mdc-typography--headline1">Property and Conveyancing</h1>
  </div>

  <div class="gutters">
    <h2 class="mdc-typography--headline2">Buying or selling a property</h2>
    <p>
      Whether you are you buying or selling property in NSW, or need assistance
      with a caveat or by-law, Randall & Associates aim to provide a fast,
      efficient, reliable and friendly service.
    </p>
    <p>
      At Randall & Associates we understand that the process of buying and
      selling property is a huge decision, involving a lot of time, money and
      effort. With such a large investment, it can be very stressful dealing
      with the legalities of your sale or purchase. That's why we offer a
      conveyancing service that ensures your property conveyance is completed
      quickly and professionally, so that your transaction is as stress free as
      possible. We will review your contract and guide you through the legal
      process right through to the day of settlement.
    </p>
  </div>
</section>
<section style="background: #E8D6B3;">
  <div class="gutters">
    <h2 class="mdc-typography--headline2">
      Why do you need a solicitor for property conveyancing?
    </h2>
    <p>
      Whether buying or selling property, you are entering into a legally
      binding contract. Because the contract will be binding between you and the
      other party, it is essential that you understand the terms of the
      agreement.
    </p>
    <p>
      It is also essential that all any additional searches are undertaken in
      order to find any defects, caveats or restrictions, etc that could be
      attached to the property. If any defects, caveats or restrictions, etc are
      found on the property's title, they have the potential to seriously change
      or restrict your use and enjoyment of the property. We will guide you
      through the process of either buying selling your property.
    </p>
    <p>We undertake conveyancing services throughout New South Wales.</p>
  </div>
</section>

<section>
  <div class="gutters">
    <h2 class="mdc-typography--headline2">Other Property Law Practice Areas</h2>
    <p>
      In addition to our fast and easy conveyancing service, we can also assist
      you with:
    </p>
    <ul>
      <li>Loan Agreements</li>
      <li>Leases</li>
      <li>Transfers and re-financing pursuant to Family Court Orders</li>
      <li>Strata By-laws</li>
      <li>Commercial and Retail Leasing</li>
      <li>Land, Community Title and Strata Subdivision</li>
      <li>Purchase and Sale of Businesses</li>
    </ul>

    <p>
      If you would like us to review the circumstances surrounding your injury
      for a free no obligation check of your potential entitlements, contact us
      on <a href="phone:0283787698">(02) 8378 7698</a> or
      <a href="mailto:mail@randallandassoc.com">mail@randallandassoc.com</a>
    </p>
  </div>
</section>

<style lang="scss">
  @media (min-width: 800px) {
    h1 {
      white-space: nowrap;
    }
  }

  section {
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
		> a {
			color: black;
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
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

<script>
  import logo from "$lib/logo.svg";
</script>

<section class="footer-main">
  <div class="gutters">
    <ul class="footer-list">
      <li>
        <img src={logo} alt="logo" />
      </li>
      <li>
        <h6>Contact Information</h6>
        <a href="/contact">(02) 8378 7698</a>
        <a href="mailto:mail@randallandassoc.com">mail@randallandassoc.com</a>
        <a href="/contact">Video appointments available on request</a>
      </li>
      <li>
        <h6>Practice Areas</h6>
        <a href="/property-and-conveyancing">Property & Conveyancing</a>
        <a href="/personal-injury">Personal Injury</a>
        <a href="/wills-and-estates">Wills & Estates</a>
      </li>
      <li>
        <h6>Terms & Conditions</h6>
        <a href="/terms-and-conditions">T & C's</a>
      </li>
    </ul>
  </div>
</section>
<section id="footers-foot">
  <div class="gutters">
    <p>Copyright © Randall & Associates Pty Ltd, 2022. All rights reserved.</p>
    <ul>
      <a href="/">Home</a>
      <a href="/contact">Contact us</a>
    </ul>
  </div>
</section>

<style lang="scss">
  .footer-main {
    background-color: #484c5a;
    @media (max-width: 550px) {
      padding-bottom: 2em;
    }
  }
  .footer-list {
    display: flex;
    justify-content: space-around;
    padding-left: 0;
    list-style-type: none;
    color: white;

    > li {
      flex: 1;

      @media (min-width: 551px) {
        min-height: 216px;

        &:not(:first-child):not(:nth-child(3)):not(:last-child) {
          margin-left: 2.4rem;
        }
      }

      > img {
        height: 180px;
        margin: 15px 0;
      }

      > h6 {
        margin-top: 35px;
        margin-bottom: 10px;
      }
      > p,
      a {
        display: block;
        font-size: 15px;
        font-family: "Roboto";
        margin: 6px 0;
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    @media (max-width: 1060px) and (min-width: 551px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
      grid-auto-rows: minmax(100px, auto);

      > li:nth-child(1) {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }

      > li:nth-child(2) {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
      }
      > li:nth-child(3) {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        margin-left: 0;
      }
      > li:nth-child(4) {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
    }

    @media (max-width: 550px) {
      flex-direction: column;
      max-width: 400px;
      margin: auto;

      li > img {
        height: auto;
        width: 100%;
      }
    }
  }

  #footers-foot {
    height: 60px;
    background-color: #282d3d;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      @media (max-width: 724px) {
        justify-content: center;
      }

      > p {
        font-size: 15px;
        @media (max-width: 724px) {
          text-align: center;
          font-size: 12px;
        }
      }
      > ul {
        @media (max-width: 724px) {
          padding: 0;
        }
      }
      > ul > a {
        padding: 15px 15px;
        font-size: 15px;
        color: white;
        text-decoration: none;
        white-space: nowrap;
        @media (max-width: 724px) {
          display: none;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

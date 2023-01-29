<script>
  import phone from "$lib/phone.svg";
  import email from "$lib/email.svg";
  import video from "$lib/video.svg";
  import location from "$lib/location.svg";
</script>

<section class="footer">
  <div class="gutters icons">
    <div>
      <img src={phone} alt="phone" />
      <h5>Phone</h5>
      <p>Talk to our experienced lawyers</p>
      <p>(02) 8378 7698</p>
    </div>
    <div>
      <img src={email} alt="email" />
      <h5>Email</h5>
      <p>Email us to book an appointment</p>
      <a href="mailto:mail@randallandassoc.com">mail@randallandassoc.com</a>
    </div>
    <div>
      <img src={location} alt="location" />
      <h5>Visit Us</h5>
      <p>Level 1/5, George St<br /> North Strathfield NSW 2137</p>
    </div>
    <div>
      <img src={video} alt="video" />
      <h5>Video Consultation</h5>
      <p>
        We are pleased to offer video consultations for our clients. Please
        complete the form above or call us to arrange an online meeting
      </p>
    </div>
  </div>
</section>

<style lang="scss">
  .footer {
    background-color: #282e3c;
    .icons h5 {
      margin: 15px 0 10px;
    }
    .icons {
      display: flex;
      justify-content: space-around;
      align-items: center;

      @media (max-width: 1115px) {
        flex-direction: column;
      }

      > div {
        margin: 30px 0;
        height: 190px;
        width: 33%;
        color: white;
        padding: 1em;

        @media (max-width: 1115px) {
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 100%;
          max-width: 440px;
          height: auto;
          text-align: center;
        }

        > img {
          filter: invert(100%);
        }
        > p,
        a {
          margin: 6px 0;
          color: white;
          text-decoration: none;
          font-size: 15px;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

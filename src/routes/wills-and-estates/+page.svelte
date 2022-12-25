<script>
	import banner2 from "$lib/images/injury-banner2.webp";
	import banner1 from "$lib/images/injury-banner1.webp";
	import bannerFull from "$lib/images/injury-banner-full.jpg";
  </script>
  
  <section id="wills-and-estates">
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
	  <h1 class="mdc-typography--headline1">Wills and Estates</h1>
	</div>
  
	<div class="gutters">
	  <h2 class="mdc-typography--headline2">Wills and Estates</h2>
	  <p>
		Talking about death is never easy. Having a propely drafted and legally binding will ensures that after your death, your wishes will be carried out and your estate (made up of your assets) will be left to the people you intend.
	  </p>
	
	  <h2 class="mdc-typography--headline2">
		Our Services
	  </h2>
	  <p>
		Whether you are planning for the future, or need assistance with the administration of a deceased estate, Randall & Associates offer a variety of services to assist you, including:
	  </p>
	
	  <ul>
		<li><b>Wills and testamentary trusts</b></li>
		<li><b>Power of Attorney and Guardianship documents</b><br/> Allow your trusted friends or family members to assist you with the ongoing management of your affairs in the circumstances that you are no longer able to manage them yourself</li>
		<li><b>Applications for Probate and Letters of Administration</b><br/> Applications of probate which require a will, and letters of administration which do not are required for the administration of an estate</li>
		<li><b>Contested Estates</b><br/> Not every will is legally binding, and in certain cases a will can be contested</li>
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
  
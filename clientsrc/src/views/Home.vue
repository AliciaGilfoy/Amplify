<template>
  <div class="home text-center">
    <h4 class="pretty" style="padding-top: 2em">
      Have you ever heard a song and thought,
      <br />"My friend is going to love this..."
    </h4>

    <h1 class="pretty" style="padding-top: 4em">Welcome to Amplify</h1>
    <h3 class="pretty" style="padding-top: 1em ">A place where music is shared freely</h3>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner" style="padding-top:8em">
        <div class="carousel-item active">
          <img src="../assets/amplify3.png" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="../assets/amplify4.png" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="../assets/amplify5.png" class="d-block w-100" alt="..." />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="container-fluid">
      <div class="row" style="padding-top: 10em;">
        <div class="col-sm-6">
          <h1 class="pretty">About Us</h1>
          <br />
          <h4 class="pretty">
            <p>We believe that your friends know you better than an algorithm</p>
            <p>We believe in opportunity to discover new genres</p>
            <p>We believe in community through music</p>
            <p>We created Amplify to help you expand your musical horizons and promote your favorite artists. Music is better with friends. Let us help you share!</p>
            <p>Amplify your world</p>
          </h4>
        </div>
        <div class="col-sm-6">
          <img src="../assets/amplify6.png" alt />
        </div>
      </div>

      <div class="row c" style="padding-top: 8em; padding-bottem: 6em">
        <div class="col-sm-6">
          <img
            class="display: block; max-width: 100%; height:auto;"
            src="../assets/amplify7.png"
            alt
          />
        </div>
        <div class="col-sm-6">
          <h1 class="pretty">Helping Artists</h1>
          <br />
          <h4
            class="pretty"
          >We help artists by giving them a network to discover new genres, and find what people in our community are listening to. We give artists a chance to grow and find the next new style.</h4>
        </div>
      </div>
    </div>
    <footer class="gradient" style="margin-top: 6em">
      <h3 style="color:purple;">Amplify</h3>
    </footer>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style>
h1 {
  color: white;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}
.pretty {
  color: white;
  text-shadow: purple 4px 3px 4px;
  -webkit-text-stroke: 1px black;
  font-weight: 900;
}
.gradient {
  background-image: linear-gradient(purple, magenta);
}
</style>

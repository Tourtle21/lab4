<template>
<div class="home">
  <h1>Create, Sell, Buy, and even Enjoy amazing Art with Artify</h1>
  <div class='image-text'>
    <img width="45%" src='/images/painting.jpeg' />
    <div class='text-button'>
    <p> Come join as either a Creator or an Admirer to contribute to this wide community of artists. To begin your adventure choose from the two options below.</p>
    <div class='buttons'><router-link to="/myItems"><button style="background:#57A773">Creator</button></router-link><router-link to="store"><button style="background:#388ACA">Admirer</button></router-link></div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.home {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image h2 {
  font-style: italic;
}
.image-text {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.text-button {
  width: 50%;
}
.buttons {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
}
.buttons button {
  border: none;
  font-size: 20px;
  padding: 15px;
  border-radius: 3px;
  cursor: pointer;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image-title {
  font-weight: 900;
  font-size: 15px;
  text-align: center;
  text-decoration: underline;
}

.image-description {
  font-size: 12px;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
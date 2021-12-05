<template>
<div class="myItems">
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <div class='image-text'>
        <h2 class="image-title">{{item.title}}</h2>
        <div class='buttons'><button @click="addToCart(item)">Buy</button></div>
      </div>
      <img :src="item.path" />
      <div class='author'>
        <h2>${{item.price}}</h2>
        <h2>By: {{item.author}}</h2>
        </div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'MyItems',
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
        this.items = response.data.filter(item => {
            for (let i = 0; i < this.$root.$data.user.cart.length; i++) {
                if (this.$root.$data.user.cart[i]._id === item._id) {
                    return false;
                }
            }
            return true;
        });
      } catch (error) {
        console.log(error);
      }
    },
      addToCart(item) {
          this.$root.$data.user.cart.push(item);
          this.getItems();
      }
  }
}
</script>

<style scoped>
.myItems {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.image h2 {
  font-style: italic;
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
.buttons {
    display: flex;
    align-items: center;
}
.buttons button {
    margin-left: 10px;
}
.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 20%;
}
.addNew {
    text-align: center;
    cursor: pointer;
    border: 2px solid black;
    padding: 10px;
    border-radius: 5px;
}
.upload img {
  max-width: 300px;
}
.image-text {
    display: flex;
    justify-content: space-between;
}
.image-title {
  font-weight: 900;
  font-size: 15px;
}
.author {
    display: flex;
    justify-content: space-between;
}
.image-description {
  font-size: 12px;
}

.image img {
  width: 100%;
}

.image-gallery {
    display: flex;
    flex-wrap: wrap;
}
</style>
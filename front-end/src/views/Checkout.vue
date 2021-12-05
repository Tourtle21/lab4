<template>
<div class="myItems">
  <section class="image-gallery">
    <div class="image" v-for="item in this.$root.$data.user.cart" :key="item.id">
      <div class='image-text'>
        <h2 class="image-title">{{item.title}}</h2>
      </div>
      <img :src="item.path" />
      <div class='author'>
        <h2>${{item.price}}</h2>
        <h2>By: {{item.author}}</h2>
        </div>
    </div>
  </section>
    <i style="color: red">*Warning this will delete all of the items in your cart from the database</i>
    <div @click="buyItems()" class="addNew"> Purchase</div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Checkout',
  data() {
    return {
     items: [],

    }
  },
  methods: {
      buyItems() {
          this.$root.$data.user.cart.forEach(item => {
              this.deleteItem(item);
              this.$root.$data.user.cart = [];
          })
      },
      async deleteItem(item) {
        try {
            await axios.delete("/api/items/" + item._id);
            this.findItem = null;
            this.getItems();
            return true;
        } catch (error) {
            console.log(error);
        }
    },
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
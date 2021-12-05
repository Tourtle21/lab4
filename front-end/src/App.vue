<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img id='logo' src="/images/logo.svg">
      </div>
      <div class="title">
        <h1>
          Artify
        </h1>
    </div>
    </router-link>
        <div class='links'>
    <router-link to="/myItems">
      <p>My Items</p>
    </router-link>
    <router-link to="/store">
      <p>Store</p>
    </router-link>
    <router-link to="/checkout">
      <img class='checkout' src='/images/checkout.svg' /><span class='num-items'>{{this.$root.$data.user.cart.length}}</span>
    </router-link>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <p>Github: <a href='https://github.com/Tourtle21/lab4'>Lab 4</a></p>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
  color: rgb(51, 51, 51);
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 0px 50px;
  background-color: #57A773;
}
.links {
  display: flex;
}

.num-items {
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
  height: 15px;
  width: 15px;
  border: 1px solid rgb(51, 51, 51);
  border-radius: 50%;
}

.header a {
  display: flex;
  align-items: center;
  margin-right: 10px;
  color: rgb(51, 51, 51);
  margin-right: 20px;
}
.header a:hover {
  color: rgb(0, 0, 0);
}

#logo {
  height: 50px;
}

.checkout {
  height: 30px;
}

.title {
  margin-top: 5px;
  cursor: pointer;
}
.title h1 {
  color: rgb(51, 51 ,51);
  margin-left: 15px;
}
a {
  text-decoration: none;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #57A773;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     loggedIn: false,
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

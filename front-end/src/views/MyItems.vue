<template>
<div class="myItems">
  <div v-if="this.$root.$data.user.username">
  <section v-if="editing && !adding" class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <div class='image-text'>
        <h2 class="image-title">{{item.title}}</h2>
        <div class='buttons'><button @click="setItem(item)">Edit</button><button @click="deleteItem(item)">X</button></div>
      </div>
      <img :src="item.path" />
      <div class='author'>
        <h2>${{item.price}}</h2>
        <h2>By: {{item.author}}</h2>
        </div>
    </div>
  </section>
  <div v-if="!editing" class="form">
        <span>Title:</span><input v-model="itemEdit.title" placeholder="Title">
        <p></p>
        <span>Price:</span><input v-model="itemEdit.price" placeholder="10">
        <p></p>
        <div class="upload" v-if="itemEdit.path">
            <img :src="itemEdit.path" />
        </div>
        <!-- <button @click="upload">Upload</button> -->
        <button @click="editItem(itemEdit)">Update</button>
    </div>
    <div v-if="!adding && editing" @click="() => {this.adding = true}" class="addNew"> + Add New</div>
    <div v-if="adding && editing" class="form">
        <span>Title:</span><input v-model="title" placeholder="Title">
        <p></p>
        <span>Price:</span><input v-model="price" placeholder="10">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <!-- <button @click="upload">Upload</button> -->
        <button @click="upload()">Create</button>
    </div>
    </div>
    <div v-if="!this.$root.$data.user.username">
        <h1>Login</h1>
        <div class="form">
            <span>Name:</span><input v-model="username" placeholder="JohnDoe">
            <p></p>
            <span>Password:</span><input type='password' v-model="password" placeholder="10">
            <p></p>
            <button @click="signUp()">Sign Up</button> or <button @click="login()">Login</button>
        </div>
    </div>
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
     editing: true,
     adding: false,
     itemEdit: {},
     file: null,
     title: '',
     price: 0,
     username: '',
     password: '',
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    setItem(item) {
        this.editing = false;
        this.itemEdit = item;
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async signUp() {
        let {username, password} = this;
        axios.post('/auth/signUp', {username, password}).then((res) => {
            this.$root.$data.user = {...res.data, ...this.$root.$data.user};
            this.$root.$data.loggedIn = true;
            this.items = this.items.filter(item => item.author === this.$root.$data.user.username);
        }).catch(() => {
            alert("Username was already taken");
        })
    },
    async login() {
        let {username, password} = this;
        axios.post('/auth/login', {username, password}).then(res => {
            console.log(res.data);
            this.$root.$data.user = {...res.data, ...this.$root.$data.user};
            this.$root.$data.loggedIn = true;
            this.items = this.items.filter(item => item.author === this.$root.$data.user.username);
        }).catch(() => {
            alert("Username and/or password was incorrect");
        })
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        axios.post('/api/items', {
          title: this.title,
          price: parseInt(this.price),
          author: this.$root.$data.user.username,
          path: r1.data.path
        }).then(res => {
            this.addItem = res.data;
            this.editing = true;
            this.adding = false;
            this.items.push(res.data);
        })
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        if (this.$root.$data.user.username) {
            this.items = this.items.filter(item => item.author === this.$root.$data.user.username);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.itemEdit.title,
          price: this.itemEdit.price
        });
        await this.getItems();
        // this.itemEdit = null;
        this.editing = true;
      } catch (error) {
        console.log(error);
      }
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
  },
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
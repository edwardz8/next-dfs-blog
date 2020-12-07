---
title: 'Simplifying Dynamic Routing in Vue 3'
date: '2020-12-08'
thumbnail: /images/maple-leafs.jpg
---

With Vue 3 still being quite new there seemingly aren't too many resources out there just yet on the subject, at least from what I could find, and I was able to only find examples for the Options API, but Vue 2 is old news ( only kidding, halfway ) and I figured it was time to progress forward and use the latest and greatest so I set out to create a small application demonstrating how to simplify dynamic routing for those beginner to intermediate level developers who may be struggling to find or curious about exactly what the best practice is for routing while using the Composition API in Vue 3 as well as Vuex 4 and Vue-Router.

A working example with all the code can be found in this <a href="https://codesandbox.io/s/vue-3-vuex-4-vue-router-nvebt">CodeSandBox</a> if you don't want to go through this entire post.

## Install Vue and Create Project

```js

npm install -g @vue/cli@next

vue create project-name

```

Be sure to choose __Manually Select Features__ and select at least both the **Vuex** and **Router** options on the first prompt and 3.x on the following prompt. Also, type **N** when asked if you wish to use class-style components.


```js

cd project-name

npm run serve

```

Within our main.js file we want to import and initialize the router and store like so:


```js

import { createApp } from 'vue'
import { store } from './store'
import router from './router'
import App from './App.vue'

createApp(App).use(store).use(router).mount("#app")

```

## Vuex Store

With the entry point to the application in place let's either create or move into the store directory and setup our faux data and getters. I named the file **index.js** within the store folder.

```js

import { createStore } from "vuex";

export const store = createStore({
  state: {
    playerlist: [
      { id: 1, name: "Auston Matthews", position: "Center" },
      { id: 2, name: "Frederik Andersen", position: "Goalie" },
      { id: 3, name: "William Nylander", position: "Wing" },
      { id: 4, name: "John Tavares", position: "Center" },
      { id: 5, name: "Mitch Marner", position: "Wing" }
    ]
  },
  getters: {
    playerlist: (state) => {
      return state.playerlist;
    },
    player: (state) => (id) => {
      return state.playerlist.find((player) => player.id === id);
    }
  }
});


src/store/index.js

```

You can <a href="https://vuex.vuejs.org/guide/getters.html">read more about getters</a> on the Vuex documentation page where they have a great explanation on how they should be used. But basically, for the _player_ getter, we are making sure we match the correct id through the find() method.


## Creating Routable Components

If there isn't a **Home.vue** within our **views** folder be sure to create one and add a Players component that we will create next:

```js

<template>
  <div>
    <Players />
  </div>
</template>

<script>
import Players from "@/components/Players.vue";

export default {
  components: {
    Players
  },
};
</script>

```


For our **App.vue** we want to make sure all of our routing is working. I created another file inside our views directory and named it **About.vue**

Inside **App.vue** add the following within the template:

```js

<template>
  <div class="app">
    <div class="nav">
      <router-link to="/">Player List</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

```

After creating the **About.vue** file or whatever you chose to name it, we should be able to click back and forth from each page.


We also need to create two files **Players.vue** and **PlayerDetails.vue** within our components directory. The Players.vue file will loop through our playerlist we mocked up in the store and it will also include a __router-link__ that will eventually take us to the details about each individual player!

For our **Players.vue** file add the following:


```js

<template>
  <h1>All Players</h1>
  <div>
    <table cellspacing="0">
      <tr v-for="(player, index) in playerlist" :key="index">
        <td>{{ player.name }}</td>
        <td>
          <router-link
            :to="{ name: 'PlayerDetails', params: { id: player.id } }"
            >View Player</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const playerlist = computed(() => {
      return store.getters.playerlist;
    });

    return {
      playerlist
    };
  },
};
</script>


```

Creating computed properties with the Composition API is a bit different than you may be used to when constructing components through the Options API and we create a variable ( in this case it's named playerlist ) so we can return the data stored in our playerlist array within our Vuex state. We also have to initialize useStore() with the new Vuex 4 within our setup function. Finally, the _<router-link>_ makes it easy to get the route parameters with **:to** and we can pass in the name and the params properties inside it by destructuring the _player.id_ 


And for the **PlayerDetails.vue** file we have to remember to pass props to our setup function so we can use the playerId we return within the PlayerDetails route object inside _router/index.js_ 


```js

<template>
  <h1>{{ player.name }}</h1>
  <h1>{{ player.position }}</h1>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "PlayerDetails",
  props: {
    playerId: { type: String },
  },
  setup(props) {
    const store = useStore();
    const player = computed(() => {
      return store.getters.player(Number(props.playerId));
    });

    return {
      player
    };
  },
};
</script>

```

## Putting it altogether

Now, to get this to work we have one last important piece of code to write within our router. Let's move over to our _index.js_ file within the **router** directory so we can declare all of the routes and pass our routing props to our **PlayerDetails.vue**


```js

import { createRouter, createWebHistory } from "vue-router";
import PlayerDetails from "../components/PlayerDetails.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routerHistory = createWebHistory();

const routes = [
  {
    path: "/",
    name: "Home",
    props: true,
    component: Home
  },
  {
    path: "/player/:id",
    name: "PlayerDetails",
    props: (route) => {
      return {
        playerId: route.params.id
      };
    },
    component: PlayerDetails
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = createRouter({
  history: routerHistory,
  routes
});

export default router;

```

And there you have it! If everything is setup correctly and there aren't any typos we should be routing smoothly!

Thank you for reading and I hope this example helps in some form or fashion. Happy coding!

Here is the link again to the <a href="https://codesandbox.io/s/vue-3-vuex-4-vue-router-nvebt"> CodeSandBox</a>.


And last, but certainly not least, I would like to shoutout <a href="https://twitter.com/DamianoMe">Damiano Fusco</a> for the assist and direction on how to use route.params.id inside vue-router. Damiano has a really great book on Vue 3 and TypeScript you should check out called <a href="https://t.co/rfdnxXt673?amp=1">Large Scale Vue 3 Apps with Typescript</a> where he covers new and improved features in Vue -- the chapters on using Vuex and TypeScript as well as testing are my personal favorites.






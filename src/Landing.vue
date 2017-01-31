<template>
  <div id="landing">
    <h1>KOTIKEPULI</h1>
    <h1>( ͝° ͜ʖ͡°)</h1>
    <div class="loginform">
      <h2>
        Please login
      </h2>
      <div class="error">{{ message }}</div>
      <div class="input-wrapper">
        <label for="username">Username</label>
        <input id="username" v-model="username">
      </div>
      <div class="input-wrapper">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password">
      </div>
          <button v-on:click="submit">Login</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'landing',
  data() {
    return {
      username: '',
      password: '',
      message: '',
    };
  },
  methods: {
    submit() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      this.$http.post(`${document.location.origin}/api/v1/login`, credentials)
        .then((res) => {
          console.log(res);
          this.$router.replace('/app');
        })
        .catch(() => {
          this.message = 'Invalid credentials';
        });
    },
  },
  created() {
    console.log('Landing page created');
    this.$http.get(`${document.location.origin}/api/v1/userDetails`)
      .then((res) => {
        console.log(res.body.username);
        if (res.body.username !== undefined) {
          this.$router.replace('/app');
        }
      });
  },
};
</script>

<style>

html, body {
  height: 100%;
  margin: 0;
}

#landing {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  background-color: #2d2d2d;
}

h2 {
  margin: 50px;
}

.loginform {
  margin-top: auto;
  margin-bottom: auto;
}

.input-wrapper {
  margin: 20px;
}

label {
  margin: 20px;
}

</style>

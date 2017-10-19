<template>
  <div id="landing">
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
        .then(() => {
          this.$router.replace('/app/dashboard');
        })
        .catch(() => {
          this.message = 'Invalid credentials';
        });
    },
  },
  created() {
    this.$http.get(`${document.location.origin}/api/v1/userDetails`)
      .then((res) => {
        if (res.body.username !== undefined) {
          this.$router.replace('/app/dashboard');
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

h1 {
  color: black;
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
}

.loginform {
  margin-top: auto;
  margin-bottom: auto;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding: 60px;
}

.input-wrapper {
  margin: 20px;
}

label {
  margin: 20px;
}

</style>

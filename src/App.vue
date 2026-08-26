<template>
  <v-app id="app" theme="dark">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  min-height: 100dvh;
  width: 100dvw;
  background-color: #0c0c0c;
  color: #fff;
  color-scheme: dark;
}

body {
  font-family: "Paralucent Text", sans-serif;
}

#app {
  color: #fff;
  background-color: #0c0c0c;
}

.v-application,
.v-application__wrap,
.v-main {
  color: #fff;
  background-color: #0c0c0c;
}
</style>

<script lang="ts" setup></script>

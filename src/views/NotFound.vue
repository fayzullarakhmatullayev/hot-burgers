<template>
  <div class="not-found">
    <h2>СТРАНИЦА НЕ НАЙДЕНА</h2>
    <img src="@/assets/css/images/404.png" alt="404">
    <router-link to="/">
      <button>Вернуться на главную</button>
    </router-link>
  </div>
</template>

<style scoped>
.not-found{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
h2{
  text-transform: uppercase;
}
img{
  width: 200px;
  height: auto;
  margin-bottom: 40px;
}
</style>
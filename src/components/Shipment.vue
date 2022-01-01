<template>
  <div class="total">
    <div class="total_wrap">
      <div v-if="total > 0">
        <div>Доставка: <span :class="shipping === 99 ? 'font-effect-neon total_wrap-cheap' : ''">{{shipping}} ₽</span></div>
        <div class="total_wrap-free">
          {{ total < 500 ? `Закажите еще на ${500 - total} ₽ для доставки за 99 ₽` : null }}
        </div>
      </div>
      <div class="total_wrap-final">
        Итого: {{ total + shipping }} ₽
      </div>
    </div>      
  </div>
</template>

<script>
export default {
props: ['total', 'shipping']
}
</script>

<style>

</style>
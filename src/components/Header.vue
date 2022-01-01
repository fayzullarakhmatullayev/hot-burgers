<template>
  <header class="top">
      <div class="wrap">
        <div class="header-content">
          
          <div class="header-rating">
            <div class="header-rating_tag">Рейтинг: </div>
            <div class="header-rating_icon">★★★★★</div>
          </div>
          
          <div class="header-divider"></div>
          <h1 class="font-effect-fire-animation">{{ title }}</h1>
          
          <h3>
            <span>
              Быстрая доставка горячих <span class="sub-header">#бургеров</span>
            </span>
          </h3>
          
        </div>
      </div>
  </header>
</template>

<script>
export default {
  props: ['title'],
}
</script>
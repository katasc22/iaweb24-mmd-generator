<template>
  <div id="info" class="content-container">
    <h2>{{ $t("about.title") }}</h2>
    <p>{{ $t("about.addText1") }} {{ $t("about.addText2") }}</p>
    <p>{{ $t("about.addText3") }}</p>
    <p>{{ $t("about.linktoIndiYoung") }}</p>
    <a class="btn-primary" target="_blank" href="https://indiyoung.com/">{{
        $t("about.buttonIndiYoung")
      }}</a>
    <div class="text-center mt-20">
      <h4>{{ $t("about.attributions") }}</h4>
      <p class="text-[16px] m-0">
        <a href="https://www.flaticon.com/free-icons/architecture-and-city"
           title="architecture and city icons">
          {{ $t("about.iconsBy") }}
        </a>
      </p>
      <p class="text-[16px]">
        {{ $t("about.copyright") }}
      </p>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.content-container {
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
}
</style>

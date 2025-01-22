<template>
  <div id="info" class="content-container justify-between">
    <div>
      <h2>{{ $t("about.title") }}</h2>
      <p>{{ $t("about.addText1") }} {{ $t("about.addText2") }}</p>
      <p>{{ $t("about.addText3") }}</p>
      <p>{{ $t("about.linktoIndiYoung") }}
        <a class="font-bold" target="_blank" href="https://indiyoung.com/">
          {{$t("about.buttonIndiYoung") }}
        </a>
      </p>
    </div>

    <div class="border-t-2 pt-2 border-green">
        <a href="https://www.flaticon.com/free-icons/architecture-and-city"
           title="architecture and city icons">
          {{ $t("about.iconsBy") }}
        </a>
      <p>
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
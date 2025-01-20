<template>
  <div id="info" class="content-container">
    <h2>{{$t("about.title")}}</h2>
    
    <p>{{$t("about.addText1")}} {{$t("about.addText2")}}</p>
    <p>{{$t("about.addText3")}}</p>

    <div class="text-center">
      <p class="text-[16px] m-0">
        {{$t("about.attributions")}}
        <a href="https://www.flaticon.com/free-icons/architecture-and-city" title="architecture and city icons">
          {{$t("about.iconsBy")}}
        </a>
      </p>
      <p class="text-[16px]">
        {{$t("about.copyright")}}
      </p>
    </div>
  </div>
</template>

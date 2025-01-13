<template>
  <div id="languages">
    <h2>{{$t("common.languageSettings")}}</h2>
    <p>{{$t("common.selectLanguage")}}</p>
    <LanguageSwitcher/>
  </div>
</template>

<script>
import LanguageSwitcher from "../components/Footer.vue";
export default {
  components: {
    LanguageSwitcher
  }
};
</script>

<template>
  <div
    v-if="show"
    class="spinner-container"
  >
    <div class="spinner">
      <div class="rect1" />
      <div class="rect2" />
      <div class="rect3" />
      <div class="rect4" />
      <div class="rect5" />
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    show(){
      return this.$store.state.spinner.show;
    }
  },
};
</script>
<style lang="sass" scoped>
@import ~assets/sass/variables
.spinner-container
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(255, 255, 255, 0.8)
  z-index: 100
.spinner
  margin: 49vh auto
  width: 50px
  height: 40px
  text-align: center
  font-size: 10px

.spinner > div
  background-color: $red
  height: 100%
  width: 6px
  display: inline-block

  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out
  animation: sk-stretchdelay 1.2s infinite ease-in-out

.spinner
  .rect2
    -webkit-animation-delay: -1.1s
    animation-delay: -1.1s

.spinner
  .rect3
    -webkit-animation-delay: -1.0s
    animation-delay: -1.0s


.spinner
  .rect4
    -webkit-animation-delay: -0.9s
    animation-delay: -0.9s

.spinner
  .rect5
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;


@-webkit-keyframes sk-stretchdelay
  0%, 40%, 100%
    -webkit-transform: scaleY(0.4)
  20%
    -webkit-transform: scaleY(1.0)

@keyframes sk-stretchdelay
  0%, 40%, 100%
    transform: scaleY(0.4)
    -webkit-transform: scaleY(0.4)
  20%
    transform: scaleY(1.0)
    -webkit-transform: scaleY(1.0)
</style>
<script>
export default {
  props: {
    do: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    const listener = e => {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.do();
      }
    };
    document.addEventListener('click', listener);
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', listener);
    });
  },
  render() {
    return this.$slots.default[0];
  },
};
</script>

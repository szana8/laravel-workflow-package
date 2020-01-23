<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div :class="[isLarge ? largeClass : '', 'modal-dialog']" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-text="title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="laraflow-dialog-body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="laraflow-dialog-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "isLarge"],

  data() {
    return {
      largeClass: "modal-lg"
    };
  },

  methods: {
    //
  }
};
</script>

<template>
  <div class="member_point_group">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "point_group"
    }
</script>

<style lang="less">
  .member_point_group{
        padding: 0 @paddingLeftRight;
  }

</style>

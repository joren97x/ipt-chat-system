<template>
  <q-item clickable :to="link.link" exact>
        <q-tooltip anchor="center right" self="center left">
            {{link.title}}
        </q-tooltip>
      <q-item-section v-if="link.icon" avatar>
          <q-icon :name="link.icon" />
      </q-item-section>

      <q-item-section>
          <q-item-label>{{ link.title }}</q-item-label>
      </q-item-section>
  </q-item>
</template>

<script setup>
  defineProps({ link: Object })
</script>
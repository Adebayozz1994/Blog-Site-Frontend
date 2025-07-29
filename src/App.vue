<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import TopNavbar from '@/components/TopNavbar.vue';
import SecondaryNavbar from '@/components/SecondaryNavbar.vue';

const route = useRoute();
const authStore = useAuthStore();
const showNavBar = ref(true);

watch(
  () => route.path,
  (newPath) => {
    showNavBar.value = !['/login', '/signup', '/passwordlink', '/reset-password/:token', '/'].includes(newPath) &&
                       !newPath.startsWith('/admin');
  },
  { immediate: true }
);

onMounted(() => {
  authStore.fetchUser();
});
</script>

<template>
  <div>
    <div v-if="showNavBar" class="sticky top-0 z-50">
      <TopNavbar />
      <SecondaryNavbar />
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>

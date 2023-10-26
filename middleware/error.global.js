import { useErrorStore } from "~/store/error";

export default defineNuxtRouteMiddleware((to, from) => {
  const errorStore = useErrorStore();
  const isNavigatingToErrorRoute = /^\/error\/\d+$/.test(to.path);

  if (isNavigatingToErrorRoute) {
    if (!errorStore.error.statusMessage) {
      errorStore.resetErrors();
      return navigateTo('/');
    }
  } else {
    errorStore.resetErrors()

  }
});

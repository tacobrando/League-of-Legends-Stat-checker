import { useErrorStore } from "~/store/error";

export default defineNuxtRouteMiddleware((to, from) => {
  const errorStore = useErrorStore();
  const isNavigatingToErrorRoute = /^\/error\/\d+$/.test(to.path);

  if (isNavigatingToErrorRoute) {
    if (!errorStore.error.statusMessage) {
      // If you're navigating to the error page and there's no error set in the store
      errorStore.resetErrors();
      return navigateTo('/'); // Redirect to the homepage
    }
  } else {
    errorStore.resetErrors()

  }
});

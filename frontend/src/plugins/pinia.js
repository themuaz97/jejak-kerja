import { createPinia } from "pinia";

// Setup Pinia
export const install = (app) => {
    const pinia = createPinia();

    app.use(pinia);
};

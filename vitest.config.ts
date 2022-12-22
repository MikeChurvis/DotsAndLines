/// <reference types="vitest" />

import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'happy-dom',
        exclude: [
            ...configDefaults.exclude,
            'playwright-tests/*'
        ]
    },
})
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['bin/dnsr/index'],
    clean: true,
    rollup: {
        emitCJS: true,
        esbuild: {
            minify: true,
        },
    },
})

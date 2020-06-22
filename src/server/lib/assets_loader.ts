// eslint-disable-next-line @typescript-eslint/no-var-requires
const manifest = require('../public/scripts/manifest.json');

export function manifestParser(): string[] {
    return [manifest['home.js']];
}

export function scriptGenerator(src: string): string {
    return `/scripts/${src}`;
}

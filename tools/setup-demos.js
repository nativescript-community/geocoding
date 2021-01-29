const fs = require('fs');

const pathAngular = './demo-ng/package.json';
const pathReact = './demo-react/package.json';
const pathSvelte = './demo-svelte/package.json';
const pathVue = './demo-vue/package.json';
const pathSnippets = './demo-snippets/package.json';

const frameworks = [];

try {
    if (fs.existsSync(pathAngular)) frameworks.push(pathAngular);
    if (fs.existsSync(pathReact)) frameworks.push(pathReact);
    if (fs.existsSync(pathSvelte)) frameworks.push(pathSvelte);
    if (fs.existsSync(pathVue)) frameworks.push(pathVue);

    if (frameworks.length > 0 && fs.existsSync(pathSnippets)) {
        // Load dependencies for snippets
        const snippetsPackageJson = JSON.parse(fs.readFileSync(pathSnippets));
        const snippetsDependencies = snippetsPackageJson['dependencies'];
        const snippetsDevDependencies = snippetsPackageJson['devDependencies'];

        for (const framework of frameworks) {
            const frameworkName = framework.split('/')[1].split('-')[1];

            const frameworkPackageJson = JSON.parse(fs.readFileSync(framework));
            const frameworkDependencies = frameworkPackageJson['dependencies'];
            const frameworkDevDependencies = frameworkPackageJson['devDependencies'];
            let changed = false;

            if (snippetsDependencies) {
                for (const [key, value] of Object.entries(snippetsDependencies)) {
                    if (typeof frameworkDependencies[key] !== 'undefined') {
                        if (frameworkDependencies[key] !== value) {
                            frameworkDependencies[key] = value;
                            changed = true;
                        }
                    } else {
                        frameworkDependencies[key] = value;
                        changed = true;
                    }
                }
            }

            if (snippetsDevDependencies) {
                for (const [key, value] of Object.entries(snippetsDevDependencies)) {
                    if (typeof frameworkDevDependencies[key] !== 'undefined') {
                        if (frameworkDevDependencies[key] !== value) {
                            frameworkDevDependencies[key] = value;
                            changed = true;
                        }
                    } else {
                        frameworkDevDependencies[key] = value;
                        changed = true;
                    }
                }
            }

            if (changed) {
                fs.writeFileSync(framework, JSON.stringify(frameworkPackageJson, 0, 4));
            }

            // Create symlinks for demo components
            if (frameworkName === 'ng' && !fs.existsSync(`./demo-${frameworkName}/src/app/linked-components`)) {
                fs.symlinkSync(`${__dirname}/../demo-snippets/${frameworkName}`, `./demo-${frameworkName}/src/app/linked-components`);
            } else if (frameworkName === 'react' && !fs.existsSync(`./demo-${frameworkName}/src/components/linked-components`)) {
                fs.symlinkSync(`${__dirname}/../demo-snippets/${frameworkName}`, `./demo-${frameworkName}/src/components/linked-components`);
            } else if (frameworkName === 'svelte' && !fs.existsSync(`./demo-${frameworkName}/app/linked-components`)) {
                fs.symlinkSync(`${__dirname}/../demo-snippets/${frameworkName}`, `./demo-${frameworkName}/app/linked-components`);
            } else if (frameworkName === 'vue' && !fs.existsSync(`./demo-${frameworkName}/app/components/linked-components`)) {
                fs.symlinkSync(`${__dirname}/../demo-snippets/${frameworkName}`, `./demo-${frameworkName}/app/components/linked-components`);
            }
        }
    } else {
        console.log('No package.json for demo-snippets or no active demos...');
    }
} catch (err) {
    console.error(err);
}

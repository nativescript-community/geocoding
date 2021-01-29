const fs = require('fs');
const { argv } = require('yargs').option('w', {
    alias: 'write',
    default: false,
    describe: 'Write synced plugin to package.json',
    type: 'boolean'
});

const { write } = argv;

const changes = {
    devDependencies: {},
    scripts: {}
};

const pluginPackageJSON = JSON.parse(fs.readFileSync('./package.json'));
const toolsPackageJSON = JSON.parse(fs.readFileSync('./tools/package.json'));

function checkAndUpdate(field) {
    for (const [key, value] of Object.entries(toolsPackageJSON[field])) {
        if (typeof pluginPackageJSON[field][key] === 'undefined') {
            changes[field][key] = value;
            if (write) {
                pluginPackageJSON[field][key] = value;
            }
        } else if (value !== pluginPackageJSON[field][key]) {
            changes[field][key] = value;
            if (write) {
                pluginPackageJSON[field][key] = value;
            }
        }
    }
}

checkAndUpdate('devDependencies');
checkAndUpdate('scripts');

if (Object.keys(changes.devDependencies).length > 0 || Object.keys(changes.scripts).length > 0) {
    if (write) {
        console.log('The following changes are being made to package.json');
        console.log(changes);
        fs.writeFileSync('./package.json', JSON.stringify(pluginPackageJSON, 0, 4));
    } else {
        console.log('These are the changes that are going to be written:');
        console.log(changes);
        console.log('To write these changes run `npm run sync`');
    }
} else {
    console.log('There are no changes to be made.');
}

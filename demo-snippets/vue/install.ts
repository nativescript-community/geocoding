import Demo1 from './Demo1.vue';
import Development from './Development.vue';

export function install() {}

export const demos = [
    { name: 'Demo', component: Demo1 },
    { name: 'Development', component: Development }
];

import FTable from './src/index.vue';

FTable.install = function (app) {
    app.component(FTable.name, FTable);
};

export {
    FTable
}
import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
    state: () => ({
        gridData: [],
        blockCount: 0,
        towerCount: 0,
        svg: "",
    }),
    actions: {
        updateGridData(data) {
            this.gridData = data;
        },
        updateDiagramData(svg, blockCount, towerCount) {
            this.svg = svg;
            this.blockCount = blockCount;
            this.towerCount = towerCount;
        },
    },
});
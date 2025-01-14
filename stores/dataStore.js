import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
    state: () => ({
        gridData: [],
        blockCount: 0,
        towerCount: 0,
        diagramData: null,
        svg: "",
    }),
    actions: {
        updateGridData(data) {
            this.gridData = data;
        },
        updateDiagramData(diagramData, svg, blockCount, towerCount) {
            this.diagramData = diagramData;
            this.svg = svg;
            this.blockCount = blockCount;
            this.towerCount = towerCount;
        },
    },
});
import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
    state: () => ({
        fileName: undefined,
        gridData: [],
        blockCount: 0,
        towerCount: 0,
        diagramData: undefined,
        svg: "",
    }),
    actions: {
        updateFileName(name) {
            this.fileName = name;
        },
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
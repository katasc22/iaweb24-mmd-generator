import { defineStore } from "pinia";


export const useDataStore = defineStore("dataStore", {
    state: () => ({
        fileName: "", // Holds the name of the uploaded file
        gridData: [], // Holds the parsed Excel data
        diagramData: undefined, // Holds the generated diagram data
        svg: "", // Holds the generated SVG content
        blockCount: 0, // Count of blocks
        towerCount: 0, // Count of towers
        settings: {
            block: {
                margin: 20,
                padding: 20,
                gap: 10,
                backgroundColor: "#f5f5f5",
                strokeColor: "#c8c8c8",
                fontFamily: "Arial",
                fontSize: 18,
                textColor: "#000000",
            },
            tower: {
                width: 200,
                padding: 10,
                gap: 20,
                backgroundColor: "#e6e6e6",
                strokeColor: "#c8c8c8",
                fontFamily: "Arial",
                fontSize: 16,
                textColor: "#000000",
            },
            box: {
                padding: 10,
                gap: 10,
                backgroundColor: "#ffffff",
                strokeColor: "#c8c8c8",
                fontFamily: "Arial",
                fontSize: 14,
                textColor: "#000000",
            },
        },
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
        updateSettings(newSettings) {
            // Update block settings
            if (newSettings.block) {
                /*this.settings.block.margin = newSettings.block.margin ?? this.settings.block.margin;
                this.settings.block.padding = newSettings.block.padding ?? this.settings.block.padding;
                this.settings.block.gap = newSettings.block.gap ?? this.settings.block.gap;*/
                this.settings.block.backgroundColor = newSettings.block.backgroundColor ?? this.settings.block.backgroundColor;
                this.settings.block.strokeColor = newSettings.block.strokeColor ?? this.settings.block.strokeColor;
                this.settings.block.fontFamily = newSettings.block.fontFamily ?? this.settings.block.fontFamily;
                this.settings.block.fontSize = newSettings.block.fontSize ?? this.settings.block.fontSize;
                this.settings.block.textColor = newSettings.block.textColor ?? this.settings.block.textColor;
            }

            // Update tower settings
            if (newSettings.tower) {
                /*this.settings.tower.width = newSettings.tower.width ?? this.settings.tower.width;
                this.settings.tower.padding = newSettings.tower.padding ?? this.settings.tower.padding;
                this.settings.tower.gap = newSettings.tower.gap ?? this.settings.tower.gap;*/
                this.settings.tower.backgroundColor = newSettings.tower.backgroundColor ?? this.settings.tower.backgroundColor;
                this.settings.tower.strokeColor = newSettings.tower.strokeColor ?? this.settings.tower.strokeColor;
                this.settings.tower.fontFamily = newSettings.tower.fontFamily ?? this.settings.tower.fontFamily;
                this.settings.tower.fontSize = newSettings.tower.fontSize ?? this.settings.tower.fontSize;
                this.settings.tower.textColor = newSettings.tower.textColor ?? this.settings.tower.textColor;
            }

            // Update box settings
            if (newSettings.box) {
                /*this.settings.box.padding = newSettings.box.padding ?? this.settings.box.padding;
                this.settings.box.gap = newSettings.box.gap ?? this.settings.box.gap;*/
                this.settings.box.backgroundColor = newSettings.box.backgroundColor ?? this.settings.box.backgroundColor;
                this.settings.box.strokeColor = newSettings.box.strokeColor ?? this.settings.box.strokeColor;
                this.settings.box.fontFamily = newSettings.box.fontFamily ?? this.settings.box.fontFamily;
                this.settings.box.fontSize = newSettings.box.fontSize ?? this.settings.box.fontSize;
                this.settings.box.textColor = newSettings.box.textColor ?? this.settings.box.textColor;
            }
        },
        resetData() {
            this.fileName = "";
            this.gridData = [];
            this.diagramData = null;
            this.svg = null;
            this.blockCount = 0;
            this.towerCount = 0;
        },
    },
});
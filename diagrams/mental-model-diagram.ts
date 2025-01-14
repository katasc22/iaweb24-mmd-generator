import { wrapText } from "~/utils/text-utils";
import svg from "~/utils/svg-builder";

export interface DiagramData {
  [blockName: string]: {
    [towerName: string]: string[];
  };
}

export interface DiagramOptions {
  blockMargin?: number;
  blockPadding?: number;
  blockGap?: number;
  blockBackgroundColor?: string;
  blockStrokeColor?: string;
  blockFontFamily?: string;
  blockFontSize?: number;
  blockTextColor?: string;

  towerWidth?: number;
  towerPadding?: number;
  towerGap?: number;
  towerBackgroundColor?: string;
  towerStrokeColor?: string;
  towerFontFamily?: string;
  towerFontSize?: number;
  towerTextColor?: string;

  boxPadding?: number;
  boxGap?: number;
  boxBackgroundColor?: string;
  boxStrokeColor?: string;
  boxFontFamily?: string;
  boxFontSize?: number;
  boxTextColor?: string;
}

interface Block {
  title: string[];
  width: number;
  height: number;
  towers: Tower[];
}

interface Tower {
  title: string[];
  height: number;
  boxes: Box[];
}

interface Box {
  title: string[];
  height: number;
}

export function generateMentalModelDiagram(
  data: DiagramData,
  opts: DiagramOptions = {}
): string {
  const {
    blockMargin = 20,
    blockPadding = 20,
    blockGap = 10,
    blockBackgroundColor = "#f5f5f5",
    blockStrokeColor = "#c8c8c8",
    blockFontFamily = "Arial, sans-serif",
    blockFontSize = 18,
    blockTextColor = "#000",

    towerWidth = 200,
    towerPadding = 10,
    towerGap = 20,
    towerBackgroundColor = "#e6e6e6",
    towerStrokeColor = "#c8c8c8",
    towerFontFamily = "Arial, sans-serif",
    towerFontSize = 16,
    towerTextColor = "#000",

    boxPadding = 10,
    boxGap = 10,
    boxBackgroundColor = "#ffffff",
    boxStrokeColor = "#c8c8c8",
    boxFontFamily = "Arial, sans-serif",
    boxFontSize = 14,
    boxTextColor = "#000",
  } = opts;

  const blocks: Block[] = [];

  // Process data into structured blocks
  Object.entries(data).forEach(([blockName, towerData]) => {
    let maxTowerHeight = 0;

    const towers = Object.entries(towerData).map(([towerName, boxContents]) => {
      const boxes = boxContents.map((content) => {
        const title = wrapText(
          content,
          towerWidth - 2 * towerPadding,
          boxFontSize
        );
        const height = title.length * boxFontSize + boxPadding * 2;
        return { title, height };
      });

      const title = wrapText(towerName, towerWidth, towerFontSize);
      const titleHeight = title.length * towerFontSize;
      const boxesHeight = boxes
        .map((box) => box.height)
        .reduce((a, b) => a + b + boxGap, -boxGap); // Subtract last gap
      const height = titleHeight + boxesHeight + towerPadding * 3;

      maxTowerHeight = Math.max(maxTowerHeight, height);

      return { title, height, boxes };
    });

    const width =
      towers.length * towerWidth +
      (towers.length - 1) * towerGap +
      blockPadding * 2;
    const title = wrapText(blockName, width, blockFontSize);
    const height =
      maxTowerHeight + title.length * blockFontSize + blockPadding * 2;

    blocks.push({ title, width, height, towers });
  });

  // Calculate the maximum block height for alignment
  const maxBlockHeight = Math.max(...blocks.map((block) => block.height));

  // Calculate SVG dimensions
  const svgWidth =
    blocks.reduce((sum, block) => sum + block.width + blockGap, -blockGap) +
    blockPadding * 2;
  const svgHeight = maxBlockHeight + blockMargin * 2;

  const svgContent: string[] = [];
  let currentX = blockMargin;

  blocks.forEach((block) => {
    const blockGroup: string[] = [];

    // Use the maximum height for the block
    blockGroup.push(`
      <rect x="0" y="0" width="${block.width}" height="${maxBlockHeight}" fill="${blockBackgroundColor}" stroke="${blockStrokeColor}" stroke-width="2" rx="10" />
    `);

    // Add block title
    blockGroup.push(`
      <text x="${blockPadding}" y="${blockFontSize + blockPadding}" font-family="${blockFontFamily}" font-size="${blockFontSize}" fill="${blockTextColor}">
        ${block.title
          .map(
            (line, i) =>
              `<tspan x="${blockPadding}" dy="${
                i === 0 ? 0 : blockFontSize
              }">${line}</tspan>`
          )
          .join("")}
      </text>
    `);

    let towerX = blockPadding;

    block.towers.forEach((tower) => {
      // Align towers to the bottom of the block
      const towerY = maxBlockHeight - tower.height - blockPadding;

      const towerGroup: string[] = [];
      towerGroup.push(`
        <rect x="0" y="0" width="${towerWidth}" height="${tower.height}" fill="${towerBackgroundColor}" stroke="${towerStrokeColor}" stroke-width="2" rx="10" />
      `);

      towerGroup.push(`
        <text x="${towerPadding}" y="${towerFontSize + towerPadding}" font-family="${towerFontFamily}" font-size="${towerFontSize}" fill="${towerTextColor}">
          ${tower.title
            .map(
              (line, i) =>
                `<tspan x="${towerPadding}" dy="${
                  i === 0 ? 0 : towerFontSize
                }">${line}</tspan>`
            )
            .join("")}
        </text>
      `);

      let currentBoxY =
        towerPadding + towerFontSize * tower.title.length + towerPadding;

      tower.boxes.forEach((box) => {
        towerGroup.push(`
          <rect x="${towerPadding}" y="${currentBoxY}" width="${
          towerWidth - 2 * towerPadding
        }" height="${box.height}" fill="${boxBackgroundColor}" stroke="${boxStrokeColor}" stroke-width="1" rx="10" />
        `);

        towerGroup.push(`
          <text x="${towerPadding + boxPadding}" y="${
          currentBoxY + boxFontSize + boxPadding
        }" font-family="${boxFontFamily}" font-size="${boxFontSize}" fill="${boxTextColor}">
            ${box.title
              .map(
                (line, i) =>
                  `<tspan x="${towerPadding + boxPadding}" dy="${
                    i === 0 ? 0 : boxFontSize
                  }">${line}</tspan>`
              )
              .join("")}
          </text>
        `);

        currentBoxY += box.height + boxGap;
      });

      blockGroup.push(`
        <g transform="translate(${towerX}, ${towerY})">
          ${towerGroup.join("")}
        </g>
      `);

      towerX += towerWidth + towerGap;
    });

    svgContent.push(`
      <g transform="translate(${currentX}, ${blockMargin})">
        ${blockGroup.join("")}
      </g>
    `);

    currentX += block.width + blockGap;
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
      ${svgContent.join("\n")}
    </svg>
  `;
}

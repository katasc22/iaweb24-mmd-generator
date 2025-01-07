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
  opts: DiagramOptions = {},
): string {
  const {
    blockMargin = 20,
    blockPadding = 20,
    blockGap = 10,
    blockBackgroundColor = "#f5f5f5",
    blockStrokeColor = "#c8c8c8",
    blockFontFamily = undefined,
    blockFontSize = 18,
    blockTextColor = "#000",

    towerWidth = 200,
    towerPadding = 10,
    towerGap = 20,
    towerBackgroundColor = "#e6e6e6",
    towerStrokeColor = "#c8c8c8",
    towerFontFamily = undefined,
    towerFontSize = 16,
    towerTextColor = "#000",

    boxPadding = 10,
    boxGap = 10,
    boxBackgroundColor = "#ffffff",
    boxStrokeColor = "#c8c8c8",
    boxFontFamily = undefined,
    boxFontSize = 14,
    boxTextColor = "#000",
  } = opts;

  const blocks: Block[] = [];

  Object.entries(data).forEach(([blockName, towerData]) => {
    let maxTowerHeight = 0;

    const towers = Object.entries(towerData).map(([towerName, boxContents]) => {
      const boxes = boxContents.map((content) => {
        const title = wrapText(
          content,
          towerWidth - 2 * towerPadding,
          boxFontSize,
        );
        const height = title.length * boxFontSize + boxPadding * 2;
        return { title, height };
      });

      const title = wrapText(towerName, towerWidth, towerFontSize);
      const titleHeight = title.length * towerFontSize;
      const boxesHeight = boxes
        .map((box) => box.height)
        .reduce((a, b) => a + b + boxGap, 0);
      const height = titleHeight + boxesHeight + towerPadding * 3;

      if (height > maxTowerHeight) {
        maxTowerHeight = height;
      }

      return {
        title,
        height,
        boxes,
      };
    });

    const width =
      towers.length * towerWidth +
      (towers.length - 1) * towerGap +
      blockPadding * 2;
    const title = wrapText(blockName, width, blockFontSize);
    const height =
      maxTowerHeight + title.length * blockFontSize + blockPadding * 2;

    blocks.push({
      title,
      width,
      height,
      towers,
    });
  });

  const maxBlockHeight =
    Math.max(...blocks.map((block) => block.height)) + blockPadding * 2;

  const svgBuilder = svg();
  let currentX = blockPadding;

  blocks.forEach((block) => {
    svgBuilder.group(
      { transform: `translate(${currentX}, ${blockPadding})` },
      (blockGroup) => {
        blockGroup.rect({
          x: 0,
          y: 0,
          width: block.width,
          height: maxBlockHeight,
          fill: blockBackgroundColor,
          stroke: blockStrokeColor,
          strokeWidth: "2px",
          rx: 10,
        });

        blockGroup.textBlock(
          {
            x: blockPadding,
            y: blockFontSize + blockPadding,
            "font-family": blockFontFamily,
            "font-size": blockFontSize,
            fill: blockTextColor,
          },
          block.title,
          blockFontSize,
        );

        let towerX = blockPadding;
        block.towers.forEach((tower) => {
          const towerY = maxBlockHeight - blockPadding - tower.height;

          blockGroup.group(
            { transform: `translate(${towerX}, ${towerY})` },
            (towerGroup) => {
              towerGroup.rect({
                x: 0,
                y: 0,
                width: towerWidth,
                height: tower.height,
                fill: towerBackgroundColor,
                stroke: towerStrokeColor,
                "stroke-width": "2px",
                rx: 10,
              });

              towerGroup.textBlock(
                {
                  x: towerPadding,
                  y: towerFontSize + towerPadding,
                  "font-family": towerFontFamily,
                  "font-size": towerFontSize,
                  fill: towerTextColor,
                },
                tower.title,
                towerFontSize,
              );

              let currentBoxY =
                tower.title.length * towerFontSize + towerPadding * 2;

              tower.boxes.forEach((box) => {
                towerGroup.rect({
                  x: towerPadding,
                  y: currentBoxY,
                  width: towerWidth - towerPadding * 2,
                  height: box.height,
                  fill: boxBackgroundColor,
                  stroke: boxStrokeColor,
                  "stroke-width": "1px",
                  rx: 10,
                });

                towerGroup.textBlock(
                  {
                    x: towerPadding + boxPadding,
                    y: currentBoxY + boxFontSize + boxPadding,
                    "font-family": boxFontFamily,
                    "font-size": boxFontSize,
                    fill: boxTextColor,
                  },
                  box.title,
                  boxFontSize,
                );

                currentBoxY += box.height + boxGap;
              });
            },
          );

          towerX += towerWidth + towerGap;
        });
      },
    );

    currentX += block.width + blockPadding * 2 + blockGap;
  });

  return svgBuilder
    .width(currentX)
    .height(maxBlockHeight + blockMargin * 2)
    .build();
}

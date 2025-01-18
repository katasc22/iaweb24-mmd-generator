import { wrapText } from "~/utils/text-utils";
import svg from "~/utils/svg-builder";

export interface DiagramData {
  [blockName: string]: {
    [towerName: string]: string[];
  };
}

const defaultDiagramOptions: DiagramOptions = {
  blockMargin: 20,
  blockPadding: 20,
  blockGap: 10,
  blockBackgroundColor: "#f5f5f5",
  blockStrokeColor: "#c8c8c8",
  blockFontFamily: "Arial",
  blockFontSize: 18,
  blockTextColor: "#000",

  towerWidth: 200,
  towerPadding: 10,
  towerGap: 20,
  towerBackgroundColor: "#e6e6e6",
  towerStrokeColor: "#000000",
  towerFontFamily: "Arial",
  towerFontSize: 16,
  towerTextColor: "#000",

  boxPadding: 10,
  boxGap: 10,
  boxBackgroundColor: "#ffffff",
  boxStrokeColor: "#c8c8c8",
  boxFontFamily: "Arial",
  boxFontSize: 14,
  boxTextColor: "#000",
};


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
  {forceSize}: {forceSize: boolean} = {forceSize: false},
): string {
  console.log(opts);
  const castedOptions = opts as DiagramOptions; //does not work
  console.log(castedOptions);

  const blocks: Block[] = [];

  Object.entries(data).forEach(([blockName, towerData]) => {
    let maxTowerHeight = 0;

    const towers = Object.entries(towerData).map(([towerName, boxContents]) => {
      const boxes = boxContents.map((content) => {
        // Wrap text for the box content
        const title = wrapText(
            content,
            opts.towerWidth - 2 * opts.towerPadding,
            opts.boxFontSize,
        );
        const height = title.length * opts.boxFontSize + opts.boxPadding * 2;
        return { title, height };
      });

      // Wrap text for the tower title
      const title = wrapText(towerName, opts.towerWidth, opts.towerFontSize);
      const titleHeight = title.length * opts.towerFontSize;

      const boxesHeight = boxes
          .map((box) => box.height)
          .reduce((a, b) => a + b + opts.boxGap, 0);

      const height = titleHeight + boxesHeight + opts.towerPadding * 3;

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
        towers.length * opts.towerWidth +
        (towers.length - 1) * opts.towerGap +
        opts.blockPadding * 2;
    const title = wrapText(blockName, width, opts.blockFontSize);
    const height =
        maxTowerHeight + title.length * opts.blockFontSize + opts.blockPadding * 2;

    blocks.push({
      title,
      width,
      height,
      towers,
    });
  });

  const maxBlockHeight =
      Math.max(...blocks.map((block) => block.height)) + opts.blockPadding * 2;

  const svgBuilder = svg();
  let currentX = opts.blockPadding;

  blocks.forEach((block) => {
    svgBuilder.group(
        { transform: `translate(${currentX}, ${opts.blockPadding})` },
        (blockGroup) => {
          blockGroup.rect({
            x: 0,
            y: 0,
            width: block.width,
            height: maxBlockHeight,
            fill: opts.blockBackgroundColor,
            stroke: opts.blockStrokeColor,
            strokeWidth: 2,
            rx: 10,
          });

          blockGroup.textBlock(
              {
                x: opts.blockPadding,
                y: opts.blockFontSize + opts.blockPadding,
                "font-family": opts.blockFontFamily,
                "font-size": opts.blockFontSize,
                fill: opts.blockTextColor,
              },
              block.title,
              opts.blockFontSize,
          );

          let towerX = opts.blockPadding;
          block.towers.forEach((tower) => {
            const towerY = maxBlockHeight - opts.blockPadding - tower.height;

            blockGroup.group(
                { transform: `translate(${towerX}, ${towerY})` },
                (towerGroup) => {
                  towerGroup.rect({
                    x: 0,
                    y: 0,
                    width: opts.towerWidth,
                    height: tower.height,
                    fill: opts.towerBackgroundColor,
                    stroke: opts.towerStrokeColor,
                    "stroke-width": 2,
                    rx: 10,
                  });

                  towerGroup.textBlock(
                      {
                        x: opts.towerPadding,
                        y: opts.towerFontSize + opts.towerPadding,
                        "font-family": opts.towerFontFamily,
                        "font-size": opts.towerFontSize,
                        fill: opts.towerTextColor,
                      },
                      tower.title,
                      opts.towerFontSize,
                  );

                  let currentBoxY =
                      tower.title.length * opts.towerFontSize + opts.towerPadding * 2;

                  tower.boxes.forEach((box) => {
                    towerGroup.rect({
                      x: opts.towerPadding,
                      y: currentBoxY,
                      width: opts.towerWidth - opts.towerPadding * 2,
                      height: box.height,
                      fill: opts.boxBackgroundColor,
                      stroke: opts.boxStrokeColor,
                      "stroke-width": 1,
                      rx: 10,
                    });

                    towerGroup.textBlock(
                        {
                          x: opts.towerPadding + opts.boxPadding,
                          y: currentBoxY + opts.boxFontSize + opts.boxPadding,
                          "font-family": opts.boxFontFamily,
                          "font-size": opts.boxFontSize,
                          fill: opts.boxTextColor,
                        },
                        box.title,
                        opts.boxFontSize,
                    );

                    currentBoxY += box.height + opts.boxGap;
                  });
                },
            );

            towerX += opts.towerWidth + opts.towerGap;
          });
        },
    );

    currentX += block.width + opts.blockPadding * 2 + opts.blockGap;
  });

  return svgBuilder
      .width(currentX)
      .height(maxBlockHeight + opts.blockMargin * 2)
      .build(forceSize);
}

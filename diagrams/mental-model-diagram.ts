import { wrapText } from "~/utils/text-utils";
import svg from "~/utils/svg-builder";

export interface DiagramData {
  [blockName: string]: {
    [towerName: string]: string[];
  };
}

export interface DiagramOptions {
  block: {
    margin: number;
    padding: number;
    gap: number;
    backgroundColor: string;
    strokeColor: string;
    fontFamily: string;
    fontSize: number;
    textColor: string;
  }

  tower: {
    width: number;
    padding: number;
    gap: number;
    backgroundColor: string;
    strokeColor: string;
    fontFamily: string;
    fontSize: number;
    textColor: string;
  }

  box: {
    padding: number;
    gap: number;
    backgroundColor: string;
    strokeColor: string;
    fontFamily: string;
    fontSize: number;
    textColor: string;
  }
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
  opts: DiagramOptions
): string {
  const blocks: Block[] = [];
  opts = opts as DiagramOptions

  Object.entries(data).forEach(([blockName, towerData]) => {
    let maxTowerHeight = 0;

    const towers = Object.entries(towerData).map(([towerName, boxContents]) => {
      const boxes = boxContents.map((content) => {
        // Wrap text for the box content
        const title = wrapText(
            content,
            opts.tower.width - 2 * opts.tower.padding,
            opts.box.fontSize,
        );
        const height = title.length * opts.box.fontSize + opts.box.padding * 2;
        return { title, height };
      });

      // Wrap text for the tower title
      const title = wrapText(towerName, opts.tower.width, opts.tower.fontSize);
      const titleHeight = title.length * opts.tower.fontSize;

      const boxesHeight = boxes
          .map((box) => box.height)
          .reduce((a, b) => a + b + opts.box.gap, 0);

      const height = titleHeight + boxesHeight + opts.tower.padding * 3;

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
        towers.length * opts.tower.width +
        (towers.length - 1) * opts.tower.gap +
        opts.block.padding * 2;
    const title = wrapText(blockName, width, opts.block.fontSize);
    const height =
        maxTowerHeight + title.length * opts.block.fontSize + opts.block.padding * 2;

    blocks.push({
      title,
      width,
      height,
      towers,
    });
  });

  const maxBlockHeight =
      Math.max(...blocks.map((block) => block.height)) + opts.block.padding * 2;

  const svgBuilder = svg();
  let currentX = opts.block.margin;

  blocks.forEach((block) => {
    svgBuilder.group(
        { transform: `translate(${currentX}, ${opts.block.margin})` },
        (blockGroup) => {
          blockGroup.rect({
            x: 0,
            y: 0,
            width: block.width,
            height: maxBlockHeight,
            fill: opts.block.backgroundColor,
            stroke: opts.block.strokeColor,
            strokeWidth: 2,
            rx: 10,
          });

          blockGroup.textBlock(
              {
                x: opts.block.padding,
                y: opts.block.fontSize + opts.block.padding,
                "font-family": opts.block.fontFamily,
                "font-size": opts.block.fontSize,
                fill: opts.block.textColor,
              },
              block.title,
              opts.block.fontSize,
          );

          let towerX = opts.block.padding;
          block.towers.forEach((tower) => {
            const towerY = maxBlockHeight - opts.block.padding - tower.height;

            blockGroup.group(
                { transform: `translate(${towerX}, ${towerY})` },
                (towerGroup) => {
                  towerGroup.rect({
                    x: 0,
                    y: 0,
                    width: opts.tower.width,
                    height: tower.height,
                    fill: opts.tower.backgroundColor,
                    stroke: opts.tower.strokeColor,
                    "stroke-width": 2,
                    rx: 10,
                  });

                  towerGroup.textBlock(
                      {
                        x: opts.tower.padding,
                        y: opts.tower.fontSize + opts.tower.padding,
                        "font-family": opts.tower.fontFamily,
                        "font-size": opts.tower.fontSize,
                        fill: opts.tower.textColor,
                      },
                      tower.title,
                      opts.tower.fontSize,
                  );

                  let currentBoxY =
                      tower.title.length * opts.tower.fontSize + opts.tower.padding * 2;

                  tower.boxes.forEach((box) => {
                    towerGroup.rect({
                      x: opts.tower.padding,
                      y: currentBoxY,
                      width: opts.tower.width - opts.tower.padding * 2,
                      height: box.height,
                      fill: opts.box.backgroundColor,
                      stroke: opts.box.strokeColor,
                      "stroke-width": 1,
                      rx: 10,
                    });

                    towerGroup.textBlock(
                        {
                          x: opts.tower.padding + opts.box.padding,
                          y: currentBoxY + opts.box.fontSize + opts.box.padding,
                          "font-family": opts.box.fontFamily,
                          "font-size": opts.box.fontSize,
                          fill: opts.box.textColor,
                        },
                        box.title,
                        opts.box.fontSize,
                    );

                    currentBoxY += box.height + opts.box.gap;
                  });
                },
            );

            towerX += opts.tower.width + opts.tower.gap;
          });
        },
    );

    currentX += block.width + opts.block.padding * 2 + opts.block.gap;
  });

  return svgBuilder
      .width(currentX)
      .height(maxBlockHeight + opts.block.margin * 2)
      .build();
}

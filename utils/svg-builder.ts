type Attributes = Record<string, string | number | undefined>;

export class SvgBuilder {
  private elements: string[] = [];
  private _width?: number;
  private _height?: number;

  width(width: number) {
    this._width = width;
    return this;
  }

  height(height: number) {
    this._height = height;
    return this;
  }

  group(
    attrs: Attributes,
    groupBuilder: (builder: SvgBuilder) => void,
  ): SvgBuilder {
    const attrsString = objectToXmlAttributes(attrs);
    this.elements.push(`<g ${attrsString}>`);
    groupBuilder(this);
    this.elements.push(`</g>`);
    return this;
  }

  rect(attributes: Attributes) {
    this.elements.push(createElement("rect", attributes));
    return this;
  }

  text(attributes: Attributes, text: string) {
    const textElement = createElement("text", attributes, text);
    this.elements.push(textElement);
    return this;
  }

  textBlock(attributes: Attributes, lines: string[], lineHeight: number) {
    return this.text(
      attributes,
      lines
        .map((line, i) => {
          const dy = i === 0 ? 0 : lineHeight;
          return createElement(
            "tspan",
            {
              x: attributes.x,
              dy,
            },
            line,
          );
        })
        .join(""),
    );
  }

  build(): string {
    const elements = this.elements.join("\n");

    return createElement(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: this._width,
        height: this._height,
      },
      elements,
    );
  }
}

export default function svg() {
  return new SvgBuilder();
}

function createElement(
  tag: string,
  attributes: Attributes,
  children = "",
): string {
  const xmlAttributes = objectToXmlAttributes(attributes);
  return `<${tag} ${xmlAttributes}>${children}</${tag}>`;
}

function objectToXmlAttributes(attributes: Attributes): string {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
}

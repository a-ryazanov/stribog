import { SpotSafetyLine, SpotSafetyLineStatus } from '../../../shared/api';

const colorMap: Record<SpotSafetyLineStatus, string> = {
  [SpotSafetyLineStatus.DANGER]: '#ff4d4f',
  [SpotSafetyLineStatus.WARNING]: '#faad14',
  [SpotSafetyLineStatus.SAFE]: '#52c41a',
};

export const canvasFactory = (id: string): HTMLCanvasElement => {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();

  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#scaling_for_high_resolution_displays
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;

  return canvas;
};

export const contextFactory = (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#turn_off_transparency
  const context = canvas.getContext('2d', { alpha: false });

  context?.scale(devicePixelRatio, devicePixelRatio);

  return context;
};

const drawBackgroundImage = ({
  context,
  image,
}: {
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
}) => {
  context.beginPath();
  context.drawImage(image, 0, 0);
  context.closePath();
};

const drawLine = ({
  context,
  line,
  firstLine,
  nextLine,
}: {
  context: CanvasRenderingContext2D;
  line: SpotSafetyLine;
  firstLine: SpotSafetyLine;
  nextLine: SpotSafetyLine | undefined;
}): void => {
  const currentColor = colorMap[line.status];
  const nextColor = colorMap[nextLine?.status ?? firstLine.status];
  const gradient = context.createLinearGradient(line.ax, line.ay, line.bx, line.by);
  gradient.addColorStop(0, currentColor);
  gradient.addColorStop(1, nextColor);

  context.beginPath();

  context.lineWidth = 6;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.shadowOffsetX = -2;
  context.shadowOffsetY = -2;
  context.shadowBlur = 12;
  context.shadowColor = currentColor;
  context.strokeStyle = gradient;

  context.moveTo(line.ax, line.ay);
  context.lineTo(line.bx, line.by);

  context.stroke();
  context.closePath();
};

interface DrawMapOptions {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
  lines: Array<SpotSafetyLine>;
}

export const drawMap = ({ canvas, context, image, lines }: DrawMapOptions): void => {
  canvas.width = image.width;
  canvas.height = image.height;

  drawBackgroundImage({ context, image });

  lines.forEach((line, index, array) =>
    drawLine({
      context,
      line,
      nextLine: array[index + 1],
      firstLine: array[0],
    }),
  );
};

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

export const drawLine = (context: CanvasRenderingContext2D): void => {
  context.lineWidth = 24;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.shadowOffsetX = -6;
  context.shadowOffsetY = -6;
  context.shadowBlur = 12;
};

interface DrawMapOptions {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
}

export const drawMap = ({ canvas, context, image }: DrawMapOptions): void => {
  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);

  context.beginPath();

  // TODO
  // drawLine(context);

  context.stroke();
};

function drawStroke(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  previousX: number,
  previousY: number
): void {
  ctx.beginPath();
  ctx.moveTo(previousX, previousY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

function drawRect(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  previousX: number,
  previousY: number
): void {
  ctx.beginPath();
  ctx.moveTo(previousX, previousY);
  ctx.strokeRect(
    previousX,
    previousY,
    event.offsetX - previousX,
    event.offsetY - previousY
  );
}

function drawStrangeStroke(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  previousX: number,
  previousY: number
): void {
  ctx.beginPath();
  ctx.moveTo(previousX, previousY);
  ctx.lineTo(event.offsetX - previousX / 2, event.offsetY - previousY / 2);
  ctx.stroke();
}

function drawStrangeRect(
  event: MouseEvent,
  ctx: CanvasRenderingContext2D,
  previousX: number,
  previousY: number
) {
  ctx.beginPath();
  ctx.moveTo(previousX, previousY);
  ctx.strokeRect(
    previousX,
    previousY,

    // these can be minus numbers, can't they?
    event.offsetX - previousY,
    event.offsetY - previousX
  );
}

const drawHelpers = {
  drawStroke: drawStroke,
  drawRect: drawRect,
  drawStrangeStroke: drawStrangeStroke,
  drawStrangeRect: drawStrangeRect,
};

export default drawHelpers;

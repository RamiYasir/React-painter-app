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

const drawHelpers = {
  drawStroke: drawStroke,
  drawRect: drawRect,
};

export default drawHelpers;

let slider, val;
let flag = 0;
 setup = () => {
 createCanvas(600, 600);
 slider = createSlider(1, 30, 10, 1);
 slider.position(width - 100, height - 25);
 slider.style('width', '80px');
 background('rgb(181, 181, 181)');
 translate(width / 2, height / 2);
 val = slider.value();
}
draw = () => {
 background('rgb(181, 181, 181)');
 translate(width / 2, height / 2);
 val = slider.value();
 scale(val);
 drawAxis();
 drawGrid();
 drawAxis();
 // Малювання ліній
 line_brez(-3, 4, -6, 14);
 line_brez(3, 4, 6, 14);
 line_brez(-3, -4, -6, -14);
 line_brez(3, -4, 6, -14);
 stroke('rgb(255, 0, 0)');
 strokeWeight(0.1);
 line(-3 + 0.5, invert(4 - 0.5), -6 + 0.5, invert(14 - 0.5));
 line(3 + 0.5, invert(4 - 0.5), 6 + 0.5, invert(14 - 0.5));
 line(-3 + 0.5, invert(-4 - 0.5), -6 + 0.5, invert(-14 - 0.5));
 line(3 + 0.5, invert(-4 - 0.5), 6 + 0.5, invert(-14 - 0.5));
 // Малювання фігури
  line_brez(0, 20, 20, 0);
 line_brez(20, 0, 0, -20);
  line_brez(0, -20, -20, 0);
 line_brez(-20, 0, 0, 20);
 //
 // line_brez(0, 16, 16, 0);
 // line_brez(16, 0, 0, -16);
 // line_brez(0, -16, -16, 0);
 // line_brez(-16, 0, 0, 16);
 //
 // line_brez(0, 20, 0, 16);
 // line_brez(16, 0, 20, 0);
 // line_brez(0, -16, 0, -20);
 // line_brez(-16, 0, -20, 0);
}
Sign = number => {
 let sign = '';
 if(number === -1) sign = '-';
 else if(number === 1) sign = '+';
 else sign = '0';
 return sign;
}
line_brez = (x1, y1, x2, y2) => {
 let dx, dy, i, sx, sy, check, e, x, y;
 y1 = invert(y1);
 y2 = invert(y2);
 dx = Math.abs(x1 - x2);
 dy = Math.abs(y1 - y2);
 sx = Math.sign(x2 - x1);
 sy = Math.sign(y2 - y1);
 x = x1;
 y = y1;
 check = 0;
 if (dy > dx) {
 dx = dx + dy;
 dy = dx - dy;
 dx = dx - dy;
 check = 1;
 }
 e = 2 * dy - dx;
 for (i = 0; i <= dx; i++) {
 stroke('black');
 strokeWeight(1);
 point(x, y);
 if(flag === 0) {
 document.getElementsByTagName('table')[0].innerHTML += `
 <tr>
 <td>${i}</td>
 <td>${e}</td>
 <td>${Sign(Math.sign(e))}</td>
 <td>${x}</td>
 <td>${invert(y)}</td>
 </tr>
 `;
 }
 if (e >= 0) {
 if (check === 1) x = x + sx;
 else y = y + sy;
 e = e - 2 * dx;
 }
 if (check === 1) y = y + sy;
 else x = x + sx;
 e = e + 2 * dy;
 }
 flag = 1;
}
drawAxis = () => {
 stroke('rgb(40, 40, 40)');
 strokeWeight(0.1);
 line(-width / 2, 0, width / 2, 0);
 line(0, -height / 2, 0, height / 2);
}
invert = y => {
 return y * (-1);
}
drawGrid = () => {
 stroke(200);
 strokeWeight(0.1);
 for (let x = -width; x < width; x += 1) line(x, -height, x, height);
 for (let y = -height; y < height; y += 1) line(-width, y, width, y);
 for (let x = -width; x < width; x += 2) {
 textSize(0.6);
 text(x/1, x + 0.2, 0.8);
 }
 for (let y = -height; y < height; y += 2) {
 textSize(0.6);
 text(-y/1, 0.2, y + 0.8);
 }
 stroke('black');
 strokeWeight(0.1);
 for (let x = -width; x < width; x += 1) line(x, 0.15, x, -0.15);
 for (let y = -height; y < height; y += 1) line(-0.15, y, 0.15, y);
}
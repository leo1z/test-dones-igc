/**
 * canvas-share.js — Dones IGC (v2)
 * Genera imágenes descargables en formato Story de Instagram (1080×1920)
 * utilizando la API de Canvas de HTML5 de forma 100% local.
 */

// Helper para cargar imágenes de forma asíncrona con Promesas
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn(`No se pudo cargar la imagen: ${src}. Usando fallback.`);
      resolve(null);
    };
    img.src = src;
  });
}

// Helper para dibujar rectángulos con bordes redondeados
function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle = null, strokeStyle = null, strokeWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

// Helper para ajustar texto largo en múltiples líneas
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
}

/**
 * Genera y descarga la historia en formato 1080x1920 PNG
 * @param {Object} calculation - El objeto retornado por runFullCalculation
 * @param {string} variant - 'bento', 'highlight' o 'viral'
 */
export async function downloadStory(calculation, variant) {
  // Crear canvas en memoria
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  
  // 1. Cargar logos oficiales
  const logoIgc = await loadImage('src/assets/logos/IGC.png');
  const logoAntimateria = await loadImage('src/assets/logos/antimateria.png');
  
  // Dibujar Fondo Degradado Premium (Navy a Deep Space Blue)
  const grad = ctx.createLinearGradient(0, 0, 0, 1920);
  grad.addColorStop(0, '#0f0f31'); // Navy oficial
  grad.addColorStop(0.5, '#13133f');
  grad.addColorStop(1, '#08081c'); // Navy más oscuro
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1920);
  
  // Dibujar marco dorado elegante inset por 32px
  drawRoundedRect(ctx, 32, 32, 1080 - 64, 1920 - 64, 24, null, '#336cdd', 4);
  
  // Dibujar Cabecera Común (Logo IGC y Nombre de la Iglesia)
  if (logoIgc) {
    // Dibujar logo centrado horizontalmente
    const logoW = 160;
    const logoH = logoIgc.height * (logoW / logoIgc.width);
    ctx.drawImage(logoIgc, (1080 - logoW) / 2, 120, logoW, logoH);
  }
  
  ctx.fillStyle = '#f7eee5'; // Cream oficial
  ctx.font = 'bold 36px "Elms Sans"';
  ctx.textAlign = 'center';
  ctx.fillText('IGLESIA GRAN COMISIÓN', 1080 / 2, 360);
  
  ctx.fillStyle = '#336cdd'; // Azul oficial
  ctx.font = '800 24px "Elms Sans"';
  ctx.fillText('TEGUCIGALPA', 1080 / 2, 400);
  
  // Dones obtenidos
  const top1 = calculation.top3[0];
  const top2 = calculation.top3[1];
  const top3 = calculation.top3[2];
  
  // 2. Renderizar variante específica
  if (variant === 'bento') {
    // VARIANTE 1: TOP 3 BENTO GRID
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Elms Sans"';
    ctx.fillText('MIS DONES PRINCIPALES', 1080 / 2, 520);
    
    // CARDS EN FORMATO BENTO
    // Card 1 (Grande - Primer Lugar)
    const card1Y = 580;
    const card1H = 500;
    drawRoundedRect(ctx, 80, card1Y, 1080 - 160, card1H, 20, '#151e33', '#d4af37', 3);
    
    // Cargar ilustración de don 1
    const img1 = await loadImage(top1.illustration);
    if (img1) {
      ctx.drawImage(img1, 140, card1Y + 120, 240, 240);
    }
    
    // Textos Card 1
    ctx.textAlign = 'left';
    ctx.fillStyle = '#d4af37';
    ctx.font = '900 80px "Elms Sans"';
    ctx.fillText('1º', 430, card1Y + 140);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "Elms Sans"';
    ctx.fillText(top1.name.toUpperCase(), 430, card1Y + 210);
    
    ctx.fillStyle = '#336cdd';
    ctx.font = '800 40px "Elms Sans"';
    ctx.fillText(`${top1.percentage}% AFINIDAD`, 430, card1Y + 275);
    
    ctx.fillStyle = '#f7eee5';
    ctx.font = 'italic 28px "Elms Sans"';
    wrapText(ctx, top1.description, 430, card1Y + 340, 480, 36);
    
    // Card 2 (Mediana - Segundo Lugar)
    const card2Y = 1120;
    const cardH2 = 360;
    const cardW2 = (1080 - 190) / 2; // Partir en dos
    drawRoundedRect(ctx, 80, card2Y, cardW2, cardH2, 16, '#151e33', '#94a3b8', 2);
    
    const img2 = await loadImage(top2.illustration);
    if (img2) {
      ctx.drawImage(img2, 80 + (cardW2 - 120) / 2, card2Y + 40, 120, 120);
    }
    
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 36px "Elms Sans"';
    ctx.fillText('2º LUGAR', 80 + cardW2 / 2, card2Y + 210);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px "Elms Sans"';
    ctx.fillText(top2.name, 80 + cardW2 / 2, card2Y + 265);
    ctx.fillStyle = '#336cdd';
    ctx.font = '800 32px "Elms Sans"';
    ctx.fillText(`${top2.percentage}%`, 80 + cardW2 / 2, card2Y + 315);
    
    // Card 3 (Pequeña - Tercer Lugar)
    drawRoundedRect(ctx, 110 + cardW2, card2Y, cardW2, cardH2, 16, '#151e33', '#c084fc', 2);
    
    const img3 = await loadImage(top3.illustration);
    if (img3) {
      ctx.drawImage(img3, 110 + cardW2 + (cardW2 - 120) / 2, card2Y + 40, 120, 120);
    }
    
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 36px "Elms Sans"';
    ctx.fillText('3º LUGAR', 110 + cardW2 + cardW2 / 2, card2Y + 210);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px "Elms Sans"';
    ctx.fillText(top3.name, 110 + cardW2 + cardW2 / 2, card2Y + 265);
    ctx.fillStyle = '#336cdd';
    ctx.font = '800 32px "Elms Sans"';
    ctx.fillText(`${top3.percentage}%`, 110 + cardW2 + cardW2 / 2, card2Y + 315);
    
    // CTA
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f7eee5';
    ctx.font = 'bold 30px "Elms Sans"';
    ctx.fillText('¡Descubre tus dones tú también!', 1080 / 2, 1580);
    
  } else if (variant === 'highlight') {
    // VARIANTE 2: SOLO DESTACADO (DON #1 CON DETALLE)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Elms Sans"';
    ctx.fillText('MI DON PRINCIPAL ES:', 1080 / 2, 510);
    
    // Gran ilustración de Don 1
    const img1 = await loadImage(top1.illustration);
    if (img1) {
      ctx.drawImage(img1, (1080 - 320) / 2, 570, 320, 320);
    }
    
    // Nombre en grande
    ctx.textAlign = 'center';
    ctx.fillStyle = '#d4af37';
    ctx.font = '900 80px "Elms Sans"';
    ctx.fillText(top1.name.toUpperCase(), 1080 / 2, 970);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Elms Sans"';
    ctx.fillText(`${top1.percentage}% de afinidad`, 1080 / 2, 1030);
    
    // Card con descripción completa
    const descY = 1090;
    const descH = 380;
    drawRoundedRect(ctx, 80, descY, 1080 - 160, descH, 16, 'rgba(51, 108, 221, 0.08)', '#336cdd', 1);
    
    ctx.fillStyle = '#f7eee5';
    ctx.font = 'italic 30px "Elms Sans"';
    ctx.textAlign = 'center';
    wrapText(ctx, top1.description, 1080 / 2, descY + 60, 840, 42);
    
  } else if (variant === 'viral') {
    // VARIANTE 3: CARD VIRAL ("ESTE ES MI DON, DESCUBRÍ EL TUYO")
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Elms Sans"';
    ctx.fillText('¿SABÍAS QUE DIOS TE DOTÓ?', 1080 / 2, 510);
    
    // Gran ilustración de Don 1
    const img1 = await loadImage(top1.illustration);
    if (img1) {
      ctx.drawImage(img1, (1080 - 360) / 2, 580, 360, 360);
    }
    
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Elms Sans"';
    ctx.fillText('MI DON PRINCIPAL ES:', 1080 / 2, 1020);
    
    // Nombre en grande
    ctx.fillStyle = '#d4af37';
    ctx.font = '900 96px "Elms Sans"';
    ctx.fillText(top1.name.toUpperCase(), 1080 / 2, 1130);
    
    // Tagline viral
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 44px "Elms Sans"';
    ctx.fillText('Este es mi don.', 1080 / 2, 1270);
    
    ctx.fillStyle = '#f7eee5';
    ctx.font = 'bold 38px "Elms Sans"';
    ctx.fillText('Descubre el tuyo hoy.', 1080 / 2, 1330);
    
    // Dibujar caja simulada de QR o enlace
    const qrY = 1400;
    const qrH = 120;
    drawRoundedRect(ctx, 180, qrY, 1080 - 360, qrH, 12, '#336cdd', null, 0);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Elms Sans"';
    ctx.fillText('igc-dones.vercel.app', 1080 / 2, qrY + 70);
  }
  
  // 3. Pie de página Común (Desarrollado por Antimateria)
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(247, 238, 229, 0.5)';
  ctx.font = '500 22px "Elms Sans"';
  ctx.fillText('Desarrollado por', 1080 / 2, 1740);
  
  if (logoAntimateria) {
    const antiW = 200;
    const antiH = logoAntimateria.height * (antiW / logoAntimateria.width);
    ctx.drawImage(logoAntimateria, (1080 - antiW) / 2, 1765, antiW, antiH);
  }
  
  // Convertir canvas a Blob y descargar
  try {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dones_igc_story_${variant}_${top1.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (err) {
    console.error("Error al exportar canvas a blob:", err);
    // Fallback: descargar como Data URL
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `dones_igc_story_${variant}_${top1.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('public/icons', exist_ok=True)

for size in [192, 512]:
    img = Image.new('RGB', (size, size), '#020810')
    draw = ImageDraw.Draw(img)
    
    # Outer glow ring
    margin = size // 12
    draw.ellipse([margin, margin, size-margin, size-margin], outline='#00f5ff', width=max(2, size//64))
    
    # Inner ring
    m2 = size // 6
    draw.ellipse([m2, m2, size-m2, size-m2], outline='#00a8b0', width=max(1, size//96))
    
    # Crosshair
    cx, cy = size//2, size//2
    arm = size // 5
    lw = max(2, size//64)
    draw.line([cx-arm, cy, cx-arm//3, cy], fill='#00f5ff', width=lw)
    draw.line([cx+arm//3, cy, cx+arm, cy], fill='#00f5ff', width=lw)
    draw.line([cx, cy-arm, cx, cy-arm//3], fill='#00f5ff', width=lw)
    draw.line([cx, cy+arm//3, cx, cy+arm], fill='#00f5ff', width=lw)
    
    # Center dot
    dot = size // 20
    draw.ellipse([cx-dot, cy-dot, cx+dot, cy+dot], fill='#00f5ff')
    
    # Corner brackets
    b = size // 8
    bw = max(2, size//64)
    bl = size // 6
    # TL
    draw.line([b, b, b+bl, b], fill='#39ff14', width=bw)
    draw.line([b, b, b, b+bl], fill='#39ff14', width=bw)
    # TR
    draw.line([size-b-bl, b, size-b, b], fill='#39ff14', width=bw)
    draw.line([size-b, b, size-b, b+bl], fill='#39ff14', width=bw)
    # BL
    draw.line([b, size-b-bl, b, size-b], fill='#39ff14', width=bw)
    draw.line([b, size-b, b+bl, size-b], fill='#39ff14', width=bw)
    # BR
    draw.line([size-b, size-b-bl, size-b, size-b], fill='#39ff14', width=bw)
    draw.line([size-b-bl, size-b, size-b, size-b], fill='#39ff14', width=bw)
    
    img.save(f'public/icons/icon-{size}.png')
    print(f'Created icon-{size}.png')

print('Icons done!')

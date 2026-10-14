#!/bin/bash
# Retry failed Clothido images sequentially with delay (rate-limit safe)
IMG_DIR="/home/z/my-project/public/images"

gen() {
  local name="$1"; local size="$2"; shift 2
  local prompt="$*"
  if [ -f "$IMG_DIR/$name.png" ] && [ -s "$IMG_DIR/$name.png" ]; then echo "skip $name"; return; fi
  for attempt in 1 2 3; do
    if z-ai image -p "$prompt" -o "$IMG_DIR/$name.png" -s "$size" > /dev/null 2>&1; then
      echo "OK $name"; sleep 4; return
    fi
    echo "retry $attempt $name"; sleep 10
  done
  echo "FAIL $name"
}

# Banners
gen hero-campaign 1440x720 "Fashion e-commerce campaign photo, a smiling young South Asian man in a modern navy polo shirt standing confidently beside a woman in an elegant printed tunic, warm beige studio backdrop with soft plants, professional advertising photography, full body, bright natural lighting, space on the left side for text, high quality, detailed"
gen hero-bg 1440x720 "Minimalist modern architecture interior with a stylish young man in casual white t-shirt sitting relaxed on a wooden bench, soft daylight, muted grey and beige tones, wide editorial fashion photography, blurred depth of field, high quality"
gen socks-banner 1440x720 "Premium colorful socks neatly arranged in a flat lay pattern on a fresh mint green background, top view, professional product photography, clean minimal styling, soft shadows, high quality"
gen bulk-order 1440x720 "Neatly folded stacks of plain t-shirts in many colors on warehouse shelves, bright clean apparel factory store, professional commercial photography, wide shot, high quality"

# Tees & polos
gen tee-navy 1024x1024 "Product photo of a plain navy blue half-sleeve crew neck t-shirt on an invisible mannequin, light grey studio background, soft even lighting, e-commerce catalog photography, centered, high quality"
gen tee-designer 1024x1024 "Product photo of a white t-shirt with abstract geometric print design on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen tee-black 1024x1024 "Product photo of a plain black premium cotton t-shirt on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen polo-navy 1024x1024 "Product photo of a navy blue polo shirt with two buttons on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen polo-maroon 1024x1024 "Product photo of a maroon premium pique polo shirt on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen polo-white 1024x1024 "Product photo of a white classic polo shirt on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"

# Bottoms
gen jacket-olive 1024x1024 "Product photo of an olive green casual bomber jacket on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen jeans-dark 1024x1024 "Product photo of dark indigo slim fit denim jeans standing presentation, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen trousers-beige 1024x1024 "Product photo of beige chino trousers folded neatly, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen shorts-navy 1024x1024 "Product photo of navy blue athletic shorts with drawstring, light grey studio background, soft lighting, e-commerce catalog photography, high quality"

# Panjabi, womens, kids
gen panjabi-cream 1024x1024 "Product photo of a cream colored men's cotton panjabi kurta, on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen kurti-pink 1024x1024 "Product photo of a soft pink women's kurti tunic with delicate embroidery, on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen women-tee-rose 1024x1024 "Product photo of a rose pink women's relaxed fit t-shirt on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen women-tee-mint 1024x1024 "Product photo of a mint green women's casual t-shirt on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen kids-polo-blue 1024x1024 "Product photo of a sky blue kids polo shirt, on an invisible small mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen kids-frock 1024x1024 "Product photo of a cute girls floral summer frock dress, on an invisible small mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"

# Accessories & remaining
gen cap-navy 1024x1024 "Product photo of a navy blue baseball cap, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen socks-colorful 1024x1024 "Product photo of three pairs of colorful premium cotton socks arranged neatly, white studio background, soft lighting, e-commerce catalog photography, high quality"
gen mask-pack 1024x1024 "Product photo of a pack of premium cotton face masks in pink red and white arranged neatly, white studio background, soft lighting, e-commerce catalog photography, high quality"
gen jersey-red 1024x1024 "Product photo of a red football soccer jersey with white accents on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen jersey-white 1024x1024 "Product photo of a white football soccer jersey with green accents on an invisible mannequin, light grey studio background, soft lighting, e-commerce catalog photography, high quality"
gen belt-brown 1024x1024 "Product photo of a brown leather belt coiled elegantly, light grey studio background, soft lighting, e-commerce catalog photography, high quality"

echo "=== DONE ==="
ls "$IMG_DIR"/*.png 2>/dev/null | wc -l
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  const imagePath = '/home/z/my-project/public/images/hero-campaign.png';
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;

  const response = await zai.images.generations.edit({
    prompt:
      'Remove all text, words, letters, logos, brand names and buttons from this image. Keep the two models, their clothing, poses, plants and the beige studio background exactly the same. Fill the areas where text was removed with the clean beige wall background.',
    images: [{ url: dataUrl }],
    size: '1344x768',
  });

  const imageBase64 = response.data[0].base64;
  const buffer = Buffer.from(imageBase64, 'base64');
  fs.writeFileSync('/home/z/my-project/public/images/hero-campaign-clean.png', buffer);
  console.log('OK edited image saved');
}

main().catch((e) => {
  console.error('FAIL', e.message);
  process.exit(1);
});

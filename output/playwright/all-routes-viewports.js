async page => {
 const routes=['/pre-matricula','/cursos/ingles','/cursos/sao-pedro/games'];
 const sizes=[[375,812],[430,932],[768,1024],[1366,768],[1536,864],[1920,1080],[3840,2160]];
 const out=[];
 for(const route of routes) for(const [width,height] of sizes){
  await page.setViewportSize({width,height}); const response=await page.goto('http://localhost:4173'+route); await page.waitForTimeout(350);
  const m=await page.evaluate(()=>({h1:document.querySelector('h1')?.innerText,overflow:document.documentElement.scrollWidth>innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  out.push({route,viewport:[width,height],status:response?.status(),...m});
  await page.screenshot({path:`output/playwright/${route.replaceAll('/','_').replace(/^_/,'')}__${width}x${height}.png`});
 }
 return out;
}

async page => {
 const viewports = [[375,812],[430,932],[768,1024],[1366,768],[1536,864],[1920,1080],[3840,2160]];
 const out=[];
 for (const [width,height] of viewports) {
  await page.setViewportSize({width,height}); await page.waitForTimeout(700);
  const result=await page.evaluate(() => { const title=document.querySelector('.hero-title'); const hero=document.querySelector('.hero'); const rect=title.getBoundingClientRect(); return {viewport:[innerWidth,innerHeight],font:getComputedStyle(title).fontSize,titleBox:[Math.round(rect.width),Math.round(rect.height)],scrollWidth:document.documentElement.scrollWidth,heroHeight:Math.round(hero.getBoundingClientRect().height)}; });
  out.push(result); await page.screenshot({path:`output/playwright/home__${width}x${height}__baseline.png`,fullPage:true});
 }
 return out;
}

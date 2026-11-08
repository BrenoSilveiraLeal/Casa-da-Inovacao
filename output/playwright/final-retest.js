async page => {
 const out=[];
 for (const [width,height] of [[375,812],[768,1024],[1366,768],[1920,1080],[3840,2160]]) {
  await page.setViewportSize({width,height}); await page.goto('http://localhost:4173/'); await page.waitForTimeout(700);
  out.push(await page.evaluate(()=>({viewport:[innerWidth,innerHeight],titleFont:getComputedStyle(document.querySelector('.hero-title')).fontSize,sideWidth:Math.round(document.querySelector('.hero-side').getBoundingClientRect().width),sideFont:getComputedStyle(document.querySelector('.hero-lead')).fontSize,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)})));
  if(width===1366||width===3840) await page.screenshot({path:`output/playwright/home__${width}x${height}__final.png`});
 }
 await page.setViewportSize({width:375,height:812}); await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('http://localhost:4173/'); await page.waitForTimeout(1000);
 const reducedMotion=await page.evaluate(()=>({preference:matchMedia('(prefers-reduced-motion: reduce)').matches,unrevealed:[...document.querySelectorAll('[data-reveal]')].filter(e=>getComputedStyle(e).opacity==='0').length}));
 await page.emulateMedia({reducedMotion:'no-preference'});
 return {viewports:out,reducedMotion};
}

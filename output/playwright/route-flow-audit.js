async page => {
 const results=[];
 for (const [path,width,height] of [['/pre-matricula',375,812],['/pre-matricula',1366,768],['/cursos/ingles',375,812],['/cursos/ingles',1366,768],['/cursos/sao-pedro/games',375,812],['/cursos/sao-pedro/games',1366,768]]) {
  await page.setViewportSize({width,height}); const response=await page.goto('http://localhost:4173'+path); await page.waitForTimeout(400);
  const info=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.innerText,scrollWidth:document.documentElement.scrollWidth,innerWidth,overflow:document.documentElement.scrollWidth>innerWidth}));
  results.push({path,viewport:[width,height],status:response?.status(),...info});
  await page.screenshot({path:`output/playwright/${path.replaceAll('/','_').replace(/^_/,'') }__${width}x${height}.png`});
 }
 await page.setViewportSize({width:375,height:812}); await page.goto('http://localhost:4173/'); await page.waitForTimeout(400);
 const mobileMenu=await page.evaluate(()=>{const b=document.querySelector('.nav-burger'); const before=b?.getAttribute('aria-expanded'); b?.click(); return {before,after:b?.getAttribute('aria-expanded'),menuVisible:document.querySelector('.menu')?.getAttribute('aria-hidden')};});
 await page.screenshot({path:'output/playwright/home__375x812__menu.png'});
 await page.goto('http://localhost:4173/'); await page.waitForTimeout(400);
 const courseTabs=await page.evaluate(()=>{const tabs=[...document.querySelectorAll('[role=tab][data-unidade]')]; const before=tabs.map(t=>t.getAttribute('aria-selected')); tabs[1]?.click(); return {before,after:tabs.map(t=>t.getAttribute('aria-selected')),unitText:document.querySelector('.course-grid')?.innerText.slice(0,100)};});
 return {routes:results,mobileMenu,courseTabs};
}

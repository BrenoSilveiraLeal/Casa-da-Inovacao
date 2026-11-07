async (page) => {
 await page.goto('http://localhost:3000');
 await page.waitForFunction(()=>document.documentElement.classList.contains('is-loaded'));
 await page.waitForTimeout(1000);
 await page.setViewportSize({width:844,height:390});
 await page.getByRole('button',{name:'Abrir menu',exact:true}).click();
 await page.waitForTimeout(850);
 await page.locator('.menu a').last().scrollIntoViewIfNeeded();
 await page.screenshot({path:'output/playwright/responsive-landscape-menu.png'});
 const menu=await page.locator('.menu a').last().boundingBox();
 await page.getByRole('button',{name:'Fechar menu',exact:true}).click();
 await page.setViewportSize({width:390,height:844});
 await page.locator('#historia').scrollIntoViewIfNeeded();
 await page.waitForTimeout(1000);
 await page.screenshot({path:'output/playwright/responsive-history-mobile.png'});
 return {lastMenuLink:menu,history:await page.locator('.historia').boundingBox()};
}


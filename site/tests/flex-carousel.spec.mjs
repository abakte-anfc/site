import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('novo carrossel navega com fotos locais',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await page.locator('[data-gallery-enhancement]').scrollIntoViewIfNeeded();
 const g=page.locator('.feature-carousel');await expect(g).toBeVisible();
 await expect(page.locator('[data-carousel]')).toBeHidden();
 await expect(g.locator('[data-position="0"] img')).toHaveAttribute('src',/registro-04/);
 await g.getByRole('button',{name:'Próxima foto',exact:true}).click();
 await expect(g.locator('[data-position="0"] img')).toHaveAttribute('src',/registro-05/);
 await g.focus();await page.keyboard.press('Home');
 await expect(g.locator('[data-position="0"] img')).toHaveAttribute('src',/registro-01/);
 await page.keyboard.press('ArrowLeft');
 await expect(g.locator('[data-position="0"] img')).toHaveAttribute('src',/registro-06/);
 expect(errors).toEqual([]);
});
test('galeria acessível e responsiva',async({page})=>{
 await page.goto('/');await page.locator('[data-gallery-enhancement]').scrollIntoViewIfNeeded();
 await expect(page.locator('.feature-carousel')).toBeVisible();
 await page.getByRole('button',{name:'Pausar carrossel'}).click();
 await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>v.id)).toEqual([]);
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
 await page.setViewportSize({width:390,height:844});await page.locator('.feature-carousel').screenshot({path:'site/qa/feature-carousel-mobile.png'});
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test('movimento reduzido mantém galeria manual',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.locator('[data-gallery-enhancement]').scrollIntoViewIfNeeded();
 await expect(page.locator('[data-carousel]')).toBeVisible();await expect(page.locator('.feature-carousel')).toHaveCount(0);
});

test('avanço automático e pausa do novo carrossel',async({page})=>{
 await page.clock.install();await page.goto('/');await page.locator('[data-gallery-enhancement]').scrollIntoViewIfNeeded();
 const g=page.locator('.feature-carousel');await expect(g).toBeVisible();
 await page.mouse.move(0,0);await page.clock.fastForward(4100);
 await expect(g.locator('[data-position="0"] img')).toHaveAttribute('src',/registro-05/);
 await g.getByRole('button',{name:'Pausar carrossel'}).click();await page.mouse.move(0,0);await page.clock.fastForward(8100);
 await expect(g.locator('[data-position="0"] img')).toHaveAttribute('src',/registro-05/);
});

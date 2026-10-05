import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
test('marca, navegação e recursos disponíveis',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const broken=[];page.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1'))broken.push(r.url());});
 await page.goto('/');
 await expect(page).toHaveTitle(/Realizarte/);
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('h1')).toContainText('Realizando');
 await expect(page.locator('h1')).toContainText('sonhos');
 await expect(page.locator('h1')).toContainText('com arte');
 await expect(page.locator('#modalidades h3')).toHaveText(['Dança','Teatro','Música']);
 await page.getByRole('link',{name:'Conheça o Realizarte',exact:true}).click();
 await expect(page).toHaveURL(/#sobre$/);
 await expect(page.locator('#sobre')).toBeInViewport();
 for(const image of await page.locator('.brand img, .hero-figure img, .about-image img, .experience-figure img, .site-footer img').all()) {await image.scrollIntoViewIfNeeded();await expect(image).toHaveJSProperty('complete',true);expect(await image.evaluate(i=>i.naturalWidth)).toBeGreaterThan(0);}
 expect(errors).toEqual([]);expect(broken).toEqual([]);
 expect(await page.locator('form').count()).toBe(0);
});
for(const width of [320,390,768,1440]) {
 test('layout sem rolagem horizontal em '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto('/');
  await page.evaluate(()=>document.fonts.ready);
  for(const selector of ['#inicio','#sobre','#modalidades','#experiencias','#registros','#contato']) {
   await page.locator(selector).scrollIntoViewIfNeeded();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  }
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'site/qa/tela-'+width+'.png',fullPage:true});
 });
}
test('menu móvel, teclado e mudança de tamanho',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const toggle=page.locator('.menu-toggle');
 await expect(toggle).toBeVisible();await expect(page.getByRole('navigation')).not.toBeVisible();
 await toggle.focus();await page.keyboard.press('Enter');
 await expect(toggle).toHaveAttribute('aria-expanded','true');
 await expect(page.getByRole('navigation')).toBeVisible();
 await page.keyboard.press('Escape');await expect(toggle).toBeFocused();await expect(toggle).toHaveAttribute('aria-expanded','false');
 await toggle.click();await page.getByRole('navigation').getByRole('link',{name:'Experiências',exact:true}).click();
 await expect(page).toHaveURL(/#experiencias$/);await expect(toggle).toHaveAttribute('aria-expanded','false');
 await expect(page.locator('#experiencias')).toBeFocused();
 await page.setViewportSize({width:1440,height:900});await expect(page.getByRole('navigation')).toBeVisible();await expect(toggle).not.toBeVisible();
});
test('vídeo só é solicitado após ação do visitante',async({page})=>{
 const requests=[];page.on('request',r=>{if(r.url().includes('registro-movimento.mp4'))requests.push(r.url());});
 await page.goto('/');await page.locator('#video-registro').scrollIntoViewIfNeeded();
 expect(requests).toHaveLength(0);
 const video=page.locator('#video-registro');
 await expect(video).toHaveAttribute('preload','none');
 expect(await video.evaluate(v=>v.paused)).toBeTruthy();
 await page.getByRole('button',{name:/Assistir ao trecho/}).click();
 await expect.poll(()=>requests.length).toBeGreaterThan(0);
 await expect.poll(()=>video.evaluate(v=>v.readyState)).toBeGreaterThanOrEqual(2);
 await expect(video).toHaveJSProperty('controls',true);
 await expect.poll(()=>video.evaluate(v=>v.currentTime)).toBeGreaterThan(0);
 expect(await video.evaluate(v=>v.duration)).toBeGreaterThanOrEqual(14);
 await video.evaluate(v=>v.pause());
});
test('conteúdo e navegação funcionam sem JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();await page.goto('/');
 await expect(page.getByRole('navigation')).toBeVisible();
 await expect(page.locator('.gallery img')).toHaveCount(6);
 await page.getByRole('navigation').getByRole('link',{name:'Contato',exact:true}).click();
 await expect(page).toHaveURL(/#contato$/);
 await expect(page.getByRole('link',{name:/Abrir o trecho de dança/})).toBeAttached();
 await context.close();
});
test('acessibilidade automática em desktop e celular',async({page})=>{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});await page.goto('/');
  if(width===390)await page.getByRole('button',{name:'Menu',exact:true}).click();
  await page.evaluate(()=>Promise.all(document.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 }
});
test('ampliação de texto e movimento reduzido',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.getByRole('button',{name:'Menu',exact:true}).click();
 await expect(page.getByRole('navigation')).toBeVisible();
 await page.screenshot({path:'site/qa/texto-200.png',fullPage:true});
});

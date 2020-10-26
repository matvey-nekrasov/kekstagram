(()=>{"use strict";window.util={getRandomElementFromArray:e=>e[Math.floor(Math.random()*e.length)],getRandomNumber:(e,t)=>Math.floor(Math.random()*(t-e+1)+e),shuffleArray:e=>{let t=e.slice();for(let e=t.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1)),n=t[e];t[e]=t[r],t[r]=n}return t},onError:e=>{const t=document.querySelector(".error-message");null!==t&&t.remove();const r=document.createElement("div");r.className="error-message",r.style="z-index: 100; margin: 0 auto; text-align: center; background-color: #FE4C4C;",r.style.position="absolute",r.style.left=0,r.style.right=0,r.style.fontSize="24px",r.style.lineHeight=1.5,r.textContent=e,document.body.insertAdjacentElement("afterbegin",r)}},window.debounce=e=>{let t=null;return function(){const r=arguments;t&&window.clearTimeout(t),t=window.setTimeout((()=>{e.apply(null,r)}),500)}},(()=>{const e="https://21.javascript.pages.academy/kekstagram/data",t="https://javascript.pages.academy/kekstagram",r=function(e,t,r,n,o){const i=new XMLHttpRequest;i.responseType="json",i.addEventListener("load",(function(){200===i.status?n(i.response):o(`Статус ответа: ${i.status} ${i.statusText}`)})),i.addEventListener("error",(function(){o("Произошла ошибка соединения")})),i.addEventListener("timeout",(function(){o(`Запрос не успел выполниться за ${i.timeout} мс`)})),i.timeout=2e3,i.open(e,t),i.send(r)};window.backend={loadMiniatures:(t,n)=>{r("GET",e,null,t,n)},uploadPictureForm:(e,n,o)=>{r("POST",t,e,n,o)}}})(),window.miniaturesRender={render:e=>{const t=(e=>{const t=document.createDocumentFragment();return e.forEach((e=>{const r=(e=>{const t=document.querySelector("#picture").content.querySelector(".picture").cloneNode(!0);return t.querySelector(".picture__img").src=e.url,t.querySelector(".picture__comments").innerText=e.comments.length.toString(),t.querySelector(".picture__likes").innerText=e.likes.toString(),t})(e);t.appendChild(r)})),t})(e),r=document.querySelector(".pictures");r.querySelectorAll(".picture").forEach((e=>e.remove())),r.appendChild(t)}},(()=>{const e={DEFAULT:0,RANDOM:1,DISCUSSED:2},t=document.querySelector(".img-filters"),r=t.querySelector(".img-filters__form"),n=window.debounce((t=>{switch(t.target.id){case"filter-default":window.minitaures.renderByOrder(e.DEFAULT);break;case"filter-random":window.minitaures.renderByOrder(e.RANDOM);break;case"filter-discussed":window.minitaures.renderByOrder(e.DISCUSSED);break;default:window.util.onError("Не найден ID кнопки: "+t.target.id)}}));r.addEventListener("click",(e=>{e.target&&e.target.matches(".img-filters__button")&&!e.target.matches(".img-filters__button--active")&&(t.querySelectorAll(".img-filters__button").forEach((e=>e.classList.remove("img-filters__button--active"))),e.target.classList.add("img-filters__button--active"),n(e))})),window.miniaturesOrder={OrderType:e}})(),(()=>{let e=[],t=[];const r=r=>{switch(r){case window.miniaturesOrder.OrderType.DEFAULT:t=e;break;case window.miniaturesOrder.OrderType.RANDOM:t=window.util.shuffleArray(e).slice(0,10);break;case window.miniaturesOrder.OrderType.DISCUSSED:t=e.slice(),t.sort(((e,t)=>{let r=t.comments.length-e.comments.length;return 0===r&&(r=t.likes-e.likes),r}))}window.miniaturesRender.render(t)};window.backend.loadMiniatures((n=>{e=n,t=e,r(window.miniaturesOrder.OrderType.DEFAULT),document.querySelector(".img-filters").classList.remove("img-filters--inactive")}),window.util.onError),window.minitaures={renderByOrder:r,getPicturesDataLocalOrder:()=>t}})(),(()=>{const e={properties:{none:{FILTER_NAME:""},chrome:{FILTER_NAME:"grayscale",MIN:0,MAX:1,POSTFIX:""},sepia:{FILTER_NAME:"sepia",MIN:0,MAX:1,POSTFIX:""},marvin:{FILTER_NAME:"invert",MIN:0,MAX:100,POSTFIX:"%"},phobos:{FILTER_NAME:"blur",MIN:0,MAX:3,POSTFIX:"px"},heat:{FILTER_NAME:"brightness",MIN:1,MAX:3,POSTFIX:""}},currentEffect:"none",isSliderVisible(){return""!==this.properties[this.currentEffect].FILTER_NAME},getStyleFilter(e=1){const t=this.properties[this.currentEffect],r=(t.MAX-t.MIN)*e+t.MIN;return t.FILTER_NAME?`${t.FILTER_NAME}(${r}${t.POSTFIX})`:""}},t=document.querySelector(".pictures"),r=t.querySelector(".img-upload__preview img"),n=t.querySelector(".effects"),o=t.querySelector(".effect-level"),i=t.querySelector(".effect-level__line"),s=t.querySelector(".effect-level__pin"),c=t.querySelector(".effect-level__depth"),l=Array.from(t.querySelectorAll(".effects__radio")).map((e=>e.value)),a=()=>{const e=l.map((e=>"effects__preview--"+e));r.classList.remove(...e),r.style.filter="",o.classList.add("hidden")},d=()=>{const t=s.offsetLeft/s.parentElement.offsetWidth;r.style.filter=e.getStyleFilter(t)};n.addEventListener("change",(t=>{if(!t.target||!t.target.matches(".effects__radio"))return;const n=t.target.value;e.currentEffect=n,a(),r.classList.add("effects__preview--"+n),e.isSliderVisible()?(o.classList.remove("hidden"),s.style.left=window.form.EFFECT_DEFAULT_VALUE,c.style.width=window.form.EFFECT_DEFAULT_VALUE,d()):o.classList.add("hidden")})),s.addEventListener("mousedown",(e=>{e.preventDefault();const t={minPinLeft:0,maxPinLeft:i.offsetWidth};let r=e.clientX;const n=e=>{e.preventDefault();const n=r-e.clientX;r=e.clientX,s.style.left=Math.min(Math.max(s.offsetLeft-n,t.minPinLeft),t.maxPinLeft)+"px",c.style.width=Math.min(Math.max(s.offsetLeft-n,t.minPinLeft),t.maxPinLeft)+"px",d()},o=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",o)})),window.formEffect={reset:a}})(),(()=>{const e=document.querySelector(".pictures"),t=e.querySelector(".scale__control--smaller"),r=e.querySelector(".scale__control--bigger"),n=e.querySelector(".scale__control--value"),o=e.querySelector(".img-upload__preview img"),i=e=>{n.value=e+"%",o.style.transform=`scale(${e/100})`},s=e=>{const t=parseInt(n.value.slice(0,-1),10);let r;switch(e){case 0:r=Math.max(t-25,25);break;case 1:r=Math.min(t+25,100)}r!==t&&i(r)};t.addEventListener("click",(()=>{s(0)})),r.addEventListener("click",(()=>{s(1)})),window.formScale={reset:()=>{i(100)}}})(),(()=>{const e=document.querySelector(".pictures").querySelector("#upload-select-image"),t=document.querySelector("body"),r=document.querySelector("main"),n=()=>{const e=()=>{r.removeChild(o),t.classList.remove("modal-open"),document.removeEventListener("keydown",n)},n=t=>{"Escape"===t.key&&e()},o=document.querySelector("#success").content.querySelector(".success").cloneNode(!0);o.querySelector(".success__button").addEventListener("click",(()=>{e()})),o.addEventListener("click",(t=>{t.target===o&&e()})),document.addEventListener("keydown",n),r.appendChild(o)},o=e=>{const n=()=>{r.removeChild(i),t.classList.remove("modal-open"),document.removeEventListener("keydown",o)},o=e=>{"Escape"===e.key&&n()},i=document.querySelector("#error").content.querySelector(".error").cloneNode(!0);i.querySelector(".error__button").addEventListener("click",(()=>{n()})),i.addEventListener("click",(e=>{e.target===i&&n()})),document.addEventListener("keydown",o),i.querySelector(".error__title").innerText=e,r.appendChild(i)};e.addEventListener("submit",(t=>{t.preventDefault(),window.backend.uploadPictureForm(new FormData(e),n,o),window.form.closePictureEditWindow(!1)}))})(),(()=>{const e="100%",t=document.querySelector(".pictures"),r=document.querySelector("body"),n=t.querySelector(".img-upload__overlay"),o=t.querySelector("#upload-file"),i=t.querySelector("#upload-cancel"),s=t.querySelector(".text__hashtags"),c=t.querySelector(".text__description"),l=t.querySelector(".effect-level__pin"),a=t.querySelector(".effect-level__depth"),d=t.querySelector(".img-upload__preview img"),u=t.querySelectorAll(".effects__preview"),m=e=>{"Escape"===e.key&&f()},f=(i=!0)=>{n.classList.add("hidden"),document.removeEventListener("keydown",m),i&&r.classList.remove("modal-open"),o.value="",t.querySelector(".effects__radio").checked=!0,window.formScale.reset(),window.formEffect.reset(),s.value="",c.value="",l.style.left=e,a.style.width=e};s.addEventListener("focus",(()=>{document.removeEventListener("keydown",m)})),s.addEventListener("blur",(()=>{document.addEventListener("keydown",m)})),c.addEventListener("focus",(()=>{document.removeEventListener("keydown",m)})),c.addEventListener("blur",(()=>{document.addEventListener("keydown",m)})),o.addEventListener("change",(()=>{(()=>{const e=o.files[0],t=e.name.toLowerCase();if(!["gif","jpg","jpeg","png"].some((e=>t.endsWith(e))))return;const i=new FileReader;i.addEventListener("load",(()=>{d.src=i.result,u.forEach((e=>{e.style.backgroundImage=`url(${i.result})`}))})),i.readAsDataURL(e),n.classList.remove("hidden"),r.classList.add("modal-open"),document.addEventListener("keydown",m)})()})),i.addEventListener("click",(()=>{f()})),window.form={closePictureEditWindow:f,EFFECT_DEFAULT_VALUE:e}})(),(()=>{const e=document.querySelector(".pictures").querySelector(".text__hashtags");e.addEventListener("input",(()=>{const t=(e=>{const t=e.replace(/\s+/g," ").trim();if(0===t.length)return"";const r=t.split(" ");if(r.some((e=>"#"!==e[0])))return"Хэш-тег должен начинаться с символа # (решётка)";const n=r.map((e=>e.substring(1)));if(n.some((e=>0===e.length)))return"Хеш-тег не может состоять только из одной решётки";const o=/[^\w]/;if(n.some((e=>o.test(e))))return"Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.";if(r.some((e=>e.length>20)))return"Максимальная длина одного хэш-тега 20 символов, включая решётку";if(r.length>5)return"Нельзя указать больше пяти хэш-тегов";const i=r.map((e=>e.toLowerCase()));return 0!==i.filter(((e,t)=>i.indexOf(e)!==t)).length?"Один и тот же хэш-тег не может быть использован дважды (хэш-теги нечувствительны к регистру)":""})(e.value);e.setCustomValidity(t),e.reportValidity()}))})(),(()=>{const e=()=>{const e=window.minitaures.getPicturesDataLocalOrder()[i.index],t=parseInt(l.innerText,10),r=e.comments.length,n=Math.min(r-t,5);e.comments.slice(t,t+n).forEach((e=>{const t=`\n          <li class="social__comment">\n            <img\n              class="social__picture"\n              src="${e.avatar}"\n              alt="${e.name}"\n              width="35" height="35">\n            <p class="social__text">${e.message}</p>\n          </li>\n        `;c.insertAdjacentHTML("beforeend",t)})),l.innerText=t+n,a.classList.toggle("hidden",t+n===r)},t=t=>{s.addEventListener("click",n),document.addEventListener("keydown",r);const a=o.querySelectorAll(".picture__img"),d=Array.from(a).indexOf(t);i.index=d;const u=window.minitaures.getPicturesDataLocalOrder()[d];i.querySelector(".big-picture__img img").src=u.url,i.querySelector(".likes-count").innerText=u.likes,l.innerText="0",i.querySelector(".comments-count").innerText=u.comments.length,i.querySelector(".social__caption").innerText=u.description,c.innerHTML="",e(),document.querySelector("body").classList.add("modal-open"),i.classList.remove("hidden")},r=e=>{"Escape"===e.key&&n()},n=()=>{i.classList.add("hidden"),document.removeEventListener("keydown",r),document.querySelector("body").classList.remove("modal-open")},o=document.querySelector(".pictures"),i=document.querySelector(".big-picture"),s=i.querySelector("#picture-cancel"),c=i.querySelector(".social__comments"),l=i.querySelector(".comments-shown-count"),a=i.querySelector(".comments-loader");o.addEventListener("click",(e=>{e.target&&(e.target.matches(".picture__img")&&t(e.target),e.target.matches(".picture")&&t(e.target.querySelector(".picture__img")))})),a.addEventListener("click",(()=>{e()}))})()})();
// Наложение эффекта на изображение
'use strict';

(() => {
  const ClassNames = {
    EFFECTS_PREVIEW: `effects__preview`
  };

  // Объект для работы с эффетками
  const effects = {
    properties: {
      none: {
        FILTER_NAME: ``
      },
      chrome: {
        FILTER_NAME: `grayscale`,
        MIN: 0,
        MAX: 1,
        POSTFIX: ``
      },
      sepia: {
        FILTER_NAME: `sepia`,
        MIN: 0,
        MAX: 1,
        POSTFIX: ``
      },
      marvin: {
        FILTER_NAME: `invert`,
        MIN: 0,
        MAX: 100,
        POSTFIX: `%`
      },
      phobos: {
        FILTER_NAME: `blur`,
        MIN: 0,
        MAX: 3,
        POSTFIX: `px`
      },
      heat: {
        FILTER_NAME: `brightness`,
        MIN: 1,
        MAX: 3,
        POSTFIX: ``
      }
    },
    currentEffect: `none`,
    isSliderVisible() {
      return this.properties[this.currentEffect].FILTER_NAME !== ``;
    },
    getStyleFilter(normalizedValue = 1) {
      const effectProperty = this.properties[this.currentEffect];
      const resultValue = (effectProperty.MAX - effectProperty.MIN) * normalizedValue + effectProperty.MIN;
      if (!effectProperty.FILTER_NAME) {
        return ``;
      }
      return `${effectProperty.FILTER_NAME}(${resultValue}${effectProperty.POSTFIX})`;
    }
  };

  const picturesSection = document.querySelector(`.pictures`);
  const pictureUploadPreviewImage = picturesSection.querySelector(`.img-upload__preview img`);
  const pictureEffectFieldset = picturesSection.querySelector(`.effects`);
  const pictureEffectLevelSlider = picturesSection.querySelector(`.effect-level`);
  const pictureEffectLevelPin = picturesSection.querySelector(`.effect-level__pin`);
  const effectsArray = Array.from(picturesSection.querySelectorAll(`.effects__radio`)).map((x) => x.value);

  // Обработчик при смене эффекта
  const onEffectChange = (evt) => {
    if (!evt.target || !evt.target.matches(`.effects__radio`)) {
      return;
    }
    const effectName = evt.target.value;
    effects.currentEffect = effectName;
    pictureEffectReset();
    pictureUploadPreviewImage.classList.add(`${ClassNames.EFFECTS_PREVIEW}--${effectName}`);
    if (effects.isSliderVisible()) {
      pictureEffectLevelSlider.classList.remove(`hidden`);
    } else {
      pictureEffectLevelSlider.classList.add(`hidden`);
    }
  };

  pictureEffectFieldset.addEventListener(`change`, onEffectChange);

  // Обработчик при изменении слайдера уровня эффекта
  const onEffectLevelChange = () => {
    const normalizedEffectValue = pictureEffectLevelPin.offsetLeft / pictureEffectLevelPin.parentElement.offsetWidth;
    pictureUploadPreviewImage.style.filter = effects.getStyleFilter(normalizedEffectValue);
  };

  pictureEffectLevelPin.addEventListener(`mouseup`, onEffectLevelChange);

  const pictureEffectReset = () => {
    const effectsClassNamesArray = effectsArray.map((x) => `${ClassNames.EFFECTS_PREVIEW}--${x}`);
    pictureUploadPreviewImage.classList.remove(...effectsClassNamesArray);
    pictureUploadPreviewImage.style.filter = ``;
  };

  window.formEffect = {
    reset: pictureEffectReset
  };
})();

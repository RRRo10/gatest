//
var timerForNotification;

function start() {

  // Notification
  const copyNotificationEl = document.createElement('div');
  copyNotificationEl.id = 'copy-notification-element';
  document.body.appendChild(copyNotificationEl);
  copyNotificationEl.innerHTML = '<div id="copy-notification-element__title">Скопировано</div><div id="copy-notification-element__value"></div>';
  
  // Adding classes to <body> according to the product's label
  if (document.querySelectorAll('.pdp__product .product-label_exclusive').length >= 1) {
    document.body.classList.add('s-only-in-GA');
  } 
  if (document.querySelectorAll('.pdp__product .product-label_new').length >= 1) {
    document.body.classList.add('s-new-in-GA');
  } 
  if (document.querySelectorAll('.pdp__product .product-label_hit').length >= 1) {
    document.body.classList.add('s-hit-in-GA');
  } 

  // Adding classes to <body> if there's no discount
  var oldPriceCalc = 0;
  if (document.querySelectorAll('.pdp-form__price .old-price').length > 0) {
    oldPriceCalc++
  }
  if (document.querySelectorAll('.pdp-form__price .best-loyalty-price').length > 0) {
    //
    if (document.querySelectorAll('.pdp-form__price .best-loyalty-price')[0].style.display != "none") {
        oldPriceCalc++
    }
  }
  if (oldPriceCalc < 1) {
    document.body.classList.add('s-no-old-price');
  }

  // Adding classes to the <body> if the brand's on the red list
  const brandsArray = [
    "Ла прери",
        "Acqua di Parma",
        "Aerin",
        "Armani",
        "Aveda",
        "AVENE",
        "Bottega Veneta",
        "Calvin Klein",
        "CERAVE",
        "Chanel",
        "Chloe",
        "Cle de Peau",
        "Clinicque",
        "Davidoff",
        "Dior",
        "Dyson",
        "Escada",
        "Estée Lauder",
        "Filorga",
        "Givenchy",
        "Gucci",
        "Gucci Make Up",
        "Guerlain",
        "Hugo Boss",
        "Joop",
        "Kylie (декор и уход)",
        "KYLIE COSMETICS",
        "Kylie Skin",
        "LA ROCHE-POSAY",
        "Lacoste",
        "Lamel Professional",
        "Lancaster",
        "Lancome",
        "Lancaster Sun",
        "Laura Mercier",
        "LN Pro",
        "Maison Francis Kurkdjian",
        "Make up for ever",
        "Marc Jacobs",
        "Miu Miu",
        "My blend",
        "Prada",
        "RICHARD MAISON DE PARFUM",
        "Roberto Cavalli",
        "Sensai",
        "Shiseido",
        "VERSACE",
        "VICHY",
        "WELEDA",
        "Zielinski & Rozen",
        "Clarins"
  ];
  const brandsArrayToLowerCase = brandsArray.map(element => {
    return element.toLowerCase();
  });
  const brandNameForCheck = document.querySelectorAll('.link-alt.pdp-title__brand')[0].innerText.slice(0, -1).toLowerCase();
  
  if (new RegExp(brandsArrayToLowerCase.join("|")).test(brandNameForCheck)) {
    document.body.classList.add('s-forbidden-brand');
  }

};

//
var counterOnLoadEvent = 0;
var counterGalleryLinkCreated = 0;
if (document.readyState !== 'loading') {
  if (counterOnLoadEvent < 1) {

    // setTimeout(function() {
    //   if (document.querySelectorAll('.product-gallery__center-button').length > 0) {
    // 
    //     if (counterGalleryLinkCreated < 1) {
    //   
    //       document.querySelectorAll('.product-gallery__center-button')[0].click();
    //       setTimeout(function() {
    //         document.querySelectorAll('.fullscreen-gallery-modal .action-close')[0].click();
    //       }, 50);
    //   
    //       setTimeout(function() {
    //         var firstGalleryWrapper = document.createElement('a');
    //         var firstGalleryImage = document.createElement('img');
    //         var priceZoneWrapper = document.querySelectorAll('.pdp-form__price.pdp-price')[0];
    //         firstGalleryWrapper.id = 'fake-gallery-link';
    //         firstGalleryWrapper.href = document.querySelectorAll('.fullscreen-gallery__slide-image')[0].src;
    //         firstGalleryWrapper.setAttribute('target', '_blank');
    //         firstGalleryImage.src = document.querySelectorAll('.fullscreen-gallery__slide-image')[0].src;
    //        firstGalleryWrapper.appendChild(firstGalleryImage);
    //         priceZoneWrapper.appendChild(firstGalleryWrapper);
    //       }, 1000);
    // 
    //       // // Click to copy for the image
    //       // document.getElementById('fake-gallery-link').addEventListener("click", copyPicture());
    // 
    //       counterGalleryLinkCreated++;
    // 
    //       console.log(counterGalleryLinkCreated)
    // 
    //     }
    //     
    //   }
    // }, 2000);
    // counterOnLoadEvent++;
    
  }
};
    
// Click to copy for prices
var priceElements = document.querySelectorAll('.price-box .price-wrapper');
for (var i = 0; i < priceElements.length; i++) {
  priceElements[i].onclick = function(event) {
    event.preventDefault();
    // let priceText = this.innerText.replace(/[ ₽]/g,'').slice(0, -1);
    let priceText = this.innerText ;
    copyTextToClipboard(priceText);
    notificationCopyAlert(priceText);
  };
}

// Click to copy for brand title
var brandElements = document.querySelectorAll('.pdp-title__brand');
for (var i = 0; i < brandElements.length; i++) {
  brandElements[i].onclick = function(event) {
    event.preventDefault();
    let brandText = this.innerText;
    //
    if (brandText.includes('VIVIENNE SABO')) {
      brandText = 'VIVIENNE SABÓ'
    }
    //
    if (brandText.includes('DR JART')) {
      brandText = 'Dr.Jart+'
    }
    copyTextToClipboard(brandText);
    notificationCopyAlert(brandText);
  };
}

// Click to copy for category
var typeElements = document.querySelectorAll('.pdp-title__type');
for (var i = 0; i < typeElements.length; i++) {
  typeElements[i].onclick = function(event) {
    event.preventDefault();
    let typeText = this.innerHTML;
    copyTextToClipboard(typeText);
    notificationCopyAlert(typeText);
  };
}

//  
function notificationCopyAlert(valueText) {
  document.getElementById('copy-notification-element').style.transform = "translateX(-50%)"; 
  document.getElementById('copy-notification-element__value').innerText = valueText;

  clearTimeout(timerForNotification);
  timerForNotification = setTimeout(function() {
    document.getElementById('copy-notification-element').style.transform = "translateX(-50%) translateY(-100%)"; 
  }, 2000);
}

//
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}


// async function copyPicture() {
//   try {
//     // const response = await fetch("'" + imageLink + "'");
//     const response = await fetch('https://goldapple.ru/media/catalog/product/cache/df20e1840b63c7f40d0acee268900e66/3/6/3614273347846_1_bnqau1idx3gkiaxf.jpg');
//     const blob = await response.blob();
//     await navigator.clipboard.write([
//       new ClipboardItem({
//         [blob.type]: blob
//       })
//     ]);
//     console.log('Image copied.');
//   } catch (err) {
//     console.error(err.name, err.message);
//   }
// };



if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    start();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        start();
    });
}
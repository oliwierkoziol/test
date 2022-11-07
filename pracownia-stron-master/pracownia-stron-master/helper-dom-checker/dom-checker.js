/**
 * Poniższy kod nie jest optymalny. Celowo został napisany w taki sposób, żebyście mogli go przeanalizować i zrozumieć.
 *
 * Dla zainteresowanych, na bardzo_dobrą ocenę, można przygotować ulepszoną wersję tej biblioteki.
 *
 * @author Marcin Kłeczek <marcin.kleczek@zskocjan.pl>
 */

let results = null;

function init() {
    if (results !== null) {
        return;
    }
    results = document.createElement('div');
    results.id = 'results';
    document.body.appendChild(results);

    setTimeout(() => {
        if (0 === document.querySelectorAll('div.warning').length) {
            results.innerHTML = '<div class="all-ok">Nie znaleziono błędów</div>';
        }
    }, 3000);

    return results;
}

function log(isOk, message) {
    let p = document.createElement('div');
    p.classList.add(isOk ? 'success' : 'warning');
    p.innerHTML = (isOk ? '&#10003;' : '&#10007;') + '<span class="message">' + message + '</span>';

    results.appendChild(p);
}

function wrapMessage(additionalMessage) {
    return additionalMessage ? ` <strong>${additionalMessage}: </strong> ` : '';
}

function selectorContainsTag(selector, tag, additionalMessage) {
    let element = document.querySelector(selector);
    let isOk = element && element.innerHTML.indexOf('<'+tag) >= 0;
    let msg = isOk ? "zawiera" : "nie zawiera";

    log(isOk, wrapMessage(additionalMessage) + `${selector} ${msg} `);
}

function selectorTextContains(selector, text, additionalMessage) {
    let element = document.querySelector(selector);
    let isOk = false;
    if (element) {
        let elementText = element && element.innerText;
        if (element && (element.type === 'textarea' || element.type === 'input')) {
            elementText = element.value;
        }
        isOk = elementText.indexOf(text) >= 0;
    }
    let msg = isOk ? "zawiera" : "nie zawiera";

    log(isOk, wrapMessage(additionalMessage) + `${selector} ${msg} ${text} `);
}

function selectorDontExists(selector, additionalMessage = "") {
    let elements = document.querySelectorAll(selector);
    let isOk = elements.length === 0;

    log(isOk, wrapMessage(additionalMessage) + (isOk ? `${selector} nie istnieje` : `${selector} nie powinien istnieć`)  );
}

function attributeNotEmpty(selector, attribute, additionalMessage = "") {
    let element = document.querySelector(selector);
    let isOk = element && element.getAttribute(attribute) !== "" && element.getAttribute(attribute) !== null;
    let msg = isOk ? 'równa się' : 'nie równa się';

    log(isOk, wrapMessage(additionalMessage) + `Atrybut ${attribute} selektora ${selector} ${msg}`);
}

function attributeExists(selector, attribute, additionalMessage = "") {
    let element = document.querySelector(selector);
    let isOk = element && element.getAttribute(attribute) !== null;
    let msg = isOk ? 'istnieje' : 'nie istnieje';

    log(isOk, wrapMessage(additionalMessage) + `Atrybut ${attribute} selektora ${selector} ${msg}`);
}
function attributeDontExists(selector, attribute, additionalMessage = "") {
    let element = document.querySelector(selector);
    let isOk = element && !element.hasAttribute(attribute);
    let msg = isOk ? 'istnieje' : 'nie istnieje';

    log(isOk, wrapMessage(additionalMessage) + `Atrybut ${attribute} selektora ${selector} ${msg}`);
}

function innerHTMLnotEmpty(selector, additionalMessage = "") {
    let element = document.querySelector(selector);
    let isOk = element && ("" + element.innerHTML).trim() !== "" && element.innerHTML !== null;
    let msg = isOk ? 'jest pusty' : 'nie jest pusty';

    log(isOk, wrapMessage(additionalMessage) + `Selektora ${selector} ${msg}`);
}

function attributeValue(selector, attribute, value, additionalMessage = "") {
    let element = document.querySelector(selector);
    let isOk = element && element.getAttribute(attribute) === ("" + value);
    let msg = isOk ? 'równa się' : 'nie równa się';

    log(isOk, wrapMessage(additionalMessage) + `Atrybut ${attribute} selektora ${selector} ${msg} ${value}`);
}

function attributeValueContains(selector, attribute, value, additionalMessage = "") {
    let element = document.querySelector(selector);
    let elValue = element && element.getAttribute(attribute);
    let isOk = elValue && elValue.indexOf("" + value) >= 0;
    let msg = isOk ? 'zawiera' : 'nie zawiera';

    log(isOk, wrapMessage(additionalMessage) + `Atrybut ${attribute} selektora ${selector} ${msg} ${value}`);
}

function selectorExists(selector, numOf = 1, additionalMessage = "") {
    let elements = document.querySelectorAll(selector);
    let result = false;
    let message = (numOf > 1 ? "Są: " : "Jest: ") + selector + (numOf > 1 ? ` (${numOf})` : "");

    if (elements && elements.length > 0) {
        if (elements.length === numOf) {
            result = true;
        } else {
            message = "Element(y) " + selector + " niepoprawna ilość " + elements.length + " zamiast " + numOf + "";
        }
    }

    log(result, wrapMessage(additionalMessage) + message);
}

function selectorsExists(...elements) {
    elements.forEach(element => selectorExists(element));
}


// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return r + "," + g + "," + b;
}

function computedStyle(selector, name, value, additionalMessage) {
    let isOk = false;
    let element = document.querySelector(selector);
    if (!element) {
        log(false, `Element ${selector} nie istnieje`);
        return;
    }
    let style = getComputedStyle(element);
    let msg = `jest ustawiony na ${style[name]} zamiast`;
    if (style[name] === value) {
        isOk = true;
        msg = `jest ustawiony na`;
    }

    log(isOk, wrapMessage(additionalMessage) + `Style ${name} selektora ${selector} ${msg} ${value}`);
}


function cz3NzLXRleHQvdGV4dC0xLmh0bWw() {
    computedStyle('.color-red', 'color', 'rgb(255, 0, 0)');
    computedStyle('#backgr', 'color', 'rgb(255, 255, 255)');
    computedStyle('#backgr', 'backgroundColor', 'rgb(255, 0, 0)');
    computedStyle('.fsize', 'fontSize', '25px');
    computedStyle('.fsize-em', 'fontSize', '3 rem');

    computedStyle('h1', 'text-align', 'right');
    computedStyle('h2', 'text-align', 'left');
    computedStyle('h3', 'text-align', 'center');
    computedStyle('h4', 'text-align', 'justify');
}

function cz3NzLWJhc2ljcy9iYXNpYy0xLmh0bWw() {
    computedStyle('p:nth-of-type(1)', 'color', 'rgb(255, 0, 0)', 'Zły kolor tekstu');
    computedStyle('p:nth-of-type(1)', 'backgroundColor', 'rgb(255, 255, 0)', 'Zły kolor tła');
    attributeValueContains('p:nth-of-type(1)', 'style', 'color:', 'Style powinny być określone w atrybucie');
    attributeValueContains('p:nth-of-type(1)', 'style', 'background-color:', 'Style powinny być określone w atrybucie');
    attributeValueContains('h3', 'style', 'font-size:', 'Style powinny być określone w atrybucie');
    attributeValueContains('blockquote', 'style', 'padding', 'Określ odstępy');
    attributeValueContains('blockquote', 'style', 'background', 'Określ tło');
    attributeValueContains('footer', 'style', 'font-family', 'Określ czcionkę');
    attributeValueContains('footer', 'style', 'font-style', 'Tekst winien być pochylony');
    attributeValueContains('footer', 'style', 'italic', 'Tekst winien być pochylony');
    attributeValueContains('footer', 'style', 'color', 'Kolor zielony!');
}

function cz3NzLWJhc2ljcy9iYXNpYy0yLmh0bWw() {
    attributeDontExists('p', 'style', 'Style nie mogą być nadane inline');
    computedStyle('p', 'color', 'rgb(255, 0, 0)', 'Kolor ma być czerwony');
    computedStyle('p', 'backgroundColor', 'rgb(255, 255, 0)', 'Kolor tła ma być żółty');
    computedStyle('h3', 'fontSize', '40px', 'Wielkość tekstu 40px');
    computedStyle('blockquote', 'padding', '30px', 'Wielkość odstępu 30px');
    computedStyle('blockquote', 'backgroundColor', 'rgb(238, 238, 238)', 'Kolor tła #eee');
    computedStyle('footer', 'fontStyle', 'italic', 'Tekst ma być pochylony');
    computedStyle('footer', 'color', 'rgb(0, 128, 0)', 'Tekst ma być zielony');
}

function cz3NzLWJhc2ljcy9iYXNpYy0zLmh0bWw() {
    selectorExists('link[href="basic.css"]', 1, 'Utwórz link do pliku basic.css');
    selectorExists('link[rel="stylesheet"]', 2, 'Utwórz link do pliku basic.css');
    selectorDontExists('style', 'Nie może istnieć znacznik style');
    cz3NzLWJhc2ljcy9iYXNpYy0yLmh0bWw();
}

function cz3NzLXNlbGVjdG9ycy9zZWxlY3RvcnMtMS5odG1() {
    // let stylesheet = getStyleSheetToCheck();
    cssRuleExists('*');
    cssRuleExists('p', 'Określ wygląd dla paragrafu.');
    cssRuleDontExists('h2', 'Nie określaj styli dla h2 bezpośrednio');
    cssRuleExists("p a", "Odnośnik w paragrafie powinien być określony");
    cssRuleDontExists("p > a", "Nie określamy bezpośredniego rodzica dla paragrafu");
}

function cz3NzLXNlbGVjdG9ycy9zZWxlY3RvcnMtMy5odG1() {
    cssRuleExists(".row1 td:first-child");
    cssRuleExists(".row2 td:nth-child(3)");
    cssRuleExists(".row4 td:nth-child(3n)");
    computedStyle(".row3 td:nth-child(3)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row3 td:nth-child(7)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row3 td:nth-child(8)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row5 td:nth-child(2)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row5 td:nth-child(4)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row5 td:nth-child(6)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row5 td:nth-child(8)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row6 td:nth-child(1)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row6 td:nth-child(5)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row6 td:nth-child(9)", "background-color", "rgb(255, 0, 0)");
    cssRuleExists(".row7 td:nth-child(3n+2)");
    computedStyle(".row7 td:nth-child(5)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row8 td:nth-child(2)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row8 td:nth-child(4)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row8 td:nth-child(6)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row8 td:nth-child(8)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row8 td:nth-child(10)", "background-color", "rgb(255, 0, 0)");
    cssRuleExists(".row9 td:nth-child(2n+4)");
    cssRuleExists(".row10 td:last-child");
    computedStyle(".row10 td:nth-child(10)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row11 td:nth-child(8)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row12 td:nth-child(8)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row12 td:nth-child(7)", "background-color", "rgb(255, 0, 0)");
    computedStyle(".row12 td:nth-child(6)", "background-color", "rgb(255, 0, 0)");
}

function cz3NzLWZsZXhib3gvZmxleGJveC0xLmh0bWw() {
    document.querySelectorAll('.container').forEach(c => {
        c.setAttribute('title', c.classList.toString());
    })
}

function getStyleSheetToCheck() {
    for (let i = 0; i < document.styleSheets.length; i++ ) {
        try {
            let rules = document.styleSheets[i].cssRules;
            if (rules[0] !== undefined && rules[0]?.cssText.indexOf('.skip-this-file') !== 0) {
                return document.styleSheets[i]
            }
        } catch(e) {}
    }

    return null;
}

function cssRuleDontExists(selector, additionalMessage = "") {
    let stylesheet = getStyleSheetToCheck();
    let isOk = true;
    for(let rule of [...stylesheet.cssRules]) {
        console.dir(selector, rule.selectorText);
        if (rule.selectorText === selector) {
            isOk = false;
            break;
        }
    }

    let msg = isOk ? 'nie istnieje/nie istnieją' : 'istnieje/istnieją a nie powinny'

    log(isOk, additionalMessage ? wrapMessage(additionalMessage) : `Style dla ${selector} ${msg}`);
}


function cssRuleExists(selector, additionalMessage = "") {
    let stylesheet = getStyleSheetToCheck();
    let isOk = false;
    if (stylesheet) {
        for(let rule of [...stylesheet.cssRules]) {
            if (rule.selectorText === selector) {
                isOk = true;
                break;
            }
        }
    }

    let msg = isOk ? 'istnieje/istnieją' : 'nie istnieje/nie istnieją';

    log(isOk, additionalMessage ? wrapMessage(additionalMessage) : `Style dla ${selector} ${msg}`);
}

addEventListener('DOMContentLoaded', () => {
    init();
    let location = window.location.pathname;
    let start = location.lastIndexOf('pracownia-stron/');
    let length = 16;
    if (location.lastIndexOf('pracownia-stron-master/') >= 0) {
        start = location.lastIndexOf('pracownia-stron-master/');
        length += 7;
    }
    console.dir(start, location.substring(start + length, 130));
    let path = btoa(location.substring(start + length, 130));
    let fname = 'cz'+path.substring(1, path.length - 1);

    console.dir(fname);
    if (typeof window[fname] === 'function') {
        window[fname]();
    }
});

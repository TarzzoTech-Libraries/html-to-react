const REPLACE_TEXT_OBJECT = [{
        htmlText: "class=",
        reactText: "className="
    },
    {
        htmlText: "tab-index",
        reactText: "tabIndex"
    },
    {
        htmlText: "readonly",
        reactText: "readOnly={true}"
    },
    {
        htmlText: "accesskey",
        reactText: "accessKey"
    },
    {
        htmlText: "accept-charset",
        reactText: "acceptCharset"
    },
    {
        htmlText: "autocomplete",
        reactText: "autoComplete"
    },
    {
        htmlText: "autocapitalize",
        reactText: "autoCapitalize"
    },
    {
        htmlText: "for=",
        reactText: "htmlFor="
    },
    {
        htmlText: "autofocus",
        reactText: "autoFocus={true}"
    },
    {
        htmlText: "colspan",
        reactText: "colSpan"
    },
    {
        htmlText: "contenteditable",
        reactText: "contentEditable"
    },
    {
        htmlText: "contextmenu",
        reactText: "contextMenu"
    },
    {
        htmlText: "crossorigin",
        reactText: "crossOrigin"
    },
    {
        htmlText: "datetime",
        reactText: "dateTime"
    },
    {
        htmlText: "enctype",
        reactText: "encType"
    },
    {
        htmlText: "enterkeyhint",
        reactText: "enterKeyHint"
    },
    {
        htmlText: "formaction",
        reactText: "formAction"
    },
    {
        htmlText: "formenctype",
        reactText: "formEncType"
    },
    {
        htmlText: "formmethod",
        reactText: "formMethod"
    },
    {
        htmlText: "formnovalidate",
        reactText: "formNoValidate"
    },
    {
        htmlText: "hreflang",
        reactText: "hrefLang"
    },
    {
        htmlText: "http-equiv",
        reactText: "httpEquiv"
    },
    {
        htmlText: "inputmode",
        reactText: "inputMode"
    },
    {
        htmlText: "keytype",
        reactText: "keyType"
    },
    {
        htmlText: "maxlength",
        reactText: "maxLength"
    },
    {
        htmlText: "minlength",
        reactText: "minLength"
    },
    {
        htmlText: "rowspan",
        reactText: "rowSpan"
    },
    {
        htmlText: "spellcheck",
        reactText: "spellCheck"
    },
    {
        htmlText: "srclang",
        reactText: "srcLang"
    },
    {
        htmlText: "srcdoc",
        reactText: "srcDoc"
    },
    {
        htmlText: "srcset",
        reactText: "srcSet"
    },
    {
        htmlText: "usemap",
        reactText: "useMap"
    }
];

(function() {
    let componentTitleElement = document.getElementById("component-title");
    let componentTypeElement = document.getElementById("component-type");
    let htmlContentElement = document.getElementById("html-content");
    let createComponentBtn = document.getElementById("create-component");
    let resetBtn = document.getElementById("reset");
    let output = document.getElementById("output");
    let outputBlock = document.getElementById("output-block");
    let errorText = document.getElementById("error-text");
    let errorEl = document.getElementById("error");

    createComponentBtn.addEventListener("click", function() {
        const title = componentTitleElement.value;
        const type = componentTypeElement.value;
        const htmlContent = htmlContentElement.value;
        const titlePattern = /([A-Z][a-z]+)+/;
        const isTitleValid = titlePattern.test(title);
        if (isTitleValid && type) {
            errorEl.style.display = "none";
            let extractedData = "";
            if (type === "class") {
                extractedData = classComponentBuilder(htmlContent, title);
            } else {
                extractedData = functionComponentBuilder(htmlContent, title);
            }
            outputBlock.style.display = "block";
            output.innerText = extractedData;
            componentTitleElement.value = "";
            componentTypeElement.value = "";
            htmlContentElement.value = "";
        } else if (!isTitleValid) {
            const message = "Title should start with Capital letter";
            errorText.innerText = message;
            errorEl.style.display = "block";
        } else {
            const message = "Please provide Title and Type";
            errorText.innerText = message;
            errorEl.style.display = "block";
        }
    });

    resetBtn.addEventListener("click", function() {
        output.innerHTML = "";
        outputBlock.style.display = "none";
    });
})();

function classComponentBuilder(htmlContent, name) {
    const className = name || "ReactComponent";
    const extractedHTML = extractReactHTML(htmlContent);
    return `export class ${className} extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return ("<>${extractedHTML}</>");
        }
    }`;
}

function functionComponentBuilder(htmlContent, name) {
    const functionName = name || "ReactComponent";
    const extractedHTML = extractReactHTML(htmlContent);
    return `export const ${functionName} = (props) => {
        return "<>${extractedHTML}</>");
    }`;
}

function extractReactHTML(htmlContent) {
    let extractedHTML = htmlContent;
    REPLACE_TEXT_OBJECT.forEach(function(obj) {
        const pattern = new RegExp(obj.htmlText, "g");
        extractedHTML = extractedHTML.replace(pattern, obj.reactText);
    });
    return extractedHTML;
}
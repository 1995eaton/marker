var blocks = {
  "\\*\\*|__" : "strong",
  "\\*|_"     : "em",
  "`"         : "span style=\"font-family : monospace;\"",
  "~~"        : "del"
};

var Marker = {};

Marker.parse = function(text) {
  for (var match in blocks) {
    text = text.replace(new RegExp("(" + match + ")([^\n]+\n?)\\1", "g"),
        "<" + blocks[match] + ">$2</" + blocks[match].replace(/ .*/, "") + ">");
  }
  text = text.replace(/(^|\n)([^\n]+)\n==*\n/g, "<h1>$2</h1>$1")
             .replace(/(^|\n)([^\n]+)\n--*\n/g, "<h2>$2</h2>$1")
             .replace(/\n\n/g, "\n<p>$&</p>\n")
             .replace(/\n( - )(.*)(?!\n\n|\n(?! - ))(.)/g, "|||<li>$2$3</li>|||")
             .replace(/(\|\|\|)(.*)(?!\n\n)/g, "<ul style=\"list-style-type: circle\">$2</ul>")
             .replace(/\|\|\|/g, "")
             .replace(/(\n|^)( *\* )(.*)/g, "|||<li>$3</li>|||")
             .replace(/(\|\|\|)(.*)(?!\n\n)/g, "<ul>$2</ul>")
             .replace(/\|\|\|/g, "")
             .replace(/\n( [0-9]+\. )(.*)(?!\n\n|\n(?! - ))(.)/g, "|||<li>$2$3</li>|||")
             .replace(/(\|\|\|)(.*)(?!\n\n)/g, "<ol>$2</ol>")
             .replace(/\|\|\|/g, "")
             .replace(/ > (.*(?!\n\n))/g, "<blockquote>$1</blockquote>")
             .replace(/(((\n|^)    ([^\n]+))+)/g, "<pre><code>$1</code></pre>\n")
             .replace(/(\n|^)    /g, "$1")
             .replace(/<<<([^\n]+\n?)>>>/g, "")
             .replace(/---/g, "&mdash;")
             .replace(/\[(([^\]](?!\n\n))+)\]\((([^\)](?!\n\n))+)\)/g, "<a href=\"$3\">$1</a>")
             .replace(/(^|\n)#+.*(?!\n\n)/g, function(str) {
                  var m = str.match(/(#+)/);
                  if (m) {
                    var l = m[0].length;
                    str = str.replace(/(^|\n)#+/, "");
                    return "<h" + l + ">" + str + "</h" + l + ">";
                  } else {
                    return "";
                  }
                });
  document.getElementById("output").innerHTML = text.replace(/\n+/g, "");
};

document.addEventListener("DOMContentLoaded", function() {
  var input = document.getElementById("input");
  input.oninput = function() {
    Marker.parse(this.value);
  };
  Marker.parse(input.value);
}, false);

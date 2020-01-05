const ansiStyles = require("ansi-styles")
const term = new Terminal({
    theme: {
        foreground: "#EEEEEE",
        background: "#300a2480",
        cursor: "#CFF5DB"
    },
    allowTransparency: true

});

term.open(document.getElementById('terminal'));
term.prompt = () => {
    term.write('\r\n$ ');
};


`Welcome to xterm.js!
This is a local terminal emulation, without a real terminal in the back-end.
${ansiStyles.blueBright.open}This should be bright blue! ${
    ansiStyles.blueBright.close
    }
${ansiStyles.bgMagenta.open}This is a magenta background! 🚀${
    ansiStyles.bgMagenta.close
    }
${ansiStyles.greenBright.open}wow so green wow ${ansiStyles.greenBright.close}

Type some keys and commands to play around.

`
    .split("\n")
    .map(line => term.writeln(line));
term.prompt();


term.onKey(e => {
    const ev = e.domEvent;
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

    if (ev.keyCode === 13) {
        term.prompt();
    } else if (ev.keyCode === 8) {
        // Do not delete the prompt
        if (term._core.buffer.x > 2) {
            term.write('\b \b');
        }
    } else if (printable) {
        term.write(e.key);
    }
});


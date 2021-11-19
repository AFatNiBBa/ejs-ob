
module.exports = {
    data: [],
    func: "__append",

    set(func) {
        this.func = func;
        return this;
    },

    start(func = this.func) {
        this.data.push("");
        return { [func]: this.echo.bind(this) };
    },

    clear() {
        return this.data.pop() ?? "";
    },

    echo(str, ...args) {
        if (str instanceof Array)
        {
            var out = "";
            for (let i = 0; i < args.length; i++)
                out += str[i] + args[i];
            return this.echo(out + str[str.length - 1]);
        }
        else if (str != null)
            if (!this.data.length)
                this.data.push(str);
            else
                this.data[this.data.length - 1] += str;
    }
};

declare module "ejs-ob" {
    /**
     * Buffers an "ejs" output.
     * Allows nested buffers.
     */
    declare const _: {
        /**
         * The buffered data.
         */
        data: string[],

        /**
         * The name of the output function.
         * @default "__append"
         */
        func: string,

        /**
         * Sets the name of the output function and returns itself for chaining.
         * @param func The new name of the output function.
         * @returns The module, for chaining
         */
        set(func: string): typeof _,

        /**
         * Creates a new level of the output buffer.
         * @param func The new name of the output function; It defaults to `ob.func`
         * @returns An object to put inside a "with" block
         */
        start<T extends string>(func: T = this.func): { [typeof func]: typeof _.cache },

        /**
         * Closes a buffered level.
         * @returns The last level buffered output
         */
        clear(): string,

        /**
         * Add a string to the buffered output.
         * You can use the template string syntax.
         *      ob.echo `output`;
         * @param str The string to add to the output buffer
         */
        echo(str: string | string[]): void
    };

    export = _;
}
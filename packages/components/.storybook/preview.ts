import type { Preview } from "@storybook/web-components-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../../core/src/styles/index.less";
import "../../core/src/index.ts";
import "../src/styles/icons.less";
import { handlers } from "./api.ts";

initialize({}, handlers);

const preview: Preview = {
    parameters: {
        docs: {
            toc: true, // 👈 Enables the table of contents
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [],
    loaders: [mswLoader],
};

export default preview;

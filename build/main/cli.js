#!/usr/bin/env node
"use strict";
/* Copyright (c) 2018-2022 Marco Stahl */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
const { version } = require('../../package.json');
const cli_1 = require("./lib/cli");
const exitCode = cli_1.runCli(process.argv, version);
if (exitCode) {
    process.exit(exitCode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHlDQUF5Qzs7QUFFekMsMkNBQTJDO0FBQzNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsRCxtQ0FBbUM7QUFFbkMsTUFBTSxRQUFRLEdBQUcsWUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFL0MsSUFBSSxRQUFRLEVBQUU7SUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ3hCIn0=
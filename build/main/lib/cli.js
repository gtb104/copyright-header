"use strict";
/* Copyright (c) 2018-2022 Marco Stahl */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCli = void 0;
const commander_1 = require("commander");
const copyright_header_1 = require("./copyright-header");
const templates_1 = require("./templates");
const utils_1 = require("./utils");
function runCli(argv, version = 'unknown') {
    const program = new commander_1.Command();
    program
        .option('--copyrightHolder <name>', 'Copyright Holder')
        .option('-e, --exclude <paths>', 'exclude regexp file filter', parseList, [])
        .option('--excludeCommits <pattern>', 'ignores commits which message match this pattern')
        .option('--fix', 'adds or updates copyright header to files', false)
        .option('--forceModificationYear <year>', 'number | "present"')
        .option('-i, --include <paths>', 'include regexp file filter', parseList, [])
        .option('--onlyChanged', 'Inspect only changed files', false)
        .option('--templateId <id>', templates_1.TEMPLATE_IDS.join(' | '), templates_1.DEFAULT_TEMPLATE_ID)
        .version(version);
    // parse the options from the command line
    program.parse(argv);
    // get the options as an object
    const options = program.opts();
    if (!options.copyrightHolder) {
        return reportError('Please specify --copyrightHolder');
    }
    if (options.templateId && !(options.templateId in templates_1.TEMPLATES)) {
        return reportError(`templateId must be one of [${templates_1.TEMPLATE_IDS.join(', ')}]`);
    }
    const forceModificationYear = utils_1.mapOptional(options.forceModificationYear, parseModificationYear);
    if (forceModificationYear instanceof Error) {
        return reportError('--forceModificationYear: ' + forceModificationYear.message);
    }
    const result = copyright_header_1.ensureUpdatedCopyrightHeader({
        copyrightHolder: options.copyrightHolder,
        exclude: options.exclude,
        excludeCommits: options.excludeCommits,
        fix: options.fix,
        forceModificationYear: forceModificationYear,
        include: options.include,
        onlyChanged: options.onlyChanged,
        template: templates_1.TEMPLATES[options.templateId]
    });
    return result.unFixedFiles.length ? 1 /* ERROR */ : 0 /* OK */;
}
exports.runCli = runCli;
function reportError(message) {
    console.error(message);
    return 1 /* ERROR */;
}
function parseList(val) {
    return val.split(',');
}
function parseModificationYear(year) {
    if (year === 'present') {
        return 'present';
    }
    else {
        const yearNumber = parseInt(year, 10);
        if (isNaN(yearNumber)) {
            return new Error(`"${year}" is not a valid year. It must be a number or "present"`);
        }
        return yearNumber;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7O0FBRXpDLHlDQUFvQztBQUNwQyx5REFBa0U7QUFDbEUsMkNBQTJFO0FBRTNFLG1DQUE4QztBQWtCOUMsU0FBZ0IsTUFBTSxDQUFDLElBQWMsRUFBRSxPQUFPLEdBQUcsU0FBUztJQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPO1NBQ0osTUFBTSxDQUFDLDBCQUEwQixFQUFFLGtCQUFrQixDQUFDO1NBQ3RELE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO1NBQzVFLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRSxrREFBa0QsQ0FBQztTQUN4RixNQUFNLENBQUMsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLEtBQUssQ0FBQztTQUNuRSxNQUFNLENBQUMsZ0NBQWdDLEVBQUUsb0JBQW9CLENBQUM7U0FDOUQsTUFBTSxDQUFDLHVCQUF1QixFQUFFLDRCQUE0QixFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7U0FDNUUsTUFBTSxDQUFDLGVBQWUsRUFBRSw0QkFBNEIsRUFBRSxLQUFLLENBQUM7U0FDNUQsTUFBTSxDQUFDLG1CQUFtQixFQUFFLHdCQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLCtCQUFtQixDQUFDO1NBQzFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVwQiwwQ0FBMEM7SUFDMUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwQiwrQkFBK0I7SUFDL0IsTUFBTSxPQUFPLEdBQWUsT0FBTyxDQUFDLElBQUksRUFBUyxDQUFDO0lBRWxELElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO1FBQzVCLE9BQU8sV0FBVyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUkscUJBQVMsQ0FBQyxFQUFFO1FBQzVELE9BQU8sV0FBVyxDQUFDLDhCQUE4Qix3QkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUU7SUFFRCxNQUFNLHFCQUFxQixHQUFHLG1CQUFXLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDaEcsSUFBSSxxQkFBcUIsWUFBWSxLQUFLLEVBQUU7UUFDMUMsT0FBTyxXQUFXLENBQUMsMkJBQTJCLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakY7SUFFRCxNQUFNLE1BQU0sR0FBRywrQ0FBNEIsQ0FBQztRQUMxQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7UUFDeEMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYztRQUN0QyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7UUFDaEIscUJBQXFCLEVBQUUscUJBQXFCO1FBQzVDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7UUFDaEMsUUFBUSxFQUFFLHFCQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztLQUN4QyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZ0IsQ0FBQyxXQUFZLENBQUM7QUFDbkUsQ0FBQztBQTVDRCx3QkE0Q0M7QUFFRCxTQUFTLFdBQVcsQ0FBQyxPQUFlO0lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIscUJBQXNCO0FBQ3hCLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxHQUFXO0lBQzVCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxJQUFZO0lBQ3pDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixPQUFPLFNBQVMsQ0FBQztLQUNsQjtTQUFNO1FBQ0wsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSx5REFBeUQsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDbkI7QUFDSCxDQUFDIn0=
/* © 2018-2022 Marco Stahl */
import { Command } from 'commander';
import { ensureUpdatedCopyrightHeader } from './copyright-header';
import { DEFAULT_TEMPLATE_ID, TEMPLATE_IDS, TEMPLATES } from './templates';
import { mapOptional } from './utils';
export function runCli(argv, version = 'unknown') {
    const program = new Command();
    program
        .option('--copyrightHolder <name>', 'Copyright Holder')
        .option('-e, --exclude <paths>', 'exclude regexp file filter', parseList, [])
        .option('--excludeCommits <pattern>', 'ignores commits which message match this pattern')
        .option('--fix', 'adds or updates copyright header to files', false)
        .option('--forceModificationYear <year>', 'number | "present"')
        .option('-i, --include <paths>', 'include regexp file filter', parseList, [])
        .option('--onlyChanged', 'Inspect only changed files', false)
        .option('--templateId <id>', TEMPLATE_IDS.join(' | '), DEFAULT_TEMPLATE_ID)
        .version(version);
    // parse the options from the command line
    program.parse(argv);
    // get the options as an object
    const options = program.opts();
    if (!options.copyrightHolder) {
        return reportError('Please specify --copyrightHolder');
    }
    if (options.templateId && !(options.templateId in TEMPLATES)) {
        return reportError(`templateId must be one of [${TEMPLATE_IDS.join(', ')}]`);
    }
    const forceModificationYear = mapOptional(options.forceModificationYear, parseModificationYear);
    if (forceModificationYear instanceof Error) {
        return reportError('--forceModificationYear: ' + forceModificationYear.message);
    }
    const result = ensureUpdatedCopyrightHeader({
        copyrightHolder: options.copyrightHolder,
        exclude: options.exclude,
        excludeCommits: options.excludeCommits,
        fix: options.fix,
        forceModificationYear: forceModificationYear,
        include: options.include,
        onlyChanged: options.onlyChanged,
        template: TEMPLATES[options.templateId]
    });
    return result.unFixedFiles.length ? 1 /* ERROR */ : 0 /* OK */;
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkJBQTZCO0FBRTdCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFM0UsT0FBTyxFQUFFLFdBQVcsRUFBVSxNQUFNLFNBQVMsQ0FBQztBQWtCOUMsTUFBTSxVQUFVLE1BQU0sQ0FBQyxJQUFjLEVBQUUsT0FBTyxHQUFHLFNBQVM7SUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPO1NBQ0osTUFBTSxDQUFDLDBCQUEwQixFQUFFLGtCQUFrQixDQUFDO1NBQ3RELE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO1NBQzVFLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRSxrREFBa0QsQ0FBQztTQUN4RixNQUFNLENBQUMsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLEtBQUssQ0FBQztTQUNuRSxNQUFNLENBQUMsZ0NBQWdDLEVBQUUsb0JBQW9CLENBQUM7U0FDOUQsTUFBTSxDQUFDLHVCQUF1QixFQUFFLDRCQUE0QixFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7U0FDNUUsTUFBTSxDQUFDLGVBQWUsRUFBRSw0QkFBNEIsRUFBRSxLQUFLLENBQUM7U0FDNUQsTUFBTSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsbUJBQW1CLENBQUM7U0FDMUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXBCLDBDQUEwQztJQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBCLCtCQUErQjtJQUMvQixNQUFNLE9BQU8sR0FBZSxPQUFPLENBQUMsSUFBSSxFQUFTLENBQUM7SUFFbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUU7UUFDNUIsT0FBTyxXQUFXLENBQUMsa0NBQWtDLENBQUMsQ0FBQztLQUN4RDtJQUVELElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsRUFBRTtRQUM1RCxPQUFPLFdBQVcsQ0FBQyw4QkFBOEIsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUU7SUFFRCxNQUFNLHFCQUFxQixHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUNoRyxJQUFJLHFCQUFxQixZQUFZLEtBQUssRUFBRTtRQUMxQyxPQUFPLFdBQVcsQ0FBQywyQkFBMkIsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqRjtJQUVELE1BQU0sTUFBTSxHQUFHLDRCQUE0QixDQUFDO1FBQzFDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtRQUN4QyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxjQUFjO1FBQ3RDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztRQUNoQixxQkFBcUIsRUFBRSxxQkFBcUI7UUFDNUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztRQUNoQyxRQUFRLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7S0FDeEMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWdCLENBQUMsV0FBWSxDQUFDO0FBQ25FLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxPQUFlO0lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIscUJBQXNCO0FBQ3hCLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxHQUFXO0lBQzVCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxJQUFZO0lBQ3pDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixPQUFPLFNBQVMsQ0FBQztLQUNsQjtTQUFNO1FBQ0wsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQixPQUFPLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSx5REFBeUQsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDbkI7QUFDSCxDQUFDIn0=
"use strict";
/* Copyright (c) 2018-2022 Marco Stahl */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-expression-statement no-object-mutation
const ava_1 = __importDefault(require("ava"));
const git_1 = require("./git");
ava_1.default('getFileInfoFromGit', t => {
    const fileinfo = git_1.getFileInfoFromGit('README.md');
    t.is(fileinfo.filename, 'README.md');
    t.is(fileinfo.createdYear, 2018);
    t.true(!isNaN(fileinfo.updatedYear));
    t.true(fileinfo.updatedYear >= 2018);
});
ava_1.default('invertedGrepOptions', t => {
    t.deepEqual(git_1.testExports.invertedGrepOptions('pattern'), ['--invert-grep', '--grep=pattern']);
    t.deepEqual(git_1.testExports.invertedGrepOptions(), []);
});
ava_1.default('execToLines error', t => {
    t.throws(() => git_1.testExports.execToLines([]), /No command to exec/);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2dpdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBeUM7Ozs7O0FBRXpDLDREQUE0RDtBQUU1RCw4Q0FBdUI7QUFDdkIsK0JBQXdEO0FBRXhELGFBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUM3QixNQUFNLFFBQVEsR0FBRyx3QkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVqRCxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVksQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBWSxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzlCLENBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxpQkFBVyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDNUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQyxDQUFDIn0=
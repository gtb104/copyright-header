"use strict";
/* © 2018-2022 Marco Stahl */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSimpleTemplate = void 0;
function renderSimpleTemplate(template, vars) {
    return template.replace(/\$\w+/g, key => vars[key.slice(1)]);
}
exports.renderSimpleTemplate = renderSimpleTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zaW1wbGUtdGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUE2Qjs7O0FBRTdCLFNBQWdCLG9CQUFvQixDQUNsQyxRQUFnQixFQUNoQixJQUF3QztJQUV4QyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFMRCxvREFLQyJ9
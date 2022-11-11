"use strict";
/* © 2018-2022 Marco Stahl */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_IDS = exports.TEMPLATES = exports.DEFAULT_TEMPLATE_ID = void 0;
exports.DEFAULT_TEMPLATE_ID = 'minimal';
exports.TEMPLATES = {
    [exports.DEFAULT_TEMPLATE_ID]: '/* © $from$to $copyrightHolder */',
    apache: `
/*
 * © $from$to $copyrightHolder
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
`.trim(),
    gplv3: `
/*
 * © $from$to $copyrightHolder.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
`.trim()
};
exports.TEMPLATE_IDS = Object.keys(exports.TEMPLATES);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90ZW1wbGF0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUE2Qjs7O0FBTWhCLFFBQUEsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO0FBRWhDLFFBQUEsU0FBUyxHQUFjO0lBQ2xDLENBQUMsMkJBQW1CLENBQUMsRUFBRSxtQ0FBbUM7SUFDMUQsTUFBTSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0JULENBQUMsSUFBSSxFQUFFO0lBQ04sS0FBSyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0NBZ0JSLENBQUMsSUFBSSxFQUFFO0NBQ1AsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVMsQ0FBQyxDQUFDIn0=
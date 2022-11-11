/* Copyright (c) 2018-2022 Marco Stahl */
export const DEFAULT_TEMPLATE_ID = 'minimal';
export const TEMPLATES = {
    [DEFAULT_TEMPLATE_ID]: '/* Copyright (c) $from$to $copyrightHolder */',
    apache: `
/*
 * Copyright (c) $from$to $copyrightHolder
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
 * Copyright (c) $from$to $copyrightHolder.
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
export const TEMPLATE_IDS = Object.keys(TEMPLATES);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90ZW1wbGF0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUNBQXlDO0FBTXpDLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQztBQUU3QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQWM7SUFDbEMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLCtDQUErQztJQUN0RSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQlQsQ0FBQyxJQUFJLEVBQUU7SUFDTixLQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FnQlIsQ0FBQyxJQUFJLEVBQUU7Q0FDUCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMifQ==
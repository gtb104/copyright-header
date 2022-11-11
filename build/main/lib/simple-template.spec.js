"use strict";
/* Copyright (c) 2018-2022 Marco Stahl */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const simple_template_1 = require("./simple-template");
ava_1.default('renderSimpleTemplate replaces vars', t => {
    t.is(simple_template_1.renderSimpleTemplate('start $variable end', { variable: 'value' }), 'start value end');
    t.is(simple_template_1.renderSimpleTemplate('start $variable1 $variable2 end', {
        variable1: 'value1',
        variable2: 'value2'
    }), 'start value1 value2 end');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRlbXBsYXRlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NpbXBsZS10ZW1wbGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5Q0FBeUM7Ozs7O0FBRXpDLDhDQUF1QjtBQUN2Qix1REFBeUQ7QUFFekQsYUFBSSxDQUFDLG9DQUFvQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzdDLENBQUMsQ0FBQyxFQUFFLENBQUMsc0NBQW9CLENBQUMscUJBQXFCLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzVGLENBQUMsQ0FBQyxFQUFFLENBQ0Ysc0NBQW9CLENBQUMsaUNBQWlDLEVBQUU7UUFDdEQsU0FBUyxFQUFFLFFBQVE7UUFDbkIsU0FBUyxFQUFFLFFBQVE7S0FDcEIsQ0FBQyxFQUNGLHlCQUF5QixDQUMxQixDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==
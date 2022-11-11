/* © 2018-2022 Marco Stahl */
import test from 'ava';
import { renderSimpleTemplate } from './simple-template';
test('renderSimpleTemplate replaces vars', t => {
    t.is(renderSimpleTemplate('start $variable end', { variable: 'value' }), 'start value end');
    t.is(renderSimpleTemplate('start $variable1 $variable2 end', {
        variable1: 'value1',
        variable2: 'value2'
    }), 'start value1 value2 end');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRlbXBsYXRlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NpbXBsZS10ZW1wbGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QjtBQUU3QixPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQsSUFBSSxDQUFDLG9DQUFvQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzdDLENBQUMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzVGLENBQUMsQ0FBQyxFQUFFLENBQ0Ysb0JBQW9CLENBQUMsaUNBQWlDLEVBQUU7UUFDdEQsU0FBUyxFQUFFLFFBQVE7UUFDbkIsU0FBUyxFQUFFLFFBQVE7S0FDcEIsQ0FBQyxFQUNGLHlCQUF5QixDQUMxQixDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==
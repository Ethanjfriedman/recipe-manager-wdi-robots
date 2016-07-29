// assumes you're in Bash
mongo
use recipes-db
db.recipes.drop()
db.createCollection('recipes')
db.recipes.insert({title:"hamburgers",author:"ethan",difficulty:"medium",time:30,ingredients:["ground beef","hamburger buns","Worcestershire sauce","salt & pepper to taste","cheese (optional)"],instructions:"Mix beef, Worcestershire sauce and seasoning in large bowl. Form into patties. Grill over medium-high heat until medium-rare. Put cheese on when you flip. Toast buns at hte same time on side of grill. Serve with desired toppings and condiments"})
db.recipes.insert({title:"vanilla milkshake",author:"ethan",difficulty:"easy",time:5,ingredients:["milk","vanilla ice cream","vanilla extract","maple syrup (optional)"],instructions:"Combine all ingredients in blender and process until well combined."})

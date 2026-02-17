SELECT 
       y.name as star_name,
       p.name as planet_name,
       s.name as settlement_name,
       s.population       
FROM 
    space_game.settlements s
    LEFT JOIN space_game.planets p ON p.planet_id = s.planet_id
    LEFT JOIN space_game.star_systems y on y.star_id = p.star_system_id
order by population desc
LIMIT 1000;





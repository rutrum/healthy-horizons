SELECT * FROM prize;
INSERT INTO prize (description, tier_id) VALUES('Reusable Utensils & Bag',2),
('Zen Coloring Book', 2),
('Dri-Mesh Shirt', 2),
('Lined Thermos',2),
('Fingerless Gloves', 1),
('Pill Dispenser', 1),
('Magnetic Clip', 1),
('First Aid Kit', 1),
('Cloth Grocery Bag', 1),
('Water Bottle ',1),
('Waterproof Picnic Throw', 3),
('Bluetooth Earbuds',3),
('Rain Jackets', 3);

SELECT * FROM tier;

SELECT prize.description, tier.name, tier.id, tier.points
FROM prize
INNER JOIN tier
ON prize.tier_id = tier.id;

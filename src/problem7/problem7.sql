-- CREATE TABLE balances (
--   id int,
--   address varchar(255),
--   denom varchar(4),
--   amount bigint, 
--   block_height int
-- );

-- CREATE TABLE trades (
--   id int,
--   address varchar(255),
--   denom varchar(4),
--   amount bigint, 
--   block_height int
-- );

-- INSERT INTO balances
--   VALUES
--   (1, '0xabab', 'usdc', 50000000000000, 733755),
--   (1, '0x99cc', 'swth', -20000000, 733757),
--   (1, '0xabab', 'usdc', -50000000000, 733855);

-- INSERT INTO trades 
--   VALUES
--   (1, '0xabab', 'swth', 400000000000, 733756),
--   (1, '0x99cc', 'usdc', 3500000000000, 733757),
--   (1, '0x67f3', 'swth', 72000000000000, 733758);

SELECT b.address
FROM balances b
LEFT JOIN trades t ON b.address = t.address AND t.block_height > 730000
WHERE b.denom IN ('usdc', 'swth', 'tmz')
GROUP BY b.address
HAVING SUM(CASE WHEN b.denom = 'usdc' THEN b.amount * 0.000001
                WHEN b.denom = 'swth' THEN b.amount * 0.00000005
                WHEN b.denom = 'tmz' THEN b.amount * 0.003
           END) >= 500
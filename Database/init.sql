-- Step 1: Create the database
CREATE DATABASE ProductManagementDB;
GO

-- Step 2: Use the new database
USE ProductManagementDB;
GO

-- Step 3: Create the Products table
CREATE TABLE [ProductManagementDB].[dbo].[Products] (
    [Id] INT IDENTITY(1,1) PRIMARY KEY,
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(500) NOT NULL,
    [Price] DECIMAL(18, 2) NOT NULL,
    [CreatedDate] DATETIME2(7) NOT NULL,
    [ImageUrl] NVARCHAR(MAX)
);
GO

-- Step 4: Insert data into the Products table
INSERT INTO [ProductManagementDB].[dbo].[Products] 
([Name], [Description], [Price], [CreatedDate], [ImageUrl]) 
VALUES 
('Wireless Headphones', 'Over-ear Bluetooth headphones with noise cancellation.', 199.99, '2024-12-01 00:00:00.0000000', 'https://www.cnet.com/a/img/resize/cf49212a3beb223a12db9e261341167db78f4997/hub/2020/12/16/b9e3f465-8440-4b8e-9cfa-333202afa589/airpods-max-8.jpg?auto=webp&fit=crop&height=360&width=640'),
('Smartphone X2', 'Latest smartphone with OLED display and 5G connectivity.', 799.99, '2024-11-15 00:00:00.0000000', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREqK3KIDMCtH5SvsZZsdEL0ws1VWdt0R4shQ&s'),
('Electric Kettle', '1.7L stainless steel kettle with automatic shut-off.', 49.99, '2024-10-30 00:00:00.0000000', 'https://assets.epicurious.com/photos/609e9d9848cd17a4fcdbf149/16:9/w_2560%2Cc_limit/The-Best-Electric-Kettle-11042018_V1.jpg'),
('Gaming Laptop', 'High-performance laptop with RTX 4070 GPU and 16GB RAM.', 1499.99, '2024-12-01 00:00:00.0000000', 'https://i.rtings.com/assets/pages/6dRuEBex/best-gaming-laptops-20242028-medium.jpg?format=auto'),
('Running Shoes', 'Lightweight running shoes with superior cushioning.', 129.99, '2024-11-20 00:00:00.0000000', 'https://image.made-in-china.com/318f0j00TQYRDhonVWpC/ligh-weight-running-shoes-0522-1-mp4.webp'),
('Smartwatch Pro', 'Advanced smartwatch with fitness tracking and GPS.', 249.99, '2024-10-25 00:00:00.0000000', 'https://www.cnet.com/a/img/resize/cf49212a3beb223a12db9e261341167db78f4997/hub/2020/12/16/b9e3f465-8440-4b8e-9cfa-333202afa589/airpods-max-8.jpg?auto=webp&fit=crop&height=360&width=640'),
('Desk Lamp', 'Adjustable LED desk lamp with USB charging port.', 39.99, '2024-09-15 00:00:00.0000000', 'https://www.cnet.com/a/img/resize/cf49212a3beb223a12db9e261341167db78f4997/hub/2020/12/16/b9e3f465-8440-4b8e-9cfa-333202afa589/airpods-max-8.jpg?auto=webp&fit=crop&height=360&width=640'),
('Blender', 'Powerful blender for smoothies and shakes.', 89.99, '2024-12-03 00:00:00.0000000', 'https://www.cnet.com/a/img/resize/cf49212a3beb223a12db9e261341167db78f4997/hub/2020/12/16/b9e3f465-8440-4b8e-9cfa-333202afa589/airpods-max-8.jpg?auto=webp&fit=crop&height=360&width=640'),
('Portable Speaker', 'Compact Bluetooth speaker with deep bass.', 59.99, '2024-10-10 00:00:00.0000000', 'https://www.cnet.com/a/img/resize/cf49212a3beb223a12db9e261341167db78f4997/hub/2020/12/16/b9e3f465-8440-4b8e-9cfa-333202afa589/airpods-max-8.jpg?auto=webp&fit=crop&height=360&width=640'),
('Coffee Maker', 'Programmable coffee maker with 12-cup capacity.', 89.99, '2024-12-05 00:00:00.0000000', 'https://www.cnet.com/a/img/resize/cf49212a3beb223a12db9e261341167db78f4997/hub/2020/12/16/b9e3f465-8440-4b8e-9cfa-333202afa589/airpods-max-8.jpg?auto=webp&fit=crop&height=360&width=640');
GO

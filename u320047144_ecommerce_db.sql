-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-10-2025 a las 19:14:23
-- Versión del servidor: 11.8.3-MariaDB-log
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u320047144_ecommerce_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrusel`
--

CREATE TABLE `carrusel` (
  `id` int(11) UNSIGNED NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `producto_id` bigint(20) UNSIGNED DEFAULT NULL,
  `orden` int(11) DEFAULT 0,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrusel`
--

INSERT INTO `carrusel` (`id`, `imagen`, `producto_id`, `orden`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'carrusel/mesa-de-trabajo-6_1760461161.webp', 20, 1, 'activo', '2025-09-15 10:58:49', '2025-10-14 11:59:21'),
(2, 'carrusel/mesa-de-trabajo-9_1760461493.webp', 17, 2, 'activo', '2025-09-15 10:59:17', '2025-10-14 12:12:54'),
(3, 'carrusel/mesa-de-trabajo-5_1760461991.webp', 19, 3, 'activo', '2025-09-15 11:00:02', '2025-10-14 12:13:11'),
(4, 'carrusel/mesa-de-trabajo-3_1760462062.webp', 17, 4, 'activo', '2025-09-15 11:00:25', '2025-10-14 12:14:22'),
(5, 'carrusel/mesa-de-trabajo-10_1760462231.webp', 23, 5, 'activo', '2025-09-15 11:00:47', '2025-10-14 12:17:11'),
(6, 'carrusel/mesa-de-trabajo-11_1760479556.webp', 22, 6, 'activo', '2025-09-15 11:01:11', '2025-10-14 17:05:56'),
(7, 'carrusel/mesa-de-trabajo-7_1760462320.webp', 18, 8, 'activo', '2025-09-15 11:01:37', '2025-10-14 12:21:05'),
(8, 'carrusel/mesa-de-trabajo-4_1760462302.webp', 24, 7, 'activo', '2025-09-15 11:02:04', '2025-10-14 17:21:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `imagen` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `parent_id`, `nombre`, `estado`, `imagen`, `created_at`, `updated_at`) VALUES
(8, NULL, 'Moda y Accesorios', 'activo', 'categorias/moda-y-accesorios_1760542222.webp', '2025-09-13 13:03:02', '2025-10-15 10:30:22'),
(9, NULL, 'Belleza y Salud', 'activo', 'categorias/salud-y-belleza_1760542207.webp', '2025-09-13 13:03:30', '2025-10-15 10:30:07'),
(10, NULL, 'Productos Naturales', 'activo', 'categorias/productos-naturales_1760542232.webp', '2025-09-13 13:03:45', '2025-10-15 10:30:32'),
(11, 10, 'Suplementos', 'activo', 'categorias/suplementos_1757786641.webp', '2025-09-13 13:04:01', '2025-09-29 18:10:22'),
(12, 10, 'Aceites', 'activo', 'categorias/aceites_1756414534.webp', '2025-08-16 22:54:43', '2025-09-25 16:01:18'),
(14, 10, 'Gomitas', 'activo', 'categorias/gomitas_1756414558.webp', '2025-08-16 22:54:43', '2025-09-25 16:01:12'),
(15, 10, 'Batidos', 'activo', 'categorias/batidos_1756414549.webp', '2025-08-16 22:54:43', '2025-09-25 16:01:08'),
(16, NULL, 'Salud y Belleza', 'inactivo', 'categorias/sueno-y-relajacion_1760107373.webp', '2025-10-03 14:31:37', '2025-10-14 14:53:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `dni` char(12) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `tipo` enum('registrado','invitado') DEFAULT 'invitado',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `user_id`, `nombre`, `dni`, `email`, `telefono`, `direccion`, `tipo`, `created_at`, `updated_at`) VALUES
(2, NULL, 'Prueba Prueba', '89342312', 'prueba@gmail.com', '983273472', NULL, 'invitado', '2025-09-25 14:51:31', '2025-09-25 14:51:31'),
(3, NULL, 'prueba prueba', '11111122', 'prueba@gmail.com', '989989989', NULL, 'invitado', '2025-09-25 14:53:08', '2025-09-25 14:54:09'),
(6, NULL, 'Perez Roman', '72747821', 'perezr@gmail.com', '9823121221', NULL, 'invitado', '2025-09-30 12:20:50', '2025-09-30 12:20:50'),
(7, NULL, 'sandro pachas', '78011832', 'peruvianecom@gmail.com', '999999999', NULL, 'invitado', '2025-10-02 12:28:47', '2025-10-09 14:04:50'),
(12, NULL, 'asdsad', '12312412', 'peruvianecom@gmail.com', '213123123', NULL, 'invitado', '2025-10-02 12:34:24', '2025-10-03 09:38:37'),
(13, NULL, 'asd asd', '12312321', 'qwe@gmail.com', '213123123', NULL, 'invitado', '2025-10-02 15:04:55', '2025-10-12 12:22:58'),
(20, NULL, 'dsadsad', '12312441', 'peruvianecom@gmail.com', '124141241', NULL, 'invitado', '2025-10-02 15:42:46', '2025-10-02 15:42:46'),
(29, NULL, 'dsadsadsadsad', '14212312', 'peruvianecom@gmail.com', '124535436', NULL, 'invitado', '2025-10-02 16:03:07', '2025-10-02 16:03:07'),
(30, NULL, 'adsadsad', '12312414', 'peruvianecom@gmail.com', '534543543', NULL, 'invitado', '2025-10-02 16:04:02', '2025-10-02 16:04:02'),
(31, NULL, 'sadsadasdsadsad', '41221312', 'peruvianecom@gmail.com', '123123123', NULL, 'invitado', '2025-10-02 16:13:12', '2025-10-02 16:13:12'),
(34, NULL, 'ASDSADASDSA', '32131231', 'peruvianecom@gmail.com', '231231231', NULL, 'invitado', '2025-10-02 16:49:53', '2025-10-02 16:49:53'),
(35, NULL, 'asd sad', '12312312', 'peruvianecom@gmail.com', '123123123', NULL, 'invitado', '2025-10-03 09:27:19', '2025-10-09 14:23:20'),
(37, NULL, 'sad sad', '31231231', 'peruvianecom@gmail.com', '123123123', NULL, 'invitado', '2025-10-03 09:28:42', '2025-10-09 12:52:23'),
(42, NULL, 'sad', '12121241', 'peruvianecom@gmail.com', '312312312', NULL, 'invitado', '2025-10-03 09:33:06', '2025-10-03 09:33:06'),
(43, NULL, 'fsdfdasd', '41123231', 'peruvianecom@gmail.com', '123123123', NULL, 'invitado', '2025-10-03 09:34:13', '2025-10-03 09:34:13'),
(44, NULL, 'saddsasad', '41231231', 'peruvianecom@gmail.com', '412312312', NULL, 'invitado', '2025-10-03 09:49:14', '2025-10-03 09:50:44'),
(49, NULL, 'sandro pachas', '12441231', 'peruvianecom@gmail.com', '124123123', NULL, 'invitado', '2025-10-03 17:05:04', '2025-10-03 17:05:04'),
(50, NULL, 'asdsad asdasd', '12312543', 'peruvianecom@gmail.com', '123123123', NULL, 'invitado', '2025-10-03 17:11:41', '2025-10-03 17:11:41'),
(51, NULL, 'sandro pachas', '78018132', 'sandro@gmail.com', '999999999', NULL, 'invitado', '2025-10-04 21:42:11', '2025-10-04 21:42:11'),
(52, NULL, 'asd sadsad', '23123213', 'dsad@gmail.com', '123213213', NULL, 'invitado', '2025-10-06 09:04:50', '2025-10-06 09:06:09'),
(53, NULL, 'sandro pachas', '78018321', 'sandropachas@gmail.com', '123123123', NULL, 'invitado', '2025-10-06 10:24:23', '2025-10-06 10:24:23'),
(54, NULL, 'sandro pachas', '78012321', 'asdasd@gmail.com', '123213123', NULL, 'invitado', '2025-10-06 10:36:32', '2025-10-06 10:36:32'),
(55, NULL, 'sandro pachas', '54534534', 'sdasd@gmai.com', '564564561', NULL, 'invitado', '2025-10-06 10:41:59', '2025-10-06 10:41:59'),
(56, NULL, 'sandro pachas', '78011893', 'sandro@gmail.com', '123123123', NULL, 'invitado', '2025-10-06 10:45:15', '2025-10-06 10:45:15'),
(57, NULL, 'sadn asd', '23423423', 'sdasd@gmail.com', '454534545', NULL, 'invitado', '2025-10-06 10:47:17', '2025-10-06 10:47:17'),
(58, NULL, 'sandro pachas', '54543534', 'sadasd@gmail.com', '235423545', NULL, 'invitado', '2025-10-06 10:47:54', '2025-10-06 10:47:54'),
(59, NULL, 'sandro pachas', '45354353', 'sdasd@gmail.com', '453453453', NULL, 'invitado', '2025-10-06 10:48:30', '2025-10-06 10:48:30'),
(60, NULL, 'sadasd sad', '23123123', 'sadasd@gmail.com', '456346546', NULL, 'invitado', '2025-10-06 10:49:09', '2025-10-06 10:49:09'),
(61, NULL, 'sandro pachas', '89127389', 'peruvianecom@gmail.com', '999999999', NULL, 'invitado', '2025-10-06 13:09:44', '2025-10-06 13:09:44'),
(62, NULL, 'Jose Gabriel Belleza', '72748691', 'josebelleza@gmail.com', '989692409', NULL, 'invitado', '2025-10-06 13:11:07', '2025-10-06 13:11:07'),
(63, NULL, 'Sandro pachas', '91828291', 'peruvianecom@gmail.com', '649497994', NULL, 'invitado', '2025-10-06 13:19:58', '2025-10-06 13:19:58'),
(64, NULL, 'wendy sabrina matheus miranda', '75594734', 'wendymatheusmiranda@gmail.com', '912032190', NULL, 'invitado', '2025-10-06 13:20:39', '2025-10-06 13:20:39'),
(65, NULL, 'Jose Belleza Calle', '72748690', 'josebelleza@gmail.com', '989090891', NULL, 'invitado', '2025-10-06 13:23:16', '2025-10-06 16:45:04'),
(66, NULL, 'Jose Belleza', '72748978', 'josebelleza@gmail.com', '989712123', NULL, 'invitado', '2025-10-07 12:03:26', '2025-10-07 12:03:26'),
(67, NULL, 'asd asd', '12321321', 'peruvianecom@gmail.com', '124443345', NULL, 'invitado', '2025-10-07 12:06:22', '2025-10-07 12:06:22'),
(68, NULL, 'sandro pachas', '91231231', 'asdasd@gmail.com', '143435465', NULL, 'invitado', '2025-10-07 12:10:43', '2025-10-07 12:10:43'),
(69, NULL, 'jose belleza', '72748723', 'josebelleza@gmail.com', '987812123', NULL, 'invitado', '2025-10-07 12:21:21', '2025-10-07 12:21:21'),
(70, NULL, 'Jose Belleza', '72737483', 'josebelleza@gmail.com', '989629340', NULL, 'invitado', '2025-10-07 17:34:16', '2025-10-07 17:34:16'),
(71, NULL, 'Luiggi Vargas', '46423891', 'renattov7@gmail.com', '918604153', NULL, 'invitado', '2025-10-09 11:03:08', '2025-10-09 11:03:08'),
(72, NULL, 'asd 1asd', '21312321', 'peruvianecom@gmail.com', '124312312', NULL, 'invitado', '2025-10-09 11:39:26', '2025-10-09 12:47:29'),
(73, NULL, 'adas sadas', '12312331', 'peruvianecom@gmail.com', '123123122', NULL, 'invitado', '2025-10-09 11:47:50', '2025-10-09 11:47:50'),
(74, NULL, 'asd asda', '21312312', 'peruvianecom@gmail.com', '213123123', NULL, 'invitado', '2025-10-09 14:21:42', '2025-10-09 14:21:42'),
(75, NULL, 'qweewq qweqwe', '23123231', 'peruvianecom@gmail.com', '123123123', NULL, 'invitado', '2025-10-09 14:22:35', '2025-10-09 14:22:35'),
(76, NULL, 'sandro pachas', '78185748', 'sadasd@gmai.com', '123123123', NULL, 'invitado', '2025-10-10 10:43:59', '2025-10-10 10:43:59'),
(77, NULL, 'asd asd', '31232131', 'peruvianecom@gmail.com', '123123123', NULL, 'invitado', '2025-10-10 11:29:03', '2025-10-10 11:29:03'),
(78, NULL, 'dasdasda asdasdas', '15345456', 'asdasdas@hotmail.com', '989786798', NULL, 'invitado', '2025-10-10 19:41:15', '2025-10-10 19:41:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cyberwow_banners`
--

CREATE TABLE `cyberwow_banners` (
  `id` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `categoria_id` bigint(20) UNSIGNED DEFAULT NULL,
  `producto_id` bigint(20) UNSIGNED DEFAULT NULL,
  `orden` int(11) DEFAULT 0,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cyberwow_banners`
--

INSERT INTO `cyberwow_banners` (`id`, `titulo`, `imagen`, `categoria_id`, `producto_id`, `orden`, `estado`, `created_at`, `updated_at`) VALUES
(2, 'Gomitas', 'cyberwow/mesa-de-trabajo-19_1759848294.webp', 14, NULL, 1, 'activo', '2025-09-15 11:04:16', '2025-10-07 09:44:54'),
(3, 'Tiendas', 'cyberwow/25dscto_1760556640.webp', NULL, NULL, 2, 'activo', '2025-09-15 11:05:28', '2025-10-15 14:30:40'),
(4, 'Carticolageno', 'cyberwow/flayer3_1759168220.webp', NULL, 7, 3, 'inactivo', '2025-09-15 11:05:52', '2025-10-03 10:28:29'),
(5, 'Moringa', 'cyberwow/flayer4_1759168262.webp', NULL, 9, 4, 'inactivo', '2025-09-15 11:06:08', '2025-10-03 10:28:07'),
(6, 'Aceite romero', 'cyberwow/flayer5_1759168270.webp', NULL, 6, 5, 'inactivo', '2025-09-15 11:06:26', '2025-10-03 10:28:17'),
(7, 'Carticolageno Tiburon', 'cyberwow/flayer6_1759168277.webp', NULL, 10, 6, 'inactivo', '2025-09-15 11:06:41', '2025-10-03 10:28:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cyberwow_banner_tienda`
--

CREATE TABLE `cyberwow_banner_tienda` (
  `id` int(10) UNSIGNED NOT NULL,
  `banner_id` int(10) UNSIGNED NOT NULL,
  `tienda_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cyberwow_banner_tienda`
--

INSERT INTO `cyberwow_banner_tienda` (`id`, `banner_id`, `tienda_id`) VALUES
(11, 3, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pedido_id` bigint(20) UNSIGNED NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_venta` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id`, `pedido_id`, `producto_id`, `cantidad`, `precio_venta`, `subtotal`, `created_at`, `updated_at`) VALUES
(2, 2, 16, 1, 109.00, 109.00, '2025-09-25 14:51:31', '2025-09-25 14:51:31'),
(3, 3, 5, 1, 97.50, 97.50, '2025-09-25 14:53:08', '2025-09-25 14:53:08'),
(4, 4, 11, 1, 84.00, 84.00, '2025-09-25 14:54:09', '2025-09-25 14:54:09'),
(5, 5, 12, 1, 109.50, 109.50, '2025-09-25 14:55:13', '2025-09-25 14:55:13'),
(8, 8, 17, 1, 158.50, 158.50, '2025-09-30 12:20:50', '2025-09-30 12:20:50'),
(9, 9, 17, 1, 158.50, 158.50, '2025-09-30 12:21:30', '2025-09-30 12:21:30'),
(10, 10, 17, 1, 158.50, 158.50, '2025-09-30 12:22:13', '2025-09-30 12:22:13'),
(11, 11, 5, 3, 97.00, 291.00, '2025-10-02 12:28:47', '2025-10-02 12:28:47'),
(12, 11, 11, 1, 99.00, 99.00, '2025-10-02 12:28:47', '2025-10-02 12:28:47'),
(17, 16, 16, 1, 109.00, 109.00, '2025-10-02 12:34:24', '2025-10-02 12:34:24'),
(18, 17, 16, 1, 109.00, 109.00, '2025-10-02 12:35:02', '2025-10-02 12:35:02'),
(19, 18, 16, 1, 109.00, 109.00, '2025-10-02 12:36:06', '2025-10-02 12:36:06'),
(20, 19, 16, 1, 109.00, 109.00, '2025-10-02 12:36:43', '2025-10-02 12:36:43'),
(21, 20, 16, 1, 109.00, 109.00, '2025-10-02 15:04:55', '2025-10-02 15:04:55'),
(22, 20, 12, 1, 99.00, 99.00, '2025-10-02 15:04:55', '2025-10-02 15:04:55'),
(29, 27, 5, 2, 97.00, 194.00, '2025-10-02 15:42:46', '2025-10-02 15:42:46'),
(38, 36, 17, 1, 159.00, 159.00, '2025-10-02 16:03:07', '2025-10-02 16:03:07'),
(39, 37, 6, 1, 99.00, 99.00, '2025-10-02 16:04:02', '2025-10-02 16:04:02'),
(40, 38, 12, 1, 99.00, 99.00, '2025-10-02 16:13:12', '2025-10-02 16:13:12'),
(41, 38, 24, 2, 159.00, 318.00, '2025-10-02 16:13:12', '2025-10-02 16:13:12'),
(46, 41, 17, 1, 159.00, 159.00, '2025-10-02 16:49:53', '2025-10-02 16:49:53'),
(47, 41, 5, 1, 97.00, 97.00, '2025-10-02 16:49:53', '2025-10-02 16:49:53'),
(48, 42, 11, 1, 99.00, 99.00, '2025-10-03 09:27:19', '2025-10-03 09:27:19'),
(49, 43, 17, 1, 159.00, 159.00, '2025-10-03 09:28:42', '2025-10-03 09:28:42'),
(54, 48, 11, 1, 99.00, 99.00, '2025-10-03 09:33:06', '2025-10-03 09:33:06'),
(55, 49, 5, 1, 97.00, 97.00, '2025-10-03 09:34:13', '2025-10-03 09:34:13'),
(56, 50, 11, 1, 99.00, 99.00, '2025-10-03 09:38:37', '2025-10-03 09:38:37'),
(57, 51, 11, 1, 99.00, 99.00, '2025-10-03 09:48:19', '2025-10-03 09:48:19'),
(58, 52, 11, 1, 99.00, 99.00, '2025-10-03 09:49:14', '2025-10-03 09:49:14'),
(60, 54, 12, 1, 99.00, 99.00, '2025-10-03 09:50:44', '2025-10-03 09:50:44'),
(61, 55, 10, 1, 6.00, 6.00, '2025-10-07 12:23:21', '2025-10-07 12:23:21'),
(62, 56, 10, 1, 6.00, 6.00, '2025-10-07 17:35:51', '2025-10-07 17:35:51'),
(63, 57, 10, 1, 6.00, 6.00, '2025-10-09 11:05:02', '2025-10-09 11:05:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `imagen` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`id`, `nombre`, `estado`, `imagen`, `created_at`, `updated_at`) VALUES
(1, 'Salud y Bienestar Interno', 'activo', 'etiquetas/salud-y-bienestar-interno_1760714588.webp', '2025-10-17 10:23:08', '2025-10-17 10:23:08'),
(2, 'Belleza y Cuidado Personal', 'activo', 'etiquetas/belleza-y-cuidado-personal_1760714687.webp', '2025-10-17 10:24:47', '2025-10-17 10:24:47'),
(3, 'Sueño y Relajación', 'activo', 'etiquetas/sueno-y-relajacion_1760714700.webp', '2025-10-17 10:25:00', '2025-10-17 10:25:00'),
(4, 'Energía y Vitalidad Mental', 'activo', 'etiquetas/energia-y-vitalidad-mental_1760714716.webp', '2025-10-17 10:25:16', '2025-10-17 10:25:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liquidaciones`
--

CREATE TABLE `liquidaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `orden` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `liquidaciones`
--

INSERT INTO `liquidaciones` (`id`, `producto_id`, `imagen`, `orden`, `created_at`, `updated_at`) VALUES
(1, 6, 'liquidaciones/belleza-y-cuidado-personal_1759982411.webp', 3, '2025-09-15 11:07:59', '2025-10-09 09:13:39'),
(2, 13, 'liquidaciones/energia-y-vitalidad-mental_1759982438.webp', 1, '2025-09-15 11:08:18', '2025-10-09 09:17:53'),
(3, 10, 'liquidaciones/salud-y-bienestar-interno_1759982445.webp', 2, '2025-09-15 11:08:49', '2025-10-09 09:13:32'),
(4, 5, 'liquidaciones/sueno-y-relajacion_1759982466.webp', 4, '2025-10-08 23:01:06', '2025-10-09 09:13:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pedido_id` bigint(20) UNSIGNED NOT NULL,
  `culqi_charge_id` varchar(255) DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL,
  `moneda` varchar(3) DEFAULT 'PEN',
  `metodo_pago` enum('tarjeta','yape') DEFAULT 'tarjeta',
  `estado_pago` enum('pendiente','pendiente_yape','aprobado','fallido') DEFAULT 'pendiente',
  `respuesta_culqi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`respuesta_culqi`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `pedido_id`, `culqi_charge_id`, `monto`, `moneda`, `metodo_pago`, `estado_pago`, `respuesta_culqi`, `created_at`, `updated_at`) VALUES
(2, 2, 'chr_test_lOZIuxdW4qmUqnKr', 109.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_lOZIuxdW4qmUqnKr\",\"creation_date\":1758829893531,\"amount\":10900,\"amount_refunded\":0,\"current_amount\":10900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"prueba@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_Iaz3TuKQEe6wiqi8\",\"type\":\"card\",\"creation_date\":1758829892459,\"email\":\"prueba@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.6.232\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1758829893531,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":247,\"net_amount\":10653,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":129}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-09-25 14:51:31', '2025-09-25 14:51:35'),
(3, 3, 'chr_test_G2OuhVNRJJEHEhtw', 97.50, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_G2OuhVNRJJEHEhtw\",\"creation_date\":1758829990195,\"amount\":9750,\"amount_refunded\":0,\"current_amount\":9750,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"prueba@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_fErzBGkuPUOAhIwF\",\"type\":\"card\",\"creation_date\":1758829989250,\"email\":\"prueba@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.6.232\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1758829990195,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":234,\"net_amount\":9516,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":116}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-09-25 14:53:08', '2025-09-25 14:53:11'),
(4, 4, 'chr_test_o7ZsR6oR47KHqcBh', 84.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_o7ZsR6oR47KHqcBh\",\"creation_date\":1758830051022,\"amount\":8400,\"amount_refunded\":0,\"current_amount\":8400,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"prueba@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_eapiC3Yjjx5z9yWY\",\"type\":\"card\",\"creation_date\":1758830050026,\"email\":\"prueba@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1758830051022,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":217,\"net_amount\":8183,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":99}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-09-25 14:54:09', '2025-09-25 14:54:12'),
(5, 5, 'chr_test_GT5HGoVHIS2mNSQI', 109.50, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_GT5HGoVHIS2mNSQI\",\"creation_date\":1758830114787,\"amount\":10950,\"amount_refunded\":0,\"current_amount\":10950,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"prueba@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_I6n2xQcYMlCVfqkL\",\"type\":\"card\",\"creation_date\":1758830113922,\"email\":\"prueba@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1758830114787,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":248,\"net_amount\":10702,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":130}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-09-25 14:55:13', '2025-09-25 14:55:15'),
(8, 8, NULL, 158.50, 'PEN', 'tarjeta', 'fallido', '{\"error\":\"Su tarjeta no tiene fondos suficientes. Para realizar la compra, verifica tus fondos disponibles con el banco emisor o int\\u00e9nta nuevamente con otra tarjeta.\"}', '2025-09-30 12:20:50', '2025-09-30 12:20:53'),
(9, 9, NULL, 158.50, 'PEN', 'tarjeta', 'fallido', '{\"error\":\"CVV incorrecto, verifica la informaci\\u00f3n ingresada.\"}', '2025-09-30 12:21:30', '2025-09-30 12:21:33'),
(10, 10, NULL, 158.50, 'PEN', 'tarjeta', 'fallido', '{\"error\":\"La compra no ha podido ser procesada. Cont\\u00e1cte con la entidad emisora de su tarjeta.\"}', '2025-09-30 12:22:13', '2025-09-30 12:22:14'),
(11, 11, 'chr_test_9WkCa66Pvx80ymd2', 390.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_9WkCa66Pvx80ymd2\",\"creation_date\":1759426129104,\"amount\":39000,\"amount_refunded\":0,\"current_amount\":39000,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_SCEDe28mHduIJa87\",\"type\":\"card\",\"creation_date\":1759426128236,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759426129104,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":578,\"net_amount\":38422,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":460}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-02 12:28:47', '2025-10-02 12:28:52'),
(16, 16, NULL, 109.00, 'PEN', 'tarjeta', 'fallido', '{\"error\":\"La compra no ha podido ser procesada. Cont\\u00e1cte con la entidad emisora de su tarjeta.\"}', '2025-10-02 12:34:24', '2025-10-02 12:34:28'),
(17, 17, NULL, 109.00, 'PEN', 'tarjeta', 'fallido', '{\"error\":\"La compra no ha podido ser procesada. Cont\\u00e1cte con la entidad emisora de su tarjeta.\"}', '2025-10-02 12:35:02', '2025-10-02 12:35:06'),
(18, 18, NULL, 109.00, 'PEN', 'tarjeta', 'fallido', '{\"error\":\"El usuario necesita autenticarse\"}', '2025-10-02 12:36:06', '2025-10-02 12:36:09'),
(19, 19, NULL, 109.00, 'PEN', 'tarjeta', 'fallido', '{\"error\":\"La compra no ha podido ser procesada. Cont\\u00e1cte con la entidad emisora de su tarjeta.\"}', '2025-10-02 12:36:43', '2025-10-02 12:36:46'),
(20, 20, 'chr_test_CBLmvlyDL7oxfiCn', 208.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_CBLmvlyDL7oxfiCn\",\"creation_date\":1759435496699,\"amount\":20800,\"amount_refunded\":0,\"current_amount\":20800,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_Haw1LaLUNWudxARq\",\"type\":\"card\",\"creation_date\":1759435495741,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759435496699,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":363,\"net_amount\":20437,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":245}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-02 15:04:55', '2025-10-02 15:04:59'),
(27, 27, 'chr_test_UHbOD2sbvvzUheTw', 194.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_UHbOD2sbvvzUheTw\",\"creation_date\":1759437767610,\"amount\":19400,\"amount_refunded\":0,\"current_amount\":19400,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_PQPcpBc2MxyL0grP\",\"type\":\"card\",\"creation_date\":1759437766815,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.6.232\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759437767610,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":347,\"net_amount\":19053,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":229}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-02 15:42:46', '2025-10-02 15:42:48'),
(36, 36, 'chr_test_gAJEiyV80fHPW3ww', 159.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_gAJEiyV80fHPW3ww\",\"creation_date\":1759438988227,\"amount\":15900,\"amount_refunded\":0,\"current_amount\":15900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_9i5Vh1SdNC1HII9y\",\"type\":\"card\",\"creation_date\":1759438987558,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.6.232\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759438988227,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":306,\"net_amount\":15594,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":188}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-02 16:03:07', '2025-10-02 16:03:11'),
(37, 37, 'chr_test_xzOh9gTJmbrOXKZf', 99.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_xzOh9gTJmbrOXKZf\",\"creation_date\":1759439043996,\"amount\":9900,\"amount_refunded\":0,\"current_amount\":9900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_J4vER11XQ1DgQ8iF\",\"type\":\"card\",\"creation_date\":1759439043140,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759439043996,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":235,\"net_amount\":9665,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":117}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-02 16:04:02', '2025-10-02 16:04:06'),
(38, 38, 'chr_test_uuuOTt0twgdf0xG0', 417.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_uuuOTt0twgdf0xG0\",\"creation_date\":1759439594386,\"amount\":41700,\"amount_refunded\":0,\"current_amount\":41700,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_FjwMQuWE7fuvC1U5\",\"type\":\"card\",\"creation_date\":1759439593416,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759439594386,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":610,\"net_amount\":41090,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":492}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-02 16:13:12', '2025-10-02 16:13:17'),
(41, 41, 'chr_test_ZrXpKG39gT0siFY5', 256.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_ZrXpKG39gT0siFY5\",\"creation_date\":1759441795105,\"amount\":25600,\"amount_refunded\":0,\"current_amount\":25600,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_75tRrU6OkZK3mIg6\",\"type\":\"card\",\"creation_date\":1759441794181,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759441795105,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":420,\"net_amount\":25180,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":302}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-02 16:49:53', '2025-10-02 16:49:57'),
(42, 42, 'chr_test_7CSOuBihbXFQ9DOV', 99.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_7CSOuBihbXFQ9DOV\",\"creation_date\":1759501641288,\"amount\":9900,\"amount_refunded\":0,\"current_amount\":9900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_7mvGdXzEWJi1Mopx\",\"type\":\"card\",\"creation_date\":1759501640287,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.6.232\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759501641288,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":235,\"net_amount\":9665,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":117}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:27:19', '2025-10-03 09:27:22'),
(43, 43, 'chr_test_sAceBSyDwdeX9rVd', 159.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_sAceBSyDwdeX9rVd\",\"creation_date\":1759501724487,\"amount\":15900,\"amount_refunded\":0,\"current_amount\":15900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_05ncwJIby9Uj00DC\",\"type\":\"card\",\"creation_date\":1759501723443,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.6.232\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759501724487,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":306,\"net_amount\":15594,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":188}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:28:42', '2025-10-03 09:28:45'),
(48, 48, 'chr_test_7CyP6GYFU15iyiLm', 99.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_7CyP6GYFU15iyiLm\",\"creation_date\":1759501988303,\"amount\":9900,\"amount_refunded\":0,\"current_amount\":9900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_e1ayW8oPp7CTvcMi\",\"type\":\"card\",\"creation_date\":1759501987268,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.6.232\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759501988303,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":235,\"net_amount\":9665,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":117}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:33:06', '2025-10-03 09:33:09'),
(49, 49, 'chr_test_FULXsQQDU5welfrQ', 97.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_FULXsQQDU5welfrQ\",\"creation_date\":1759502055062,\"amount\":9700,\"amount_refunded\":0,\"current_amount\":9700,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_jc6DA4zthqL9h9DS\",\"type\":\"card\",\"creation_date\":1759502054270,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759502055062,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":232,\"net_amount\":9468,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":114}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:34:13', '2025-10-03 09:34:15'),
(50, 50, 'chr_test_xiAQHDAYjxeQfVJC', 99.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_xiAQHDAYjxeQfVJC\",\"creation_date\":1759502319395,\"amount\":9900,\"amount_refunded\":0,\"current_amount\":9900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_s005DwW2oV9vtNno\",\"type\":\"card\",\"creation_date\":1759502318474,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759502319395,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":235,\"net_amount\":9665,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":117}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:38:37', '2025-10-03 09:38:40'),
(51, 51, 'chr_test_FIswfXBsAdr9tFp2', 99.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_FIswfXBsAdr9tFp2\",\"creation_date\":1759502901326,\"amount\":9900,\"amount_refunded\":0,\"current_amount\":9900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_TCZW5bSndok5chOJ\",\"type\":\"card\",\"creation_date\":1759502900356,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759502901326,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":235,\"net_amount\":9665,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":117}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:48:19', '2025-10-03 09:48:22'),
(52, 52, 'chr_test_yVu3WBSxarPMVFQc', 99.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_yVu3WBSxarPMVFQc\",\"creation_date\":1759502955876,\"amount\":9900,\"amount_refunded\":0,\"current_amount\":9900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_kt195JUSC8GTMlgX\",\"type\":\"card\",\"creation_date\":1759502955014,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759502955876,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":235,\"net_amount\":9665,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":117}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:49:14', '2025-10-03 09:49:16'),
(54, 54, 'chr_test_DvcdO5A4AmUikR1R', 99.00, 'PEN', 'tarjeta', 'aprobado', '{\"object\":\"charge\",\"id\":\"chr_test_DvcdO5A4AmUikR1R\",\"creation_date\":1759503046125,\"amount\":9900,\"amount_refunded\":0,\"current_amount\":9900,\"installments\":0,\"installments_amount\":0,\"currency_code\":\"PEN\",\"email\":\"peruvianecom@gmail.com\",\"description\":\"Pedido #\",\"source\":{\"object\":\"token\",\"id\":\"tkn_test_DekW2UQFLlbY0YWV\",\"type\":\"card\",\"creation_date\":1759503045132,\"email\":\"peruvianecom@gmail.com\",\"card_number\":\"411111******1111\",\"last_four\":\"1111\",\"active\":true,\"iin\":{\"bin\":\"411111\",\"issuer\":{\"name\":\"Bank of Fiction\",\"country\":\"United States\",\"website\":\"https:\\/\\/www.rivervalleycu.org\",\"country_code\":\"US\",\"phone_number\":\"+ (1) 937-859-6260\"},\"object\":\"iin\",\"card_type\":\"Debito\",\"card_brand\":\"Visa\",\"card_category\":\"Gold\",\"installments_allowed\":[3,6,12]},\"client\":{\"ip\":\"10.230.0.166\",\"browser\":\"Unknown\",\"ip_country\":\"Peru\",\"device_type\":\"escritorio\",\"ip_country_code\":\"PE\",\"device_fingerprint\":null},\"metadata\":null},\"outcome\":{\"type\":\"venta_exitosa\",\"code\":\"AUT0000\",\"merchant_message\":\"La operaci\\u00f3n de venta ha sido autorizada exitosamente\",\"user_message\":\"Su compra ha sido exitosa.\"},\"fraud_score\":0.5,\"antifraud_details\":{\"object\":\"client\",\"country_code\":null,\"first_name\":\"first_last_name\",\"last_name\":\"first_last_name\",\"address_city\":null,\"address\":null,\"phone\":null},\"dispute\":false,\"capture\":null,\"partial\":null,\"capture_date\":1759503046125,\"reference_code\":\"700000038176\",\"authorization_code\":\"046126\",\"duplicated\":false,\"metadata\":[],\"total_fee\":235,\"net_amount\":9665,\"fee_details\":{\"fixed_fee\":{\"amount\":100,\"currency_code\":\"PEN\",\"exchange_rate\":1,\"exchange_rate_currency_code\":\"PEN\",\"total\":118},\"variable_fee\":{\"currency_code\":\"PEN\",\"commission\":100,\"total\":117}},\"total_fee_taxes\":0,\"transfer_amount\":0,\"paid\":false,\"statement_descriptor\":\"PERUVIANECOM SAC\",\"transfer_id\":null}', '2025-10-03 09:50:44', '2025-10-03 09:50:47'),
(55, 55, 'ord_live_2aV8ftmjXZy2q8ir', 6.00, 'PEN', 'yape', 'aprobado', '{\"object\":\"order\",\"id\":\"ord_live_2aV8ftmjXZy2q8ir\",\"amount\":600,\"payment_code\":\"310971372\",\"currency_code\":\"PEN\",\"description\":\"Pedido para jose belleza\",\"order_number\":\"ORD-1759857681-69\",\"state\":\"paid\",\"total_fee\":350,\"net_amount\":250,\"fee_details\":{\"fixedFee\":{\"amount\":600,\"currencyCode\":\"PEN\",\"exchangeRate\":1,\"exchangeRateCurrencyCode\":\"PEN\",\"total\":0},\"variableFee\":{\"commission\":350,\"currencyCode\":\"PEN\",\"total\":350}},\"creation_date\":1759857682,\"expiration_date\":1759858581,\"updated_at\":1759857785,\"paid_at\":1759857785,\"available_on\":null,\"metadata\":{\"dni\":\"72748723\",\"cliente_id\":\"69\",\"telefono\":\"987812123\",\"direccion_envio\":\"av aaaaaaaaaaaaaaaaaa2\",\"departamento\":\"LIMA\",\"provincia\":\"LIMA\",\"distrito\":\"LIMA\",\"productos_ids\":\"10\",\"productos_cant\":\"1\"},\"qr\":\"https:\\/\\/codigoqr.pagoefectivolatam.com\\/C74C6910-3FDA-46AE-B35E-5642982EAE1E.png\",\"cuotealo\":null,\"url_pe\":\"https:\\/\\/payment.pagoefectivo.pe\\/C74C6910-3FDA-46AE-B35E-5642982EAE1E.html\"}', '2025-10-07 12:23:21', '2025-10-07 12:23:21'),
(56, 56, 'ord_live_KiRfrHq51gd7VT1g', 6.00, 'PEN', 'yape', 'aprobado', '{\"object\":\"order\",\"id\":\"ord_live_KiRfrHq51gd7VT1g\",\"amount\":600,\"payment_code\":\"311025640\",\"currency_code\":\"PEN\",\"description\":\"Pedido para Jose Belleza\",\"order_number\":\"ORD-1759876456-70\",\"state\":\"paid\",\"total_fee\":350,\"net_amount\":250,\"fee_details\":{\"fixedFee\":{\"amount\":600,\"currencyCode\":\"PEN\",\"exchangeRate\":1,\"exchangeRateCurrencyCode\":\"PEN\",\"total\":0},\"variableFee\":{\"commission\":350,\"currencyCode\":\"PEN\",\"total\":350}},\"creation_date\":1759876457,\"expiration_date\":1759877356,\"updated_at\":1759876547,\"paid_at\":1759876547,\"available_on\":null,\"metadata\":{\"dni\":\"72737483\",\"cliente_id\":\"70\",\"telefono\":\"989629340\",\"direccion_envio\":\"av aaaaaaaaaaaaaaaaaaaaaaa12\",\"departamento\":\"LIMA\",\"provincia\":\"LIMA\",\"distrito\":\"CARABAYLLO\",\"productos_ids\":\"10\",\"productos_cant\":\"1\"},\"qr\":\"https:\\/\\/codigoqr.pagoefectivolatam.com\\/D302F870-FD98-44B4-ADE0-549323E4AA98.png\",\"cuotealo\":null,\"url_pe\":\"https:\\/\\/payment.pagoefectivo.pe\\/D302F870-FD98-44B4-ADE0-549323E4AA98.html\"}', '2025-10-07 17:35:51', '2025-10-07 17:35:51'),
(57, 57, 'ord_live_mQDtNOUr69nxgKcM', 6.00, 'PEN', 'yape', 'aprobado', '{\"object\":\"order\",\"id\":\"ord_live_mQDtNOUr69nxgKcM\",\"amount\":600,\"payment_code\":\"311316816\",\"currency_code\":\"PEN\",\"description\":\"Pedido para Luiggi Vargas\",\"order_number\":\"ORD-1760025788-71\",\"state\":\"paid\",\"total_fee\":350,\"net_amount\":250,\"fee_details\":{\"fixedFee\":{\"amount\":600,\"currencyCode\":\"PEN\",\"exchangeRate\":1,\"exchangeRateCurrencyCode\":\"PEN\",\"total\":0},\"variableFee\":{\"commission\":350,\"currencyCode\":\"PEN\",\"total\":350}},\"creation_date\":1760025789,\"expiration_date\":1760026688,\"updated_at\":1760025894,\"paid_at\":1760025894,\"available_on\":null,\"metadata\":{\"dni\":\"46423891\",\"cliente_id\":\"71\",\"telefono\":\"918604153\",\"direccion_envio\":\"stiglich 2093\",\"departamento\":\"LIMA\",\"provincia\":\"LIMA\",\"distrito\":\"LIMA\",\"productos_ids\":\"10\",\"productos_cant\":\"1\"},\"qr\":\"https:\\/\\/codigoqr.pagoefectivolatam.com\\/A9D5694A-BFBE-4BC3-B32F-B8E20556541F.png\",\"cuotealo\":null,\"url_pe\":\"https:\\/\\/payment.pagoefectivo.pe\\/A9D5694A-BFBE-4BC3-B32F-B8E20556541F.html\"}', '2025-10-09 11:05:02', '2025-10-09 11:05:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_codes`
--

CREATE TABLE `password_reset_codes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `total` float(10,2) NOT NULL,
  `direccion_envio` text NOT NULL,
  `departamento` varchar(100) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `distrito` varchar(100) DEFAULT NULL,
  `estado_pedido` enum('pendiente','pagado','cancelado','enviado') DEFAULT 'pendiente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `cliente_id`, `total`, `direccion_envio`, `departamento`, `provincia`, `distrito`, `estado_pedido`, `created_at`, `updated_at`) VALUES
(2, 2, 109.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-09-25 14:51:31', '2025-09-25 14:51:35'),
(3, 3, 97.50, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-09-25 14:53:08', '2025-09-25 14:53:11'),
(4, 3, 84.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-09-25 14:54:09', '2025-09-25 14:54:12'),
(5, 3, 109.50, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-09-25 14:55:13', '2025-09-25 14:55:15'),
(8, 6, 158.50, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pendiente', '2025-09-30 12:20:50', '2025-09-30 12:20:50'),
(9, 6, 158.50, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pendiente', '2025-09-30 12:21:30', '2025-09-30 12:21:30'),
(10, 6, 158.50, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pendiente', '2025-09-30 12:22:13', '2025-09-30 12:22:13'),
(11, 7, 390.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-02 12:28:47', '2025-10-02 12:28:52'),
(16, 12, 109.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pendiente', '2025-10-02 12:34:24', '2025-10-02 12:34:24'),
(17, 12, 109.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pendiente', '2025-10-02 12:35:02', '2025-10-02 12:35:02'),
(18, 7, 109.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pendiente', '2025-10-02 12:36:06', '2025-10-02 12:36:06'),
(19, 7, 109.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pendiente', '2025-10-02 12:36:43', '2025-10-02 12:36:43'),
(20, 13, 208.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-02 15:04:55', '2025-10-02 15:04:59'),
(27, 20, 194.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-02 15:42:46', '2025-10-02 15:42:48'),
(36, 29, 159.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-02 16:03:07', '2025-10-02 16:03:11'),
(37, 30, 99.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-02 16:04:02', '2025-10-02 16:04:06'),
(38, 31, 417.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-02 16:13:12', '2025-10-02 16:13:17'),
(41, 34, 256.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-02 16:49:53', '2025-10-02 16:49:57'),
(42, 35, 99.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:27:19', '2025-10-03 09:27:22'),
(43, 37, 159.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:28:42', '2025-10-03 09:28:45'),
(48, 42, 99.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:33:06', '2025-10-03 09:33:09'),
(49, 43, 97.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:34:13', '2025-10-03 09:34:15'),
(50, 12, 99.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:38:37', '2025-10-03 09:38:40'),
(51, 35, 99.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:48:19', '2025-10-03 09:48:22'),
(52, 44, 99.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:49:14', '2025-10-03 09:49:16'),
(54, 44, 99.00, 'Ingrese su dirección de envío', NULL, NULL, NULL, 'pagado', '2025-10-03 09:50:44', '2025-10-03 09:50:47'),
(55, 69, 6.00, 'av aaaaaaaaaaaaaaaaaa2', 'LIMA', 'LIMA', 'LIMA', 'pagado', '2025-10-07 12:23:21', '2025-10-07 12:23:21'),
(56, 70, 6.00, 'av aaaaaaaaaaaaaaaaaaaaaaa12', 'LIMA', 'LIMA', 'CARABAYLLO', 'pagado', '2025-10-07 17:35:51', '2025-10-07 17:35:51'),
(57, 71, 6.00, 'stiglich 2093', 'LIMA', 'LIMA', 'LIMA', 'pagado', '2025-10-09 11:05:02', '2025-10-09 11:05:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(176, 'App\\Models\\User', 1, 'admin-token', 'c2770afb188d65391b909077779aa470253de15cf755531b268018d8f1f71b0c', '[\"*\"]', '2025-10-17 12:52:13', '2025-10-17 20:52:08', '2025-10-17 12:52:08', '2025-10-17 12:52:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `categoria_id` bigint(20) UNSIGNED DEFAULT NULL,
  `proveedor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `precio_despues` decimal(10,2) DEFAULT NULL,
  `descuento` float DEFAULT 0 COMMENT 'Porcentaje de descuento (0-100)',
  `beneficios` text DEFAULT NULL,
  `modo_uso` text DEFAULT NULL,
  `detalle` text DEFAULT NULL,
  `faq_quienes_toman` text DEFAULT NULL,
  `faq_por_que_elegir` text DEFAULT NULL,
  `faq_tiempo_uso` text DEFAULT NULL,
  `faq_efectos_secundarios` text DEFAULT NULL,
  `faq_consumo_alcohol` text DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tienda_id` int(11) DEFAULT NULL,
  `etiqueta_id` bigint(20) UNSIGNED DEFAULT NULL,
  `es_pack` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `sku`, `descripcion`, `categoria_id`, `proveedor_id`, `precio`, `precio_despues`, `descuento`, `beneficios`, `modo_uso`, `detalle`, `faq_quienes_toman`, `faq_por_que_elegir`, `faq_tiempo_uso`, `faq_efectos_secundarios`, `faq_consumo_alcohol`, `stock`, `estado`, `created_at`, `updated_at`, `tienda_id`, `etiqueta_id`, `es_pack`) VALUES
(5, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL', 'AC-ORG-373', '¡Defensas fuertes y digestión ligera! Este aceite es un potenteantibiótico natural que combate virus, bacterias y hongos. Además, mejora la digestión y alivia malestares respiratorios. Cápsulas concentradas, naturales y sin aditivos.', 12, NULL, 125.00, 97.00, 22.5, 'Refuerza las defensas, combate virus y bacterias, mejora la digestión y alivia dolores inflamatorios.', 'Consumir entre 4 a 5 gotas sublinguales o diluidas con agua en ayunas.', 'Extracto concentrado de las hojas de orégano. Se utiliza como antibiótico natural para combatir infecciones respiratorias, digestivas y cutáneas. Ayuda a eliminar bacterias, hongos y virus, al mismo tiempo que fortalece el sistema inmune. Cápsulas de alta pureza, sin químicos añadidos.', NULL, NULL, NULL, NULL, NULL, 2, 'activo', '2025-09-13 13:07:46', '2025-10-06 09:16:53', 8, NULL, 0),
(6, 'ACEITE DE ROMERO 30 ML 100% NATURAL', 'AC-RMR-375', '¡Cabello fuerte, mente activa! Estimula el crecimiento capilar, combate la caída y mejora la circulación del cuero cabelludo. Además, favorece la concentración y alivia dolores musculares. 100% natural, de uso tópico, ideal para rutinas de cuidado personal.', 12, NULL, 109.00, 99.00, 9.17, 'Estimula el crecimiento del cabello, mejora la circulación, alivia dolores musculares y favorece la concentración.', 'Se recomienda usar la cantidad necesaria para el cuero cabelludo, masajear unos minutos, hasta cubrir toda la zona. Dejar reposar entre 40 – 60 minutos y luego enjuagar (importante para evitar caspa).', 'Planta aromática originaria del Mediterráneo. Se usa comúnmente para estimular el crecimiento capilar y mejorar la circulación. Ayuda a fortalecer el cuero cabelludo, calmar dolores musculares y mejorar la concentración. De uso tópico, 100% natural.', NULL, NULL, NULL, NULL, NULL, 14, 'activo', '2025-09-13 13:09:52', '2025-10-06 09:16:38', 8, NULL, 0),
(7, 'CARTICOLÁGENO 350 GR', 'CAR-350-G', '¡Fuerza para tus articulaciones y firmeza para tu piel! Combina colágeno con cartílago para regenerar tejidos, aliviar molestias articulares y mejorar la elasticidad de la piel. Suplemento 2 en 1, ideal para adultos mayores, deportistas o personas con desgaste físico.', 11, NULL, 99.90, 60.00, 40, 'Alivia dolores articulares, mejora la elasticidad de la piel, regenera tejidos y fortalece el cuerpo.', 'Consumir una o dos veces al día con agua, jugo de naranja o bebida favorita.', 'Combinación de colágeno hidrolizado y cartílago de tiburón. Se emplea para proteger articulaciones, piel y huesos. Favorece la regeneración del tejido conectivo, mejora la elasticidad y alivia molestias articulares. Suplemento natural y de acción integral.', NULL, NULL, NULL, NULL, NULL, 15, 'inactivo', '2025-09-13 13:12:29', '2025-10-02 14:31:00', 8, NULL, 0),
(9, 'MORINGA 60 CAPS NATURAL', 'MO-60-CA-NAT', '¡Energía, defensas y bienestar en una sola cápsula! Planta milenaria rica en antioxidantes, vitaminas y minerales. Regula el azúcar en sangre, reduce la inflamación y fortalece el sistema inmunológico. 100% natural, vegana y de amplio beneficio.', 11, NULL, 109.00, 99.00, 9.17, 'Aumenta la energía, regula el azúcar, refuerza el sistema inmune y reduce la inflamación.', 'Consumir dos cápsulas 3 veces al día (desayuno, almuerzo y cena), después de cada comida.', 'Árbol que crece en regiones tropicales como Asia, África y América Latina. Se usa como multivitamínico natural. Ayuda a controlar los niveles de azúcar, reducir inflamaciones y fortalecer el sistema inmune. Rica en antioxidantes, proteínas y minerales. Cápsulas 100% veganas.', NULL, NULL, NULL, NULL, NULL, 15, 'inactivo', '2025-09-15 09:36:55', '2025-10-02 14:31:11', 8, NULL, 0),
(10, 'CARTÍLAGO DE TIBURÓN 60 CAPS NATURAL', 'CAR-TIB-60-CAT', '¡Dile adiós al dolor articular! Rico en calcio y colágeno, ayuda a regenerar tejidos, reducir inflamación y mejorar la movilidad. Ideal para personas con artritis, lesiones o desgaste óseo. Cápsulas naturales, seguras y efectivas.', 11, NULL, 6.00, 6.00, 0, 'Regenera articulaciones, reduce inflamación, fortalece huesos y mejora la movilidad.', 'Consumir una cápsula después de cada comida (desayuno, almuerzo, cena).', 'Extraído de las aletas del tiburón. Se utiliza frecuentemente para aliviar dolores articulares y fortalecer huesos. Ayuda a regenerar tejidos, disminuir la inflamación y mejorar la movilidad. Ideal en casos de artritis, desgaste o lesiones.', NULL, NULL, NULL, NULL, NULL, 12, 'activo', '2025-09-15 09:38:06', '2025-10-09 11:05:02', 8, NULL, 0),
(11, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES', 'GM-CHZ-370', '¡Regenera desde adentro!. El colageno hidrolizado fortalece huesos, articulaciones, piel, cabello y uñas. Su fórmula facilita la absorción para resultados visibles y duraderos. Ideal para quienes buscan juventud,movilidad y firmeza.Cápsulas 100% naturales y fáciles de tomar', 14, NULL, 109.00, 99.00, 9.17, 'Fortalece articulaciones, mejora la elasticidad de la piel, refuerza uñas y cabello, y ayuda a prevenir el envejecimiento prematuro.', 'Consumir dos gomitas todos los días después del almuerzo.', 'Proteína que se encuentra de forma natural en la piel, huesos y articulaciones. Se utiliza comúnmente para mejorar la elasticidad de la piel y reforzar las articulaciones. Ayuda a regenerar tejidos, fortalecer uñas y cabello, y prevenir el envejecimiento prematuro. Su forma hidrolizada permite una mejor absorción', NULL, NULL, NULL, NULL, NULL, 8, 'activo', '2025-09-15 09:40:20', '2025-10-06 09:13:52', 2, NULL, 0),
(12, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES', 'GM-OMG-369', '¡Nutre tu cerebro, corazón y hormonas! Este trío de ácidos grasos esenciales apoya el sistema cardiovascular, mejora la memoria y reduce la inflamación. También equilibra las hormonas y refuerza el sistema inmune. Cápsulas puras, sin aditivos y aptas para veganos.', 14, NULL, 109.00, 99.00, 9.17, 'Protege el corazón, mejora la memoria, equilibra hormonas y reduce la inflamación.', 'Consumir dos gomitas todos los días después del almuerzo.', 'Ácidos grasos esenciales presentes en semillas, pescados y aceites vegetales. Se usan para proteger el sistema cardiovascular, mejorar la memoria y regular hormonas. Ayudan a reducir la inflamación, equilibrar el colesterol y fortalecer el sistema inmune. Suplemento clave para el bienestar general.', NULL, NULL, NULL, NULL, NULL, 11, 'activo', '2025-09-15 09:41:34', '2025-10-06 09:10:56', 2, NULL, 0),
(13, 'SLEEP GOMIX 60 GOMITAS NATURALES', 'GM-MLT-372', '¡Duerme profundo, despierta renovado! Gomitas naturales con melatonina y extractos relajantes que calman la mente y el cuerpo. Combate el insomnio, el estrés nocturno y mejora la calidad del sueño. Fórmula deliciosa, sin azúcar, ideal para una rutina de descanso saludable.', 14, NULL, 109.00, 97.00, 11.17, 'Ayuda a conciliar el sueño, reduce el insomnio, calma la mente y mejora la calidad del descanso.', 'Consumir una a dos gomitas, 30 minutos antes de ir a dormir.', 'Fórmula a base de melatonina y extractos naturales como manzanilla o valeriana. Se usa comúnmente para conciliar el sueño y relajar el sistema nervioso. Ayuda a regular el ritmo circadiano, combatir el insomnio y reducir el estrés nocturno. Gomitas fáciles de consumir y libres de azúcar.', NULL, NULL, NULL, NULL, NULL, 15, 'activo', '2025-09-15 09:42:47', '2025-10-06 09:14:53', 2, NULL, 0),
(15, 'CARTICAL D 60 CAPS NATURAL', 'CAR-D-60-CN', '¡Huesos y dientes más fuertes! Fórmula con calcio, vitamina D y minerales que favorecen la densidad ósea y el fortalecimiento dental. Perfecto para prevenir fracturas, osteoporosis y caída de dientes. Cápsulas fáciles de tomar y bien toleradas por el cuerpo.', 11, NULL, 109.00, 99.00, 9.17, 'Fortalece huesos y dientes, mejora la absorción de calcio, previene fracturas y alivia calambres.', 'Consumir dos cápsulas 3 veces al día (desayuno, almuerzo y cena), después de cada comida.', 'Suplemento con calcio, vitamina D y minerales esenciales. Se usa para prevenir el debilitamiento óseo y fortalecer los dientes. Ayuda a mejorar la absorción de calcio, proteger la estructura ósea y evitar fracturas. Recomendado para adultos mayores y personas con deficiencias minerales.', NULL, NULL, NULL, NULL, NULL, 15, 'inactivo', '2025-09-15 09:45:57', '2025-10-02 14:31:15', 8, NULL, 0),
(16, 'SILIMARINA 120 CÁPSULAS REGENERA Y PROTEGE TU HÍGADO DE FORMA NATURAL', 'SM-CMS-376', 'La silimarina es un extracto natural del cardo mariano, conocido por sus potentes propiedades hepatoprotectoras. Ayuda a regenerar las células del hígado, protegerlo de toxinas, mejorar la digestión de grasas y reducir la inflamación causada por el hígado graso, el consumo de alcohol o medicamentos.', 11, NULL, 120.00, 109.00, 9.17, 'Regenera las células hepáticas\nProtege el hígado de toxinas y alcohol\nFavorece la digestión de grasas\nAyuda a desinflamar el hígado graso', 'Dosis recomendada: 3 cápsulas después de cada comida\nConsejos para un mejor aprovechamiento\nBeber suficiente agua\nComplementar con dieta balanceada\nEvitar alcohol o comidas grasosas durante el tratamiento', 'La silimarina es un extracto natural del cardo mariano, conocido por sus potentes propiedades hepatoprotectoras. Ayuda a regenerar las células del hígado, protegerlo de toxinas, mejorar la digestión de grasas y reducir la inflamación causada por el hígado graso, el consumo de alcohol o medicamentos.', NULL, NULL, NULL, NULL, NULL, 182, 'activo', '2025-09-25 09:37:50', '2025-10-17 10:42:58', 8, 1, 0),
(17, 'PACK VIDA BALANCEADA', 'OM-369-AO', 'Este pack combina ácidos grasos esenciales con un antibiótico natural, \r\nideal para proteger tu corazón, fortalecer tu sistema inmune y apoyar la salud cerebral \r\ny digestiva de forma integral y natural.', 14, NULL, 198.00, 159.00, 19.8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12, 'activo', '2025-09-30 11:57:22', '2025-10-09 20:08:16', 2, NULL, 1),
(18, 'PACK PERUVIANS', 'OM-CHS-381', 'Pack integral que apoya la regeneración celular, el equilibrio \r\nhormonal y un descanso profundo. Ideal para bienestar físico, mental y \r\nemocional.', 14, NULL, 289.00, 218.00, 24.5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 'activo', '2025-09-30 12:03:53', '2025-10-09 20:08:22', 2, NULL, 1),
(19, 'PACK ESENCIA VITAL', 'AC-O-MEP', 'Combina un potente antimicrobiano natural con tecnología de relajación muscular. Ayuda a fortalecer el sistema inmune y aliviar el estrés físico.', 12, NULL, 214.00, 124.00, 42, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 'activo', '2025-09-30 12:06:57', '2025-10-09 20:08:26', 8, NULL, 1),
(20, 'PACK DUO VITAL', 'AC-CH', 'Pack que combina inmunidad y regeneración. Fortalece articulaciones, mejora la piel y protege al cuerpo frente a virus y bacterias.', 12, NULL, 198.00, 159.00, 19.8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 'activo', '2025-09-30 12:26:56', '2025-10-09 20:08:28', 8, NULL, 1),
(21, 'PACK ENERGÍA VISIONARIA', 'SI-OMG-369', 'Este pack une los ácidos grasos esenciales con un potente protector \r\nhepático, logrando un apoyo completo para la salud cardiovascular, cerebral y \r\ndigestiva. Favorece la circulación, memoria y enfoque mental, mientras protege y \r\nregenera tu hígado de toxinas y grasas acumuladas.', 14, NULL, 208.00, 179.00, 13.9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 'activo', '2025-09-30 12:28:35', '2025-10-09 20:08:31', 2, NULL, 1),
(22, 'PACK RAÍCES SAGRADAS', 'SI-AOR-380', 'Este pack combina el poder depurativo de la silimarina con la acción \r\nantibacteriana y antifúngica del aceite de orégano. Juntos apoyan la salud digestiva y \r\nhepática, fortalecen el sistema inmune y ayudan a eliminar toxinas, bacterias y hongos \r\ndel organismo de forma natural.', 12, NULL, 208.00, 179.00, 13.9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 'activo', '2025-09-30 12:31:13', '2025-10-09 20:08:36', 8, NULL, 1),
(23, 'PACK EQUILIBRIO NATURAL', NULL, 'Este pack une el cuidado hepático con el soporte de piel, huesos y \r\narticulaciones. Favorece la regeneración celular, protege al hígado de toxinas y \r\nfortalece la estructura del cuerpo, ayudando a mantener firmeza, elasticidad y \r\nmovilidad de forma natural.', 14, NULL, 208.00, 179.00, 13.9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 15, 'activo', '2025-09-30 12:33:29', '2025-10-09 20:08:38', 8, NULL, 1),
(24, 'PACK NUTRIGLOW', 'OM-369-CH', 'Fórmula que une omegas y colágeno bioactivo, perfecta para \r\nfortalecer articulaciones, cuidar el corazón y mejorar la elasticidad de la piel \r\ndesde adentro.', 14, NULL, 198.00, 159.00, 19.7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 'activo', '2025-09-30 12:35:23', '2025-10-09 20:08:41', 2, NULL, 1),
(25, 'MELENA DE LEÓN 60 CAPS VEGANA NATURALES', 'ML-ASH-377', '¡Activa tu mente con claridad! Este hongo medicinal potencia la \r\nmemoria, la concentración y protege el sistema nervioso. Aliado ideal para \r\npersonas con fatiga mental, ansiedad o estrés. Cápsulas veganas, 100% \r\nnaturales, sin químicos.', 11, NULL, 125.00, 97.00, 22.5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 30, 'activo', '2025-10-02 15:49:36', '2025-10-06 09:18:04', 8, NULL, 0),
(26, 'GOMITAS DE KION NATURALES 60 UNDS', 'GM-GKN-371', '¡Energía y bienestar natural! Las gomitas de kion ayudan a mejorar la digestión, reducir la inflamación y fortalecer tus defensas. Su fórmula concentrada aporta vitalidad diaria y apoyo natural al organismo. Prácticas, deliciosas y fáciles de llevar a todas partes.', 14, NULL, 109.00, 99.00, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 300, 'activo', '2025-10-03 14:43:08', '2025-10-06 09:15:14', 2, NULL, 0),
(27, 'ACEITE DE AGUAJE 30 ML 100% NATURAL', 'AC-AGJ-374', 'Descubre el poder del aguaje, un fruto amazónico rico en vitaminas A, E y fitoestrógenos naturales que ayudan a mantener el equilibrio hormonal femenino. Su alta concentración de antioxidantes promueve una piel más firme y luminosa, además de fortalecer el cabello y las uñas.', 12, NULL, 159.00, 119.00, 25.16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 300, 'activo', '2025-10-03 16:17:50', '2025-10-06 12:38:38', 8, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_imagenes`
--

CREATE TABLE `producto_imagenes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `orden` int(11) NOT NULL DEFAULT 1,
  `es_principal` tinyint(1) NOT NULL DEFAULT 0,
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_imagenes`
--

INSERT INTO `producto_imagenes` (`id`, `producto_id`, `imagen`, `orden`, `es_principal`, `alt_text`, `created_at`, `updated_at`) VALUES
(39, 10, 'productos/10_cartilago_de_tiburon_60_caps_natural/cartilagotiburon_1759164046_68dab68e99469.png', 1, 1, 'CARTÍLAGO DE TIBURÓN 60 CAPS NATURAL - Imagen 1', '2025-09-29 11:40:46', '2025-09-29 11:40:46'),
(40, 7, 'productos/7_carticolageno_350_gr/carticolageno_1759164056_68dab6984e9e0.png', 1, 1, 'CARTICOLÁGENO 350 GR - Imagen 1', '2025-09-29 11:40:56', '2025-09-29 11:40:56'),
(41, 15, 'productos/15_cartical_d_60_caps_natural/carticald_1759164074_68dab6aab8faf.png', 1, 1, 'CARTICAL D 60 CAPS NATURAL - Imagen 1', '2025-09-29 11:41:14', '2025-09-29 11:41:14'),
(43, 9, 'productos/9_moringa_60_caps_natural/moringa_1759164106_68dab6ca47b67.png', 1, 1, 'MORINGA 60 CAPS NATURAL - Imagen 1', '2025-09-29 11:41:46', '2025-09-29 11:41:46'),
(105, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/omega_1759786797_68e4372da3dbf.png', 1, 1, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 1', '2025-10-06 16:39:57', '2025-10-06 16:39:57'),
(106, 13, 'productos/13_sleep_gomix_60_gomitas_naturales/sleep-gomix_1759786810_68e4373a5467c.png', 1, 1, 'SLEEP GOMIX 60 GOMITAS NATURALES - Imagen 1', '2025-10-06 16:40:10', '2025-10-06 16:40:10'),
(107, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/colageno_1759786821_68e437456f0b7.png', 1, 1, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 1', '2025-10-06 16:40:21', '2025-10-06 16:40:21'),
(108, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/silimarina-mesa-de-trabajo-1_1759786933_68e437b51bcbb.png', 1, 1, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 1', '2025-10-06 16:42:13', '2025-10-15 14:46:24'),
(109, 27, 'productos/27_aceite_de_aguaje_30_ml_100_natural/imagen-de-whatsapp-2025-10-02-a-las-143958-2173da84_1759848520_68e52848bb4e2.jpg', 1, 1, 'ACEITE DE AGUAJE 30 ML 100% NATURAL - Imagen 1', '2025-10-07 09:48:40', '2025-10-07 09:48:40'),
(111, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/romero-1_1759853165_68e53a6daee33.png', 1, 1, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 1', '2025-10-07 11:06:05', '2025-10-07 11:06:05'),
(126, 20, 'productos/20_pack_duo_vital/aceite-de-oregano-colageno_1759853454_68e53b8e22341.png', 1, 1, 'PACK DUO VITAL - Imagen 1', '2025-10-07 11:10:54', '2025-10-07 11:10:54'),
(128, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/aceite-de-oregano_1759865038_68e568ce1218a.png', 1, 1, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 1', '2025-10-07 14:23:58', '2025-10-07 14:23:58'),
(129, 26, 'productos/26_gomitas_de_kion_naturales_60_unds/aceite-de-romero_1759865680_68e56b50ac67b.png', 1, 1, 'GOMITAS DE KION NATURALES 60 UNDS - Imagen 1', '2025-10-07 14:34:40', '2025-10-07 14:34:40'),
(130, 24, 'productos/24_pack_nutriglow/omega-colageno-6_1759865700_68e56b644aef4.png', 1, 1, 'PACK NUTRIGLOW - Imagen 1', '2025-10-07 14:35:00', '2025-10-07 14:35:00'),
(131, 22, 'productos/22_pack_raices_sagradas/silimarina-aceite-de-oregano-1_1759865724_68e56b7c31b29.png', 1, 1, 'PACK RAÍCES SAGRADAS - Imagen 1', '2025-10-07 14:35:24', '2025-10-07 14:35:24'),
(132, 21, 'productos/21_pack_energia_visionaria/silimarina-omega-3-11zon_1759865740_68e56b8c3db22.png', 1, 1, 'PACK ENERGÍA VISIONARIA - Imagen 1', '2025-10-07 14:35:40', '2025-10-07 14:35:40'),
(133, 18, 'productos/18_pack_peruvians/omega-colageno-sleep-gomix-5_1759865754_68e56b9abecde.png', 1, 1, 'PACK PERUVIANS - Imagen 1', '2025-10-07 14:35:54', '2025-10-07 14:35:54'),
(134, 23, 'productos/23_pack_equilibrio_natural/silimarina-colageno-2_1759865807_68e56bcfbe78c.png', 1, 1, 'PACK EQUILIBRIO NATURAL - Imagen 1', '2025-10-07 14:36:47', '2025-10-07 14:36:47'),
(135, 25, 'productos/25_melena_de_leon_60_caps_vegana_naturales/ml_1759865917_68e56c3d49fb0.png', 1, 1, 'MELENA DE LEÓN 60 CAPS VEGANA NATURALES - Imagen 1', '2025-10-07 14:38:37', '2025-10-07 14:38:37'),
(136, 17, 'productos/17_pack_vida_balanceada/aceite-de-oregano-omega_1759865989_68e56c857db3a.png', 1, 1, 'PACK VIDA BALANCEADA - Imagen 1', '2025-10-07 14:39:49', '2025-10-07 14:39:49'),
(137, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-4-1-11zon_1759870596_68e57e84ed93f.webp', 2, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 2', '2025-10-07 15:56:36', '2025-10-15 14:46:24'),
(138, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-1-2-11-11zon_1759870663_68e57ec752ce5.webp', 3, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 3', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(139, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-5-2-2-11zon_1759870663_68e57ec753453.webp', 4, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 4', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(140, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-8-2-9-11zon_1759870663_68e57ec7537ea.webp', 5, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 5', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(141, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-9-2-7-11zon_1759870663_68e57ec753b75.webp', 6, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 6', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(142, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-10-1-10-11zon_1759870663_68e57ec7540d9.webp', 7, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 7', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(143, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-11-8-11zon_1759870663_68e57ec754579.webp', 8, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 8', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(144, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-12-1-6-11zon_1759870663_68e57ec754a63.webp', 9, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 9', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(145, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-13-5-11zon_1759870663_68e57ec754ff3.webp', 10, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 10', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(146, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-17-1-4-11zon_1759870663_68e57ec7554b4.webp', 11, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 11', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(147, 16, 'productos/16_silimarina_120_capsulas_regenera_y_protege_tu_higa/mesa-de-trabajo-18-3-11zon_1759870663_68e57ec7558c2.webp', 12, 0, 'SILIMARINA 120 CAPSULAS PROTECCIÓN NATURAL - Imagen 12', '2025-10-07 15:57:43', '2025-10-15 14:46:24'),
(148, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-2-10-11zon_1759870722_68e57f02309aa.webp', 2, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 2', '2025-10-07 15:58:42', '2025-10-07 15:58:42'),
(149, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-1-5-11zon_1759870738_68e57f12ce049.webp', 3, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 3', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(150, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-3-11-11zon_1759870738_68e57f12ce5e7.webp', 4, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 4', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(151, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-5-1-11zon_1759870738_68e57f12cea23.webp', 5, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 5', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(152, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-6-7-11zon_1759870738_68e57f12cef8d.webp', 6, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 6', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(153, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-7-9-11zon_1759870738_68e57f12cf48f.webp', 7, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 7', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(154, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-8-4-11zon_1759870738_68e57f12cf927.webp', 8, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 8', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(155, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-9-2-11zon_1759870738_68e57f12cfdad.webp', 9, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 9', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(156, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-10-8-11zon_1759870738_68e57f12d01f4.webp', 10, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 10', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(157, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-14-6-11zon_1759870738_68e57f12d0612.webp', 11, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 11', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(158, 12, 'productos/12_omega_3_6_y_9_60_gomitas_naturales/mesa-de-trabajo-17-3-11zon_1759870738_68e57f12d0aea.webp', 12, 0, 'OMEGA 3, 6 Y 9 60 GOMITAS NATURALES - Imagen 12', '2025-10-07 15:58:58', '2025-10-07 15:58:58'),
(159, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-4-2-1-11zon_1759870924_68e57fcc95e1e.webp', 2, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 2', '2025-10-07 16:02:04', '2025-10-07 16:02:04'),
(160, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-1-4-8-11zon_1759870939_68e57fdb39fe0.webp', 3, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 3', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(161, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-5-4-2-11zon_1759870939_68e57fdb3a581.webp', 4, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 4', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(162, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-6-3-11-11zon_1759870939_68e57fdb3a9f3.webp', 5, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 5', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(163, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-7-3-6-11zon_1759870939_68e57fdb3ae48.webp', 6, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 6', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(164, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-8-4-4-11zon_1759870939_68e57fdb3b2a6.webp', 7, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 7', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(165, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-9-3-9-11zon_1759870939_68e57fdb3b815.webp', 8, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 8', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(166, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-10-2-10-11zon_1759870939_68e57fdb3bcfa.webp', 9, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 9', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(167, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-13-2-7-11zon_1759870939_68e57fdb3c17e.webp', 10, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 10', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(168, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-16-1-5-11zon_1759870939_68e57fdb3c5b7.webp', 11, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 11', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(169, 6, 'productos/6_aceite_de_romero_30_ml_100_natural/mesa-de-trabajo-19-3-11zon_1759870939_68e57fdb3cab0.webp', 12, 0, 'ACEITE DE ROMERO 30 ML 100% NATURAL - Imagen 12', '2025-10-07 16:02:19', '2025-10-07 16:02:19'),
(170, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-2-2-6-11zon_1759870953_68e57fe9c3875.webp', 2, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 2', '2025-10-07 16:02:33', '2025-10-07 16:02:33'),
(171, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-1-3-5-11zon_1759870967_68e57ff7cef49.webp', 3, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 3', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(172, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-3-2-7-11zon_1759870967_68e57ff7cf6bf.webp', 4, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 4', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(173, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-4-1-8-11zon_1759870967_68e57ff7cfbdb.webp', 5, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 5', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(174, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-5-3-3-11zon_1759870967_68e57ff7d00df.webp', 6, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 6', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(175, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-6-2-4-11zon_1759870967_68e57ff7d05d5.webp', 7, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 7', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(176, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-7-2-1-11zon_1759870967_68e57ff7d0ae7.webp', 8, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 8', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(177, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-8-3-9-11zon_1759870967_68e57ff7d0f6e.webp', 9, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 9', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(178, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-13-1-10-11zon_1759870967_68e57ff7d1575.webp', 10, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 10', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(179, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-14-2-2-11zon_1759870967_68e57ff7d1a2f.webp', 11, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 11', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(180, 11, 'productos/11_colageno_hidrolizado_60_gomitas_naturales/mesa-de-trabajo-18-1-11-11zon_1759870967_68e57ff7d1f0b.webp', 12, 0, 'COLÁGENO HIDROLIZADO 60 GOMITAS NATURALES - Imagen 12', '2025-10-07 16:02:47', '2025-10-07 16:02:47'),
(181, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-2-1-11-11zon_1759870988_68e5800ccf603.webp', 2, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 2', '2025-10-07 16:03:08', '2025-10-07 16:03:08'),
(192, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-5-1-1-11zon_1759871111_68e58087723c6.webp', 3, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 3', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(193, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-1-1-2-11zon_1759871111_68e5808772ad0.webp', 4, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 4', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(194, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-3-1-10-11zon_1759871111_68e5808773052.webp', 5, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 5', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(195, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-6-1-4-11zon_1759871111_68e5808773478.webp', 6, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 6', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(196, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-7-1-5-11zon_1759871111_68e5808773955.webp', 7, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 7', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(197, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-8-1-3-11zon_1759871111_68e5808773e1a.webp', 8, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 8', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(198, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-9-1-7-11zon_1759871111_68e5808774314.webp', 9, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 9', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(199, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-12-8-11zon_1759871111_68e580877484c.webp', 10, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 10', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(200, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-14-1-6-11zon_1759871111_68e5808774cdc.webp', 11, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 11', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(201, 5, 'productos/5_aceite_de_oregano_30_ml_100_natural/mesa-de-trabajo-16-9-11zon_1759871111_68e580877510d.webp', 12, 0, 'ACEITE DE ORÉGANO 30 ML 100% NATURAL - Imagen 12', '2025-10-07 16:05:11', '2025-10-07 16:05:11'),
(202, 19, 'productos/19_pack_esencia_vital/masajeador-de-pies-aceite-de-oregano_1760463372_68ee8a0c3709a.png', 1, 1, 'PACK ESENCIA VITAL - Imagen 1', '2025-10-14 12:36:12', '2025-10-14 12:36:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamaciones`
--

CREATE TABLE `reclamaciones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tipo_documento` enum('dni','ce','pasaporte') NOT NULL,
  `numero_documento` varchar(12) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `email` varchar(150) NOT NULL,
  `direccion` text NOT NULL,
  `tipo_bien` enum('producto','servicio') NOT NULL,
  `descripcion_bien` text NOT NULL,
  `monto_reclamado` decimal(10,2) DEFAULT NULL,
  `fecha_incidente` date DEFAULT NULL,
  `tipo_reclamo` enum('reclamo','queja') NOT NULL,
  `detalle_reclamo` text NOT NULL,
  `pedido_concreto` text NOT NULL,
  `estado` enum('pendiente','en_proceso','resuelto') DEFAULT 'pendiente',
  `numero_reclamo` varchar(20) DEFAULT NULL COMMENT 'Número único de reclamo generado automáticamente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla para almacenar reclamos y quejas del libro de reclamaciones';

--
-- Disparadores `reclamaciones`
--
DELIMITER $$
CREATE TRIGGER `generar_numero_reclamo` BEFORE INSERT ON `reclamaciones` FOR EACH ROW BEGIN
    DECLARE nuevo_numero VARCHAR(20);
    DECLARE contador INT;
    
    -- Obtener el siguiente número secuencial del año actual
    SELECT COALESCE(MAX(CAST(SUBSTRING(numero_reclamo, 10) AS UNSIGNED)), 0) + 1 
    INTO contador
    FROM reclamaciones 
    WHERE YEAR(created_at) = YEAR(NOW()) 
    AND numero_reclamo IS NOT NULL;
    
    -- Generar el número con formato: LR-YYYY-NNNNNN (LR = Libro Reclamaciones)
    SET nuevo_numero = CONCAT('LR-', YEAR(NOW()), '-', LPAD(contador, 6, '0'));
    
    SET NEW.numero_reclamo = nuevo_numero;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id`, `nombre`) VALUES
(2, 'GOMUGOMIX'),
(8, 'SANATE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` enum('admin','cliente') NOT NULL DEFAULT 'cliente',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `tipo`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin@ecommerce.com', '$2y$12$LP19BZHw4RvvzDyOhRIBCOYvlTk7oN4uOIFe2.gf6X.IEa2/DjU3C', 'admin', NULL, '2025-08-16 17:54:43', '2025-08-16 17:54:43');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_carrusel_producto` (`producto_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categorias_parent` (`parent_id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_dni` (`dni`),
  ADD KEY `fk_clientes_users` (`user_id`);

--
-- Indices de la tabla `cyberwow_banners`
--
ALTER TABLE `cyberwow_banners`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cyberwow_banner_tienda`
--
ALTER TABLE `cyberwow_banner_tienda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banner_id` (`banner_id`),
  ADD KEY `tienda_id` (`tienda_id`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedido_items_pedido` (`pedido_id`),
  ADD KEY `fk_pedido_items_producto` (`producto_id`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `liquidaciones`
--
ALTER TABLE `liquidaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `liquidaciones_orden_unique` (`orden`),
  ADD KEY `liquidaciones_producto_id_foreign` (`producto_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pagos_pedido` (`pedido_id`);

--
-- Indices de la tabla `password_reset_codes`
--
ALTER TABLE `password_reset_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_reset_codes_email_code_used_index` (`email`,`code`,`used`),
  ADD KEY `password_reset_codes_expires_at_index` (`expires_at`),
  ADD KEY `password_reset_codes_email_index` (`email`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedidos_clientes` (`cliente_id`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_productos_categoria` (`categoria_id`),
  ADD KEY `fk_productos_proveedor` (`proveedor_id`),
  ADD KEY `fk_productos_tienda` (`tienda_id`),
  ADD KEY `fk_productos_etiqueta` (`etiqueta_id`);

--
-- Indices de la tabla `producto_imagenes`
--
ALTER TABLE `producto_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_imagenes_producto` (`producto_id`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reclamaciones`
--
ALTER TABLE `reclamaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_numero_reclamo` (`numero_reclamo`),
  ADD KEY `idx_numero_documento` (`numero_documento`),
  ADD KEY `idx_estado` (`estado`),
  ADD KEY `idx_tipo_reclamo` (`tipo_reclamo`),
  ADD KEY `idx_fecha_incidente` (`fecha_incidente`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `cyberwow_banners`
--
ALTER TABLE `cyberwow_banners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cyberwow_banner_tienda`
--
ALTER TABLE `cyberwow_banner_tienda`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `liquidaciones`
--
ALTER TABLE `liquidaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `password_reset_codes`
--
ALTER TABLE `password_reset_codes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `producto_imagenes`
--
ALTER TABLE `producto_imagenes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reclamaciones`
--
ALTER TABLE `reclamaciones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrusel`
--
ALTER TABLE `carrusel`
  ADD CONSTRAINT `fk_carrusel_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `fk_categorias_parent` FOREIGN KEY (`parent_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `fk_clientes_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `cyberwow_banner_tienda`
--
ALTER TABLE `cyberwow_banner_tienda`
  ADD CONSTRAINT `cyberwow_banner_tienda_ibfk_1` FOREIGN KEY (`banner_id`) REFERENCES `cyberwow_banners` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cyberwow_banner_tienda_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tienda` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `fk_pedido_items_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pedido_items_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `liquidaciones`
--
ALTER TABLE `liquidaciones`
  ADD CONSTRAINT `liquidaciones_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `fk_pagos_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_clientes` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_productos_etiqueta` FOREIGN KEY (`etiqueta_id`) REFERENCES `etiquetas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_productos_proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_productos_tienda` FOREIGN KEY (`tienda_id`) REFERENCES `tienda` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `producto_imagenes`
--
ALTER TABLE `producto_imagenes`
  ADD CONSTRAINT `fk_producto_imagenes_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

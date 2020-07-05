-- MariaDB dump 10.17  Distrib 10.5.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: bd_ramo
-- ------------------------------------------------------
-- Server version	10.5.4-MariaDB-1:10.5.4+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arquivos`
--

DROP TABLE IF EXISTS `arquivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arquivos` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `extensao_arquivo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_relacionado` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_relacionado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivos`
--

LOCK TABLES `arquivos` WRITE;
/*!40000 ALTER TABLE `arquivos` DISABLE KEYS */;
/*!40000 ALTER TABLE `arquivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caixas`
--

DROP TABLE IF EXISTS `caixas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caixas` (
  `nome_caixa_slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_caixa` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `porcentagem_orcamento` double(8,2) NOT NULL,
  `orcamento_atual` double(8,2) NOT NULL DEFAULT 0.00,
  `ativo` tinyint(4) NOT NULL DEFAULT 1,
  `emergencial_equipe` tinyint(4) NOT NULL DEFAULT 0,
  `id_relacionado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_relacionado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`nome_caixa_slug`),
  UNIQUE KEY `caixas_nome_caixa_unique` (`nome_caixa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caixas`
--

LOCK TABLES `caixas` WRITE;
/*!40000 ALTER TABLE `caixas` DISABLE KEYS */;
INSERT INTO `caixas` VALUES ('caixa-administrativo','Caixa Administrativo',10.00,0.00,1,0,NULL,NULL,'2020-07-03 02:31:00','2020-07-03 02:31:00'),('caixa-emergencial','Caixa Emergencial',5.00,0.00,1,0,NULL,NULL,'2020-07-03 02:31:00','2020-07-03 02:31:00'),('caixa-emergencial-rocketwolf','Caixa Emergencial RocketWolf',5.00,0.00,1,1,'rocketwolf','Equipe','2020-07-03 02:43:40','2020-07-03 02:43:40'),('caixa-emergencial-socialwolf','Caixa Emergencial SocialWolf',5.00,0.00,1,1,'socialwolf','Equipe','2020-07-03 02:43:04','2020-07-03 02:43:04'),('caixa-emergencial-wolfbotz','Caixa Emergencial WolfBotz',5.00,0.00,1,1,'wolfbotz','Equipe','2020-07-03 02:40:14','2020-07-03 02:40:14'),('caixa-emergencial-wolfbyte','Caixa Emergencial WolfByte',5.00,0.00,1,1,'wolfbyte','Equipe','2020-07-03 02:39:22','2020-07-03 02:39:22'),('caixa-emergencial-wolfpower','Caixa Emergencial WolfPower',5.00,0.00,1,1,'wolfpower','Equipe','2020-07-03 02:41:19','2020-07-03 02:41:19'),('caixa-rocketwolf','Caixa RocketWolf',20.00,0.00,1,0,'rocketwolf','Equipe','2020-07-03 02:43:40','2020-07-03 02:43:40'),('caixa-socialwolf','Caixa SocialWolf',15.00,0.00,1,0,'socialwolf','Equipe','2020-07-03 02:43:04','2020-07-03 02:43:04'),('caixa-wolfbotz','Caixa WolfBotz',45.00,0.00,1,0,'wolfbotz','Equipe','2020-07-03 02:40:14','2020-07-03 02:40:14'),('caixa-wolfbyte','Caixa WolfByte',5.00,0.00,1,0,'wolfbyte','Equipe','2020-07-03 02:39:22','2020-07-03 02:39:22'),('caixa-wolfpower','Caixa WolfPower',0.00,0.00,1,0,'wolfpower','Equipe','2020-07-03 02:41:19','2020-07-03 02:41:19');
/*!40000 ALTER TABLE `caixas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cursos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Administação'),(2,'Ciência da Computação'),(3,'Engenharia Ambiental'),(4,'Engenharia Civil'),(5,'Engenharia de Controle e Automação'),(6,'Engenharia de Produção'),(7,'Engenharia de Telecomunicações'),(8,'Engenharia Elétrica'),(9,'Engenharia Eletrônica'),(10,'Engenharia Mecânica'),(11,'Física'),(12,'LEANI');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doacoes_vaquinhas`
--

DROP TABLE IF EXISTS `doacoes_vaquinhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doacoes_vaquinhas` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula_membro_doador` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_vaquinha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` double(8,2) NOT NULL,
  `data` date NOT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `doacoes_vaquinhas_matricula_membro_doador_foreign` (`matricula_membro_doador`),
  KEY `doacoes_vaquinhas_nome_vaquinha_foreign` (`nome_vaquinha`),
  CONSTRAINT `doacoes_vaquinhas_matricula_membro_doador_foreign` FOREIGN KEY (`matricula_membro_doador`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE,
  CONSTRAINT `doacoes_vaquinhas_nome_vaquinha_foreign` FOREIGN KEY (`nome_vaquinha`) REFERENCES `vaquinhas` (`nome_vaquinha_slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doacoes_vaquinhas`
--

LOCK TABLES `doacoes_vaquinhas` WRITE;
/*!40000 ALTER TABLE `doacoes_vaquinhas` DISABLE KEYS */;
/*!40000 ALTER TABLE `doacoes_vaquinhas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipe_psis`
--

DROP TABLE IF EXISTS `equipe_psis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipe_psis` (
  `nome_equipe` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_psi` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `areas_vagas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`areas_vagas`)),
  KEY `equipe_psis_nome_equipe_foreign` (`nome_equipe`),
  KEY `equipe_psis_nome_psi_foreign` (`nome_psi`),
  CONSTRAINT `equipe_psis_nome_equipe_foreign` FOREIGN KEY (`nome_equipe`) REFERENCES `equipes` (`nome_equipe_slug`) ON UPDATE CASCADE,
  CONSTRAINT `equipe_psis_nome_psi_foreign` FOREIGN KEY (`nome_psi`) REFERENCES `psis` (`nome_psi_slug`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipe_psis`
--

LOCK TABLES `equipe_psis` WRITE;
/*!40000 ALTER TABLE `equipe_psis` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipe_psis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipes`
--

DROP TABLE IF EXISTS `equipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipes` (
  `nome_equipe_slug` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_equipe` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula_coordenador` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula_assessor` char(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capitulo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matriz_habilidades` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`matriz_habilidades`)),
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`nome_equipe_slug`),
  UNIQUE KEY `equipes_nome_equipe_unique` (`nome_equipe`),
  KEY `equipes_matricula_coordenador_foreign` (`matricula_coordenador`),
  KEY `equipes_matricula_assessor_foreign` (`matricula_assessor`),
  CONSTRAINT `equipes_matricula_assessor_foreign` FOREIGN KEY (`matricula_assessor`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE,
  CONSTRAINT `equipes_matricula_coordenador_foreign` FOREIGN KEY (`matricula_coordenador`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipes`
--

LOCK TABLES `equipes` WRITE;
/*!40000 ALTER TABLE `equipes` DISABLE KEYS */;
INSERT INTO `equipes` VALUES ('rocketwolf','RocketWolf','1621734GMEC',NULL,'https://drive.google.com/uc?id=1gr13ryqQyDEh_Yx3s328yId0zqiCRQyy&export=media',NULL,'{}','2020-07-03 02:43:40','2020-07-03 02:43:40'),('socialwolf','SocialWolf','1912280GLEA',NULL,'https://drive.google.com/uc?id=1wliqgGKWajDmQpmDVnL2xobGS9JpqT1U&export=media','SSIT','{}','2020-07-03 02:43:04','2020-07-03 02:43:04'),('wolfbotz','WolfBotz','1815667GAUT',NULL,'https://drive.google.com/uc?id=1shsba0giLVpGT0cXoi4_3IA_F_g3WQac&export=media','RAS','{}','2020-07-03 02:40:14','2020-07-03 02:40:14'),('wolfbyte','WolfByte','1824886BCC','1820774BCC','https://drive.google.com/uc?id=1h0ofJelTSljhV3u4xaLYUNquqOswQA4g&export=media','CS','{}','2020-07-03 02:39:22','2020-07-03 02:39:22'),('wolfpower','WolfPower','1911975BCC',NULL,'https://drive.google.com/uc?id=1AT2iJLisM1IfgC3vQY8MFZLfha0YLJH-&export=media','PES','{}','2020-07-03 02:41:19','2020-07-03 02:41:19');
/*!40000 ALTER TABLE `equipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventos` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_evento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_evento` date NOT NULL,
  `hora_evento` time DEFAULT NULL,
  `evento_diretoria` tinyint(4) NOT NULL DEFAULT 0,
  `id_relacionado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_relacionado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faltas`
--

DROP TABLE IF EXISTS `faltas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faltas` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula_membro` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` date NOT NULL,
  `tipo_id` int(10) unsigned NOT NULL,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome_projeto` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `faltas_matricula_membro_foreign` (`matricula_membro`),
  KEY `faltas_nome_projeto_foreign` (`nome_projeto`),
  KEY `faltas_tipo_id_foreign` (`tipo_id`),
  CONSTRAINT `faltas_matricula_membro_foreign` FOREIGN KEY (`matricula_membro`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE,
  CONSTRAINT `faltas_nome_projeto_foreign` FOREIGN KEY (`nome_projeto`) REFERENCES `projetos` (`nome_projeto_slug`) ON UPDATE CASCADE,
  CONSTRAINT `faltas_tipo_id_foreign` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_faltas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faltas`
--

LOCK TABLES `faltas` WRITE;
/*!40000 ALTER TABLE `faltas` DISABLE KEYS */;
/*!40000 ALTER TABLE `faltas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedbacks` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `membro_enviou` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assunto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensagem` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `satisfacao` tinyint(4) NOT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `feedbacks_membro_enviou_foreign` (`membro_enviou`),
  CONSTRAINT `feedbacks_membro_enviou_foreign` FOREIGN KEY (`membro_enviou`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hierarquias`
--

DROP TABLE IF EXISTS `hierarquias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hierarquias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `diretoria` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hierarquias`
--

LOCK TABLES `hierarquias` WRITE;
/*!40000 ALTER TABLE `hierarquias` DISABLE KEYS */;
INSERT INTO `hierarquias` VALUES (1,'Membro',0),(2,'Marketing',0),(3,'Líder de Projeto',0),(4,'Assessor de Gestão',0),(5,'Assessor de Coordenador',0),(6,'Assessor de Presidência',0),(7,'Coordenador',1),(8,'Diretor de Marketing',1),(9,'Diretor de Projetos',1),(10,'Diretor de Gestão de Pessoas',1),(11,'Diretor Financeiro',1),(12,'Vice-Presidente',1),(13,'Presidente',1);
/*!40000 ALTER TABLE `hierarquias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscricoes_projetos`
--

DROP TABLE IF EXISTS `inscricoes_projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscricoes_projetos` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula_membro` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_projeto` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `funcao` enum('Membro','Assessor','Líder') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Membro',
  `area` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT 1,
  `data_saida` date DEFAULT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `inscricoes_projetos_matricula_membro_foreign` (`matricula_membro`),
  KEY `inscricoes_projetos_nome_projeto_foreign` (`nome_projeto`),
  CONSTRAINT `inscricoes_projetos_matricula_membro_foreign` FOREIGN KEY (`matricula_membro`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE,
  CONSTRAINT `inscricoes_projetos_nome_projeto_foreign` FOREIGN KEY (`nome_projeto`) REFERENCES `projetos` (`nome_projeto_slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscricoes_projetos`
--

LOCK TABLES `inscricoes_projetos` WRITE;
/*!40000 ALTER TABLE `inscricoes_projetos` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscricoes_projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscricoes_psis`
--

DROP TABLE IF EXISTS `inscricoes_psis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscricoes_psis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `membro_inscrito` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_psi` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_projeto` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nome_equipe` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area_solicitada` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `condicao` enum('Pendente','Aprovado','Reprovado') COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inscricoes_psis_membro_inscrito_foreign` (`membro_inscrito`),
  KEY `inscricoes_psis_nome_psi_foreign` (`nome_psi`),
  KEY `inscricoes_psis_nome_projeto_foreign` (`nome_projeto`),
  KEY `inscricoes_psis_nome_equipe_foreign` (`nome_equipe`),
  CONSTRAINT `inscricoes_psis_membro_inscrito_foreign` FOREIGN KEY (`membro_inscrito`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE,
  CONSTRAINT `inscricoes_psis_nome_equipe_foreign` FOREIGN KEY (`nome_equipe`) REFERENCES `equipes` (`nome_equipe_slug`) ON UPDATE CASCADE,
  CONSTRAINT `inscricoes_psis_nome_projeto_foreign` FOREIGN KEY (`nome_projeto`) REFERENCES `projetos` (`nome_projeto_slug`) ON UPDATE CASCADE,
  CONSTRAINT `inscricoes_psis_nome_psi_foreign` FOREIGN KEY (`nome_psi`) REFERENCES `psis` (`nome_psi_slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscricoes_psis`
--

LOCK TABLES `inscricoes_psis` WRITE;
/*!40000 ALTER TABLE `inscricoes_psis` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscricoes_psis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membros`
--

DROP TABLE IF EXISTS `membros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membros` (
  `matricula_usuario` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cpf` char(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rg` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orgao_emissor` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_nascimento` date NOT NULL,
  `curso_id` int(10) unsigned NOT NULL,
  `telefones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`telefones`)),
  `pagante` tinyint(4) NOT NULL DEFAULT 0,
  `numero_ieee` int(11) DEFAULT NULL,
  `data_fim_membresia` date DEFAULT NULL,
  `matriz_habilidade` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`matriz_habilidade`)),
  `cadastro_robocore` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_sanguineo` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medicamentos_utiliza` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medicamentos_alergico` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alimentos_alergico` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `condicoes_especiais` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info_contato` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`info_contato`)),
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`matricula_usuario`),
  UNIQUE KEY `membros_cpf_unique` (`cpf`),
  KEY `membros_curso_id_foreign` (`curso_id`),
  CONSTRAINT `membros_curso_id_foreign` FOREIGN KEY (`curso_id`) REFERENCES `cursos` (`id`),
  CONSTRAINT `membros_matricula_usuario_foreign` FOREIGN KEY (`matricula_usuario`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membros`
--

LOCK TABLES `membros` WRITE;
/*!40000 ALTER TABLE `membros` DISABLE KEYS */;
INSERT INTO `membros` VALUES ('1610463GELT',NULL,NULL,NULL,'1998-01-21',9,'{\"telefone_principal\":\"(21) 97276-2101\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:54:50','2020-06-27 04:54:50'),('1610472GELT',NULL,NULL,NULL,'1998-09-10',9,'{\"telefone_principal\":\"(21) 99231-6311\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 05:00:56','2020-06-27 05:00:56'),('1621734GMEC',NULL,NULL,NULL,'1996-06-21',10,'{\"telefone_principal\":\"(21) 99005-3498\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:59:22','2020-06-27 04:59:22'),('1713259GEL',NULL,NULL,NULL,'1998-08-06',8,'{\"telefone_principal\":\"(21) 97683-8178\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:30:20','2020-06-27 04:30:20'),('1724326GELT',NULL,NULL,NULL,'1999-11-02',9,'{\"telefone_principal\":\"(21) 97271-1999\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:33:57','2020-06-27 04:33:57'),('1724505BCC',NULL,NULL,NULL,'1998-08-24',2,'{\"telefone_principal\":\"(21) 98392-0987\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:56:24','2020-06-27 04:56:24'),('1814973GADM',NULL,NULL,NULL,'1997-03-24',1,'{\"telefone_principal\":\"(21) 98297-4766\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:21:30','2020-06-27 04:21:30'),('1815667GAUT',NULL,NULL,NULL,'1999-07-04',5,'{\"telefone_principal\":\"(21) 99987-0407\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:25:17','2020-06-27 04:25:17'),('1815690GPROD',NULL,NULL,NULL,'2000-03-20',6,'{\"telefone_principal\":\"(21) 98259-3053\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:28:16','2020-06-27 04:28:16'),('1820637GADM',NULL,NULL,NULL,'1999-12-10',1,'{\"telefone_principal\":\"(21) 99719-1009\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:26:57','2020-06-27 04:26:57'),('1820759BCC',NULL,NULL,NULL,'1999-03-26',2,'{\"telefone_principal\":\"(21) 97943-2239\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:38:40','2020-06-27 04:38:40'),('1820774BCC',NULL,NULL,NULL,'2000-02-01',2,'{\"telefone_principal\":\"(21) 98409-3527\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:31:54','2020-06-27 04:31:54'),('1824886BCC',NULL,NULL,NULL,'2000-02-27',2,'{\"telefone_principal\":\"(21) 96489-5995\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:57:45','2020-06-27 04:57:45'),('1911964BCC',NULL,NULL,NULL,'1999-02-21',2,'{\"telefone_principal\":\"(21) 99366-5599\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:40:41','2020-06-27 04:40:41'),('1911975BCC',NULL,NULL,NULL,'2001-07-01',2,'{\"telefone_principal\":\"(21) 99714-8973\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:35:10','2020-06-27 04:35:10'),('1912141GTEL',NULL,NULL,NULL,'2000-06-20',7,'{\"telefone_principal\":\"(21) 98310-5903\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:53:16','2020-06-27 04:53:16'),('1912214GMEC',NULL,NULL,NULL,'2000-12-12',10,'{\"telefone_principal\":\"(21) 98402-2221\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:37:18','2020-06-27 04:37:18'),('1912280GLEA',NULL,NULL,NULL,'2000-11-28',12,'{\"telefone_principal\":\"(21) 96819-3002\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:17:19','2020-06-27 04:17:19'),('1923111BCC',NULL,NULL,NULL,'2001-03-08',2,'{\"telefone_principal\":\"(21) 99559-7490\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:42:30','2020-06-27 04:42:30'),('1923202GAUT',NULL,NULL,NULL,'2001-03-29',5,'{\"telefone_principal\":\"(21) 96423-0324\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:23:55','2020-06-27 04:23:55'),('1923336GMECA',NULL,NULL,NULL,'2000-08-31',10,'{\"telefone_principal\":\"(21) 98872-4427\"}',0,NULL,NULL,'{}',NULL,NULL,NULL,NULL,NULL,NULL,'{}','2020-06-27 04:50:52','2020-06-27 04:50:52');
/*!40000 ALTER TABLE `membros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meses`
--

DROP TABLE IF EXISTS `meses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meses`
--

LOCK TABLES `meses` WRITE;
/*!40000 ALTER TABLE `meses` DISABLE KEYS */;
INSERT INTO `meses` VALUES (1,'Janeiro'),(2,'Fevereiro'),(3,'Março'),(4,'Abril'),(5,'Maio'),(6,'Junho'),(7,'Julho'),(8,'Agosto'),(9,'Setembro'),(10,'Outubro'),(11,'Novembro'),(12,'Dezembro');
/*!40000 ALTER TABLE `meses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_100000_create_password_resets_table',1),(2,'2020_02_01_221226_create_situacoes_table',1),(3,'2020_02_05_000742_create_hierarquias_table',1),(4,'2020_02_05_000808_create_cursos_table',1),(5,'2020_02_05_114439_create_usuarios_table',1),(6,'2020_02_06_225412_create_membros_table',1),(7,'2020_02_09_121251_create_tipo_faltas_table',1),(8,'2020_02_18_125834_create_notifications_table',1),(9,'2020_02_18_125913_create_jobs_table',1),(10,'2020_02_21_141053_create_strikes_table',1),(11,'2020_02_21_143625_create_reavaliacoes_table',1),(12,'2020_03_01_040114_create_equipes_table',1),(13,'2020_03_01_040149_create_projetos_table',1),(14,'2020_03_03_215836_create_faltas_table',1),(15,'2020_03_04_173845_create_failed_jobs_table',1),(16,'2020_03_13_233401_create_feedbacks_table',1),(17,'2020_03_18_161657_create_psis_table',1),(18,'2020_03_18_181339_projetos_psis',1),(19,'2020_03_18_182813_create_inscricoes_psis',1),(20,'2020_03_25_024944_create_vaquinhas_table',1),(21,'2020_04_14_143835_create_equipe_psis_table',1),(22,'2020_04_15_162433_create_tipo_pedidos_table',1),(23,'2020_04_17_212038_create_pedidos_table',1),(24,'2020_05_06_130152_create_caixas_table',1),(25,'2020_05_06_130355_create_registros_de_caixa_table',1),(26,'2020_05_08_032442_create_doacoes_vaquinhas_table',1),(27,'2020_05_11_135910_create_eventos_table',1),(28,'2020_05_17_210219_create_inscricoes_projetos_table',1),(29,'2020_06_15_160325_create_meses_table',1),(30,'2020_06_18_010632_create_arquivos_table',1),(31,'2020_06_22_161659_create_parcerias_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parcerias`
--

DROP TABLE IF EXISTS `parcerias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parcerias` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_empresa` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_site_empresa` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `beneficios` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `equipes_beneficiadas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`equipes_beneficiadas`)),
  `como_encaixamos` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_empresa` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone_empresa` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `consolidada` tinyint(4) NOT NULL DEFAULT 0,
  `membro_solicitou` char(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `parcerias_membro_solicitou_foreign` (`membro_solicitou`),
  CONSTRAINT `parcerias_membro_solicitou_foreign` FOREIGN KEY (`membro_solicitou`) REFERENCES `usuarios` (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parcerias`
--

LOCK TABLES `parcerias` WRITE;
/*!40000 ALTER TABLE `parcerias` DISABLE KEYS */;
/*!40000 ALTER TABLE `parcerias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_pedido` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula_membro_solicitou` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_projeto_solicitado` varchar(35) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pedido_de_compra_relacionado` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dados_pedido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`dados_pedido`)),
  `data_aprovado` date DEFAULT NULL,
  `situacao` enum('Pendente','Aprovado','Recusado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pendente',
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `pedidos_matricula_membro_solicitou_foreign` (`matricula_membro_solicitou`),
  KEY `pedidos_nome_projeto_solicitado_foreign` (`nome_projeto_solicitado`),
  KEY `pedidos_tipo_pedido_foreign` (`tipo_pedido`),
  CONSTRAINT `pedidos_matricula_membro_solicitou_foreign` FOREIGN KEY (`matricula_membro_solicitou`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_nome_projeto_solicitado_foreign` FOREIGN KEY (`nome_projeto_solicitado`) REFERENCES `projetos` (`nome_projeto_slug`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_tipo_pedido_foreign` FOREIGN KEY (`tipo_pedido`) REFERENCES `tipo_pedidos` (`nome_tipo_pedido_slug`),
  CONSTRAINT `pedidos_pedido_de_compra_relacionado_foreign` FOREIGN KEY (`pedido_de_compra_relacionado`) REFERENCES `pedidos` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projetos` (
  `nome_projeto_slug` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_projeto` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `nome_equipe` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_trello` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estagio` enum('Fase de pesquisa','Apresentação','Fase de execução','Fase de conclusão','Fase de checagem','Concluído') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Fase de pesquisa',
  `ativo` tinyint(4) NOT NULL DEFAULT 1,
  `areas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`areas`)),
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`nome_projeto_slug`),
  UNIQUE KEY `projetos_nome_projeto_unique` (`nome_projeto`),
  KEY `projetos_nome_equipe_foreign` (`nome_equipe`),
  CONSTRAINT `projetos_nome_equipe_foreign` FOREIGN KEY (`nome_equipe`) REFERENCES `equipes` (`nome_equipe_slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos`
--

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projetos_psis`
--

DROP TABLE IF EXISTS `projetos_psis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projetos_psis` (
  `nome_projeto` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_psi` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `areas_vagas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`areas_vagas`)),
  KEY `projetos_psis_nome_projeto_foreign` (`nome_projeto`),
  KEY `projetos_psis_nome_psi_foreign` (`nome_psi`),
  CONSTRAINT `projetos_psis_nome_projeto_foreign` FOREIGN KEY (`nome_projeto`) REFERENCES `projetos` (`nome_projeto_slug`) ON UPDATE CASCADE,
  CONSTRAINT `projetos_psis_nome_psi_foreign` FOREIGN KEY (`nome_psi`) REFERENCES `psis` (`nome_psi_slug`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos_psis`
--

LOCK TABLES `projetos_psis` WRITE;
/*!40000 ALTER TABLE `projetos_psis` DISABLE KEYS */;
/*!40000 ALTER TABLE `projetos_psis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `psis`
--

DROP TABLE IF EXISTS `psis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `psis` (
  `nome_psi_slug` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_psi` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `membro_criou` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `gestao_areas_vagas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gestao_areas_vagas`)),
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`nome_psi_slug`),
  UNIQUE KEY `psis_nome_psi_unique` (`nome_psi`),
  KEY `psis_membro_criou_foreign` (`membro_criou`),
  CONSTRAINT `psis_membro_criou_foreign` FOREIGN KEY (`membro_criou`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `psis`
--

LOCK TABLES `psis` WRITE;
/*!40000 ALTER TABLE `psis` DISABLE KEYS */;
/*!40000 ALTER TABLE `psis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reavaliacoes`
--

DROP TABLE IF EXISTS `reavaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reavaliacoes` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `strike_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `constatacao` enum('Manter','Retirar') COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` date NOT NULL,
  `votos_manter` int(11) NOT NULL,
  `votos_retirar` int(11) NOT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `reavaliacoes_strike_id_foreign` (`strike_id`),
  CONSTRAINT `reavaliacoes_strike_id_foreign` FOREIGN KEY (`strike_id`) REFERENCES `strikes` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reavaliacoes`
--

LOCK TABLES `reavaliacoes` WRITE;
/*!40000 ALTER TABLE `reavaliacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `reavaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros_de_caixa`
--

DROP TABLE IF EXISTS `registros_de_caixa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registros_de_caixa` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` date NOT NULL,
  `valor` double(8,2) NOT NULL,
  `exclusivo` tinyint(4) NOT NULL,
  `caixa_relacionado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` enum('Entrada','Saída') GENERATED ALWAYS AS (if(`valor` > 0,'Entrada','Saída')) STORED,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `registros_de_caixa_caixa_relacionado_foreign` (`caixa_relacionado`),
  CONSTRAINT `registros_de_caixa_caixa_relacionado_foreign` FOREIGN KEY (`caixa_relacionado`) REFERENCES `caixas` (`nome_caixa_slug`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros_de_caixa`
--

LOCK TABLES `registros_de_caixa` WRITE;
/*!40000 ALTER TABLE `registros_de_caixa` DISABLE KEYS */;
/*!40000 ALTER TABLE `registros_de_caixa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `situacoes`
--

DROP TABLE IF EXISTS `situacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `situacoes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `situacoes`
--

LOCK TABLES `situacoes` WRITE;
/*!40000 ALTER TABLE `situacoes` DISABLE KEYS */;
INSERT INTO `situacoes` VALUES (1,'Ativo'),(2,'Inativo'),(3,'Desligado');
/*!40000 ALTER TABLE `situacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strikes`
--

DROP TABLE IF EXISTS `strikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strikes` (
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `membro_aplicou` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `membro_recebeu` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `situacao` enum('Solicitado','Recusado','Aprovado','Em Processamento','Mantido','Retirado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Solicitado',
  `aprovado` tinyint(4) GENERATED ALWAYS AS (`situacao` in ('Aprovado','Mantido','Em Processamento')) VIRTUAL,
  `data_aprovado` date DEFAULT NULL,
  `motivo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `audiencia_solicitada` tinyint(4) NOT NULL DEFAULT 0,
  `data_audiencia_solicitada` date DEFAULT NULL,
  `data_audiencia` date DEFAULT NULL,
  `hora_audiencia` time DEFAULT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `strikes_membro_aplicou_foreign` (`membro_aplicou`),
  KEY `strikes_membro_recebeu_foreign` (`membro_recebeu`),
  CONSTRAINT `strikes_membro_aplicou_foreign` FOREIGN KEY (`membro_aplicou`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE,
  CONSTRAINT `strikes_membro_recebeu_foreign` FOREIGN KEY (`membro_recebeu`) REFERENCES `usuarios` (`matricula`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strikes`
--

LOCK TABLES `strikes` WRITE;
/*!40000 ALTER TABLE `strikes` DISABLE KEYS */;
/*!40000 ALTER TABLE `strikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_faltas`
--

DROP TABLE IF EXISTS `tipo_faltas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_faltas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantidade_para_strike` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_faltas`
--

LOCK TABLES `tipo_faltas` WRITE;
/*!40000 ALTER TABLE `tipo_faltas` DISABLE KEYS */;
INSERT INTO `tipo_faltas` VALUES (1,'Exposup',1),(2,'Reunião Geral',3),(3,'Reunião de Projeto',3),(4,'Reunião de Planejamento',1);
/*!40000 ALTER TABLE `tipo_faltas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pedidos`
--

DROP TABLE IF EXISTS `tipo_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_pedidos` (
  `nome_tipo_pedido_slug` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_tipo_pedido` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` enum('Pessoas','Financeiro') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`nome_tipo_pedido_slug`),
  UNIQUE KEY `tipo_pedidos_nome_tipo_pedido_unique` (`nome_tipo_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pedidos`
--

LOCK TABLES `tipo_pedidos` WRITE;
/*!40000 ALTER TABLE `tipo_pedidos` DISABLE KEYS */;
INSERT INTO `tipo_pedidos` VALUES ('pedido-de-compra','Pedido de compra','Financeiro'),('pedido-de-desligamento','Pedido de desligamento','Pessoas'),('pedido-de-inatividade','Pedido de inatividade','Pessoas'),('pedido-de-reembolso','Pedido de reembolso','Financeiro'),('pedido-de-saida-de-projeto','Pedido de saída de projeto','Pessoas');
/*!40000 ALTER TABLE `tipo_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `matricula` char(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_completo` varchar(90) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT 0,
  `hierarquia_id` int(10) unsigned NOT NULL,
  `foto_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `situacao_id` int(10) unsigned NOT NULL DEFAULT 1,
  `data_fim_inatividade` date DEFAULT NULL,
  `data_desligado` date DEFAULT NULL,
  `assessor` tinyint(4) NOT NULL,
  `marketing` tinyint(4) NOT NULL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`matricula`),
  UNIQUE KEY `usuarios_email_unique` (`email`),
  KEY `usuarios_hierarquia_id_foreign` (`hierarquia_id`),
  KEY `usuarios_situacao_id_foreign` (`situacao_id`),
  CONSTRAINT `usuarios_hierarquia_id_foreign` FOREIGN KEY (`hierarquia_id`) REFERENCES `hierarquias` (`id`),
  CONSTRAINT `usuarios_situacao_id_foreign` FOREIGN KEY (`situacao_id`) REFERENCES `situacoes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('1610463GELT','$argon2id$v=19$m=1024,t=2,p=2$blZIVlZWSUFSbTM1TUg5WQ$ObNG1u2pO/2c+AuHsQHmhPa+jRZruyEEa9LuOoXgXLQ','Thiago Kelly Lopes','thiagokellylopes@gmail.com',0,8,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:54:50','2020-06-27 04:54:50'),('1610472GELT','$argon2id$v=19$m=1024,t=2,p=2$ZUFZTFlKMmNFMzBxSzFwNg$swi1C5KvZo8/KOkCG21Buzn9GJJ4N50aB0M5VdFQ7Og','Pedro Vitor Taranto de Carvalho','pedrovtcarvalho13@gmail.com',0,6,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 05:00:56','2020-06-27 05:00:56'),('1621734GMEC','$argon2id$v=19$m=1024,t=2,p=2$eElDb0JnRzF0dGdyODhGSQ$+ClUqfK5ss/Cx6cCpfTwsfcA2pqZFOjVkq3HWSZZbSI','João Vitor Drummond Simoni','joaovitor2016110110@gmail.com',0,7,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:59:22','2020-07-03 02:43:40'),('1713259GEL','$argon2id$v=19$m=1024,t=2,p=2$QWVEVnVjZkVrTXJzTW9mSg$yt0t+r1Bqq2K9tuaw0gshaU9z1V6WWBoRIUoydKYbNA','Gabriel Acácio Mineiro','acaciogabriel.m@gmail.com',0,12,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:30:20','2020-06-27 04:30:20'),('1724326GELT','$argon2id$v=19$m=1024,t=2,p=2$ZFBtWTczam11Qkg0dm9nNQ$it9W27WfahivAHeQx2+sll8U6VhA4aN8NLIPvDlCYkw','Igor Marques Espinosa dos Santos','igormarques120o@gmail.com',0,13,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:33:57','2020-06-27 04:33:57'),('1724505BCC','$argon2id$v=19$m=1024,t=2,p=2$UWxBaVA0cFE1TUJmdUhYOA$k95gzCebIC4yo1+khznFkHzeIfdAvN+kauY9TdpoKHw','Vitoria Dos Santos Rocha Birindiba','vitoriasempresantos@gmail.com',0,4,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,1,0,'2020-06-27 04:56:24','2020-06-27 04:56:24'),('1814973GADM','$argon2id$v=19$m=1024,t=2,p=2$RkJGaWZ2QmkuY1Voc09rZA$S9x/sg/0Hh7oCoFFt5pveXuJVx2IA+sSTLPF/exq15A','Bruna Moreira Machado Costa','brunammc2@gmail.com',0,10,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:21:30','2020-06-27 04:21:30'),('1815667GAUT','$argon2id$v=19$m=1024,t=2,p=2$RE1FUEtkOUdKbml2dFhMYg$YPiV5AC7OCqH8WM64TPq/sOG8aRUo7swlZxVUU+Akm8','Eduardo Brizida Vilela de Abreu','eduardobrizida@gmail.com',0,7,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:25:17','2020-07-03 02:40:14'),('1815690GPROD','$argon2id$v=19$m=1024,t=2,p=2$Z29OL1gzalRtSS5TSlFEcA$qP4MEJpe070c4KFWz3tsFMaCJlnWOy5zt7zy1vf9NwY','Fernanda Carrijo Ravaglia Nunes','fernanda.carrijo29@gmail.com',0,9,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:28:16','2020-06-27 04:28:16'),('1820637GADM','$argon2id$v=19$m=1024,t=2,p=2$LzNXWjJuaTJzak9hcjJ6Uw$RD5w1zqHx5he3oJOR5Gdnrw0EOxj0AZyu3MGgEYC34I','Fábio Henrique Martins Pecego','fabio.h.pecego@gmail.com',0,13,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:26:57','2020-06-27 04:26:57'),('1820759BCC','$argon2id$v=19$m=1024,t=2,p=2$VDJpMU5ZL2xxdThMMTh2Sg$8a3xm9yrCK4BQR2V5HVJfaviEroyj0Tpm4MtOhSQ2Zc','Marcelo Dias Santos','marcelod789@gmail.com',0,1,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:38:40','2020-06-27 04:38:40'),('1820774BCC','$argon2id$v=19$m=1024,t=2,p=2$REhJcW11Z3ZuTE9pS0RUcw$XOfKvPT6Kg6wQEWGzUHJUPX9rA8rFent9AYClUn7bic','Mateus Rodrigues Lopez','mateusrlopez@gmail.com',0,5,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:31:54','2020-07-03 02:39:22'),('1824886BCC','$argon2id$v=19$m=1024,t=2,p=2$ZTJaekxUcmh3cVVSbm8yMg$Al3wclvk11lH7p5SZwqMX4vNllcefA3GnHzwBmObbU4','Anthony Vinicius Mota Silva','anthonyvii27@gmail.com',0,7,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:57:45','2020-07-03 02:39:22'),('1911964BCC','$argon2id$v=19$m=1024,t=2,p=2$NGRsSWJybTFMdDhqUUx2Uw$vFJ3RSahOekViZrm0pW8t0IYiJhi5gRpZ45y+Y5t8lw','Mariana Werner Bernardo','marianawernerb@gmail.com',0,11,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:40:41','2020-06-27 04:40:41'),('1911975BCC','$argon2id$v=19$m=1024,t=2,p=2$OEhkRG5NWVJqYi9qeEEwMw$erYwJeIn9Vai0P6B3mD9TNZ2FM1J+Cr0M1hzIfMzTkY','Lyzandra Pinto Alves Coelho','lyzandraalves00@gmail.com',0,7,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:35:10','2020-07-03 02:41:19'),('1912141GTEL','$argon2id$v=19$m=1024,t=2,p=2$eTVxdmFENHRFYkRSb1BpVw$3d/I5911WTckp0ps+dH9BFvcDgOGPPsDoVgEBvRDb6I','Thereza Christina Rodrigues Corrêa','therezachristina20@outlook.com',0,9,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:53:16','2020-06-27 04:53:16'),('1912214GMEC','$argon2id$v=19$m=1024,t=2,p=2$M2wxSU1hcFVqYTlGZHViag$1AQHIXEDmx33+ZHpopN4gywQLgU15tVR0nC8qiHudqc','Manuela Tietze Almeida','manuela.tietze@gmail.com',0,11,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:37:18','2020-06-27 04:37:18'),('1912280GLEA','$argon2id$v=19$m=1024,t=2,p=2$eWpWZHUvQXNRTzdQb1BiSQ$Mdjpvsapu4GZTwTFLk1YcjUH/yXo1vdRT2E4d3TvJew','Ana Luísa Vieira do Valle','aluvivalle@gmail.com',0,7,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,1,'2020-06-27 04:17:19','2020-07-03 02:43:04'),('1923111BCC','$argon2id$v=19$m=1024,t=2,p=2$dnFIRUN1NGtLRmpFQU5MZA$G694yu1vllhkQhDvTQ3yk7pDrg1OpYd0EiFh5Q3kp+w','Natan Steinbruch','natsteinbruch@gmail.com',0,1,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:42:30','2020-06-27 04:42:30'),('1923202GAUT','$argon2id$v=19$m=1024,t=2,p=2$cnlJLldBOG0yZXdYNTlibw$7m9G8Qa/yPX70fezUB5m1XnOEG9HJvc6/NkATlbf4pI','Bruna Oliveira da Silva','bruna96423032413@gmail.com',0,10,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,0,'2020-06-27 04:23:55','2020-06-27 04:23:55'),('1923336GMECA','$argon2id$v=19$m=1024,t=2,p=2$eVAwVTZVSUhzRUE0TnV1Tg$TEjYmkWVmspQoNzFv+F6rkAhMWwMJxJ4GJf2ei7WywY','Tabata Carravetta Menna Barreto','tabatamenna@gmail.com',0,12,'https://image.flaticon.com/icons/png/512/306/306232.png',1,NULL,NULL,0,1,'2020-06-27 04:50:52','2020-06-27 14:09:58');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaquinhas`
--

DROP TABLE IF EXISTS `vaquinhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vaquinhas` (
  `nome_vaquinha_slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome_vaquinha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `aberto` tinyint(4) GENERATED ALWAYS AS (curdate() between `data_inicio` and `data_fim`) VIRTUAL,
  `data_criado` timestamp NULL DEFAULT NULL,
  `data_alterado` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`nome_vaquinha_slug`),
  UNIQUE KEY `vaquinhas_nome_vaquinha_unique` (`nome_vaquinha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaquinhas`
--

LOCK TABLES `vaquinhas` WRITE;
/*!40000 ALTER TABLE `vaquinhas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vaquinhas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-03  5:47:34

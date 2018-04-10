-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-12-23 19:48:10
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `teadao`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `aid` int(10) NOT NULL AUTO_INCREMENT,
  `aname` varchar(20) NOT NULL,
  `aenglish` varchar(20) NOT NULL,
  `adescription` varchar(255) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`aid`, `aname`, `aenglish`, `adescription`) VALUES
(1, '山西', 'SHANXI', '吟诗不厌捣香茗，乘兴偏宜听雅弹。'),
(2, '北京', 'BEIJING', '茶香高山云雾质，水甜幽泉霜当魂。'),
(3, '云南', 'YUNNAN', '心随流水去，身与风云闲。'),
(4, '济南', 'JINAN', '兼然幽兴处，院里满茶烟。'),
(5, '安徽', 'ANHUI', '瀹泉尝玉茗，泼乳试金瓯。'),
(6, '福建', 'FUJIAN', '样叠鱼鳞碎，香分雀舌鲜。');

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `aid` int(10) NOT NULL AUTO_INCREMENT,
  `aname` varchar(255) NOT NULL,
  `apass` varchar(255) NOT NULL,
  `aimg` varchar(255) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`aid`, `aname`, `apass`, `aimg`) VALUES
(1, 'admin', '12345', ''),
(3, '按时', '789', '/teadao/public/upload/17-12-13/11.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `banner`
--

CREATE TABLE IF NOT EXISTS `banner` (
  `bid` int(10) NOT NULL AUTO_INCREMENT,
  `bimg` varchar(255) NOT NULL,
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `banner`
--

INSERT INTO `banner` (`bid`, `bimg`) VALUES
(1, '/teadao/public/upload/17-12-21/banner1.jpg'),
(5, '/teadao/public/upload/17-12-21/banner1.jpg'),
(6, '/teadao/public/upload/17-12-21/banner1.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `color`
--

CREATE TABLE IF NOT EXISTS `color` (
  `cid` int(10) NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) NOT NULL,
  `cenglish` varchar(20) NOT NULL,
  `cdescription` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `color`
--

INSERT INTO `color` (`cid`, `cname`, `cenglish`, `cdescription`) VALUES
(1, '绿茶', 'GREEN TEA', '入口清淡 甘甜爽口'),
(2, '青茶', 'OOLONG TEA', '香气扑鼻 沁人心脾'),
(3, '红茶', 'RED TEA', '甘甜润喉 口有余香'),
(4, '白茶', 'WHITE TEA', '芝兰之气 齿颊留香 \r\n'),
(5, '黄茶', 'YELLOW TEA', '怡人清香 沁著茶香'),
(6, '黑茶', 'BLACK TEA', '醇厚芬芳 舌尖微甜');

-- --------------------------------------------------------

--
-- 表的结构 `opions`
--

CREATE TABLE IF NOT EXISTS `opions` (
  `oid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) NOT NULL,
  `sid` int(10) NOT NULL,
  `oname` varchar(20) NOT NULL,
  `otime` datetime NOT NULL,
  `onewname` varchar(20) NOT NULL,
  `onewtime` datetime NOT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- 转存表中的数据 `opions`
--

INSERT INTO `opions` (`oid`, `uname`, `sid`, `oname`, `otime`, `onewname`, `onewtime`) VALUES
(12, '1', 3, 'asdasdasdasas', '2017-12-17 17:03:52', '', '0000-00-00 00:00:00'),
(13, '9', 3, '哈哈哈哈哈', '2017-12-17 17:04:17', '', '0000-00-00 00:00:00'),
(14, '10', 1, '奥术大师大所大', '2017-12-17 17:04:46', '', '0000-00-00 00:00:00'),
(15, '10', 3, 'ZX寸ZX寸正在写', '2017-12-18 18:50:16', '', '0000-00-00 00:00:00'),
(16, '10', 3, '香', '2017-12-19 17:04:44', '', '0000-00-00 00:00:00'),
(17, '12', 1, '铁观音很香', '2017-12-23 23:47:16', '', '0000-00-00 00:00:00'),
(18, '12', 1, '阿萨德阿萨德', '2017-12-23 23:51:26', '', '0000-00-00 00:00:00'),
(19, '12', 1, '阿萨德阿萨德', '2017-12-23 23:54:39', '', '0000-00-00 00:00:00'),
(20, '12', 22, '功夫红茶', '2017-12-24 00:01:59', '', '0000-00-00 00:00:00'),
(21, '12', 18, '正浩白茶', '2017-12-24 00:06:46', '', '0000-00-00 00:00:00'),
(22, '12', 10, '红茶', '2017-12-24 00:15:15', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `vid` int(10) NOT NULL AUTO_INCREMENT,
  `vimg` varchar(255) NOT NULL,
  `vtitle` varchar(255) NOT NULL,
  `vcontent` text NOT NULL,
  `venglish` text NOT NULL,
  `vimg1` varchar(255) NOT NULL,
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `service`
--

INSERT INTO `service` (`vid`, `vimg`, `vtitle`, `vcontent`, `venglish`, `vimg1`) VALUES
(3, '', '至上茶品&nbsp&nbsp&nbsp&nbsp喧嚣中一品香茗&nbsp&nbsp&nbsp&nbsp畅享悠然', '我做的茶叶在我们福鼎还算小有名气，央视记者和福建电视台也都有来我家进行采访。目前我正在积 <br> 极申请福鼎白茶传统技艺非物质文化遗产传承人。我常常教育下一代：我们做的不是茶叶，是艺术品，只有追求匠心精神，不去计较效率和付出，才能做出好的福鼎白茶。', 'The tea I made was very famous in our Fuding, and the CCTV and Fujian TV stations had <br> come to my home for an interview. At present, I am actively applying for the heritage of the non material cultural heritage of Fuding white tea. I used to educate the next generation: we do not tea, is art, only the pursuit of originality spirit,<br> do not care about the efficiency and pay, in order to make a good Fuding white tea.', '/teadao/public/upload/17-12-23/280180fuwutu.jpg'),
(4, '', '喧嚣中一品香茗&nbsp&nbsp&nbsp&nbsp畅享悠然&nbsp&nbsp&nbsp&nbsp至上茶品', '我做的茶叶在我们福鼎还算小有名气，央视记者和福建电视台也都有来我家进行采访。目前我正在积 <br> 极申请福鼎白茶传统技艺非物质文化遗产传承人。我常常教育下一代：我们做的不是茶叶，是艺术品，只有追求匠心精神，不去计较效率和付出，才能做出好的福鼎白茶。', 'The tea I made was very famous in our Fuding, and the CCTV and Fujian TV stations had <br> come to my home for an interview. At present, I am actively applying for the heritage of the non material cultural heritage of Fuding white tea. I used to educate the next generation: we do not tea, is art, only the pursuit of originality spirit,<br> do not care about the efficiency and pay, in order to make a good Fuding white tea.', '/teadao/public/upload/17-12-23/280180fuwutu.jpg'),
(5, '', '畅享悠然&nbsp&nbsp&nbsp&nbsp喧嚣中一品香茗&nbsp&nbsp&nbsp&nbsp至上茶品', '我做的茶叶在我们福鼎还算小有名气，央视记者和福建电视台也都有来我家进行采访。目前我正在积 <br> 极申请福鼎白茶传统技艺非物质文化遗产传承人。我常常教育下一代：我们做的不是茶叶，是艺术品，只有追求匠心精神，不去计较效率和付出，才能做出好的福鼎白茶。', 'The tea I made was very famous in our Fuding, and the CCTV and Fujian TV stations had <br> come to my home for an interview. At present, I am actively applying for the heritage of the non material cultural heritage of Fuding white tea. I used to educate the next generation: we do not tea, is art, only the pursuit of originality spirit,<br> do not care about the efficiency and pay, in order to make a good Fuding white tea.', '/teadao/public/upload/17-12-23/280180fuwutu.jpg'),
(6, '', '畅享悠然&nbsp&nbsp&nbsp&nbsp至上茶品&nbsp&nbsp&nbsp&nbsp喧嚣中一品香茗', '我做的茶叶在我们福鼎还算小有名气，央视记者和福建电视台也都有来我家进行采访。目前我正在积 <br> 极申请福鼎白茶传统技艺非物质文化遗产传承人。我常常教育下一代：我们做的不是茶叶，是艺术品，只有追求匠心精神，不去计较效率和付出，才能做出好的福鼎白茶。', 'The tea I made was very famous in our Fuding, and the CCTV and Fujian TV stations had <br> come to my home for an interview. At present, I am actively applying for the heritage of the non material cultural heritage of Fuding white tea. I used to educate the next generation: we do not tea, is art, only the pursuit of originality spirit,<br> do not care about the efficiency and pay, in order to make a good Fuding white tea.', '/teadao/public/upload/17-12-23/280180fuwutu.jpg'),
(7, '', '畅享悠然&nbsp&nbsp&nbsp&nbsp至上茶品', '我做的茶叶在我们福鼎还算小有名气，央视记者和福建电视台也都有来我家进行采访。目前我正在积 <br> 极申请福鼎白茶传统技艺非物质文化遗产传承人。我常常教育下一代：我们做的不是茶叶，是艺术品，只有追求匠心精神，不去计较效率和付出，才能做出好的福鼎白茶。', 'The tea I made was very famous in our Fuding, and the CCTV and Fujian TV stations had <br> come to my home for an interview. At present, I am actively applying for the heritage of the non material cultural heritage of Fuding white tea. I used to educate the next generation: we do not tea, is art, only the pursuit of originality spirit,<br> do not care about the efficiency and pay, in order to make a good Fuding white tea.', '/teadao/public/upload/17-12-23/280180fuwutu.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `shop`
--

CREATE TABLE IF NOT EXISTS `shop` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(20) NOT NULL,
  `stu` varchar(255) NOT NULL,
  `senglish` varchar(20) NOT NULL,
  `sprice` int(10) NOT NULL,
  `snewprice` int(10) NOT NULL,
  `scolor` varchar(20) NOT NULL,
  `stype` varchar(20) NOT NULL,
  `saddress` varchar(20) NOT NULL,
  `sdescription` varchar(255) NOT NULL,
  `scontent` text NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `shop`
--

INSERT INTO `shop` (`sid`, `sname`, `stu`, `senglish`, `sprice`, `snewprice`, `scolor`, `stype`, `saddress`, `sdescription`, `scontent`) VALUES
(1, '500g特级铁观音', '/teadao/public/upload/17-12-15/tuijian_07.png', 'NEW TIE GUANYIN', 268, 188, '绿茶', '铁观音', '福建', '铁观音，中国传统名茶，属于青茶类，是中国十大名茶之一。原产于福建泉州市安溪县西坪镇，发现于1723—1735年。“铁观音”既是茶名，也是茶树品种名，铁观音茶介于绿茶和红茶之间，属于半发酵茶类，铁观音独具“观音韵”，清香雅韵，冲泡后有天然的兰花香，滋味纯浓,香气馥郁持久，有“七泡有余香之誉 ”。除具有一般茶叶的保健功能外，还具有抗衰老、抗动脉硬化、防治糖尿病、减肥健美、防治龋齿、清热降火，敌烟醒酒等功效。', ''),
(2, '200g特级铁观音', '/teadao/public/upload/17-12-15/tuijian_07.png', 'NEW TIE GUANYIN', 168, 118, '绿茶', '铁观音', '福建', '铁观音，中国传统名茶，属于青茶类，是中国十大名茶之一。原产于福建泉州市安溪县西坪镇，发现于1723—1735年。“铁观音”既是茶名，也是茶树品种名，铁观音茶介于绿茶和红茶之间，属于半发酵茶类，铁观音独具“观音韵”，清香雅韵，冲泡后有天然的兰花香，滋味纯浓,香气馥郁持久，有“七泡有余香之誉 ”。除具有一般茶叶的保健功能外，还具有抗衰老、抗动脉硬化、防治糖尿病、减肥健美、防治龋齿、清热降火，敌烟醒酒等功效。', ''),
(3, '50g特级铁观音', '/teadao/public/upload/17-12-15/tuijian_07.png', 'NEW TIE GUANYIN', 108, 88, '青茶', '铁观音', '福建', '铁观音，中国传统名茶，属于青茶类，是中国十大名茶之一。原产于福建泉州市安溪县西坪镇，发现于1723—1735年。“铁观音”既是茶名，也是茶树品种名，铁观音茶介于绿茶和红茶之间，属于半发酵茶类，铁观音独具“观音韵”，清香雅韵，冲泡后有天然的兰花香，滋味纯浓,香气馥郁持久，有“七泡有余香之誉 ”。除具有一般茶叶的保健功能外，还具有抗衰老、抗动脉硬化、防治糖尿病、减肥健美、防治龋齿、清热降火，敌烟醒酒等功效。', ''),
(4, '500g西湖龙井茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'West Lake Longjing g', 228, 198, '绿茶', '龙井茶', '北京', '西湖龙井，属绿茶，中国十大名茶之一。产于浙江省杭州市西湖龙井村周围群山，并因此得名。具有1200多年历史[1]  。清乾隆游览杭州西湖时，盛赞西湖龙井茶，把狮峰山下胡公庙前的十八棵茶树封为“御茶”。西湖龙井按外形和内质的优次分作1～8级。', ''),
(5, '200g西湖龙井茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'West Lake Longjing g', 128, 88, '绿茶', '龙井茶', '北京', '西湖龙井，属绿茶，中国十大名茶之一。产于浙江省杭州市西湖龙井村周围群山，并因此得名。具有1200多年历史[1]  。清乾隆游览杭州西湖时，盛赞西湖龙井茶，把狮峰山下胡公庙前的十八棵茶树封为“御茶”。西湖龙井按外形和内质的优次分作1～8级。', ''),
(6, '120g西湖龙井茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'West Lake Longjing g', 108, 68, '绿茶', '龙井茶', '北京', '西湖龙井，属绿茶，中国十大名茶之一。产于浙江省杭州市西湖龙井村周围群山，并因此得名。具有1200多年历史[1]  。清乾隆游览杭州西湖时，盛赞西湖龙井茶，把狮峰山下胡公庙前的十八棵茶树封为“御茶”。西湖龙井按外形和内质的优次分作1～8级。', ''),
(7, '功夫红茶', '/teadao/public/upload/17-12-15/83a68a2848af07f96d990784ee4e6470.png', 'Kung Fu Black Tea', 48, 28, '红茶', '大红袍', '济南', '红茶，英文为Black tea。红茶在加工过程中发生了以茶多酚酶促氧化为中心的化学反应，鲜叶中的化学成分变化较大，茶多酚减少90%以上，产生了茶黄素、茶红素等新成分。香气物质比鲜叶明显增加。所以红茶具有红茶、红汤、红叶和香甜味醇的特征。我国红茶品种以祁门红茶最为著名，为我国第二大茶类。', ''),
(8, '120g西湖龙井茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'West Lake Longjing g', 108, 68, '绿茶', '龙井茶', '山西', '西湖龙井，属绿茶，中国十大名茶之一。产于浙江省杭州市西湖龙井村周围群山，并因此得名。具有1200多年历史[1]  。清乾隆游览杭州西湖时，盛赞西湖龙井茶，把狮峰山下胡公庙前的十八棵茶树封为“御茶”。西湖龙井按外形和内质的优次分作1～8级。', ''),
(9, '祁门红茶', '/teadao/public/upload/17-12-15/83a68a2848af07f96d990784ee4e6470.png', 'Kung Fu Black Tea', 88, 68, '红茶', '大红袍', '云南', '红茶，英文为Black tea。红茶在加工过程中发生了以茶多酚酶促氧化为中心的化学反应，鲜叶中的化学成分变化较大，茶多酚减少90%以上，产生了茶黄素、茶红素等新成分。香气物质比鲜叶明显增加。所以红茶具有红茶、红汤、红叶和香甜味醇的特征。我国红茶品种以祁门红茶最为著名，为我国第二大茶类。', ''),
(10, '正山小种红茶', '/teadao/public/upload/17-12-15/83a68a2848af07f96d990784ee4e6470.png', 'Kung Fu Black Tea', 138, 98, '红茶', '大红袍', '济南', '红茶，英文为Black tea。红茶在加工过程中发生了以茶多酚酶促氧化为中心的化学反应，鲜叶中的化学成分变化较大，茶多酚减少90%以上，产生了茶黄素、茶红素等新成分。香气物质比鲜叶明显增加。所以红茶具有红茶、红汤、红叶和香甜味醇的特征。我国红茶品种以祁门红茶最为著名，为我国第二大茶类。', ''),
(11, '200g铁观音', '/teadao/public/upload/17-12-15/tuijian_07.png', 'NEW TIE GUANYIN', 168, 108, '绿茶', '铁观音', '安徽', '铁观音，中国传统名茶，属于青茶类，是中国十大名茶之一。原产于福建泉州市安溪县西坪镇，发现于1723—1735年。“铁观音”既是茶名，也是茶树品种名，铁观音茶介于绿茶和红茶之间，属于半发酵茶类，铁观音独具“观音韵”，清香雅韵，冲泡后有天然的兰花香，滋味纯浓,香气馥郁持久，有“七泡有余香之誉 ”。除具有一般茶叶的保健功能外，还具有抗衰老、抗动脉硬化、防治糖尿病、减肥健美、防治龋齿、清热降火，敌烟醒酒等功效。', ''),
(12, '200g西湖龙井茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'West Lake Longjing g', 128, 58, '青茶', '龙井茶', '济南', '西湖龙井，属绿茶，中国十大名茶之一。产于浙江省杭州市西湖龙井村周围群山，并因此得名。具有1200多年历史[1]  。清乾隆游览杭州西湖时，盛赞西湖龙井茶，把狮峰山下胡公庙前的十八棵茶树封为“御茶”。西湖龙井按外形和内质的优次分作1～8级。', ''),
(13, '祁门红茶', '/teadao/public/upload/17-12-15/83a68a2848af07f96d990784ee4e6470.png', 'Kung Fu Black Tea', 88, 68, '红茶', '大红袍', '福建', '红茶，英文为Black tea。红茶在加工过程中发生了以茶多酚酶促氧化为中心的化学反应，鲜叶中的化学成分变化较大，茶多酚减少90%以上，产生了茶黄素、茶红素等新成分。香气物质比鲜叶明显增加。所以红茶具有红茶、红汤、红叶和香甜味醇的特征。我国红茶品种以祁门红茶最为著名，为我国第二大茶类。', ''),
(14, '500g西湖龙井茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'West Lake Longjing g', 228, 198, '青茶', '龙井茶', '济南', '西湖龙井，属绿茶，中国十大名茶之一。产于浙江省杭州市西湖龙井村周围群山，并因此得名。具有1200多年历史[1]  。清乾隆游览杭州西湖时，盛赞西湖龙井茶，把狮峰山下胡公庙前的十八棵茶树封为“御茶”。西湖龙井按外形和内质的优次分作1～8级。', ''),
(15, '200g西湖龙井茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'West Lake Longjing g', 128, 58, '青茶', '龙井茶', '安徽', '西湖龙井，属绿茶，中国十大名茶之一。产于浙江省杭州市西湖龙井村周围群山，并因此得名。具有1200多年历史[1]  。清乾隆游览杭州西湖时，盛赞西湖龙井茶，把狮峰山下胡公庙前的十八棵茶树封为“御茶”。西湖龙井按外形和内质的优次分作1～8级。', ''),
(16, '安吉白茶', '/teadao/public/upload/17-12-15/430350tieguanyin.jpg', 'Anji white tea', 129, 76, '白茶', '乌龙茶', '济南', '白茶，属微发酵茶，是中国茶农创制的传统名茶。中国六大茶类之一。指一种采摘后，不经杀青或揉捻，只经过晒或文火干燥后加工的茶。具有外形芽毫完整，满身披毫，毫香清鲜，汤色黄绿清澈，滋味清淡回甘的的品质特点。 属轻微发酵茶，是中国茶类中的特殊珍品。因其成品茶多为芽头，满披白毫，如银似雪而得名。主要产区在福建福鼎、政和、松溪、建阳、云南景谷等地。基本工艺包括萎凋、烘焙（或阴干）、拣剔、复火等工序。云南白茶工艺主要晒青，晒青茶的优势在于口感保持茶叶原有的清香味。萎凋是形成白茶品质的关键工序。[1] ', ''),
(17, '方宇白茶', '/teadao/public/upload/17-12-15/430350tieguanyin.jpg', 'fangyu white tea', 158, 79, '白茶', '银针茶', '福建', '白茶，属微发酵茶，是中国茶农创制的传统名茶。中国六大茶类之一。指一种采摘后，不经杀青或揉捻，只经过晒或文火干燥后加工的茶。具有外形芽毫完整，满身披毫，毫香清鲜，汤色黄绿清澈，滋味清淡回甘的的品质特点。 属轻微发酵茶，是中国茶类中的特殊珍品。因其成品茶多为芽头，满披白毫，如银似雪而得名。主要产区在福建福鼎、政和、松溪、建阳、云南景谷等地。基本工艺包括萎凋、烘焙（或阴干）、拣剔、复火等工序。云南白茶工艺主要晒青，晒青茶的优势在于口感保持茶叶原有的清香味。萎凋是形成白茶品质的关键工序。[1] ', ''),
(18, '正浩白茶', '/teadao/public/upload/17-12-15/430350tieguanyin.jpg', 'zhenghao white tea', 86, 28, '白茶', '龙井茶', '山西', '白茶，属微发酵茶，是中国茶农创制的传统名茶。中国六大茶类之一。指一种采摘后，不经杀青或揉捻，只经过晒或文火干燥后加工的茶。具有外形芽毫完整，满身披毫，毫香清鲜，汤色黄绿清澈，滋味清淡回甘的的品质特点。 属轻微发酵茶，是中国茶类中的特殊珍品。因其成品茶多为芽头，满披白毫，如银似雪而得名。主要产区在福建福鼎、政和、松溪、建阳、云南景谷等地。基本工艺包括萎凋、烘焙（或阴干）、拣剔、复火等工序。云南白茶工艺主要晒青，晒青茶的优势在于口感保持茶叶原有的清香味。萎凋是形成白茶品质的关键工序。[1] ', ''),
(19, '桐乡台菊花茶', '/teadao/public/upload/17-12-15/80dac839aacf26aa08cb01e5aeaceccc.png', 'Chrysanthemum Tea', 58, 18, '黄茶', '银针茶', '安徽', '菊花茶，是一种以菊花为原料制成的花草茶。菊花茶经过鲜花采摘、阴干、生晒蒸晒、烘培等工序制作而成。据古籍记载，菊花味甘苦，性微寒，有散风清热、清肝明目和解毒消炎等作用。菊花茶起源于唐朝，至清朝广泛应用于民众生活中。', ''),
(20, '忆江南', '/teadao/public/upload/17-12-15/430350tieguanyin.jpg', 'yijiangnan', 48, 25, '黄茶', '龙井茶', '济南', '黄茶，属微发酵茶，是中国茶农创制的传统名茶。中国六大茶类之一。指一种采摘后，不经杀青或揉捻，只经过晒或文火干燥后加工的茶。具有外形芽毫完整，满身披毫，毫香清鲜，汤色黄绿清澈，滋味清淡回甘的的品质特点。 属轻微发酵茶，是中国茶类中的特殊珍品。因其成品茶多为芽头，满披白毫，如银似雪而得名。主要产区在福建福鼎、政和、松溪、建阳、云南景谷等地。基本工艺包括萎凋、烘焙（或阴干）、拣剔、复火等工序。云南白茶工艺主要晒青，晒青茶的优势在于口感保持茶叶原有的清香味。萎凋是形成白茶品质的关键工序。[1] ', ''),
(21, '贡菊', '/teadao/public/upload/17-12-15/80dac839aacf26aa08cb01e5aeaceccc.png', 'Chrysanthemum Tea', 98, 38, '黄茶', '银针茶', '安徽', '菊花茶，是一种以菊花为原料制成的花草茶。菊花茶经过鲜花采摘、阴干、生晒蒸晒、烘培等工序制作而成。据古籍记载，菊花味甘苦，性微寒，有散风清热、清肝明目和解毒消炎等作用。菊花茶起源于唐朝，至清朝广泛应用于民众生活中。', ''),
(22, '黄山菊花茶', '/teadao/public/upload/17-12-15/80dac839aacf26aa08cb01e5aeaceccc.png', 'Chrysanthemum Tea', 58, 18, '黄茶', '银针茶', '安徽', '菊花茶，是一种以菊花为原料制成的花草茶。菊花茶经过鲜花采摘、阴干、生晒蒸晒、烘培等工序制作而成。据古籍记载，菊花味甘苦，性微寒，有散风清热、清肝明目和解毒消炎等作用。菊花茶起源于唐朝，至清朝广泛应用于民众生活中。', ''),
(23, '普洱茶', '/teadao/public/upload/17-12-15/9e9e0d6bf7048cf761d7d7eb372e2b60.png', 'Puer tea', 138, 108, '黑茶', '乌龙茶', '山西', '普洱茶（学名：Camellia sinensis var. assamica），大乔木，高达16米，嫩枝有微毛，顶芽有白柔毛。叶薄革质，椭圆形，上面干后褐绿色，略有光泽，下面浅绿色，中肋上有柔毛，其余被短柔毛，老叶变秃；侧脉8-9对，在上面明显。花腋生，被柔毛。苞片2，早落。萼片5，近圆形，外面无毛。花瓣6-7片，倒卵形，无毛。雄蕊长8-10毫米，离生，无毛。子房3室，被茸毛；花柱长8毫米，先端3裂。蒴果扁三角球形。种子每室1个，近圆形，直径1厘米。（标本信息来自中国植物志）', ''),
(24, '安化黑茶', '/teadao/public/upload/17-12-15/shao1_03.png', 'Anhua black tea', 65, 48, '黑茶', '银针茶', '安徽', '黑茶（dark tea），因成品茶的外观呈黑色，故得名。黑茶属于六大茶类之一，属后发酵茶，主产区为四川、云南、湖北、湖南、陕西、安徽等地。传统黑茶采用的黑毛茶原料成熟度较高，是压制紧压茶的主要原料。', ''),
(25, '云南普洱茶', '/teadao/public/upload/17-12-15/9e9e0d6bf7048cf761d7d7eb372e2b60.png', 'Yunnan Pu-erh Tea', 128, 69, '黑茶', '乌龙茶', '云南', '黑茶（dark tea），因成品茶的外观呈黑色，故得名。黑茶属于六大茶类之一，属后发酵茶，主产区为四川、云南、湖北、湖南、陕西、安徽等地。传统黑茶采用的黑毛茶原料成熟度较高，是压制紧压茶的主要原料。', ''),
(26, '竹叶青茶', '/teadao/public/upload/17-12-15/tuijian_03.png', 'Zhuyeqing tea', 69, 45, '青茶', '银针茶', '云南', '竹叶青茶，中国名茶系列之一，为绿茶类，产于四川省峨眉山。"竹叶青"既是茶品种，又是其商标和公司名称，归属于四川省峨眉山竹叶青茶业有限公司。其外形扁平挺直似竹叶，色泽嫩绿油润；汤色黄绿清亮，叶底浅绿匀嫩；滋味清醇爽口，饮后余香回甘。', ''),
(27, '峨眉青茶', '/teadao/public/upload/17-12-15/9e9e0d6bf7048cf761d7d7eb372e2b60.png', 'Yunnan Pu-erh Tea', 128, 69, '青茶', '乌龙茶', '山西', '青茶（dark tea），因成品茶的外观呈黑色，故得名。黑茶属于六大茶类之一，属后发酵茶，主产区为四川、云南、湖北、湖南、陕西、安徽等地。传统黑茶采用的黑毛茶原料成熟度较高，是压制紧压茶的主要原料。', '');

-- --------------------------------------------------------

--
-- 表的结构 `shopping`
--

CREATE TABLE IF NOT EXISTS `shopping` (
  `pid` int(10) NOT NULL AUTO_INCREMENT,
  `sid` int(10) NOT NULL,
  `pcount` int(11) NOT NULL,
  `ptype` varchar(255) NOT NULL,
  `ptotal` int(11) NOT NULL,
  `uname` varchar(20) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=147 ;

--
-- 转存表中的数据 `shopping`
--

INSERT INTO `shopping` (`pid`, `sid`, `pcount`, `ptype`, `ptotal`, `uname`) VALUES
(29, 2, 3, '待付款', 354, '10'),
(31, 5, 2, '交易失败', 236, '10'),
(116, 1, 2, '待评价', 376, '10'),
(121, 7, 1, '待评价', 0, '11'),
(122, 11, 1, '购物车', 0, '10'),
(123, 24, 1, '购物车', 0, '11'),
(124, 11, 1, '购物车', 0, '10'),
(125, 11, 1, '购物车', 0, '10'),
(128, 1, 1, '购物车', 0, '10'),
(130, 27, 1, '购物车', 0, '10'),
(131, 9, 1, '购物车', 0, '10'),
(133, 22, 1, '购物车', 0, '10'),
(134, 10, 1, '购物车', 0, '10'),
(135, 10, 1, '购物车', 0, '10'),
(136, 10, 2, '购物车', 196, '10'),
(137, 10, 2, '购物车', 196, '10'),
(139, 1, 1, '交易成功', 0, '12'),
(140, 7, 1, '待评价', 0, '12'),
(141, 22, 1, '交易成功', 0, '12'),
(142, 23, 1, '待评价', 0, '12'),
(143, 1, 1, '交易成功', 0, '12'),
(144, 18, 1, '交易成功', 0, '12'),
(145, 9, 1, '待评价', 0, '12'),
(146, 10, 2, '交易成功', 196, '12');

-- --------------------------------------------------------

--
-- 表的结构 `tj`
--

CREATE TABLE IF NOT EXISTS `tj` (
  `tid` int(10) NOT NULL AUTO_INCREMENT,
  `sname` varchar(20) NOT NULL,
  `tname` varchar(20) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `tj`
--

INSERT INTO `tj` (`tid`, `sname`, `tname`) VALUES
(1, '1', '本周新品'),
(2, '4', '本周新品'),
(3, '9', '本周新品'),
(4, '16', '本周新品'),
(5, '10', '新品'),
(6, '16', '首页新品'),
(7, '1', '热门推荐'),
(8, '4', '热门推荐');

-- --------------------------------------------------------

--
-- 表的结构 `type`
--

CREATE TABLE IF NOT EXISTS `type` (
  `tid` int(10) NOT NULL AUTO_INCREMENT,
  `tname` varchar(20) NOT NULL,
  `tenglish` varchar(20) NOT NULL,
  `tdescription` varchar(255) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `type`
--

INSERT INTO `type` (`tid`, `tname`, `tenglish`, `tdescription`) VALUES
(1, '铁观音', 'TIE GUANYIN', '舌尖微甜，一股茶香慢慢从鼻端沁到咽喉，四肢百骸是说不出的轻松快慰。 '),
(2, '龙井茶', 'LONGJIN TEA', '新鲜悦鼻的加工精湛的嫩茶所具有的香气，有点似煮熟的嫩玉米香。'),
(3, '乌龙茶', 'OOLONGTEA', '香气清纯爽快，香虽不高但很幽雅。'),
(4, '银针茶', 'SILVER TEA', '在纯茶香气中闻到类似鲜花的香气。是茶树品种优良、生产环境优越、加工技术精湛的茶叶所具有。'),
(5, '大红袍', 'REDPAO TEA', '茶叶后熟陈化后所产生的香气，一般指普洱茶所具有香气类型。');

-- --------------------------------------------------------

--
-- 表的结构 `umessage`
--

CREATE TABLE IF NOT EXISTS `umessage` (
  `mid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(10) NOT NULL,
  `maddress` varchar(20) NOT NULL,
  `myb` varchar(6) NOT NULL,
  `mname` varchar(20) NOT NULL,
  `mphone` varchar(11) NOT NULL,
  `mdh` varchar(11) NOT NULL,
  `mtype` varchar(1) NOT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=51 ;

--
-- 转存表中的数据 `umessage`
--

INSERT INTO `umessage` (`mid`, `uname`, `maddress`, `myb`, `mname`, `mphone`, `mdh`, `mtype`) VALUES
(31, '1', '安市', '按错', '是', '按错', '', '0'),
(32, '2', 'ff', 'ff', 'fff', 'ffff', '', '0'),
(37, '10', '把v', '阿萨德', '按时', '按时', '', '0'),
(44, '10', '阿萨德', '阿萨德', '阿萨德', '阿萨德', '', '0'),
(45, '10', '按时', '阿萨德', '阿萨德', '萨达', '', '0'),
(47, '10', '按时', '按时', '撒', '按时', '', '0'),
(49, '12', '陕西省太原市', '033000', '张三', '15735801091', '', '1'),
(50, '12', '山西太原市', '044000', '李四', '15735801080', '', '0');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) NOT NULL,
  `upass` varchar(255) NOT NULL,
  `uimg` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`uid`, `uname`, `upass`, `uimg`) VALUES
(1, '偏爱', '789', '/teadao/public/upload/17-12-13/y.jpg'),
(9, '阿萨德', 'asd', '/teadao/public/img/11.jpg'),
(10, '王鹏', '123', '/teadao/public/img/11.jpg'),
(11, 'wp', '123', '/teadao/public/img/11.jpg'),
(12, '123', '123', '/teadao/public/img/11.jpg'),
(13, '456', '123', '/teadao/public/img/11.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

const AREA_LIST = [
  {
      name_en: 'Angola',
      name_zh: '安哥拉',
      label: 'AO',
      value: '244'
  },
  {
      name_en: 'Afghanistan',
      name_zh: '阿富汗',
      label: 'AF',
      value: '93'
  },
  {
      name_en: 'Albania',
      name_zh: '阿尔巴尼亚',
      label: 'AL',
      value: '355'
  },
  {
      name_en: 'Algeria',
      name_zh: '阿尔及利亚',
      label: 'ALG',
      value: '213'
  },
  {
      name_en: 'Andorra',
      name_zh: '安道尔共和国',
      label: 'AD',
      value: '376'
  },
  {
      name_en: 'Anguilla',
      name_zh: '安圭拉岛',
      label: 'AI',
      value: '1264'
  },
  {
      name_en: 'Antigua and Barbuda',
      name_zh: '安提瓜和巴布达',
      label: 'AG',
      value: '1268'
  },
  {
      name_en: 'Argentina',
      name_zh: '阿根廷',
      label: 'AR',
      value: '54'
  },
  {
      name_en: 'Armenia',
      name_zh: '亚美尼亚',
      label: 'AM',
      value: '374'
  },
  {
      name_en: 'Ascension',
      name_zh: '阿森松',
      label: 'AS',
      value: '247'
  },
  {
      name_en: 'Australia',
      name_zh: '澳大利亚',
      label: 'AU',
      value: '61'
  },
  {
      name_en: 'Austria',
      name_zh: '奥地利',
      label: 'AT',
      value: '43'
  },
  {
      name_en: 'Azerbaijan',
      name_zh: '阿塞拜疆',
      label: 'AZ',
      value: '994'
  },
  {
      name_en: 'Bahamas',
      name_zh: '巴哈马',
      label: 'BS',
      value: '1242'
  },
  {
      name_en: 'Bahrain',
      name_zh: '巴林',
      label: 'BH',
      value: '973'
  },
  {
      name_en: 'Bangladesh',
      name_zh: '孟加拉国',
      label: 'BD',
      value: '880'
  },
  {
      name_en: 'Barbados',
      name_zh: '巴巴多斯',
      label: 'BB',
      value: '1246'
  },
  {
      name_en: 'Belarus',
      name_zh: '白俄罗斯',
      label: 'BY',
      value: '375'
  },
  {
      name_en: 'Belgium',
      name_zh: '比利时',
      label: 'BE',
      value: '32'
  },
  {
      name_en: 'Belize',
      name_zh: '伯利兹',
      label: 'BZ',
      value: '501'
  },
  {
      name_en: 'Benin',
      name_zh: '贝宁',
      label: 'BJ',
      value: '229'
  },
  {
      name_en: 'Bermuda Is.',
      name_zh: '百慕大群岛',
      label: 'BM',
      value: '1441'
  },
  {
      name_en: 'Bolivia',
      name_zh: '玻利维亚',
      label: 'BO',
      value: '591'
  },
  {
      name_en: 'Botswana',
      name_zh: '博茨瓦纳',
      label: 'BW',
      value: '267'
  },
  {
      name_en: 'Brazil',
      name_zh: '巴西',
      label: 'BR',
      value: '55'
  },
  {
      name_en: 'Brunei',
      name_zh: '文莱',
      label: 'BN',
      value: '673'
  },
  {
      name_en: 'Bulgaria',
      name_zh: '保加利亚',
      label: 'BG',
      value: '359'
  },
  {
      name_en: 'Burkina-faso',
      name_zh: '布基纳法索',
      label: 'BF',
      value: '226'
  },
  {
      name_en: 'Burma',
      name_zh: '缅甸',
      label: 'BUR',
      value: '95'
  },
  {
      name_en: 'Burundi',
      name_zh: '布隆迪',
      label: 'BI',
      value: '257'
  },
  {
      name_en: 'Cameroon',
      name_zh: '喀麦隆',
      label: 'CM',
      value: '237'
  },
  {
      name_en: 'Canada',
      name_zh: '加拿大',
      label: 'CA',
      value: '1'
  },
  {
      name_en: 'Cayman Islands',
      name_zh: '开曼群岛',
      label: 'CAY',
      value: '1345'
  },
  {
      name_en: 'Central African Republic',
      name_zh: '中非共和国',
      label: 'CAR',
      value: '236'
  },
  {
      name_en: 'Chad',
      name_zh: '乍得',
      label: 'CHAD',
      value: '235'
  },
  {
      name_en: 'Chile',
      name_zh: '智利',
      label: 'CL',
      value: '56'
  },
  {
      name_en: 'China',
      name_zh: '中国',
      label: 'CN',
      value: '86'
  },
  {
      name_en: 'Colombia',
      name_zh: '哥伦比亚',
      label: 'CO',
      value: '57'
  },
  {
      name_en: 'Congo',
      name_zh: '刚果',
      label: 'CG',
      value: '242'
  },
  {
      name_en: 'Cook Islands',
      name_zh: '库克群岛',
      label: 'CK',
      value: '682'
  },
  {
      name_en: 'Costa Rica',
      name_zh: '哥斯达黎加',
      label: 'CR',
      value: '506'
  },
  {
      name_en: 'Cuba',
      name_zh: '古巴',
      label: 'CU',
      value: '53'
  },
  {
      name_en: 'Cyprus',
      name_zh: '塞浦路斯',
      label: 'CY',
      value: '357'
  },
  {
      name_en: 'Czech Republic',
      name_zh: '捷克',
      label: 'CZ',
      value: '420'
  },
  {
      name_en: 'Denmark',
      name_zh: '丹麦',
      label: 'DK',
      value: '45'
  },
  {
      name_en: 'Djibouti',
      name_zh: '吉布提',
      label: 'DJ',
      value: '253'
  },
  {
      name_en: 'Dominica Rep.',
      name_zh: '多米尼加共和国',
      label: 'DM',
      value: '1767'
  },
  {
      name_en: 'Ecuador',
      name_zh: '厄瓜多尔',
      label: 'EC',
      value: '593'
  },
  {
      name_en: 'Egypt',
      name_zh: '埃及',
      label: 'EG',
      value: '20'
  },
  {
      name_en: 'EI Salvador',
      name_zh: '萨尔瓦多',
      label: 'ES',
      value: '503'
  },
  {
      name_en: 'Estonia',
      name_zh: '爱沙尼亚',
      label: 'EE',
      value: '372'
  },
  {
      name_en: 'Ethiopia',
      name_zh: '埃塞俄比亚',
      label: 'ET',
      value: '251'
  },
  {
      name_en: 'Fiji',
      name_zh: '斐济',
      label: 'FJ',
      value: '679'
  },
  {
      name_en: 'Finland',
      name_zh: '芬兰',
      label: 'FI',
      value: '358'
  },
  {
      name_en: 'France',
      name_zh: '法国',
      label: 'FR',
      value: '33'
  },
  {
      name_en: 'French Guiana',
      name_zh: '法属圭亚那',
      label: 'GF',
      value: '594'
  },
  {
      name_en: 'Gabon',
      name_zh: '加蓬',
      label: 'GA',
      value: '241'
  },
  {
      name_en: 'Gambia',
      name_zh: '冈比亚',
      label: 'GM',
      value: '220'
  },
  {
      name_en: 'Georgia',
      name_zh: '格鲁吉亚',
      label: 'GE',
      value: '995'
  },
  {
      name_en: 'Germany',
      name_zh: '德国',
      label: 'DE',
      value: '49'
  },
  {
      name_en: 'Ghana',
      name_zh: '加纳',
      label: 'GH',
      value: '233'
  },
  {
      name_en: 'Gibraltar',
      name_zh: '直布罗陀',
      label: 'GI',
      value: '350'
  },
  {
      name_en: 'Greece',
      name_zh: '希腊',
      label: 'GR',
      value: '30'
  },
  {
      name_en: 'Grenada',
      name_zh: '格林纳达',
      label: 'GD',
      value: '1473'
  },
  {
      name_en: 'Guam',
      name_zh: '关岛',
      label: 'GU',
      value: '1671'
  },
  {
      name_en: 'Guatemala',
      name_zh: '危地马拉',
      label: 'GT',
      value: '502'
  },
  {
      name_en: 'Guinea',
      name_zh: '几内亚',
      label: 'GN',
      value: '224'
  },
  {
      name_en: 'Guyana',
      name_zh: '圭亚那',
      label: 'GY',
      value: '592'
  },
  {
      name_en: 'Haiti',
      name_zh: '海地',
      label: 'HT',
      value: '509'
  },
  {
      name_en: 'Honduras',
      name_zh: '洪都拉斯',
      label: 'HN',
      value: '504'
  },
  {
      name_en: 'Hong Kong',
      name_zh: '香港',
      label: 'HK',
      value: '852'
  },
  {
      name_en: 'Hungary',
      name_zh: '匈牙利',
      label: 'HU',
      value: '36'
  },
  {
      name_en: 'Iceland',
      name_zh: '冰岛',
      label: 'IS',
      value: '354'
  },
  {
      name_en: 'India',
      name_zh: '印度',
      label: 'IN',
      value: '91'
  },
  {
      name_en: 'Indonesia',
      name_zh: '印度尼西亚',
      label: 'ID',
      value: '62'
  },
  {
      name_en: 'Iran',
      name_zh: '伊朗',
      label: 'IR',
      value: '98'
  },
  {
      name_en: 'Iraq',
      name_zh: '伊拉克',
      label: 'IQ',
      value: '964'
  },
  {
      name_en: 'Ireland',
      name_zh: '爱尔兰',
      label: 'IE',
      value: '353'
  },
  {
      name_en: 'Israel',
      name_zh: '以色列',
      label: 'IL',
      value: '972'
  },
  {
      name_en: 'Italy',
      name_zh: '意大利',
      label: 'IT',
      value: '39'
  },
  {
      name_en: 'Ivory Coast',
      name_zh: '科特迪瓦',
      label: 'CI',
      value: '225'
  },
  {
      name_en: 'Jamaica',
      name_zh: '牙买加',
      label: 'JM',
      value: '1876'
  },
  {
      name_en: 'Japan',
      name_zh: '日本',
      label: 'JP',
      value: '81'
  },
  {
      name_en: 'Jordan',
      name_zh: '约旦',
      label: 'JO',
      value: '962'
  },
  {
      name_en: 'Kampuchea (Cambodia )',
      name_zh: '柬埔寨',
      label: 'KAM',
      value: '855'
  },
  {
      name_en: 'Kazakstan',
      name_zh: '哈萨克斯坦',
      label: 'KAZ',
      value: '327'
  },
  {
      name_en: 'Kenya',
      name_zh: '肯尼亚',
      label: 'KE',
      value: '254'
  },
  {
      name_en: 'Korea',
      name_zh: '韩国',
      label: 'KOR',
      value: '82'
  },
  {
      name_en: 'Kuwait',
      name_zh: '科威特',
      label: 'KW',
      value: '965'
  },
  {
      name_en: 'Kyrgyzstan',
      name_zh: '吉尔吉斯坦',
      label: 'KG',
      value: '996'
  },
  {
      name_en: 'Laos',
      name_zh: '老挝',
      label: 'LA',
      value: '856'
  },
  {
      name_en: 'Latvia',
      name_zh: '拉脱维亚',
      label: 'LV',
      value: '371'
  },
  {
      name_en: 'Lebanon',
      name_zh: '黎巴嫩',
      label: 'LB',
      value: '961'
  },
  {
      name_en: 'Lesotho',
      name_zh: '莱索托',
      label: 'LS',
      value: '266'
  },
  {
      name_en: 'Liberia',
      name_zh: '利比里亚',
      label: 'LR',
      value: '231'
  },
  {
      name_en: 'Libya',
      name_zh: '利比亚',
      label: 'LY',
      value: '218'
  },
  {
      name_en: 'Liechtenstein',
      name_zh: '列支敦士登',
      label: 'LI',
      value: '423'
  },
  {
      name_en: 'Lithuania',
      name_zh: '立陶宛',
      label: 'LT',
      value: '370'
  },
  {
      name_en: 'Luxembourg',
      name_zh: '卢森堡',
      label: 'LU',
      value: '352'
  },
  {
      name_en: 'Macau',
      name_zh: '澳门',
      label: 'MO',
      value: '853'
  },
  {
      name_en: 'Madagascar',
      name_zh: '马达加斯加',
      label: 'MG',
      value: '261'
  },
  {
      name_en: 'Malawi',
      name_zh: '马拉维',
      label: 'MW',
      value: '265'
  },
  {
      name_en: 'Malaysia',
      name_zh: '马来西亚',
      label: 'MY',
      value: '60'
  },
  {
      name_en: 'Maldives',
      name_zh: '马尔代夫',
      label: 'MV',
      value: '960'
  },
  {
      name_en: 'Mali',
      name_zh: '马里',
      label: 'ML',
      value: '223'
  },
  {
      name_en: 'Malta',
      name_zh: '马耳他',
      label: 'MT',
      value: '356'
  },
  {
      name_en: 'Mariana Is',
      name_zh: '马里亚那群岛',
      label: 'MRI',
      value: '1670'
  },
  {
      name_en: 'Martinique',
      name_zh: '马提尼克',
      label: 'MTQ',
      value: '596'
  },
  {
      name_en: 'Mauritius',
      name_zh: '毛里求斯',
      label: 'MU',
      value: '230'
  },
  {
      name_en: 'Mexico',
      name_zh: '墨西哥',
      label: 'MX',
      value: '52'
  },
  {
      name_en: 'Moldova Republic of',
      name_zh: '摩尔多瓦',
      label: 'MD',
      value: '373'
  },
  {
      name_en: 'Monaco',
      name_zh: '摩纳哥',
      label: 'MC',
      value: '377'
  },
  {
      name_en: 'Mongolia',
      name_zh: '蒙古',
      label: 'MN',
      value: '976'
  },
  {
      name_en: 'Montserrat Is',
      name_zh: '蒙特塞拉特岛',
      label: 'MS',
      value: '1664'
  },
  {
      name_en: 'Morocco',
      name_zh: '摩洛哥',
      label: 'MA',
      value: '212'
  },
  {
      name_en: 'Mozambique',
      name_zh: '莫桑比克',
      label: 'MZ',
      value: '258'
  },
  {
      name_en: 'Namibia',
      name_zh: '纳米比亚',
      label: 'NAM',
      value: '264'
  },
  {
      name_en: 'Nauru',
      name_zh: '瑙鲁',
      label: 'NR',
      value: '674'
  },
  {
      name_en: 'Nepal',
      name_zh: '尼泊尔',
      label: 'NP',
      value: '977'
  },
  {
      name_en: 'Netheriands Antilles',
      name_zh: '荷属安的列斯',
      label: 'NA',
      value: '599'
  },
  {
      name_en: 'Netherlands',
      name_zh: '荷兰',
      label: 'NL',
      value: '31'
  },
  {
      name_en: 'New Zealand',
      name_zh: '新西兰',
      label: 'NZ',
      value: '64'
  },
  {
      name_en: 'Nicaragua',
      name_zh: '尼加拉瓜',
      label: 'NI',
      value: '505'
  },
  {
      name_en: 'Niger',
      name_zh: '尼日尔',
      label: 'NE',
      value: '227'
  },
  {
      name_en: 'Nigeria',
      name_zh: '尼日利亚',
      label: 'NG',
      value: '234'
  },
  {
      name_en: 'North Korea',
      name_zh: '朝鲜',
      label: 'NK',
      value: '850'
  },
  {
      name_en: 'Norway',
      name_zh: '挪威',
      label: 'NW',
      value: '47'
  },
  {
      name_en: 'Oman',
      name_zh: '阿曼',
      label: 'OM',
      value: '968'
  },
  {
      name_en: 'Pakistan',
      name_zh: '巴基斯坦',
      label: 'PK',
      value: '92'
  },
  {
      name_en: 'Panama',
      name_zh: '巴拿马',
      label: 'PA',
      value: '507'
  },
  {
      name_en: 'Papua New Guinea',
      name_zh: '巴布亚新几内亚',
      label: 'PG',
      value: '675'
  },
  {
      name_en: 'Paraguay',
      name_zh: '巴拉圭',
      label: 'PY',
      value: '595'
  },
  {
      name_en: 'Peru',
      name_zh: '秘鲁',
      label: 'PE',
      value: '51'
  },
  {
      name_en: 'Philippines',
      name_zh: '菲律宾',
      label: 'PH',
      value: '63'
  },
  {
      name_en: 'Poland',
      name_zh: '波兰',
      label: 'PL',
      value: '48'
  },
  {
      name_en: 'French Polynesia',
      name_zh: '法属玻利尼西亚',
      label: 'PF',
      value: '689'
  },
  {
      name_en: 'Portugal',
      name_zh: '葡萄牙',
      label: 'PT',
      value: '351'
  },
  {
      name_en: 'Puerto Rico',
      name_zh: '波多黎各',
      label: 'PR',
      value: '1787'
  },
  {
      name_en: 'Qatar',
      name_zh: '卡塔尔',
      label: 'QA',
      value: '974'
  },
  {
      name_en: 'Reunion',
      name_zh: '留尼旺',
      label: 'RE',
      value: '262'
  },
  {
      name_en: 'Romania',
      name_zh: '罗马尼亚',
      label: 'RO',
      value: '40'
  },
  {
      name_en: 'Russia',
      name_zh: '俄罗斯',
      label: 'RU',
      value: '7'
  },
  {
      name_en: 'Saint Lucia',
      name_zh: '圣卢西亚',
      label: 'LC',
      value: '1758'
  },
  {
      name_en: 'Saint Vincent',
      name_zh: '圣文森特岛',
      label: 'VC',
      value: '1784'
  },
  {
      name_en: 'Samoa Eastern',
      name_zh: '东萨摩亚(美)',
      label: 'SE',
      value: '684'
  },
  {
      name_en: 'Samoa Western',
      name_zh: '西萨摩亚',
      label: 'SW',
      value: '685'
  },
  {
      name_en: 'San Marino',
      name_zh: '圣马力诺',
      label: 'SM',
      value: '378'
  },
  {
      name_en: 'Sao Tome and Principe',
      name_zh: '圣多美和普林西比',
      label: 'ST',
      value: '239'
  },
  {
      name_en: 'Saudi Arabia',
      name_zh: '沙特阿拉伯',
      label: 'SA',
      value: '966'
  },
  {
      name_en: 'Senegal',
      name_zh: '塞内加尔',
      label: 'SN',
      value: '221'
  },
  {
      name_en: 'Seychelles',
      name_zh: '塞舌尔',
      label: 'SC',
      value: '248'
  },
  {
      name_en: 'Sierra Leone',
      name_zh: '塞拉利昂',
      label: 'SL',
      value: '232'
  },
  {
      name_en: 'Singapore',
      name_zh: '新加坡',
      label: 'SG',
      value: '65'
  },
  {
      name_en: 'Slovakia',
      name_zh: '斯洛伐克',
      label: 'SK',
      value: '421'
  },
  {
      name_en: 'Slovenia',
      name_zh: '斯洛文尼亚',
      label: 'SI',
      value: '386'
  },
  {
      name_en: 'Solomon Is',
      name_zh: '所罗门群岛',
      label: 'SB',
      value: '677'
  },
  {
      name_en: 'Somalia',
      name_zh: '索马里',
      label: 'SO',
      value: '252'
  },
  {
      name_en: 'South Africa',
      name_zh: '南非',
      label: 'ZA',
      value: '27'
  },
  {
      name_en: 'Spain',
      name_zh: '西班牙',
      label: 'SPA',
      value: '34'
  },
  {
      name_en: 'Sri Lanka',
      name_zh: '斯里兰卡',
      label: 'LK',
      value: '94'
  },
  {
      name_en: 'St.Lucia',
      name_zh: '圣卢西亚',
      label: 'STL',
      value: '1758'
  },
  {
      name_en: 'St.Vincent',
      name_zh: '圣文森特',
      label: 'SV',
      value: '1784'
  },
  {
      name_en: 'Sudan',
      name_zh: '苏丹',
      label: 'SD',
      value: '249'
  },
  {
      name_en: 'Suriname',
      name_zh: '苏里南',
      label: 'SR',
      value: '597'
  },
  {
      name_en: 'Swaziland',
      name_zh: '斯威士兰',
      label: 'SZ',
      value: '268'
  },
  {
      name_en: 'Sweden',
      name_zh: '瑞典',
      label: 'SWE',
      value: '46'
  },
  {
      name_en: 'Switzerland',
      name_zh: '瑞士',
      label: 'SWL',
      value: '41'
  },
  {
      name_en: 'Syria',
      name_zh: '叙利亚',
      label: 'SY',
      value: '963'
  },
  {
      name_en: 'Taiwan',
      name_zh: '台湾省',
      label: 'TW',
      value: '886'
  },
  {
      name_en: 'Tajikistan',
      name_zh: '塔吉克斯坦',
      label: 'TJ',
      value: '992'
  },
  {
      name_en: 'Tanzania',
      name_zh: '坦桑尼亚',
      label: 'TZ',
      value: '255'
  },
  {
      name_en: 'Thailand',
      name_zh: '泰国',
      label: 'TH',
      value: '66'
  },
  {
      name_en: 'Togo',
      name_zh: '多哥',
      label: 'TG',
      value: '228'
  },
  {
      name_en: 'Tonga',
      name_zh: '汤加',
      label: 'TO',
      value: '676'
  },
  {
      name_en: 'Trinidadand Tobago',
      name_zh: '特立尼达和多巴哥',
      label: 'TT',
      value: '1868'
  },
  {
      name_en: 'Tunisia',
      name_zh: '突尼斯',
      label: 'TN',
      value: '216'
  },
  {
      name_en: 'Turkey',
      name_zh: '土耳其',
      label: 'TR',
      value: '90'
  },
  {
      name_en: 'Turkmenistan',
      name_zh: '土库曼斯坦',
      label: 'TM',
      value: '993'
  },
  {
      name_en: 'Uganda',
      name_zh: '乌干达',
      label: 'UG',
      value: '256'
  },
  {
      name_en: 'Ukraine',
      name_zh: '乌克兰',
      label: 'UA',
      value: '380'
  },
  {
      name_en: 'United Arab Emirates',
      name_zh: '阿拉伯联合酋长国',
      label: 'AE',
      value: '971'
  },
  {
      name_en: 'United Kingdom',
      name_zh: '英国',
      label: 'GB',
      value: '44'
  },
  {
      name_en: 'United States',
      name_zh: '美国',
      label: 'US',
      value: '1'
  },
  {
      name_en: 'Uruguay',
      name_zh: '乌拉圭',
      label: 'UY',
      value: '598'
  },
  {
      name_en: 'Uzbekistan',
      name_zh: '乌兹别克斯坦',
      label: 'UZ',
      value: '998'
  },
  {
      name_en: 'Venezuela',
      name_zh: '委内瑞拉',
      label: 'VE',
      value: '58'
  },
  {
      name_en: 'Vietnam',
      name_zh: '越南',
      label: 'VN',
      value: '84'
  },
  {
      name_en: 'Yemen',
      name_zh: '也门',
      label: 'YE',
      value: '967'
  },
  {
      name_en: 'Yugoslavia',
      name_zh: '南斯拉夫',
      label: 'YUG',
      value: '381'
  },
  {
      name_en: 'Zaire',
      name_zh: '扎伊尔',
      label: 'ZMI',
      value: '243'
  },
  {
      name_en: 'Zambia',
      name_zh: '赞比亚',
      label: 'ZMB',
      value: '260'
  },
  {
      name_en: 'Zimbabwe',
      name_zh: '津巴布韦',
      label: 'ZW',
      value: '263'
  }
]

export default AREA_LIST;

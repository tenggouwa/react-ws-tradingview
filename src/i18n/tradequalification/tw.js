export default {
    tradequTitle: 'CBOEX.com: 合約交易',
    // 第一步
    label0: '5個問題帶你進入合約交易的世界',
    label: '1、什麼是合約交易？',
    content1: '通俗地講，期貨合約交易就是對未來某個時間點的某種資產進行投資，且可以通過槓桿放大預期盈虧，例如：您買入（做多）BTC1912合約，相當於您從買入時刻開始，到該合約規定的交割時間（即2019年12月28日08:00 UTC+0）的這段時間內看漲BTC價格。在此期間，BTC上漲越多，您的收益越多。',
    content2: '期貨合約的天然優勢在於：',
    content3: '1. 與現貨槓桿（現貨配資）交易不同，您無需為槓桿支付融資利息；',
    content4: '2. 與掉期合約（永續合約）交易不同，您無需給交易對手支付資金費用；',
    content5: '3. 使用BTC作為保證金，即可對所有數字資產合約進行做多或者做空； ',
    content6: '4. 可以對所持有的數字資產現貨進行套期保值。',
    label1: '2. 保證金如何計算？',
    content7: '您為BTC合約設置的槓桿倍數為10倍，如果您委託買入/賣出價值總量為10個BTC的BTC合約，那麼該委託需要凍結的保證金為1個BTC。 ',
    content8: '該委託成交後，您所持有的合約倉位的價值會隨合約價格的變化而變化，同時保證金需求也會發生相應的變化。',
    content9: '（例如，你買入/賣出的價值總量為10個BTC的BTC合約，當前價格相較您的開倉均價上漲了10%，該倉位的當前價值由原來的10個BTC變為11個BTC，該倉位的保證金需求也由原來的1個BTC變為1.1個BTC。',
    label2: '3. 盈虧如何計算？',
    content10: '（1）買入（做多）某合約的浮動盈虧 = 倉位的當前價值 - 倉位的開倉價值，即當前價值大於開倉價值，您盈利。',
    content11: '（例如，您設置10倍交易槓桿，用1個BTC作為保證金（開倉保證金），以6000USD的價格買入價值總量為10個BTC（開倉價值）的BTC合約。該合約的價格上漲5%至6300USD時，您的多頭倉位的當前價值變為10.5個BTC，您的浮動盈虧為0.5個BTC，您的收益率為50%（該倉位的浮動盈虧/開倉保證金）。',
    content12: '（2）賣出（做空）某合約的浮動盈虧 = 倉位的開倉價值 - 倉位的當前價值，即當前價值小於開倉價值，您盈利。',
    content13: '（例如，您設置10倍交易槓桿，用1個BTC作為保證金（開倉保證金），以6000USD的價格賣出價值總量為10個BTC（開倉價值）的BTC合約。該合約的價格下跌5%至5700USD時，您的空頭倉位的當前價值變為9.5個BTC，您的浮動盈虧為0.5個BTC，您的收益率為50%（該倉位的浮動盈虧/開倉保證金）。',
    label3: '4.何時可以提取盈利？',
    content14: '由於FOTA.com採用的是全球領先的STAMP投資組合全品全倉保證金風控系統，用戶無需為他人的虧損負責（分攤其他用戶的穿倉損失），因此合約取得盈利的任意時刻都能即時提取，平台不會因為結算或者市場波動等原因而扣留合約盈利。這意味著您平倉已實現的盈利和持倉未實現的浮盈都可以隨時提現，或者交易平台不同標的、不同期限的任意合約。',
    label4: '5. 合約如何計價與交割？',
    content15: 'CBOEX.com上的所有合約的保證金結算單位統一為BTC，合約計價單位統一為USD。例如，ETH1912合約的計價單位是USD，保證金結算單位是BTC。',
    content16: '合約的交割時間統一設定為合約交割月的28日的16:00（北京時間）。例如BTC1811合約的交割時間為2018年11月28日16:00，到達交割時間後，平台上該合約的所有倉位將按FOTA專業級現貨交割指數，計算盈虧，完成交割。',
    content17: 'CBOEX.com上所有的合約統一為定期期貨合約，在合約交割日進行統一交割結算。交割時間詳見合約交易頁面中合約信息。同時合約代碼中的數字部分代表該合約交割年月，例如BTC1912合約的交割時間為2019年12月28日08:00(UTC+0)，BTC1911合約的交割時間為2019年11月28日08:00(UTC+0)。',
    opentradetitle: '開通合約交易',
    opentradesubtitle: '親愛的用戶，為了保證您接下來更好的控制資金風險，您需要瞭解以下重要規則並答題通過後，才能開通合約交易。',
    knowtrade: '認識合約交易',
    question: '答題',
    opentrade: '開通',
    startquestion: '開始答題',
    expertis: '我是交易專家，跳過教程',
    tab1: '合約名稱',
    tab2: '多空',
    tab3: '槓桿',
    tab4: '開倉均價',
    tab5: '開倉價值',
    tab6: '當前價值',
    tab7: '保證金需求',
    tab8: '浮動盈虧',
    tab9: '收益率',
    tab10: '多',
    tab11: '空',
    // 第二部
    question1: '1、假設投資者在2019年9月25日持有BTC1912合約，該合約的具體交割時間是？',
    answer1: '2019年12月28日 08:00 (UTC+0)',
    answer2: '2019年9月28日 00:00 (UTC+0)',
    question2: '2、一位投資者委託賣出/做空價值總量為10個BTC的BTC1912合約，使用5倍槓桿，該委託對應的保證金需求是多少？',
    answer3: '10個BTC',
    answer4: '2個BTC',
    question3: '3、一位投資者設置10倍交易槓桿，用1個BTC作為保證金（開倉保證金），以6000USD的價格買入/做多價值總量為10個BTC（開倉價值）的BTC合約。當BTC合約價格上漲10%至6600USD時，他能賺多少錢？',
    answer5: '0.1個BTC',
    answer6: '1個BTC',
    question4: '4、一位投資者設置10倍交易槓桿，用1個BTC作為保證金（開倉保證金），以6000USD的價格賣出/做空價值總量為10個BTC（開倉價值）的BTC合約，以下哪種情況投資者會虧損一半，即0.5個BTC？',
    answer7: '合約價格上漲50%',
    answer8: '合約價格上漲5%',
    question5: '5、一位投資者賣出/做空BTC1912合約，當前浮盈為1個BTC，同時他看好後市認為BTC還將繼續下跌，想持有此合約擴大盈利，那麼他是否能取出當前1個BTC的浮動盈利？',
    answer9: 'CBOEX.com不能取出未平倉合約的盈利',
    answer10: 'CBOEX.com可以隨時取出已實現和浮動盈利',
    question6: '6、一位投資者同時持有BTC合約和ETH合約，其中BTC合約盈利1個BTC，ETH合約虧損1個BTC，此時會不會因為ETH合約虧損嚴重而觸發ETH合約的強制平倉？',
    answer11: '會，平台會控制虧損',
    answer12: '不會，只要保證金賬戶整體餘額足夠就不會觸發任何強制平倉（即強平安全邊際大於等於零就不會觸發任何強制平倉）',
    question7: '7、投資者買入/做多價值總量為10個BTC的BTC1912合約，此時市場風雲變幻，該投資者認為市場即將大跌，又賣出/做空價值總量為15個BTC的BTC1912合約。此時，該投資者的持倉是多少？',
    answer13: '價值總量為10個BTC的多頭合約與價值總量為15個BTC的空頭合約',
    answer14: '價值總量為5個BTC的空頭合約 ',
    info1: '上一步',
    info2: '提交',
    info3: '這將不保留您已經作答的答案，確定返回上一步？',
    tip: '請答對全部題目才能提交',
    // 第三部
    startTrade: '趕快開始交易吧',
    canTradeL: '我已閱讀並同意',
    agreement: '《FOTA用戶使用協議》',
    openTrade: '開通合約交易',
    contragulationTrade: '恭喜你答題通過，快去開通合約吧',
    successInfo: '開通合約交易成功',
    // 方塔虛擬用戶協議
    xieyi: 'FOTA用戶使用協議',
    xieyiTime: '2018年9月16日更新及生效',
    xieyiLabel1: '1.綜述',
    xieyiContent1: '1.1 數字貨幣期貨合約是FOTA推出的數字貨幣衍生品。由FOTA負責產品的設計管理和交易平台的運營服務。',
    xieyiLabel2: '2.合約產品規則',
    xieyiContent2_1: '2.1 合約的標的包括BTC、ETH、EOS、BCH、ETC、LTC，以及其他FOTA認可的數字貨幣品種。在進行交易時以USDT（兌美元匯率1:1）對合約標的進行計價。',
    xieyiContent2_2: '2.2 合約大小、報價單位、最小變動價格',
    xieyiContent2_6: 'BTC合約的大小為1個BTC現貨價值，報價單位是USDT/個BTC，報價時的最小變動價位為0.1USDT。',
    xieyiContent2_7: 'ETH合約的大小為1個ETH現貨價值，報價單位是USDT/個ETH，報價時的最小變動價位為0.01USDT。',
    xieyiContent2_8: 'EOS合約的大小為1個EOS現貨價值，報價單位是USDT/個EOS，報價時的最小變動價位為0.001USDT。',
    xieyiContent2_9: 'BCH合約的大小為1個BCH現貨價值，報價單位是USDT/個BCH，報價時的最小變動價位為0.01USDT。',
    xieyiContent2_11: 'ETC 合約的大小為1個ETC現貨價值，報價單位是USDT/個ETC，報價時的最小變動價位為0.001USDT。',
    xieyiContent2_10: 'LTC合約的大小為1個LTC現貨價值，報價單位是USDT/個BTC，報價時的最小變動價位為0.01USDT。',
    xieyiContent2_3: '2.3 合約的交割日為合約上線後第三個月的28日16:00。如：2018年6月28日、7月28日、8月28日分別有三份季度合約上線，交割日期分別為9月28日、10月28日、11月28日，依此類推。上述時間以北京時間為準。',
    xieyiContent2_4: '2.4 當某一合約到達交割日時，所有的持倉將會按照交割價平倉，所有的未平倉盈虧轉化為已實現盈虧，已實現盈虧扣除該合約盈虧差額後轉為賬戶餘額。賬戶餘額可以充當合約的保證金，可以提現。',
    xieyiContent2_5: '2.5 如果交割和結算時間前後出現市場異常，導致指數大幅波動，或者出現穿倉比例異常，我們將有可能根據具體情況選擇延時交割和結算，具體規則FOTA平台將發公告說明。',
    xieyiLabel3: '3.交易規則',
    xieyiContent3_1: '3.1 用戶可以通過網頁，APP客戶端，api，以及FOTA認可的方式下達交易委託。委託內容包括委託價，委託數量，委託方向，以及FOTA要求的其他內容。',
    xieyiContent3_2: '3.2 當用戶首次下達委託並且成交時，將會建立相應的合約倉位，在該倉位未被平倉時，隨著價格的波動將會產生未平倉盈虧。未平倉盈虧可以充當合約的保證金，也可以提現。未平倉盈虧的計算公式：多倉未平倉盈虧=（買一價-開倉均價）*數量*合約大小； 空倉未平倉盈虧=（開倉均價-賣一價）*數量*合約大小。',
    xieyiContent3_3: '3.3 當用戶下單反方向委託並且成交時，將會從投資者所持有的倉位中扣減相應的持倉數量，並且將未平倉盈虧轉化為已實現盈虧。已實現盈虧計入賬戶餘額，可以充當合約的保證金，可以提現。已實現盈虧的計算公式：多倉未平倉盈虧=（成交價-開倉均價）*數量*合約大小； 空倉未平倉盈虧=（開倉均價-成交價）*數量*合約大小。',
    xieyiContent3_4: '3.4 當某一合約到達交割日時，該合約將會在北京時間下午的16:00進行交割，所有的持倉將會按照交割價平倉，所有的未平倉盈虧轉化為已實現盈虧，已實現盈虧扣除該合約盈虧差額後轉為賬戶餘額。賬戶餘額可以充當合約的保證金，可以提現。',
    xieyiContent3_5: '3.5 如果交割和結算時間前後出現市場異常，導致指數大幅波動，或者出現分攤比例異常，FOTA將有權利根據具體情況選擇延時交割和結算，具體規則由FOTA平台發公告說明。',
    xieyiLabel4: '4.風控規則',
    xieyiContent4_1: '4.1 FOTA數字貨幣期貨合約採用全倉保證金製度。',
    xieyiContent4_2: '當用戶選擇全倉保證金時，用戶轉入合約賬戶的所有餘額，所有合約產生的盈虧都將作為合約的持倉保證金。用戶的保證金率=用戶賬戶總額/用戶倉位價值。當保證金率有所降低，賬戶將存在爆倉風險，倉位將有可能被強平。',
    xieyiContent4_3: '4.2 全倉保證金製度：所有合約賬戶中的USDT都將作為合約持倉的保證金，保證金數量將會隨價格變化而變動。當合約價格朝著不利於投資者方向運動時，賬戶權益即會發生損失。當用戶的保證金率降低，賬戶存在被爆倉的風險，此時被爆倉的用戶的損失接近或等於其合約賬戶中的所有資產。用戶通過轉入保證金和開倉合約的數量調整實際槓桿倍數。轉入的保證金越多，開倉的合約數量越少，合約賬戶的實際槓桿倍數即越小，越不容易被爆倉。 ',
    xieyiContent4_4: '4.3 全倉逐步強平制度：為了客戶利益最大化和避免單一數字貨幣價格波動劇烈時產生的連環爆倉，FOTA合約交易採用全倉逐步強平制度。當某用戶的賬戶爆倉時，強制平倉優先平掉（按絕對值）損失最大的倉位，如果仍然不足，則繼續平損失第二的倉位，平倉數量為使得保證金率能高於最低限度的值。這種強制平倉方式的優點在於對客戶影響最小。',
    xieyiContent4_5: ' 4.4當用戶的持倉數量或委託數量過大，FOTA認為可能對系統和其他用戶產生嚴重風險時，FOTA有權要求用戶採用撤單，減倉等風控措施，在FOTA認為有必要的時候，FOTA有權對個別賬戶採用限制總倉位數量，限制總委託數量，限制開倉，撤單，強行平倉等措施進行風險控制。',
    // xieyiContent4_6: '4.5 強平後發生的穿倉損失由用戶負責償還。',
    xieyiLabel5: '5.其他',
    xieyiContent5_1: '5.1 用戶在參與虛擬合約交易時，應當遵守公平公正的原則。',
    xieyiContent5_2: '5.2 FOTA有權利對所有惡意操縱價格，惡意影響交易系統等不道德行為進行警告、限制交易、關停賬戶等措施。在有必要的時候，FOTA有權採用暫停交易，取消交易，回滾時段交易等手段以消除不良影響。',
    xieyiContent5_3: '5.3 當用戶的持倉數量或委託數量過大，FOTA認為可能對系統和其他用戶產生嚴重風險時，FOTA有權要求用戶採用撤單，平倉等風控措施，在FOTA認為有必要的時候，FOTA有權利對個別賬戶採用限制總倉位數量，限制總委託數量，限制開倉，撤單，強行平倉等措施進行風險控制。',
    xieyiContent5_4: '5.4 系統平台因下列狀況無法正常運作，使用戶無法使用各項服務或不能正常委託時，FOTA不承擔損害賠償責任，該狀況包括但不限於：',
    xieyiContent5_10: 'A．FOTA平台公告之系統停機維護期間；',
    xieyiContent5_11: 'B．電信設備出現故障不能進行數據傳輸的；',
    xieyiContent5_12: 'C．因颱風、地震、海嘯、洪水、停電、戰爭、恐怖襲擊等不可抗力之因素，造成FOTA平台系統障礙不能執行業務的；',
    xieyiContent5_13: 'D．由於黑客攻擊、計算機病毒侵入或發作、電信部門技術調整或故障、網站升級、銀行方面的問題、因政府管制而造成的暫時性關閉等影響網絡正常經營的原因而造成的服務中斷或者延遲；',
    xieyiContent5_14: 'E．因為行業現有技術力量無法預測或無法解決的技術問題而造成的損失；',
    xieyiContent5_15: 'F．因第三方的過錯或者延誤而給用戶或者其他第三方造成的損失',
    xieyiContent5_5: '5.5 由於系統故障，網絡原因，DDos等黑客攻擊等意外因素可能導致的異常成交，行情中斷，以及其他可能的異常情況，FOTA有權根據實際情況取消異常成交結果，以及回滾某一段時間的所有成交。',
    xieyiContent5_6: '5.6 FOTA交易平台將嚴厲禁止任何不正當的交易行為，包括但不限於用戶利用可能存在的系統漏洞進行惡意委託，通過大額委託，連續委託，關聯賬戶對倒成交等方式惡意操縱價格和成交量等行為，FOTA平台有權根據實際情況取消異常成交結果，以及回滾某一段時間的部分或所有成交。',
    xieyiContent5_7: '5.7 本協議內容同時包括FOTA的各項制度規範、其它本協議附件中的協議或規則、FOTA可能不斷發布關於本服務的其他相關協議、規則等內容。上述內容一經正式發佈，即為本協議不可分割的組成部分，你同樣應當遵守。上述內容與本協議存在衝突的，以本協議為準。一經註冊或使用本協議下任何服務，即視為你已閱讀並同意接受本協議及上述內容的約束。FOTA有權在必要時單方修改本協議或上述內容，相關內容變更後，如果你繼續使用本服務，即視為你已接受修改後的相關內容。如果你不接受修改後的相關內容，應當停止使用相關服務。',
    xieyiContent5_8: '5.8 本協議的成立、生效、履行、解釋及糾紛解決，適用新加坡地區法律。',
    xieyiContent5_9: '5.9 若你和FOTA之間發生任何糾紛或爭議，首先應友好協商解決；協商不成功的，雙方均同意將糾紛或爭議提交新加坡地區有管轄權的法院解決。',
    xieyiLabel6: '6. 本協議所有條款的標題僅為閱讀方便，本身並無實際涵義，不能作為本協議涵義解釋的依據。'
}

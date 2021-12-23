import i18next from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import zh from './zh.js'
import en from './en.js'
import ko from './ko.js'

let nLng = 'en'
const language = navigator.browserLanguage ? navigator.browserLanguage : navigator.language
if (language.indexOf('zh') > -1) {
    nLng = 'zh'
} else if (language.indexOf('ko') > -1) {
    nLng = 'ko'
}
const lng = localStorage.lang || nLng
localStorage.lang = lng

// 将i8next配置全局配置到react-i8next(通过reactI18nextModule)
i18next
    .use(reactI18nextModule)
    .init({
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        fallbackLng: 'en',
        lng, // 'en' | 'zh-CN'
        resources: {
            zh,
            en,
            ko
        },
    }, (err, t) => {
        if (err) {
            return err
        }
        // window.t = t
        return t
    })

export default i18next

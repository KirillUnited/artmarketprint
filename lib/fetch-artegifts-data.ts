// ***
// Uncomment this code to get XML data from art24.by
// ***
import { parseStringPromise } from 'xml2js';
import { XMLParser } from 'fast-xml-parser';

import { saveJsonToFile } from '@/lib/utils';

const PRODUCT_DESCRIPTION_URL = 'https://art24.by/capi_v100_xmls/products_description_xml_cdata001.xml';
const MINSKSTOCKS_URL = 'https://art24.by/capi_v100_xmls/minskstocks.xml';
const AUTH = Buffer.from('resu100capixml:67919f4F4f4f6a376d80919dEQli_f35a812').toString('base64');
export const ARTE_PRODUCTS_FILE_PATH = '_data/products-20-03-25.json';

export async function getXmlData(url=PRODUCT_DESCRIPTION_URL) {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': 'Basic ' + btoa('resu100capixml:67919f4F4f4f6a376d80919dEQli_f35a812')
            },
            cache: 'no-store'
        });

        if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

        const xmlText = await response.text();
        const jsonData = await parseStringPromise(xmlText);
        await saveJsonToFile(ARTE_PRODUCTS_FILE_PATH, jsonData);
        // return jsonData;
    } catch (error) {
        console.error('Ошибка при загрузке XML:', error);

        return null;
    }
}

// export async function fetchXMLStream() {
//     const response = await fetch(PRODUCT_DESCRIPTION_URL, {
//         headers: { Authorization: `Basic ${AUTH}` },
//     });

//     if (!response.body) {
//         throw new Error('Ошибка: тело ответа пустое.');
//     }

//     // Настраиваем потоковое чтение
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     const parser = new XMLParser({
//         ignoreAttributes: false,
//         attributeNamePrefix: '@_',
//         trimValues: true,
//         cdataPropName: '__cdata', // Сохраняем CDATA отдельно
//         allowBooleanAttributes: true,
//         processEntities: true, // Автоматически заменяет HTML-сущности (&lt; &gt;)
//     });

//     let xmlText = '';
//     let limit = 5 * 1024 * 1024; // Увеличиваем лимит данных (10МБ)

//     while (true) {
//         const { value, done } = await reader.read();

//         if (done) break;

//         xmlText += decoder.decode(value, { stream: true });

//         // Проверяем, есть ли незакрытый CDATA
//         if (xmlText.includes('<![CDATA[') && !xmlText.includes(']]>')) {
//             console.warn('⚠️ Незакрытый CDATA, ждем оставшуюся часть...');
//             continue; // Ждем загрузку остальной части XML
//         }

//         // Ограничиваем размер XML (если нужно)
//         if (xmlText.length > limit) {
//             console.log('⚠️ Достигнут лимит данных, останавливаем загрузку...');
//             break;
//         }
//     }

//     // Парсим XML в JSON
//     const jsonData = parser.parse(xmlText);

//     await saveJsonToFile(ARTE_PRODUCTS_FILE_PATH, jsonData);

//     return jsonData;
// }
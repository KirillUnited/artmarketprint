// ***
// Uncomment this code to get XML data from art24.by
// ***
import {parseStringPromise} from 'xml2js';

const URL = 'https://markli.by/bitrix/catalog_export/arte.xml';

export async function getXmlDataJSON(url=URL) {
    try {
        const response = await fetch(url, {
            cache: 'no-store'
        });

        if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

        const xmlText = await response.text();

        return await parseStringPromise(xmlText);

    } catch (error) {
        console.error('Ошибка при загрузке XML:', error);

        return null;
    }
}
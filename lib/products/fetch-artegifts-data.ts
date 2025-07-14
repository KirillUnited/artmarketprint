// ***
// Uncomment this code to get XML data from art24.by
// ***
import { parseStringPromise } from 'xml2js';
// import { saveJsonToFile } from '@/lib/utils';

const PRODUCT_DESCRIPTION_URL = 'https://art24.by/capi_v100_xmls/products_description_xml_cdata001.xml';
const MINSKSTOCKS_URL = 'https://art24.by/capi_v100_xmls/minskstocks.xml';
const AUTH = Buffer.from('resu100capixml:67919f4F4f4f6a376d80919dEQli_f35a812').toString('base64');
export const ARTE_PRODUCTS_FILE_PATH = '_data/products.json';

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
        // await saveJsonToFile(ARTE_PRODUCTS_FILE_PATH, jsonData);
        return jsonData;
    } catch (error) {
        console.error('Ошибка при загрузке XML:', error);

        return null;
    }
}